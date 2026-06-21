import { fetchWithAuth } from "@/lib/fetcher";
import type { ProfileData } from "@/features/parent/profile/types";

export const getProfile = async (): Promise<ProfileData | null> => {
  try {
    const data = await fetchWithAuth("/parent/me");

    return {
      fullName: data.name || "Orang Tua",
      email: data.email || "-",
      phone: data.phone_number || "-",
      posyandu: data.clinic?.name || "Posyandu Belum Diatur",
      address: data.address || "-",
      avatar: "https://i.pravatar.cc/150?img=1", // diabaikan menggunakan inisial
      isVerified: true,
    };
  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    return null;
  }
};
