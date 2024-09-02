import { Transaction } from '@prisma/client';

interface TransactionSummary {
  totalSpent: number;
  totalReceived: number;
  netValue: number;
  totalFees: number;
  transactionCount: number;
}

export function calculateTransactionSummary(transactions: Transaction[]): TransactionSummary {
  let totalSpent = 0;
  let totalReceived = 0;
  let totalFees = 0;

  transactions.forEach(transaction => {
    const value = transaction.total_value ?? 0;
    const fee = transaction.fee ?? 0;

    if (transaction.type === 'buy') {
      totalSpent += value + fee;
    } else if (transaction.type === 'sell') {
      totalReceived += value - fee;
    }

    totalFees += fee;
  });

  const netValue = totalReceived - totalSpent;

  return {
    totalSpent,
    totalReceived,
    netValue,
    totalFees,
    transactionCount: transactions.length,
  };
}
