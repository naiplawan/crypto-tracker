'use client';

import { useEffect, useState } from 'react';
import { PortfolioPieChart, PortfolioBarChart, PnlBarChart } from '@/components/ui/charts/PortfolioCharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Portfolio } from '@/types/interface';

export default function Dashboard() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const portfolioResponse = await fetch('/api/portfolio');
        const portfolioData = await portfolioResponse.json();

        if (portfolioResponse.ok) {
          setPortfolioData(portfolioData);

          const priceResponse = await fetch('/api/crypto-prices');
          const priceData = await priceResponse.json();

          setBtcPrice(priceData.bitcoin?.usd || 0);
          setEthPrice(priceData.ethereum?.usd || 0);
        } else {
          setError('Failed to load portfolio data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const prices = {
    bitcoin: btcPrice || 0,
    ethereum: ethPrice || 0,
  };

  return (
    <div className="space-y-6">
      {/* Cryptocurrency Prices */}
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl">Bitcoin (BTC): ${btcPrice}</p>
          <p className="text-xl">Ethereum (ETH): ${ethPrice}</p>
        </CardContent>
      </Card>

      {/* Portfolio Pie Chart */}
      <PortfolioPieChart portfolioData={portfolioData} />

      {/* Portfolio Bar Chart */}
      <PortfolioBarChart portfolioData={portfolioData} />

      {/* PnL Bar Chart */}
      <PnlBarChart portfolioData={portfolioData} prices={prices} />
    </div>
  );
}
