"use server";

import { fetchWithAuth } from "@/lib/fetcher";
import type { ProfileData } from "@/features/parent/profile/types";

export const getProfile = async (): Promise<ProfileData | null> => {
  try {
    const data = await fetchWithAuth<any>("/auth/me");

    const user = data.user || data;

    return {
      fullName: user.name || "Orang Tua",
      email: user.email || "-",
      phone: user.phone_number || "-",
      posyandu: user.clinic?.name || "Posyandu Belum Diatur",
      posyanduId: user.clinic?.id || "",
      address: user.address || "-",
      avatar: "https://i.pravatar.cc/150?img=1",
      isVerified: true,
    };
  } catch (error: any) {
    if (error.message !== "NO_TOKEN") {
      console.error("Gagal mengambil data profil:", error.message);
    }
    return null;
  }
};
