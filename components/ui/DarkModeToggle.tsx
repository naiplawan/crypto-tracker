import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!theme) setTheme('light');
  }, [theme, setTheme]);

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform ${
          isDark ? 'transform translate-x-8 bg-yellow-400' : 'bg-gray-400'
        }`}
      ></span>
    </button>
  );
}
