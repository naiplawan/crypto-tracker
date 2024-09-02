'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Home() {
  // Dummy user credentials
  const dummyUser = {
    email: 'admin@123',
    password: '123',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation against dummy credentials
    if (email === dummyUser.email && password === dummyUser.password) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid email or password');
      setIsAuthenticated(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="flex justify-center mb-6">
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={120}
            height={30}
            priority
            className="dark:invert"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center justify-between">
            <div className="w-full">
              {isAuthenticated ? (
                <Link href="/dashboard" className="w-full inline-block">
                  <Button className="w-full bg-blue-600 dark:bg-blue-700 text-white">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-700 text-white">
                  Login
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
