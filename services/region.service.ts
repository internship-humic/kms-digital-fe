const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getProvinces = async () => {
  try {
    const res = await fetch(`${API_URL}/region/province`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data provinsi:", error);
    return [];
  }
};

export const getRegencies = async (provinceId: string) => {
  try {
    const res = await fetch(`${API_URL}/region/regency/${provinceId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data kabupaten:", error);
    return [];
  }
};

export const getDistricts = async (regencyId: string) => {
  try {
    const res = await fetch(`${API_URL}/region/district/${regencyId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data kecamatan:", error);
    return [];
  }
};

export const getVillages = async (districtId: string) => {
  try {
    const res = await fetch(`${API_URL}/region/village/${districtId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data desa:", error);
    return [];
  }
};

export const getClinics = async (villageId: string) => {
  try {
    const res = await fetch(`${API_URL}/clinic/${villageId}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Gagal mengambil data klinik/posyandu:", error);
    return [];
  }
};
