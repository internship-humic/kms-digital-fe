"use server";

import { fetchWithAuth, fetchPaginatedWithAuth } from "@/lib/fetcher";
import type { ArtikelItem } from "@/features/parent/artikel/types";

type GetArticlesParams = {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
};

export const getArticles = async (
  params: GetArticlesParams = {},
): Promise<ArtikelItem[]> => {
  try {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 20),
    });

    if (params.category) query.append("category", params.category);
    if (params.search) query.append("search", params.search);

    const data = await fetchWithAuth(`/article?${query.toString()}`);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Gagal mengambil data artikel:", error);
    return [];
  }
};

export const getPaginatedArticles = async (params: GetArticlesParams = {}) => {
  try {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      limit: String(params.limit || 10),
    });

    if (params.category) query.append("category", params.category);
    if (params.search) query.append("search", params.search);

    return await fetchPaginatedWithAuth(`/article?${query.toString()}`);
  } catch (error) {
    console.error("Gagal mengambil paginasi artikel:", error);
    return { data: [], pagination: { total: 0, totalPages: 1 } };
  }
};

export const getArticleById = async (
  id: string,
): Promise<ArtikelItem | null> => {
  try {
    const data = await fetchWithAuth(`/article/${id}`);
    return data ?? null;
  } catch (error) {
    console.error("Gagal mengambil detail artikel:", error);
    return null;
  }
};
