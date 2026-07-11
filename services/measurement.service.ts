"use server";

import { fetchWithAuth } from "@/lib/fetcher";

export const getMeasurementGraph = async (childrenId: string) => {
  try {
    const response = await fetchWithAuth(`/measurement/graph/${childrenId}`);
    return response;
  } catch (error) {
    console.error("Gagal mengambil data grafik pengukuran:", error);
    return null;
  }
};

export const getMeasurementsByChild = async (childrenId: string) => {
  try {
    const response = await fetchWithAuth(`/measurement?childrenId=${childrenId}&limit=1000`);
    return response;
  } catch (error) {
    console.error("Gagal mengambil data pengukuran anak:", error);
    return null;
  }
};
