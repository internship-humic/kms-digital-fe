import AdminDashboardFeed from "@/features/admin/dashboard/components/AdminDashboardFeed";
import { getAdminDashboard } from "@/services/dashboard.service";

export const metadata = {
  title: "Dashboard Admin | JagaCilik",
  description: "Portal Administrasi JagaCilik",
};

export default async function AdminDashboardPage() {
  const adminData = await getAdminDashboard();

  return <AdminDashboardFeed initialData={adminData} />;
}
