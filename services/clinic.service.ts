"use server";

import { fetchWithAuth, fetchPaginatedWithAuth } from "@/lib/fetcher";

export const getAllClinics = async (page = 1, limit = 10, search = "") => {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    const res = await fetchPaginatedWithAuth(`/clinic?${query.toString()}`);
    return { success: true, ...res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan yang tidak diketahui";
    return { success: false, error: errorMessage };
  }
};

export const createClinic = async (data: {
  name: string;
  address: string;
  village_id: string;
}) => {
  try {
    const res = await fetchWithAuth("/clinic/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { success: true, data: res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal menambahkan klinik";
    return { success: false, error: errorMessage };
  }
};

export const updateClinic = async (
  id: string,
  data: {
    name: string;
    address: string;
  },
) => {
  try {
    const res = await fetchWithAuth(`/clinic/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { success: true, data: res };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal memperbarui klinik";
    return { success: false, error: errorMessage };
  }
};

export const deleteClinic = async (id: string) => {
  try {
    await fetchWithAuth(`/clinic/${id}`, {
      method: "DELETE",
    });
    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Gagal menghapus klinik";
    return { success: false, error: errorMessage };
  }
};
