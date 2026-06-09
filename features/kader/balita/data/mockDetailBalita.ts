import { BalitaDetail } from "../types";

export const getDetailBalitaMockData = async (
  id: string,
): Promise<BalitaDetail> => {
  return {
    id,
    nama: "Elzhard Rahadian",
    jk: "Laki-laki",
    usia: "24 Bulan",
    status: "NORMAL",
    stats: {
      berat: "12.5",
      tinggi: "86.2",
      lingkarKepala: "48.0",
    },
    riwayat: [
      {
        tanggal: "12 Okt 2023",
        berat: "9.4 kg",
        tinggi: "76.2 cm",
        zscore: "0.82",
      },
      {
        tanggal: "10 Sep 2023",
        berat: "9.2 kg",
        tinggi: "74.7 cm",
        zscore: "0.75",
      },
      {
        tanggal: "08 Agt 2023",
        berat: "8.9 kg",
        tinggi: "73.5 cm",
        zscore: "0.71",
      },
    ],
  };
};
