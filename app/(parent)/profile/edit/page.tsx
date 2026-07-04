import PersonalPage from "@/features/parent/profile/pages/PersonalPage";
import { getProfile } from "@/services/profile.service";
import { getProfileMockData } from "@/features/parent/profile/data/mockProfile";

export const metadata = {
  title: "Edit Profil | JagaCilik",
  description: "Perbarui informasi pribadi akun Anda.",
};

export default async function EditProfilePage() {
  let profileData = await getProfile();

  // FALLBACK: Gunakan data dummy jika endpoint backend belum siap
  if (!profileData) {
    profileData = await getProfileMockData();
  }

  const formDefaultValues = {
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
    posyanduId: "posyandu-2",
  };

  return <PersonalPage profile={formDefaultValues} />;
}
