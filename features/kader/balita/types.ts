export type BalitaStatus = "NORMAL" | "LOW_RISK" | "HIGH_RISK";

export type BalitaData = {
  id: number;
  name: string;
  gender: "Laki-laki" | "Perempuan";
  age: string;
  status: BalitaStatus;
  address: string;
};
