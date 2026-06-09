export type NotifikasiType =
  | "Peringatan Penting"
  | "Jadwal"
  | "Informasi"
  | "Sistem";

export type NotifikasiItem = {
  id: number;
  type: NotifikasiType;
  time: string;
  message: string;
};
