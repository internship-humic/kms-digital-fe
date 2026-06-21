import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import GrowthChart from "@/features/parent/growth/components/GrowthChart";
import { MOCK_CHILD_CHART_DATA } from "@/features/parent/growth/data/mockGrowth";
import { getCombinedGrowthData } from "@/features/parent/growth/utils/getChartData";
import { getDashboardMockData } from "@/features/parent/dashboard/data/mockDashboard";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `KMS Digital #${id} | JagaCilik`,
    description: "Pantau metrik pertumbuhan anak sesuai standar WHO",
  };
}

const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return names[0] ? names[0][0].toUpperCase() : "B";
};

export default async function ChildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const childrenList = await getDashboardMockData();
  const child = childrenList.find((item) => item.id === Number(id));

  if (!child) {
    notFound();
  }

  const preCalculatedChartData = getCombinedGrowthData(
    child.gender === "Laki-laki" ? "Laki-laki" : "Perempuan",
    MOCK_CHILD_CHART_DATA,
  );

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background sticky top-0 z-20 relative">
        <Link
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </Link>
        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          KMS Digital
        </h1>
      </div>

      <div className="flex-1 px-6 pb-32 pt-2 flex flex-col items-center gap-5 overflow-y-auto">
        <div className="w-full min-h-[98px] bg-white rounded-[12px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-4 flex items-center gap-4 relative shrink-0">
          <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-primary-light/80 bg-primary-light/60 shadow-sm">
            <span className="text-2xl font-bold text-btn-primary tracking-widest select-none">
              {getInitials(child.name)}
            </span>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-medium leading-[24px] text-text-main">
                {child.name}
              </h2>
              <div className="bg-status-normal text-white px-2.5 py-1 rounded-full flex items-center justify-center shrink-0 ml-2">
                <span className="text-xs font-medium tracking-wide">
                  Normal
                </span>
              </div>
            </div>
            <p className="text-sm font-regular text-icon-muted mt-0.5">
              {child.gender} &bull; {child.age}
            </p>
          </div>
        </div>

        <GrowthChart
          data={MOCK_CHILD_CHART_DATA}
          preCalculatedChartData={preCalculatedChartData}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-6 bg-gradient-to-t from-background via-background/90 to-transparent pb-8 pt-12 pointer-events-none z-30">
        <Button size="xl" className="w-full gap-2 mx-auto pointer-events-auto">
          <Download size={20} strokeWidth={2.5} />
          Unduh Laporan (PDF)
        </Button>
      </div>
    </div>
  );
}
