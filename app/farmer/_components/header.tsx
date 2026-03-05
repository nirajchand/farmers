"use client";

import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export default function FarmerHeader() {
  const router = useRouter();
  const { logout } = useAuth();
  return (
    <div className="flex items-center justify-end p-4 px-10 bg-[var(--card-bg)] shadow-md rounded-xl gap-3">
      {/* Theme Toggle */}
      <ThemeToggle />

      <button
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[var(--secondary)] transition-all duration-200 hover:cursor-pointer"
        onClick={() => {
          router.push("/farmer/profile");
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>

        <span className="text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition-colors">
          Account
        </span>
      </button>
      <button
        className="ml-4 flex items-center gap-2 px-3 py-1.5 bg-[var(--error)] hover:bg-[var(--error)]/80 text-white rounded-lg transition hover:cursor-pointer"
        onClick={() => {
          logout();
        }}
      >
        <LogOut className="w-4 h-4" />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}
