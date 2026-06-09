import {
  BadgeCheck,
  CalendarCheck,
  CircleHelp,
  ClipboardCheck,
  MapPin,
  Shield,
  ShieldCheck,
  SmilePlus,
  UserRound,
} from "lucide-react";
import { KaderProfileMenu, KaderStat } from "../types";

export const kaderProfile = {
  name: "Siti Aminah",
  initial: "SA",
  role: "Kader Posyandu Melati 04",
  badge: "Kader Aktif Tersertifikasi",
};

export const kaderStats: KaderStat[] = [
  {
    id: 1,
    label: "Anak Dipantau",
    value: "42",
    icon: SmilePlus,
  },
  {
    id: 2,
    label: "Laporan Terkirim",
    value: "12",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    label: "Tingkat Validasi",
    value: "98%",
    icon: ShieldCheck,
  },
];

export const kaderMenus: KaderProfileMenu[] = [
  {
    id: 1,
    title: "Informasi Pribadi",
    description: "Ubah nama, kontak, dan alamat",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Wilayah Tugas",
    description: "Posyandu dan area cakupan",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Sertifikasi & Pelatihan",
    description: "Riwayat kelas edukasi kesehatan",
    icon: BadgeCheck,
  },
  {
    id: 4,
    title: "Keamanan Akun",
    description: "Kata sandi dan verifikasi 2 langkah",
    icon: Shield,
  },
  {
    id: 5,
    title: "Pusat Bantuan",
    description: "Panduan aplikasi dan CS",
    icon: CircleHelp,
  },
];
