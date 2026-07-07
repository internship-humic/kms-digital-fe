"use server";

import { fetchWithAuth, fetchPaginatedWithAuth } from "@/lib/fetcher";

export const getAllCadres = async (page = 1, limit = 10, search = "") => {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });
    const res = await fetchPaginatedWithAuth(`/cadre?${query.toString()}`);
    return { success: true, data: res };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const activateCadre = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  clinic_id: string;
}) => {
  try {
    const res = await fetchWithAuth("/auth/activation", {
      method: "POST",
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

export const updateCadre = async (
  id: string,
  data: {
    name: string;
    email: string;
    clinic_id: string;
  },
) => {
  try {
    const res = await fetchWithAuth(`/cadre/${id}`, {
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

export const deleteCadre = async (id: string) => {
  try {
    await fetchWithAuth(`/cadre/${id}`, {
      method: "DELETE",
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
