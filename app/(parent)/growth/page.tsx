import Growth from "@/features/parent/growth/components/GrowthTracker";
import { getGrowthMockData } from "@/features/parent/growth/data/mockGrowth";

export const metadata = {
  title: "Tumbuh | JagaCilik",
  description: "Pantau metrik pertumbuhan anak sesuai standar WHO",
};

export default async function GrowthPage() {
  const childrenData = await getGrowthMockData();

  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-6">
      <div className="flex items-center justify-center px-6 pt-10 pb-4 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-border-input/10">
        <h1 className="text-[20px] font-bold text-btn-primary text-center">
          Pertumbuhan
        </h1>
      </div>

      <Growth initialData={childrenData} />
    </div>
  );
}
