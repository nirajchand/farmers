// app/layout.tsx
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
      </section>
  );
}