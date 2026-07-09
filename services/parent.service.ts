"use server";

import { fetchWithAuth, fetchPaginatedWithAuth } from "@/lib/fetcher";

export const getParentsByClinic = async (clinicId: string) => {
  try {
    const data = await fetchWithAuth(`/parent/${clinicId}`);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal mengambil data orang tua:", error);
    return [];
  }
};

export const getAllParents = async (page = 1, limit = 10, search = "") => {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    const res = await fetchPaginatedWithAuth(`/parent?${query.toString()}`);
    return { success: true as const, ...res };
  } catch (error: any) {
    return { success: false as const, error: error.message };
  }
};

export const updateParent = async (
  id: string,
  data: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
  },
) => {
  try {
    const res = await fetchWithAuth(`/parent/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteParent = async (id: string) => {
  try {
    await fetchWithAuth(`/parent/${id}`, {
      method: "DELETE",
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
