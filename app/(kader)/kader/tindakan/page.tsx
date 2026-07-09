import TindakanFeed from "@/features/kader/tindakan/components/TindakanFeed";
import { getRiskyChildren } from "@/services/children.service";

export const metadata = {
  title: "Tindakan | JagaCilik",
  description: "Daftar balita yang memerlukan tindakan lanjutan.",
};

export default async function TindakanPage() {
  const riskyData = await getRiskyChildren(1, 50);

  return (  
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-28">
      <TindakanFeed
        initialData={
          riskyData?.data || { items: [], total_case: 0, need_referral: 0 }
        }
      />
    </div>
  );
}
