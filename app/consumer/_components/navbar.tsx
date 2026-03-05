"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

export default function Navbar() {
  const { logout } = useAuth();
  const { cartCount } = useCart();

  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/consumer?search=${search}`);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-[var(--card-bg)]/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25 gap-6">
          {/* Logo */}
          <Link href="/consumer" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/logo.png"
              alt="Farmers Logo"
              className="w-12 h-14 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-green-500 to-[var(--primary)] bg-clip-text text-transparent">
              Farmers
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center bg-[var(--secondary)] rounded-xl px-4 py-2 w-full max-w-2xl hover:bg-[var(--secondary)] focus-within:ring-2 focus-within:ring-[var(--primary)] transition-all duration-200">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-[var(--secondary)] rounded-xl px-4 py-2 w-full max-w-2xl "
              >
                <Search className="w-5 h-5 text-[var(--primary)] mr-2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fresh vegetables, fruits..."
                  className="bg-transparent outline-none text-[var(--foreground)] placeholder-[var(--secondary-foreground)] w-full"
                />
              </form>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link href="/consumer/cart" className="relative p-2.5 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-[var(--foreground)]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold bg-[var(--primary)] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="hidden md:block relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-[var(--secondary)] transition-all duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition-colors">
                  Account
                </span>
              </button>

              <div className="absolute right-0 mt-1 w-48 bg-[var(--card-bg)] rounded-xl shadow-xl border border-[var(--border)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link
                  href="/consumer/profile"
                  className="block px-4 py-3 text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--primary)] rounded-t-xl"
                >
                  My Profile
                </Link>

                <Link
                  href="/consumer/orders"
                  className="block px-4 py-3 text-[var(--foreground)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
                >
                  My Orders
                </Link>

                <div className="border-t border-[var(--border)]"></div>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-[var(--error)] hover:bg-[var(--secondary)] rounded-b-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
