"use server";

import { fetchWithAuth } from "@/lib/fetcher";

export const createMeasurementClient = async (payload: {
  children_id: string;
  clinic_id: string;
  measurement_date: string;
  body_weight: number;
  body_height: number;
  head_circumference?: number | null;
  description?: string;
}) => {
  try {
    const response = await fetchWithAuth("/measurement", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Gagal menambah data pengukuran rutin.");
  }
};
