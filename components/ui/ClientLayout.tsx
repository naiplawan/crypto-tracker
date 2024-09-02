"use client";

import React from "react";
import NavBar from "@/components/ui/Navbar"; // Adjust the path if necessary

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
