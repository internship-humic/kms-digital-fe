"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/fetcher";

export async function activateCadreAction(payload: any) {
  try {
    const response = await fetchWithAuth("/auth/activation", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin/staff");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal membuat akun kader.",
    };
  }
}

export async function updateCadreAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/cadre/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/admin/staff");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal mengubah data kader.",
    };
  }
}

export async function deleteCadreAction(id: string) {
  try {
    const response = await fetchWithAuth(`/cadre/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/admin/staff");
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message || "Gagal menghapus kader." };
  }
}
