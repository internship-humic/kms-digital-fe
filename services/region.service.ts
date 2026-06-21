import { RegionResponseDTO } from "@/features/auth/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchRegionData(endpoint: string): Promise<RegionResponseDTO[]> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || `Gagal mengambil data ${endpoint}`);
    }

    return result.data;
  } catch (error: any) {
    console.error(`Gagal mengambil data ${endpoint}:`, error.message);
    return [];
  }
}

export const getProvinces = () => fetchRegionData("/region/province");

export const getRegencies = (provinceId: string) =>
  fetchRegionData(`/region/regency/${provinceId}`);

export const getDistricts = (regencyId: string) =>
  fetchRegionData(`/region/district/${regencyId}`);

export const getVillages = (districtId: string) =>
  fetchRegionData(`/region/village/${districtId}`);

export const getClinics = (villageId: string) =>
  fetchRegionData(`/clinic/${villageId}`);
