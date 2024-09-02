'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


function TransactionSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hardcoded userId for testing
  const userId = 1;

  useEffect(() => {
    if (!userId) {
      setError('User ID is required');
      setLoading(false);
      return;
    }

    async function fetchSummary() {
      try {
        const response = await fetch(`/api/transactions/summary?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error('Failed to fetch transaction summary:', err);
        setError('Failed to fetch transaction summary');
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [userId]);

  if (loading) {
    return (
      <Card className="w-full p-4">
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-6 w-1/4" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!summary) {
    return <p>No data available.</p>;
  }

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <strong>Total Spent:</strong> ${summary.totalSpent.toFixed(2)}
        </div>
        <div className="mb-2">
          <strong>Total Received:</strong> ${summary.totalReceived.toFixed(2)}
        </div>
        <div className="mb-2">
          <strong>Net Value:</strong> ${summary.netValue.toFixed(2)}
        </div>
        <div className="mb-2">
          <strong>Total Fees:</strong> ${summary.totalFees.toFixed(2)}
        </div>
        <div>
          <strong>Transaction Count:</strong> {summary.transactionCount}
        </div>
      </CardContent>
    </Card>
  );
}

export default TransactionSummary;
