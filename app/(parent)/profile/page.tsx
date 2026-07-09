import { redirect } from "next/navigation";
import LogoutButton from "@/features/parent/profile/actions/LogoutButton";
import PersonalInfoSection from "@/features/parent/profile/sections/PersonalInfoSection";
import ProfileCard from "@/features/parent/profile/sections/ProfileCard";
import SecuritySection from "@/features/parent/profile/sections/SecuritySection";
import { getProfile } from "@/services/profile.service";

export const metadata = {
  title: "Profil | JagaCilik",
  description: "Kelola data diri dan preferensi akun Anda.",
};

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col bg-background px-6 pt-10 pb-28">
      <header className="mb-6">
        <h1 className="text-4xl font-bold leading-tight text-text-main">
          Profil Orang Tua
        </h1>
        <p className="mt-1 text-sm text-text-main/70">
          Kelola data diri dan preferensi akun Anda.
        </p>
      </header>

      <ProfileCard
        fullName={profile.fullName}
        email={profile.email}
        isVerified={profile.isVerified}
      />

      <PersonalInfoSection
        fullName={profile.fullName}
        posyandu={profile.posyandu}
        email={profile.email}
        phone={profile.phone}
        address={profile.address}
      />

      <SecuritySection />

      <div className="mt-4">
        <LogoutButton />
      </div>
    </main>
  );
}
