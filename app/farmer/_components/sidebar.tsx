"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function FarmerSidebar() {
  const pathName = usePathname();

  const linkClass = (href: string) =>
    clsx(
      "px-4 py-2 rounded-lg transition-colors font-medium",
      href === pathName
        ? "bg-green-600 text-white" // Active link
        : "text-green-700 hover:bg-green-50 hover:text-green-600"
    );

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <Link href="/farmer" className="flex items-center gap-3 mb-6 shrink-0">
        <img
          src="/images/logo.png"
          alt="Farmers Logo"
          className="w-12 h-14 object-contain"
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent">
          Farmers
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <Link href="/farmer" className={linkClass("/farmer")}>
          Dashboard
        </Link>
        <Link href="/farmer/crops" className={linkClass("/farmer/crops")}>
          My Crops
        </Link>
        <Link href="/orders" className={linkClass("/orders")}>
          Orders
        </Link>
        <Link href="/market" className={linkClass("/market")}>
          Market Prices
        </Link>
        <Link href="/notifications" className={linkClass("/notifications")}>
          Notifications
        </Link>
        <Link href="/settings" className={linkClass("/settings")}>
          Settings
        </Link>
      </nav>
    </div>
  );
}
