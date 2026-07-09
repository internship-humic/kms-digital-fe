"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/fetcher";

export async function createClinicAction(payload: any) {
  try {
    const response = await fetchWithAuth("/clinic/", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin/resources");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menambahkan posyandu.",
    };
  }
}

export async function updateClinicAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/clinic/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin/resources");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal mengubah posyandu.",
    };
  }
}

export async function deleteClinicAction(id: string) {
  try {
    const response = await fetchWithAuth(`/clinic/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/admin/resources");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menghapus posyandu.",
    };
  }
}
