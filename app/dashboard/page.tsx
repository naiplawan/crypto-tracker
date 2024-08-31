'use client';

import { useState, useEffect } from "react";
import { fetchCryptoData, CoinData } from "../api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<CoinData[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      if (data.length > 0) {
        setPortfolio(data);
        calculateTotalValue(data);
      } else {
        setError("Failed to load data. Please try again later.");
      }
      setLoading(false);
    };

    getData();
  }, []);

  const calculateTotalValue = (portfolio: CoinData[]) => {
    const total = portfolio.reduce(
      (acc, coin) => acc + coin.price * coin.quantity,
      0
    );
    setTotalValue(total);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Crypto Portfolio Tracker</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-gray-600">Loading your portfolio...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-red-600">{error}</p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.map((coin) => (
                  <div
                    key={coin.id}
                    className="flex justify-between items-center py-2"
                  >
                    <div>
                      <p className="text-lg font-medium">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </p>
                    </div>
                    <div>
                      <p className="text-lg">
                        ${coin.price.toFixed(2)} x {coin.quantity} = $
                        {(coin.price * coin.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="text-lg font-bold">
                    Total Value: ${totalValue.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
