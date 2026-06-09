import DetailBalitaFeed from "@/features/kader/balita/components/DetailBalitaFeed";
import { getDetailBalitaMockData } from "@/features/kader/balita/data/mockDetailBalita";

export const metadata = {
  title: "Detail Data Balita | JagaCilik",
  description: "Rincian profil dan pengukuran pertumbuhan balita",
};

export default async function DetailBalitaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDetailBalitaMockData(id);

  return <DetailBalitaFeed data={data} />;
}
