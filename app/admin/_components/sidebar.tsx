"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Users, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const pathName = usePathname();
  const {logout,user} = useAuth()

  const linkClass = (href: string) =>
    clsx(
      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
      pathName === href
        ? "bg-[var(--background)] text-[var(--primary)] shadow-sm"
        : "text-[var(--secondary-foreground)] hover:bg-[var(--card-bg)] hover:text-[var(--primary)]"
    );

  return (
    <aside className="w-64 bg-[var(--primary)] text-white flex flex-col shadow-lg">
      
      {/* Header / Branding */}
      <div className="p-6 border-b border-[var(--primary-dark)]">
        <h1 className="text-xl font-semibold tracking-wide">
          Admin Panel
        </h1>
        <p className="text-xs text-white/70 mt-1">
          Management Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        <Link href="/admin/users" className={linkClass("/admin/users")}>
          <Users size={18} />
          Users
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--primary-dark)]">
        <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
          <span className="text-sm font-medium"> {user?.fullName || "Admin"}</span>

          <button className="flex items-center gap-1 text-sm bg-white text-[var(--primary)] px-3 py-1.5 rounded-md hover:bg-gray-200 hover:cursor-pointer transition"
           onClick={() =>{
            logout();
           }}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

    </aside>
  );
}
