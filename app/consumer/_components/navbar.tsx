"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [cartCount] = useState(3);
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
        <div className="flex items-center justify-between h-25 gap-6">
          {/* Logo */}
          <Link href="/consumer" className="flex items-center gap-3 shrink-0">
            <img
              src="/images/logo.png"
              alt="Farmers Logo"
              className="w-12 h-14 object-contain"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
              Farmers
            </span>
          </Link>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center bg-green-50 rounded-xl px-4 py-2 w-full max-w-2xl hover:bg-green-100 focus-within:ring-2 focus-within:ring-green-500 transition-all duration-200">
              <Search className="w-5 h-10 text-green-600 mr-2" />

              <input
                type="text"
                placeholder="Search fresh vegetables, fruits..."
                className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl hover:bg-green-50 transition-all duration-200 group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="hidden md:block relative group">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-green-50 transition-all duration-200">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>

                <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                  Account
                </span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-green-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/consumer/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-t-xl"
                >
                  My Profile
                </Link>

                <Link
                  href="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  My Orders
                </Link>

                <div className="border-t border-green-100"></div>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-b-xl"
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
