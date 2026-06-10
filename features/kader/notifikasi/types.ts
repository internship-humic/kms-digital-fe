export type NotifikasiType =
  | "Peringatan Penting"
  | "Jadwal"
  | "Informasi"
  | "Sistem";

export interface NotifikasiItem {
  id: string | number;
  tipe: "peringatan" | "jadwal" | "informasi" | "sistem";
  judul: string;
  waktu: string;
  pesan: string;
  ikonSistem?: "check" | string;
}
