// components/ui/NavBar.tsx
'use client';

import Link from 'next/link';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import AvatarDropdown from '@/components/ui/AvatarDropdown';

export default function NavBar() {
  return (
    <nav className="bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground py-4 px-5 mb-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Crypto Dashboard</h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <DarkModeToggle />
          <AvatarDropdown />
        </div>
      </div>
    </nav>
  );
}
