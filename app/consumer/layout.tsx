"use client";
// app/layout.tsx
import Footer from "../_components/footer";
import Navbar from "./_components/navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section>
        <Navbar />
        {children}
        <Footer></Footer>
      </section>
  );
}