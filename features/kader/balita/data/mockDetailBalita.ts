import { DetailBalitaData } from "../types";

export const getDetailBalitaMockData = async (id: string): Promise<DetailBalitaData> => {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: Number(id),
    name: "Elzhard Rahadian",
    gender: "Laki-laki",
    age: "24 Bulan",
    status: "NORMAL",
    address: "Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan",
    latestMeasurements: {
      berat: 12.5,
      tinggi: 86.2,
      lingkarKepala: 48.0,
    },
    riwayat: [
      {
        id: "1",
        tanggal: "12 Okt 2023",
        berat: 9.4,
        tinggi: 76.2,
        zScore: 0.82,
      },
      {
        id: "2",
        tanggal: "10 Sep 2023",
        berat: 9.2,
        tinggi: 74.7,
        zScore: 0.75,
      },
      {
        id: "3",
        tanggal: "08 Agt 2023",
        berat: 8.9,
        tinggi: 73.5,
        zScore: 0.71,
      },
    ],
  };
};
