// app/dashboard/page.tsx or pages/dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortfolioPieChart, PortfolioBarChart, PnlBarChart } from '@/components/ui/charts/PortfolioCharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolioId');

  useEffect(() => {
    if (!portfolioId) {
      setError('No portfolio selected');
      setLoading(false);
      return;
    }

    async function fetchPortfolio() {
      try {
        const response = await fetch(`/api/portfolio/${portfolioId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [portfolioId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  const { pieData, totalValue } = processPieData(portfolio.transactions);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{portfolio.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{portfolio.description}</p>
          <p className="text-2xl font-bold mt-4">Total Portfolio Value: ${totalValue.toFixed(2)}</p>
        </CardContent>
      </Card>

      <PortfolioPieChart portfolioData={portfolio.transactions} />

      <PortfolioBarChart portfolioData={portfolio.transactions} />

      <PnlBarChart portfolioData={portfolio.transactions} prices={{ bitcoin: 0, ethereum: 0 }} />
    </div>
  );
}
