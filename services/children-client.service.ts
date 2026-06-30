import type { ChildPayload } from "@/features/kader/balita/types";

export const updateChildClient = async (id: string, payload: ChildPayload) => {
  try {
    const response = await fetch(`/api/children/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Gagal memperbarui data balita.");
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export const deleteChildClient = async (id: string) => {
  try {
    const response = await fetch(`/api/children/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Gagal menghapus data balita.");
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};
