import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import SunIcon from "/icons/sun.svg";
import MoonIcon from "/icons/moon.svg";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!theme) setTheme("light");
  }, [theme, setTheme]);

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={handleToggle}
      className="flex items-center justify-between w-16 h-8 p-1 bg-gray-200 rounded-full dark:bg-gray-800"
    >
      <img
        src={SunIcon.src}
        alt="Light Mode"
        className={`w-6 h-6 transition-transform ${isDark ? "transform translate-x-full" : ""}`}
      />
      <img
        src={MoonIcon.src}
        alt="Dark Mode"
        className={`w-6 h-6 transition-transform ${isDark ? "" : "transform translate-x-full"}`}
      />
    </Toggle>
  );
}
