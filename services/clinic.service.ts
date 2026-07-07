"use server";

import { fetchWithAuth, fetchPaginatedWithAuth } from "@/lib/fetcher";

export const getAllClinics = async (page = 1, limit = 10, search = "") => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
  });
  return await fetchPaginatedWithAuth(`/clinic?${query.toString()}`);
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
  } catch (error: any) {
    return { success: false, error: error.message };
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
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteClinic = async (id: string) => {
  try {
    await fetchWithAuth(`/clinic/${id}`, {
      method: "DELETE",
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
