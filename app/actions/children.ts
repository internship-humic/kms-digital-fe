"use server";

import { revalidatePath } from "next/cache";
import { fetchWithAuth } from "@/lib/fetcher";

export async function createChildAction(payload: any) {
  try {
    const response = await fetchWithAuth("/children", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    revalidatePath("/kader/balita");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menyimpan data balita.",
    };
  }
}

export async function updateChildAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    revalidatePath("/kader/balita");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal memperbarui data balita.",
    };
  }
}

export async function deleteChildAction(id: string) {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "DELETE",
    });
    revalidatePath("/kader/balita");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal menghapus data balita.",
    };
  }
}

export async function updateInterventionAction(id: string, payload: any) {
  try {
    const response = await fetchWithAuth(`/children/${id}/intervention`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    revalidatePath("/kader/tindakan");
    return { success: true, data: response };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal memperbarui intervensi.",
    };
  }
}
