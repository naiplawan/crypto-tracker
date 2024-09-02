// types/interface.ts

export interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

export interface Wallet {
  id: string;
  name: string;
  address: string;
  type: string; // e.g., 'hot', 'cold'
}

export interface Transaction {
  id: string;
  cryptocurrency: Cryptocurrency;
  amount: number;
  price_per_coin: number;
  wallet: Wallet;
  created_at: string; // ISO 8601 date string
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  transactions: Transaction[];
}

export interface PieData {
  name: string;
  value: number;
}

export interface PnlData {
  month: string;
  totalInvestment: number;
  totalValue: number;
  pnl: number;
}

export interface PriceData {
  bitcoin: { usd: number };
  ethereum: { usd: number };
}

// Additional types used in the utility functions
export interface BarChartData {
  month: string;
  [key: string]: {
    amount: number;
    investment: number;
  };
}

// Optional: For filtering and sorting data
export type FilterOption = 'day' | 'week' | 'month' | 'all';
