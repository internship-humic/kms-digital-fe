"use server";

import { fetchWithAuth } from "@/lib/fetcher";
import type { DashboardChildData } from "@/features/parent/dashboard/types";
import type { DashboardKaderData } from "@/features/kader/dashboard/types";

export const getParentDashboard = async (): Promise<DashboardChildData[]> => {
  try {
    const data = await fetchWithAuth("/dashboard/parent");
    
    return data.map((child: any) => {
      const birthDate = new Date(child.birth_date);
      const today = new Date();
      let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
      months -= birthDate.getMonth();
      months += today.getMonth();
      
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      let ageStr = "";
      if (years > 0) ageStr += `${years} Tahun `;
      if (remainingMonths > 0 || years === 0) ageStr += `${remainingMonths} Bulan`;

      const latestMeasurement = child.measurements?.[0];

      return {
        id: child.id,
        name: child.name,
        gender: child.gender === "MALE" || child.gender === "Laki-laki" ? "Laki-laki" : "Perempuan",
        age: ageStr.trim(),
        weight: latestMeasurement?.body_weight ? `${latestMeasurement.body_weight} kg` : "-",
        height: latestMeasurement?.body_height ? `${latestMeasurement.body_height} cm` : "-",
        status: child.status || "NORMAL",
      };
    });
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
