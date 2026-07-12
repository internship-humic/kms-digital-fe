import DashboardKaderFeed from "@/features/kader/dashboard/components/DashboardKaderFeed";
import { getKaderDashboard } from "@/services/dashboard.service";

export const metadata = {
  title: "Dashboard Kader | JagaCilik",
  description:
    "Halaman ringkasan pemantauan tumbuh kembang Posyandu JagaCilik.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function KaderDashboardPage() {
  const dashboardData = await getKaderDashboard();

  if (!dashboardData) {
    return (
      <div className="p-8 text-center text-danger">
        Gagal memuat data dashboard.
      </div>
    );
  }

  return <DashboardKaderFeed data={dashboardData} />;
}
