import AdminSidebar from "@/features/admin/layout/components/AdminSidebar";
import AdminTopbar from "@/features/admin/layout/components/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex">
      {/* Sidebar - Fixed Width */}
      <AdminSidebar />
      
      {/* Main Content - Takes remaining space */}
      <div className="flex-1 flex flex-col ml-[280px]">
        <AdminTopbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
