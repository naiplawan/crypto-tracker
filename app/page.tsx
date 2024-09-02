'use client';

import Login from "@/components/ui/Login"; // Adjust the import path based on where your Login component is located.
import Image from 'next/image';

export default function Home() {
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
        <Login />
      </div>
    </main>
  );
}
