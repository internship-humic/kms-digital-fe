import DetailTindakanFeed from "@/features/kader/tindakan/components/DetailTindakanFeed";
import {
  getRiskyChildren,
  getChildIntervention,
} from "@/services/children.service";
import { getProfile } from "@/services/auth.service";
import { notFound } from "next/navigation";

interface RiskyChildrenResponse {
  data?: {
    items: any[];
    total_case?: number;
    need_referral?: number;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Detail Tindakan | JagaCilik`,
    description: "Detail kasus dan instruksi tindakan kader.",
  };
}

export default async function DetailTindakanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await getProfile<any>();
  const clinicId = profile?.user?.clinic_id || "";

  const riskyData = (await getRiskyChildren(
    1,
    100,
    "",
    clinicId,
  )) as RiskyChildrenResponse;

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
