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
        ? "bg-[var(--primary)] text-white" // Active link
        : "text-[var(--primary)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]",
    );

  return (
    <div className="w-64 h-screen bg-[var(--card-bg)] shadow-lg flex flex-col p-4 border-r border-[var(--border)]">
      {/* Logo */}
      <Link href="/farmer" className="flex items-center gap-3 mb-6 shrink-0">
        <img
          src="/images/logo.png"
          alt="Farmers Logo"
          className="w-12 h-14 object-contain"
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-[var(--primary)] via-green-500 to-[var(--primary)] bg-clip-text text-transparent">
          Farmers
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <Link href="/farmer" className={linkClass("/farmer")}>
          My Crops
        </Link>
        <Link href="/farmer/orders" className={linkClass("/farmer/orders")}>
          Orders
        </Link>
      </nav>
    </div>
  );
}
