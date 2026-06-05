import NotifikasiFeed from "@/features/kader/notifikasi/components/NotifikasiFeed";
import { getMockNotifikasi } from "@/features/kader/notifikasi/data/mockNotifikasi";

export const metadata = {
  title: "Notifikasi | JagaCilik",
  description: "Pusat pemberitahuan dan informasi terkini",
};

export default async function NotifikasiPage() {
  const data = await getMockNotifikasi();
  
  return <NotifikasiFeed initialData={data} />;
}
