"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/fetcher";

export async function createMeasurementAction(payload: any) {
  try {
    const response = await fetchWithAuth("/measurement", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/kader/balita/[id]", "page");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menambah data pengukuran rutin.",
    };
  }
}

export async function updateMeasurementAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/measurement/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    revalidatePath("/kader/balita/[id]", "page");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal mengubah data pengukuran rutin.",
    };
  }
}

export async function deleteMeasurementAction(id: string) {
  try {
    const response = await fetchWithAuth(`/measurement/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/kader/balita/[id]", "page");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menghapus data pengukuran rutin.",
    };
  }
}
