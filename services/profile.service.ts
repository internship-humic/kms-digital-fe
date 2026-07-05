import { fetchWithAuth } from "@/lib/fetcher";
import type { ProfileData } from "@/features/parent/profile/types";

export const getProfile = async (): Promise<ProfileData | null> => {
  try {
    const data = await fetchWithAuth("/auth/me");
    
    // API responses might nest the profile inside 'user' or return it directly
    const user = data.user || data;

    return {
      fullName: user.name || "Orang Tua",
      email: user.email || "-",
      phone: user.phone_number || "-",
      posyandu: user.clinic?.name || "Posyandu Belum Diatur",
      posyanduId: user.clinic?.id || "",
      address: user.address || "-",
      avatar: "https://i.pravatar.cc/150?img=1", // diabaikan menggunakan inisial
      isVerified: true,
    };
  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    return null;
  }
};
