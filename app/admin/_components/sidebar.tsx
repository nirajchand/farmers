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
        ? "bg-white text-green-800 shadow-sm"
        : "text-green-100 hover:bg-green-700 hover:text-white"
    );

  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col shadow-lg">
      
      {/* Header / Branding */}
      <div className="p-6 border-b border-green-700">
        <h1 className="text-xl font-semibold tracking-wide">
          Admin Panel
        </h1>
        <p className="text-xs text-green-200 mt-1">
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
      <div className="p-4 border-t border-green-700">
        <div className="flex items-center justify-between bg-green-700/40 rounded-lg px-3 py-2">
          <span className="text-sm font-medium"> {user?.fullName || "Admin"}</span>

          <button className="flex items-center gap-1 text-sm bg-white text-green-800 px-3 py-1.5 rounded-md hover:bg-gray-300 hover:cursor-pointer transition"
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
