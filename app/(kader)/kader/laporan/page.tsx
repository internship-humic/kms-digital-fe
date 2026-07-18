import LaporanFeed from "@/features/kader/laporan/components/LaporanFeed";
import { getChildrens } from "@/services/children.service";
import { getProfile } from "@/services/auth.service";

export const metadata = {
  title: "Laporan | JagaCilik",
  description: "Kelola dan ekspor laporan kesehatan balita.",
};

export default async function LaporanPage() {
  const profile = await getProfile<any>();
  const clinicId = profile?.user?.clinic_id || "";
  const childrenData = await getChildrens(undefined, 1, 50, clinicId);

  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-y-auto pb-28">
      <LaporanFeed
        childrenData={childrenData || []}
        clinicId={profile?.user?.clinic?.id || ""}
      />
    </div>
  );
}
