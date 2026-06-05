export type BalitaStatus = "NORMAL" | "LOW_RISK" | "HIGH_RISK";

export type BalitaData = {
  id: number;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  age: string;
  status: BalitaStatus;
  address: string;
};

export type DetailBalitaData = BalitaData & {
  latestMeasurements: {
    berat: number;
    tinggi: number;
    lingkarKepala: number;
  };
  riwayat: Array<{
    id: string;
    tanggal: string;
    berat: number;
    tinggi: number;
    zScore: number;
  }>;
};
