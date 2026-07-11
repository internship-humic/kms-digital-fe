import TambahBalitaForm from "@/features/kader/balita/components/FormTambahBalita";
import { getProfile } from "@/services/auth.service";

export const metadata = {
  title: "Tambah Data Balita | JagaCilik",
  description: "Tambahkan data balita baru ke dalam sistem Posyandu.",
};

export default async function TambahBalitaPage() {
  const profile = await getProfile<any>();
  console.log("PROFILE IN TAMBAH BALITA PAGE:", profile);
  const kaderClinicId = profile?.user?.clinic_id || "";

  return <TambahBalitaForm clinicId={kaderClinicId} />;
}
