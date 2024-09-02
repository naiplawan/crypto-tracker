'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      console.log('Logged in successfully with User ID:', data.userId);
      router.push('/portfolio');
    } catch (err) {
      setError('Failed to login');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground dark:text-gray-100">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-input rounded dark:bg-muted dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground dark:text-gray-100">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-input rounded dark:bg-muted dark:text-secondary-foreground"
        />
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-secondary-foreground dark:hover:bg-primary"
      >
        Login
      </button>
      <div className="text-center mt-4">
        <Link href="/signup" className="hover:text-secondary-foreground text-primary dark:text-gray-100">
          Don't have an account? Sign Up
        </Link>
      </div>
    </form>
  );
}
