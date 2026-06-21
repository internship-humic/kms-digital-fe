import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getChildrens = async (search?: string, page = 1, limit = 50) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      queryParams.append("search", search);
    }

    const response = await fetch(
      `${API_URL}/children?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengambil data balita");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching childrens:", error);
    return { data: [], pagination: null };
  }
};
