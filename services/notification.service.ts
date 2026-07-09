"use server";

import { fetchWithAuth } from "@/lib/fetcher";
import type { NotifikasiItem } from "@/features/kader/notifikasi/types";

type GetNotificationsParams = {
  page?: number;
  limit?: number;
  is_read?: boolean;
  category?: string;
};

export const getNotifications = async (
  params: GetNotificationsParams = {},
): Promise<NotifikasiItem[]> => {
  try {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 50),
    });

    if (params.is_read !== undefined) {
      query.append("is_read", String(params.is_read));
    }

    if (params.category) {
      query.append("category", params.category);
    }

    const data = await fetchWithAuth(`/notification?${query.toString()}`);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal mengambil data notifikasi:", error);
    return [];
  }
};
