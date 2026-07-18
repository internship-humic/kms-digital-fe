import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        result.error?.message ||
          result.message ||
          "Terjadi kesalahan saat mengambil data",
      );
    }

    return result.data;
  } catch (error: any) {
    if (error.message === "NO_TOKEN") throw error;
    throw new Error(error.message || "Gagal terhubung ke server.");
  }
}

export async function fetchPaginatedWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("NO_TOKEN");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        result.error?.message ||
          result.message ||
          "Terjadi kesalahan saat mengambil data",
      );
    }

    return {
      data: result.data,
      pagination: result.pagination || {},
    };
  } catch (error: any) {
    if (error.message === "NO_TOKEN") throw error;
    throw new Error(error.message || "Gagal terhubung ke server.");
  }
}
