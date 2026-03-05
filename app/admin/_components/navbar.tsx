"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export default function AdminNavbar() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <header className="bg-[var(--card-bg)] shadow px-6 py-4 flex justify-between items-center border-b border-[var(--border)]">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">Welcome to Admin Panel</h1>
      
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Logout Button */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-[var(--error)] hover:bg-[var(--error)]/80 text-white rounded-lg transition"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}
