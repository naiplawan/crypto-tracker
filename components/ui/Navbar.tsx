// NavBar.tsx
'use client';

import Link from 'next/link';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function NavBar() {
  return (
    <nav className="bg-blue-600 dark:bg-blue-700 text-white py-4 px-5 mb-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-x-4">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Crypto Dashboard</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/portfolio" className="hover:text-gray-300">
            Portfolio
          </Link>
          <Link href="/transactions/new" className="hover:text-gray-300">
            Transactions
          </Link>
          <Link href="/alerts" className="hover:text-gray-300">
            Alerts
          </Link>
          <Link href="/settings" className="hover:text-gray-300">
            Settings
          </Link>
          <Link href="/signup" className="hover:text-gray-300">
            SignUp
          </Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
