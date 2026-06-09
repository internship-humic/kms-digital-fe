import ProfileKaderFeed from "@/features/kader/profile/components/ProfileKaderFeed";

export const metadata = {
  title: "Profil Kader | JagaCilik",
  description: "Kelola profil dan akun kader posyandu.",
};

export default function KaderProfilePage() {
  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-28">
      <ProfileKaderFeed />
    </div>
  );
}
