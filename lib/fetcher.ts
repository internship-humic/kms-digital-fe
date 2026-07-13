import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchWithAuth<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
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
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message || "Terjadi kesalahan saat mengambil data",
      );
    }

    return result.data as T;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NO_TOKEN") throw error;
    throw new Error(
      error instanceof Error ? error.message : "Gagal terhubung ke server.",
    );
  }
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export async function fetchPaginatedWithAuth<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<PaginatedResponse<T>> {
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
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message || "Terjadi kesalahan saat mengambil data",
      );
    }

    return {
      data: result.data as T[],
      pagination: result.pagination || {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NO_TOKEN") throw error;
    throw new Error(
      error instanceof Error ? error.message : "Gagal terhubung ke server.",
    );
  }
}
