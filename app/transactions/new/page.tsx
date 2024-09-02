'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for available cryptocurrencies and wallets
  useEffect(() => {
    const mockCryptos = [
      { name: 'Bitcoin', symbol: 'BTC' },
      { name: 'Ethereum', symbol: 'ETH' },
    ];
    const mockWallets = [
      { name: 'Wallet 1', address: 'address1' },
      { name: 'Wallet 2', address: 'address2' },
    ];

    setAvailableCryptos(mockCryptos);
    setAvailableWallets(mockWallets);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cryptoSymbol || !amount || !pricePerCoin || !walletName) {
      setError('Please fill in all fields.');
      return;
    }

    if (parseFloat(amount) <= 0 || parseFloat(pricePerCoin) <= 0) {
      setError('Amount and Price per coin must be positive numbers.');
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

    setIsSubmitting(true);
    setError('');

    try {
      // Mock API call
      console.log('Submitting transaction:', transactionData);
      // Simulate a successful response
      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/portfolio'); 
      }, 1000);
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsSubmitting(false);
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
              <Select value={cryptoSymbol} onValueChange={setCryptoSymbol}>
                <SelectTrigger id="cryptoSymbol">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {availableCryptos.map((crypto) => (
                    <SelectItem key={crypto.symbol} value={crypto.symbol}>
                      {crypto.name} ({crypto.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="transactionType">Transaction Type</Label>
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger id="transactionType">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
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
              <Select value={walletName} onValueChange={setWalletName}>
                <SelectTrigger id="walletName">
                  <SelectValue placeholder="Select a wallet" />
                </SelectTrigger>
                <SelectContent>
                  {availableWallets.map((wallet) => (
                    <SelectItem key={wallet.address} value={wallet.name}>
                      {wallet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-700 text-white mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Add Transaction'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
