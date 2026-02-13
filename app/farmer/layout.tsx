import { ReactNode } from "react";
import FarmerSidebar from "./_components/sidebar";
import FarmerHeader from "./_components/header";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function FarmerLayout({ children }: AdminLayoutProps) {
    return (
    <div className="flex h-screen bg-gray-100">
      <FarmerSidebar />
      <div className="flex-1 flex flex-col">
        <FarmerHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
    );
}

