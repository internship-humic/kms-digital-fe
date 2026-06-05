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
        weight: "12.5",
        height: "86.2",
        head: "48.0",
        status: "NORMAL",
      },
      riwayatPemeriksaan: [
        {
          id: "1",
          tanggal: "15 Mei 2026",
          lokasi: "Posyandu Melati 2",
          keterangan: "Pemeriksaan rutin bulanan. Imunisasi DPT lanjutan.",
          bb: "12.5",
          tb: "88"
        },
        {
          id: "2",
          tanggal: "12 Juni 2026",
          lokasi: "Posyandu Melati 2",
          keterangan: "Pemeriksaan rutin bulanan.",
          bb: "12.3",
          tb: "88"
        }
      ],
      jadwalImunisasi: [
        {
          id: "im1",
          namaVaksin: "DPT-HB-Hib 2 & Polio 3",
          keterangan: "Jadwal direkomendasikan: 15 Nov 2023",
          waktu: "15 Nov 2023",
          bulanKe: "Bulan 3",
          status: "mendatang"
        },
        {
          id: "im2",
          namaVaksin: "DPT-HB-Hib 1 & Polio 2",
          keterangan: "",
          waktu: "",
          bulanKe: "Bulan 2",
          status: "selesai"
        },
        {
          id: "im3",
          namaVaksin: "BCG & Polio 1",
          keterangan: "Mencegah tuberkulosis dan polio.",
          waktu: "",
          bulanKe: "Bulan 1",
          status: "selesai"
        }
      ]
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
      riwayatPemeriksaan: [],
      jadwalImunisasi: []
    },
  ];
};

export const MOCK_CHILD_CHART_DATA: GrowthDataPoint[] = [
  { month: "Bulan 0", weight: 3, height: 50 },
  { month: "Bulan 1", weight: 4.5, height: 54 },
  { month: "Bulan 2", weight: 4.2, height: 57 },
  { month: "Bulan 3", weight: 5.5, height: 60 },
  { month: "Bulan 4", weight: 7, height: 62 },
  { month: "Bulan 5", weight: 6.5, height: 64 },
  { month: "Bulan 6", weight: 6.0, height: 66 },
  { month: "Bulan 7", weight: 7.2, height: 68 },
  { month: "Bulan 8", weight: 8.5, height: 70 },
  { month: "Bulan 9", weight: 9.5, height: 72 },
  { month: "Bulan 10", weight: 9.0, height: 73 },
  { month: "Bulan 11", weight: 8.5, height: 74 },
  { month: "Bulan 12", weight: 9.2, height: 76 },
  { month: "Bulan 13", weight: 10.0, height: 77 },
  { month: "Bulan 14", weight: 10.5, height: 78 },
  { month: "Bulan 15", weight: 11.2, height: 80 },
];
