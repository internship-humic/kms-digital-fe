"use server";

import { fetchWithAuth } from "@/lib/fetcher";

export async function markNotificationReadAction(id: string) {
  try {
    await fetchWithAuth(`/notification/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ is_read: true }),
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Gagal memperbarui notifikasi.",
    };
  }
}
