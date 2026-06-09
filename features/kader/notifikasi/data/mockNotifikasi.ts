import { NotifikasiItem } from "../types";

export const NOTIFIKASI_MOCK_DATA: NotifikasiItem[] = [
  {
    id: 1,
    type: "Peringatan Penting",
    time: "10 mnt yang lalu",
    message: "Peringatan High Risk: Abe Cekut membutuhkan intervensi segera.",
  },
  {
    id: 2,
    type: "Jadwal",
    time: "2 jam yang lalu",
    message: "Jadwal Posyandu: Besok pukul 08:00 di Posyandu Melati 04.",
  },
  {
    id: 3,
    type: "Informasi",
    time: "5 jam yang lalu",
    message: "Artikel Baru: Tips MPASI untuk Bayi 6 Bulan sudah terbit.",
  },
  {
    id: 4,
    type: "Sistem",
    time: "Kemarin",
    message: "Pembaruan Kata Sandi: Berhasil diperbarui 2 jam yang lalu.",
  },
  {
    id: 5,
    type: "Sistem",
    time: "2 hari yang lalu",
    message: "Laporan bulanan telah berhasil diunduh.",
  },
];
