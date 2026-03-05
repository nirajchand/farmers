"use client"

import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import AdminNavbar from "./_components/navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--secondary)]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-6 overflow-auto bg-[var(--background)]">{children}</main>
      </div>
    </div>
  );
}
