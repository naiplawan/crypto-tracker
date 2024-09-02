'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Cryptocurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

interface Wallet {
  id: string;
  name: string;
  address: string;
  type: string;
}

interface Transaction {
  id: string;
  cryptocurrency: Cryptocurrency;
  amount: number;
  price_per_coin: number;
  created_at: string;
  wallet: Wallet;
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  transactions: Transaction[];
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolios');
        }
        const data: Portfolio[] = await response.json();
        setPortfolios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  const handleCardClick = (portfolioId: string) => {
    router.push(`/dashboard?portfolioId=${portfolioId}`);
  };

  return (
    <div className="space-y-6">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} onClick={() => handleCardClick(portfolio.id)} className="cursor-pointer hover:bg-muted">
          <CardHeader>
            <CardTitle>{portfolio.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{portfolio.description}</p>
            <div className="space-y-4 mt-4">
              {portfolio.transactions.map((transaction) => (
                <div key={transaction.id} className="border p-4 rounded-lg">
                  <p className="text-lg font-semibold">{transaction.cryptocurrency.name} ({transaction.cryptocurrency.symbol})</p>
                  <p>Amount: {transaction.amount}</p>
                  <p>Price per Coin: ${transaction.price_per_coin.toFixed(2)}</p>
                  <p>Total Value: ${(transaction.amount * transaction.price_per_coin).toFixed(2)}</p>
                  <p>Wallet: {transaction.wallet.name}</p>
                  <p className="text-gray-500 text-sm">Date: {new Date(transaction.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
