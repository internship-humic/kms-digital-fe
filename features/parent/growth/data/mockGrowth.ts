import { ChildData, GrowthDataPoint } from "../types";

export const getGrowthMockData = async (): Promise<ChildData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      name: "Elzhard Rahadian",
      details: "Laki-laki • 3 Tahun 2 Bulan",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop",
      stats: {
        weight: "14.5",
        height: "95.2",
        head: "50.0",
        status: "NORMAL",
      },
    },
    {
      id: 2,
      name: "Nadlyne Aurora",
      details: "Perempuan • 10 Bulan",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop",
      stats: {
        weight: "8.2",
        height: "72.0",
        head: "43.5",
        status: "NORMAL",
      },
    },
  ];
};

export const MOCK_CHILD_CHART_DATA: GrowthDataPoint[] = [
  { month: "Bulan 0", weight: 3.2, height: 50.1, head: 35.0 },
  { month: "Bulan 1", weight: 4.5, height: 54.0, head: 37.5 },
  { month: "Bulan 2", weight: 5.4, height: 57.2, head: 39.1 },
  { month: "Bulan 3", weight: 6.2, height: 60.5, head: 40.5 },
  { month: "Bulan 4", weight: 7.0, height: 62.8, head: 41.6 },
  { month: "Bulan 5", weight: 7.4, height: 64.5, head: 42.6 },
  { month: "Bulan 6", weight: 7.9, height: 66.2, head: 43.5 },
  { month: "Bulan 7", weight: 8.3, height: 68.0, head: 44.2 },
  { month: "Bulan 8", weight: 8.6, height: 70.1, head: 44.8 },
  { month: "Bulan 9", weight: 8.9, height: 71.5, head: 45.3 },
  { month: "Bulan 10", weight: 9.2, height: 73.0, head: 45.8 },
  { month: "Bulan 11", weight: 9.4, height: 74.2, head: 46.1 },
  { month: "Bulan 12", weight: 9.6, height: 75.8, head: 46.4 },
  { month: "Bulan 13", weight: 9.9, height: 77.0, head: 46.8 },
  { month: "Bulan 14", weight: 10.1, height: 78.2, head: 47.1 },
  { month: "Bulan 15", weight: 10.5, height: 79.5, head: 47.4 },
];
