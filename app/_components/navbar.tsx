"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-green-700 shadow-md sticky w-full top-0 left-0 z-10">
      
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="w-15 h-18" />
        <span className="text-xl font-bold text-white px-2">Farmers</span>
      </div>

      <div className="bg-white flex items-center gap-10 shadow-lg rounded-full">
        <Link href="/" className="text-black px-5 py-3 bg-green-200 hover:bg-green-300 rounded-full">
          Home
        </Link>

        <Link href="#" className="text-black px-5 py-3 hover:bg-green-200 rounded-full">
          Contact
        </Link>

        <Link href="#" className="text-black px-5 py-3 hover:bg-green-200 rounded-full">
          About us
        </Link>

        <Link href="/register" className="text-black px-5 py-3 hover:bg-green-200 rounded-full">
          Sign In
        </Link>

        <Link href="/login" className="text-black px-5 py-3 hover:bg-green-200 rounded-full">
          Log In
        </Link>
      </div>
    </nav>
  );
}
