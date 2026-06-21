import type { Metadata } from "next";
import Sidebar from "@/features/admin/layout/Sidebar";
import AdminTopbar from "@/features/admin/layout/AdminTopbar";

export const metadata: Metadata = {
  title: "Admin Portal | JagaCilik",
  description: "Portal Manajemen Admin Posyandu",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-background font-sans text-text-main overflow-hidden !max-w-none !mx-0">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
