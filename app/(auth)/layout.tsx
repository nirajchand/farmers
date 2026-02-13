import Navbar from "../_components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-green-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </section>
  );
}
