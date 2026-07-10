import LaporanFeed from "@/features/kader/laporan/components/LaporanFeed";
import { getChildrens } from "@/services/children.service";
import { getProfile } from "@/services/auth.service";

export const metadata = {
  title: "Laporan | JagaCilik",
  description: "Kelola dan ekspor laporan kesehatan balita.",
};

export default async function LaporanPage() {
  const [childrenData, profile] = await Promise.all([
    getChildrens(),
    getProfile<any>()
  ]);

  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-y-auto pb-28">
      <LaporanFeed childrenData={childrenData || []} clinicId={profile?.user?.clinic?.id || ""} />
    </div>
  );
}
