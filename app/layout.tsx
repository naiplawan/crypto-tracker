import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavBar from "@/components/ui/NavBar";
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
          <header>
            <NavBar /> {/* Include the NavBar component */}
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
