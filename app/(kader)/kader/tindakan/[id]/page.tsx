import DetailTindakanFeed from "@/features/kader/tindakan/components/DetailTindakanFeed";

export const metadata = {
  title: "Detail Tindakan | JagaCilik",
  description: "Detail kasus dan instruksi tindakan kader.",
};

export default function DetailTindakanPage() {
  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-y-auto">
      <DetailTindakanFeed />
    </div>
  );
}
