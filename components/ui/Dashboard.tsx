// components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Portfolio {
  id: string;
  name: string;
  description: string;
  transactions: Transaction[];
  user: {
    username: string;
    email: string;
  };
}

interface Transaction {
  id: string;
  cryptocurrency: {
    name: string;
    symbol: string;
    current_price: number;
  };
  wallet: {
    name: string;
    address: string;
    type: string;
  };
  amount: number;
  price_per_coin: number;
  total_value: number;
}

export default function Dashboard() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();

        if (response.ok) {
          setPortfolios(data);
        } else {
          setError(data.error || 'Failed to load data. Please try again later.');
        }
      } catch (error) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <header className="bg-white dark:bg-gray-800 shadow mb-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Crypto Portfolio Tracker
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Loading your portfolio...
              </p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            portfolios.map((portfolio) => (
              <Card
                key={portfolio.id}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-4"
              >
                <CardHeader>
                  <CardTitle>
                    {portfolio.name} ({portfolio.user.username})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {portfolio.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center py-2"
                    >
                      <div>
                        <p className="text-lg font-medium">
                          {transaction.cryptocurrency.name} (
                          {transaction.cryptocurrency.symbol})
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.wallet.name} ({transaction.wallet.type})
                        </p>
                      </div>
                      <div>
                        <p className="text-lg">
                          {transaction.amount}{' '}
                          {transaction.cryptocurrency.symbol.toUpperCase()} at $
                          {transaction.price_per_coin.toFixed(2)} each
                        </p>
                        <p className="text-sm">
                          Total: ${(transaction.total_value).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
