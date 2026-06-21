import { fetchWithAuth } from "@/lib/fetcher";
import type { DashboardChildData } from "@/features/parent/dashboard/types";
import type { DashboardKaderData } from "@/features/kader/dashboard/types";

export const getParentDashboard = async (): Promise<DashboardChildData[]> => {
  try {
    const data = await fetchWithAuth("/dashboard/parent");
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dashboard parent:", error);
    return [];
  }
};

export const getKaderDashboard =
  async (): Promise<DashboardKaderData | null> => {
    try {
      const data = await fetchWithAuth("/dashboard/kader");
      return data;
    } catch (error) {
      console.error("Gagal mengambil data dashboard kader:", error);
      return null;
    }
  };

export const getAdminDashboard = async () => {
  try {
    const data = await fetchWithAuth("/dashboard/admin");
    return data;
  } catch (error) {
    console.error("Gagal mengambil data dashboard admin:", error);
    return null;
  }
};
