import { NotifikasiItem } from "../types";

export const getMockNotifikasi = async (): Promise<NotifikasiItem[]> => {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: "1",
      tipe: "peringatan",
      judul: "Peringatan Penting",
      waktu: "10 mnt yang lalu",
      pesan: "Peringatan High Risk: Abe Cekut membutuhkan intervensi segera.",
    },
    {
      id: "2",
      tipe: "jadwal",
      judul: "Jadwal",
      waktu: "2 jam yang lalu",
      pesan: "Jadwal Posyandu: Besok pukul 08:00 di Posyandu Melati 04.",
    },
    {
      id: "3",
      tipe: "informasi",
      judul: "Informasi",
      waktu: "5 jam yang lalu",
      pesan: "Artikel Baru: Tips MPASI untuk Bayi 6 Bulan sudah terbit.",
    },
    {
      id: "4",
      tipe: "sistem",
      ikonSistem: "settings",
      judul: "Sistem",
      waktu: "Kemarin",
      pesan: "Pembaruan Kata Sandi: Berhasil diperbarui 2 jam yang lalu.",
    },
    {
      id: "5",
      tipe: "sistem",
      ikonSistem: "check",
      judul: "Sistem",
      waktu: "2 hari yang lalu",
      pesan: "Laporan bulanan telah berhasil diunduh.",
    },
  ];
};
