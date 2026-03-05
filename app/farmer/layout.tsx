"use client";
import { ReactNode } from "react";
import FarmerSidebar from "./_components/sidebar";
import FarmerHeader from "./_components/header";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function FarmerLayout({ children }: AdminLayoutProps) {
    return (
    <div className="flex h-screen bg-[var(--secondary)]">
      <FarmerSidebar />
      <div className="flex-1 flex flex-col">
        <FarmerHeader />
        <main className="flex-1 p-6 overflow-auto bg-[var(--background)]">{children}</main>
      </div>
    </div>
    );
}

