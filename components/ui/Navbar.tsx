// NavBar.tsx
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DarkModeToggle }from '@/components/ui/DarkModeToggle';

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="bg-blue-600 dark:bg-blue-700 text-white py-4 px-5 mb-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-x-4">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Crypto Dashboard</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
          <Link href="/transactions" className="hover:text-gray-300">Transactions</Link>
          <Link href="/alerts" className="hover:text-gray-300">Alerts</Link>
          <Link href="/settings" className="hover:text-gray-300">Settings</Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <DarkModeToggle />
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
