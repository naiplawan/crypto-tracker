import { format, startOfDay, startOfWeek, startOfMonth, isAfter } from 'date-fns';
import { Portfolio, Transaction, PieData, PnlData } from '@/types/interface'; // Adjust the import path as needed

export type FilterOption = 'day' | 'week' | 'month' | 'all';

// Ensure transactions is always an array to avoid issues with map and filter
export const filterTransactions = (transactions: Transaction[], filter: FilterOption): Transaction[] => {
  const startDate = (() => {
    switch (filter) {
      case 'day':
        return startOfDay(new Date());
      case 'week':
        return startOfWeek(new Date());
      case 'month':
        return startOfMonth(new Date());
      default:
        return new Date(0); // Epoch time for "All time"
    }
  })();

  return (transactions || []).filter((transaction) => isAfter(new Date(transaction.created_at), startDate));
};

export const processPieData = (data: Portfolio[], filter: FilterOption): { pieData: PieData[], totalValue: number } => {
  const portfolios = Array.isArray(data) ? data : []; // Ensure data is an array

  let totalValue = 0;
  const pieData: PieData[] = portfolios.reduce((acc: PieData[], portfolio: Portfolio) => {
    const filteredTransactions = filterTransactions(portfolio.transactions, filter);

    filteredTransactions.forEach((transaction: Transaction) => {
      const cryptoName = transaction.cryptocurrency.name;
      const cryptoValue = transaction.amount * transaction.price_per_coin;

      totalValue += cryptoValue;

      const existing = acc.find((item) => item.name === cryptoName);
      if (existing) {
        existing.value += cryptoValue;
      } else {
        acc.push({ name: cryptoName, value: cryptoValue });
      }
    });

    return acc;
  }, []);

  return { pieData, totalValue };
};

export const processBarChartData = (data: Portfolio[], filter: FilterOption): any[] => {
  const portfolios = Array.isArray(data) ? data : []; // Ensure data is an array

  const barChartData: any[] = portfolios.reduce((acc: any[], portfolio: Portfolio) => {
    const filteredTransactions = filterTransactions(portfolio.transactions, filter);

    filteredTransactions.forEach((transaction: Transaction) => {
      const cryptoName = transaction.cryptocurrency.name;
      const month = format(new Date(transaction.created_at), 'MMMM');

      const existing = acc.find((item) => item.month === month);
      if (existing) {
        if (existing[cryptoName]) {
          existing[cryptoName].amount += transaction.amount;
          existing[cryptoName].investment += transaction.amount * transaction.price_per_coin;
        } else {
          existing[cryptoName] = {
            amount: transaction.amount,
            investment: transaction.amount * transaction.price_per_coin,
          };
        }
      } else {
        acc.push({
          month,
          [cryptoName]: {
            amount: transaction.amount,
            investment: transaction.amount * transaction.price_per_coin,
          },
        });
      }
    });

    return acc;
  }, []);

  return barChartData;
};

export const calculatePnl = (data: Portfolio[], filter: FilterOption): PnlData[] => {
  const portfolios = Array.isArray(data) ? data : []; // Ensure data is an array

  return portfolios.reduce((acc: PnlData[], portfolio: Portfolio) => {
    const filteredTransactions = filterTransactions(portfolio.transactions, filter);

    filteredTransactions.forEach((transaction: Transaction) => {
      const month = format(new Date(transaction.created_at), 'MMMM');
      const investment = transaction.amount * transaction.price_per_coin;
      const value = transaction.amount * transaction.cryptocurrency.current_price;
      const pnl = value - investment;

      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.totalInvestment += investment;
        existing.totalValue += value;
        existing.pnl += pnl;
      } else {
        acc.push({
          month,
          totalInvestment: investment,
          totalValue: value,
          pnl: pnl,
        });
      }
    });

    return acc;
  }, []);
};
