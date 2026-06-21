export type BalitaStatus = "NORMAL" | "LOW_RISK" | "HIGH_RISK";

export type BalitaData = {
  id: number;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  age: string;
  status: BalitaStatus;
  address: string;
};

export type BalitaDetail = {
  id: string;
  nama: string;
  jk: string;
  usia: string;
  status: string;
  stats: { berat: string; tinggi: string; lingkarKepala: string };
  riwayat: { tanggal: string; berat: string; tinggi: string; zscore: string }[];
};
  