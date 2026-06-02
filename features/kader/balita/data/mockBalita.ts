import { BalitaData } from "../types";

export const getBalitaMockData = async (): Promise<BalitaData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      name: "Elzhard R.",
      gender: "Laki-laki",
      age: "24 Bulan",
      status: "NORMAL",
      address: "Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan",
    },
    {
      id: 2,
      name: "Nadlyn A.",
      gender: "Perempuan",
      age: "18 Bulan",
      status: "LOW_RISK",
      address: "Gang Haji Usin No. 12, Cipete Utara, Jakarta Selatan",
    },
    {
      id: 3,
      name: "Abe Cekut",
      gender: "Laki-laki",
      age: "32 Bulan",
      status: "HIGH_RISK",
      address:
        "Perumahan Elok Blok C4, Bintaro Jaya Sektor 9, Tangerang Selatan",
    },
  ];
};
