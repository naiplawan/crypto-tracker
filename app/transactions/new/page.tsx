'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewTransaction() {
  const router = useRouter();

  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [transactionType, setTransactionType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [pricePerCoin, setPricePerCoin] = useState('');
  const [walletName, setWalletName] = useState('');
  const [availableCryptos, setAvailableCryptos] = useState([]);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [error, setError] = useState('');

  // Fetch available cryptocurrencies and wallets on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [cryptoRes, walletRes] = await Promise.all([
          fetch('/api/cryptocurrencies'),
          fetch('/api/wallets')
        ]);

        if (cryptoRes.ok) {
          const cryptos = await cryptoRes.json();
          setAvailableCryptos(cryptos);
        } else {
          setError('Failed to fetch cryptocurrencies.');
        }

        if (walletRes.ok) {
          const wallets = await walletRes.json();
          setAvailableWallets(wallets);
        } else {
          setError('Failed to fetch wallets.');
        }
      } catch (err) {
        setError('An error occurred while fetching options.');
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cryptoSymbol || !amount || !pricePerCoin || !walletName) {
      setError('Please fill in all fields.');
      return;
    }

    const totalValue = parseFloat(amount) * parseFloat(pricePerCoin);

    const transactionData = {
      cryptoSymbol,
      transactionType,
      amount: parseFloat(amount),
      pricePerCoin: parseFloat(pricePerCoin),
      totalValue,
      walletName,
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        router.push('/dashboard'); // Redirect to the dashboard after successful submission
      } else {
        setError('Failed to submit the transaction. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Add a New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <Label htmlFor="cryptoSymbol">Cryptocurrency Symbol</Label>
              <Select
                id="cryptoSymbol"
                value={cryptoSymbol}
                onValueChange={setCryptoSymbol}
                className="mt-1"
              >
                {availableCryptos.map((crypto) => (
                  <SelectItem key={crypto.symbol} value={crypto.symbol}>
                    {crypto.name} ({crypto.symbol})
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select
                id="transactionType"
                value={transactionType}
                onValueChange={setTransactionType}
                className="mt-1"
              >
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pricePerCoin">Price Per Coin</Label>
              <Input
                id="pricePerCoin"
                type="number"
                value={pricePerCoin}
                onChange={(e) => setPricePerCoin(e.target.value)}
                placeholder="Price per coin"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="walletName">Wallet Name</Label>
              <Select
                id="walletName"
                value={walletName}
                onValueChange={setWalletName}
                className="mt-1"
              >
                {availableWallets.map((wallet) => (
                  <SelectItem key={wallet.address} value={wallet.name}>
                    {wallet.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-700 text-white mt-4">
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
