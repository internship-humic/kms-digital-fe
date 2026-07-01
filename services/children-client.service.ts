"use server";

import { fetchWithAuth } from "@/lib/fetcher";
import type { ChildPayload } from "@/features/kader/balita/types";

export const updateChildClient = async (id: string, payload: ChildPayload) => {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export const deleteChildClient = async (id: string) => {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};
