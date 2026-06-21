import { fetchWithAuth } from "@/lib/fetcher";
import type { BalitaData } from "@/features/kader/balita/types";

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

    const response = await fetchWithAuth(`/children?${queryParams.toString()}`);

    const mappedData: BalitaData[] = response.data.map((item: any) => {
      const birthDate = new Date(item.birth_date);
      const diffTime = Math.abs(new Date().getTime() - birthDate.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

      return {
        id: item.id,
        name: item.name,
        gender: item.gender === "MALE" ? "Laki-laki" : "Perempuan",
        age: `${diffMonths} Bulan`,
        status: item.status || "NORMAL",
        address: item.address,
      };
    });

    return mappedData;
  } catch (error) {
    console.error("Error fetching childrens:", error);
    return [];
  }
};
