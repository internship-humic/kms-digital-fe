import DetailBalitaFeed from "@/features/kader/balita/components/DetailBalitaFeed";
import { getDetailBalitaMockData } from "@/features/kader/balita/data/mockDetailBalita";
import { calculateDetailBalitaMetrics } from "@/features/kader/balita/utils/calculateMetrics";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Detail Balita #${id} | JagaCilik`,
    description: "Rincian profil dan pengukuran pertumbuhan balita",
  };
}

export default async function DetailBalitaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDetailBalitaMockData(id);

  const metrics = calculateDetailBalitaMetrics(data);

  return <DetailBalitaFeed data={data} metrics={metrics} />;
}
