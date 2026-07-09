"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/fetcher";

export async function updateParentAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/parent/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin/parents");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal mengubah data orang tua.",
    };
  }
}

export async function deleteParentAction(id: string) {
  try {
    const response = await fetchWithAuth(`/parent/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/admin/parents");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menghapus pengguna.",
    };
  }
}
