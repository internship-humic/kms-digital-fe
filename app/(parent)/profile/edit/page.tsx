import { redirect } from "next/navigation";
import PersonalPage from "@/features/parent/profile/pages/PersonalPage";
import { getProfile } from "@/services/profile.service";

export const metadata = {
  title: "Edit Profil | JagaCilik",
  description: "Perbarui informasi pribadi akun Anda.",
};

export default async function EditProfilePage() {
  const profileData = await getProfile();

  if (!profileData) {
    redirect("/login");
  }

  const formDefaultValues = {
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
    posyanduId: profileData.posyanduId || "",
    posyanduName: profileData.posyandu || "",
    desaId: "",
  };

  return <PersonalPage profile={formDefaultValues} />;
}
