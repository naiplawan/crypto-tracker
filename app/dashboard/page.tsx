'use client';

import { useEffect, useState } from 'react';
import { PortfolioPieChart, PortfolioBarChart, PnlBarChart } from '@/components/ui/charts/PortfolioCharts';
import { processPieData, processBarChartData, calculatePnl } from '@/utils/portfolioUtils';
import { Portfolio, PriceData, PnlData } from '@/types/interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper function to calculate percentage change
const calculatePercentageChange = (oldPrice: number | null, newPrice: number | null): string => {
  if (oldPrice == null || newPrice == null) return 'N/A';

  const change = newPrice - oldPrice;
  const percentageChange = ((change / oldPrice) * 100).toFixed(2);

  return `${percentageChange}%`;
};

export default function Dashboard() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [prevBtcPrice, setPrevBtcPrice] = useState<number | null>(null);
  const [prevEthPrice, setPrevEthPrice] = useState<number | null>(null);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<string>('month');
  const [showPnl, setShowPnl] = useState<boolean>(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const portfolioResponse = await fetch('/api/portfolio');
        const portfolioData: Portfolio[] = await portfolioResponse.json();

        if (portfolioResponse.ok) {
          setPortfolioData(portfolioData);
          fetchPrices(); // Initial fetch of prices
        } else {
          setError('Failed to load portfolio data.');
        }
      } catch (error) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    const fetchPrices = async () => {
      try {
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const priceData: PriceData = await priceResponse.json();

        setPrevBtcPrice(btcPrice);
        setPrevEthPrice(ethPrice);
        setBtcPrice(priceData.bitcoin.usd);
        setEthPrice(priceData.ethereum.usd);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPortfolioData();

    const intervalId = setInterval(() => {
      fetchPrices();
    }, 60000); // Fetch every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [btcPrice, ethPrice]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setShowPnl(event.target.value !== 'all'); // Example logic to hide PnL chart based on filter
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const { pieData, totalValue } = processPieData(portfolioData, filter);
  const barChartData = processBarChartData(portfolioData, filter);
  const pnlData: PnlData[] = calculatePnl(portfolioData, filter);

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <select value={filter} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="day">Last 24 hours</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="all">All time</option>
        </select>
      </div>

      {/* Cryptocurrency Prices */}
      <Card>
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-xl ${btcPrice && prevBtcPrice && btcPrice > prevBtcPrice ? 'text-green-500' : 'text-red-500'}`}>
            Bitcoin (BTC): ${btcPrice}
            <span className={`text-sm ${btcPrice && prevBtcPrice && btcPrice > prevBtcPrice ? 'text-green-500' : 'text-red-500'}`}>
              ({calculatePercentageChange(prevBtcPrice, btcPrice)})
            </span>
          </p>
          <p className={`text-xl ${ethPrice && prevEthPrice && ethPrice > prevEthPrice ? 'text-green-500' : 'text-red-500'}`}>
            Ethereum (ETH): ${ethPrice}
            <span className={`text-sm ${ethPrice && prevEthPrice && ethPrice > prevEthPrice ? 'text-green-500' : 'text-red-500'}`}>
              ({calculatePercentageChange(prevEthPrice, ethPrice)})
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Total Portfolio Value */}
      <Card>
        <CardHeader>
          <CardTitle>Total Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Portfolio Pie Chart */}
      <PortfolioPieChart portfolioData={portfolioData} />

      {/* Portfolio Bar Chart */}
      <PortfolioBarChart portfolioData={portfolioData} />

      {/* PnL Bar Chart (conditionally render) */}
      {showPnl && <PnlBarChart portfolioData={portfolioData} prices={{ bitcoin: btcPrice || 0, ethereum: ethPrice || 0 }} />}
    </div>
  );
}
