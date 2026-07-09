import { fetchWithAuth } from "@/lib/fetcher";
import type { DashboardChildData } from "@/features/parent/dashboard/types";
import type { DashboardKaderData } from "@/features/kader/dashboard/types";

export const getParentDashboard = async (): Promise<DashboardChildData[]> => {
  try {
    const data = await fetchWithAuth("/dashboard/parent");
    return data;
  } catch (error: any) {
    if (error.message !== "NO_TOKEN") {
      console.error("Gagal mengambil data dashboard parent:", error.message);
    }
    return [];
  }
};

export const getKaderDashboard =
  async (): Promise<DashboardKaderData | null> => {
    try {
      const data = await fetchWithAuth("/dashboard/cadre");
      return data;
    } catch (error: any) {
      if (error.message !== "NO_TOKEN") {
        console.error("Gagal mengambil data dashboard kader:", error.message);
      }
      return null;
    }
  };

export const getAdminDashboard = async () => {
  try {
    const data = await fetchWithAuth("/dashboard/admin");
    return data;
  } catch (error: any) {
    if (error.message !== "NO_TOKEN") {
      console.error("Gagal mengambil data dashboard admin:", error.message);
    }
    return null;
  }
};
