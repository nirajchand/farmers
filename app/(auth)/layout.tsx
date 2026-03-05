"use client";

import Navbar from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </section>
  );
}
