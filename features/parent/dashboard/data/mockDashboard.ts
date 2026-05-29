import { DashboardChildData } from "../types";

export const getDashboardMockData = async (): Promise<DashboardChildData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      name: "Elzhard Rahadian",
      gender: "Laki-laki",
      age: "3 Tahun 2 Bulan",
      weight: "14.5 kg",
      height: "95 cm",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Nadlyne Aurora",
      gender: "Perempuan",
      age: "10 Bulan",
      weight: "8.2 kg",
      height: "72 cm",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop",
    },
  ];
};
