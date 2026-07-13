"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function getAuthHeaders(isFormData = false) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: any = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  return headers;
}

export async function createArticleAction(formData: FormData) {
  const res = await fetch(`${API_URL}/article`, {
    method: "POST",
    headers: await getAuthHeaders(true),
    body: formData,
  });
  const result = await res.json();
  if (!res.ok || result.success === false) {
    throw new Error(
      result.error?.message || result.message || "Gagal menambahkan artikel",
    );
  }

  revalidatePath("/admin/articles");
  return result.data;
}

export async function updateArticleAction(id: string, formData: FormData) {
  const res = await fetch(`${API_URL}/article/${id}`, {
    method: "PATCH",
    headers: await getAuthHeaders(true),
    body: formData,
  });
  const result = await res.json();
  if (!res.ok || result.success === false) {
    throw new Error(
      result.error?.message || result.message || "Gagal mengupdate artikel",
    );
  }

  revalidatePath("/admin/articles");
  return result.data;
}

export async function deleteArticleAction(id: string) {
  const res = await fetch(`${API_URL}/article/${id}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });
  const result = await res.json();
  if (!res.ok || result.success === false) {
    throw new Error(
      result.error?.message || result.message || "Gagal menghapus artikel",
    );
  }

  revalidatePath("/admin/articles");
  return result.data;
}
