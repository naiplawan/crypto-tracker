// components/ui/LogoutButton.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="w-full text-left bg-transparent px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded">
      Logout
    </button>
  );
}
