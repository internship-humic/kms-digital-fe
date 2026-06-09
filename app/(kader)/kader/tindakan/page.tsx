import TindakanFeed from "@/features/kader/tindakan/components/TindakanFeed";

export const metadata = {
  title: "Tindakan | JagaCilik",
  description: "Daftar balita yang memerlukan tindakan lanjutan.",
};

export default function TindakanPage() {
  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-28">
      <TindakanFeed />
    </div>
  );
}
