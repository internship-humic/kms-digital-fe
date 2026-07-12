import BalitaFeed from "@/features/kader/balita/components/BalitaFeed";
import { getChildrens } from "@/services/children.service";
import { getProfile } from "@/services/auth.service";

export const metadata = {
  title: "Data Balita | JagaCilik",
  description: "Kelola dan pantau seluruh data tumbuh kembang balita.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DataBalitaPage() {
  const profile = await getProfile<any>();
  const clinicId = profile?.user?.clinic_id || "";

  const dataBalita = await getChildrens(undefined, 1, 50, clinicId);

  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto">
      <div className="flex items-center justify-center px-6 pt-10 pb-5 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <h1 className="text-[20px] font-bold text-btn-primary text-center">
          Data Balita
        </h1>
      </div>

      <BalitaFeed initialData={dataBalita} clinicId={clinicId} />
    </div>
  );
}
