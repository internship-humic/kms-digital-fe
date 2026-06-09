import { InterventionStep, RequiredAction } from "../types";

export const interventionSteps: InterventionStep[] = [
  {
    id: 1,
    description:
      "Cetak surat rujukan medis resmi dari sistem untuk diserahkan ke fasilitas kesehatan.",
  },
  {
    id: 2,
    description:
      "Koordinasi segera dengan Bidan Desa atau petugas Puskesmas terdekat mengenai status pasien.",
  },
  {
    id: 3,
    description:
      "Jadwalkan kunjungan rumah darurat atau pantauan metrik kesehatan mingguan secara ketat.",
  },
];

export const requiredActions: RequiredAction[] = [
  {
    id: 1,
    title: "Segera Rujuk ke Puskesmas",
    description: "Isi form rujukan dan koordinasikan dengan Bidan Desa.",
    checked: false,
    urgent: true,
  },
  {
    id: 2,
    title: "Pemberian Makanan Tambahan (PMT) Pemulihan",
    description:
      "Berikan PMT tinggi kalori dan protein sesuai resep puskesmas.",
    checked: false,
    urgent: false,
  },
  {
    id: 3,
    title: "Edukasi Intensif Orang Tua",
    description: "Jelaskan bahaya status gizi dan pentingnya kontrol rutin.",
    checked: true,
    urgent: false,
  },
];
