import DetailTindakanFeed from "@/features/kader/tindakan/components/DetailTindakanFeed";
import {
  getRiskyChildren,
  getChildIntervention,
} from "@/services/children.service";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Detail Tindakan | JagaCilik",
  description: "Detail kasus dan instruksi tindakan kader.",
};

export default async function DetailTindakanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const riskyData = await getRiskyChildren(1, 100);
  const child = riskyData?.data?.items?.find((item: any) => item.id === id);

  if (!child) {
    notFound();
  }

  const intervention = await getChildIntervention(id);

  return (
    <div className="flex-1 bg-white flex flex-col relative overflow-y-auto">
      <DetailTindakanFeed child={child} intervention={intervention} />
    </div>
  );
}
