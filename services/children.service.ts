import { fetchWithAuth } from "@/lib/fetcher";
import type { BalitaData, ChildPayload } from "@/features/kader/balita/types";

function calculateAgeInMonths(birthDateValue: string) {
  const birthDate = new Date(birthDateValue);
  const now = new Date();

  const yearDiff = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();

  const totalMonths = yearDiff * 12 + monthDiff;

  return Math.max(totalMonths, 0);
}

function formatDateForInput(dateValue: string) {
  if (!dateValue) return "";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

export const getChildrens = async (
  search?: string,
  page = 1,
  limit = 50,
): Promise<BalitaData[]> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      queryParams.append("search", search);
    }

    const children = await fetchWithAuth(`/children?${queryParams.toString()}`);

    const mappedData: BalitaData[] = children.map((item: any) => {
      const diffMonths = calculateAgeInMonths(item.birth_date);

      return {
        id: item.id,
        name: item.name,
        gender: item.gender === "MALE" ? "Laki-laki" : "Perempuan",
        genderApi: item.gender,
        age: `${diffMonths} Bulan`,
        status: item.status || "NORMAL",
        address: item.address,
        birthDate: formatDateForInput(item.birth_date),
        parentId: item.parent_id,
        parentName: item.parent?.name || "-",
        parentPhone: item.parent?.phone_number || "-",
      };
    });

    return mappedData;
  } catch (error) {
    console.error("Error fetching childrens:", error);
    return [];
  }
};

export const createChild = async (payload: ChildPayload) => {
  try {
    const response = await fetchWithAuth("/children", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Gagal menyimpan data balita.");
  }
};

export const updateChild = async (id: string, payload: ChildPayload) => {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Gagal memperbarui data balita.");
  }
};

export const deleteChild = async (id: string) => {
  try {
    const response = await fetchWithAuth(`/children/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error: any) {
    throw new Error(error.message || "Gagal menghapus data balita.");
  }
};
