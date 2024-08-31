import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Crypto Dashboard",
  description: "Track your cryptocurrency portfolio effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-blue-600 dark:bg-blue-700 text-white py-4 px-5 mb-10">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-3xl font-bold">My Crypto Dashboard</h1>
              <DarkModeToggle />
            </div>
          </header>
          <main className="container mx-auto py-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {children}
          </main>
          <footer className="bg-gray-800 dark:bg-gray-900 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} My Crypto Dashboard. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
