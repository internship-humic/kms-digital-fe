import DashboardKaderFeed from "@/features/kader/dashboard/components/DashboardKaderFeed";
import { getKaderDashboardMockData } from "@/features/kader/dashboard/data/mockDashboard";

export const metadata = {
  title: "Dashboard Kader | JagaCilik",
  description:
    "Halaman ringkasan pemantauan tumbuh kembang Posyandu JagaCilik.",
};

export default async function KaderDashboardPage() {
  const dashboardData = await getKaderDashboardMockData();

  return <DashboardKaderFeed data={dashboardData} />;
}
