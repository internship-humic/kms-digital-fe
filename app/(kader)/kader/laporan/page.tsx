import LaporanFeed from "@/features/kader/laporan/components/LaporanFeed";

export const metadata = {
  title: "Laporan | JagaCilik",
  description: "Kelola dan ekspor laporan kesehatan balita.",
};

export default function LaporanPage() {
  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-y-auto pb-28">
      <LaporanFeed />
    </div>
  );
}
