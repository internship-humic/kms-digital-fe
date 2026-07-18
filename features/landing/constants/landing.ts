import {
  ShieldCheck,
  Zap,
  Award,
  Users,
  Stethoscope,
  Building2,
} from "lucide-react";
import type {
  NavItem,
  StatItem,
  BenefitItem,
  SolutionItem,
  FooterLink,
} from "../types";

export const NAV_LINKS: NavItem[] = [
  { label: "Fitur", href: "#fitur" },
  { label: "Solusi", href: "#solusi" },
  { label: "Dampak", href: "#dampak" },
];

export const STATS_DATA: StatItem[] = [
  { value: "12.4K", label: "Posyandu Terintegrasi" },
  { value: "24.5M", label: "Balita Terpantau" },
  { value: "8.2K", label: "Desa Tercover" },
];

export const BENEFITS_DATA: BenefitItem[] = [
  {
    icon: ShieldCheck,
    title: "Keamanan Terjamin",
    description:
      "Data privasi pasien dienkripsi penuh dan dijaga menggunakan standar keamanan rekam medis nasional.",
  },
  {
    icon: Zap,
    title: "Lebih Mudah & Cepat",
    description:
      "Pencatatan ribuan posyandu menjadi paperless (tanpa kertas) sehingga tak ada rekap fisik yang hilang.",
  },
  {
    icon: Award,
    title: "Sertifikasi Standar Gizi",
    description:
      "Sistem kalkulator terhubung dengan pedoman Antropometri Kemenkes RI yang selalu update berkala.",
  },
];

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    icon: Users,
    title: "Untuk Orang Tua",
    description:
      "Pantau kesehatan dan tumbuh kembang anak Anda secara digital. Terima notifikasi jadwal imunisasi langsung ke HP Anda dan dapatkan tips pola asuh gizi harian.",
    actionText: "Daftar sebagai Orang Tua",
    href: "/login",
  },
  {
    icon: Stethoscope,
    title: "Untuk Tenaga Kesehatan (Kader/Bidan)",
    description:
      "Singkirkan repotnya rekapitulasi buku fisik KMS. Catat data balita secara terpusat, buat grafik WHO instan, dan temukan anak yang butuh penanganan stunting ekstra.",
    actionText: "Masuk Portal Nakes",
    href: "/kader/onboarding/step-1",
  },
  {
    icon: Building2,
    title: "Untuk Instansi / Puskesmas",
    description:
      "Laporan data analitik komprehensif tingkat wilayah, memantau kinerja Posyandu, dan mengambil keputusan cepat berkat integrasi sistem dashboard yang terpusat.",
    actionText: "Akses Dashboard Admin",
    href: "/admin/login",
  },
];

export const FOOTER_PLATFORM_LINKS: FooterLink[] = [
  { label: "Fitur Utama", href: "#fitur" },
  { label: "KMS Digital", href: "#" },
  { label: "Early Warning", href: "#" },
  { label: "Mobile App", href: "#" },
];

export const FOOTER_RESOURCES_LINKS: FooterLink[] = [
  { label: "Blog Kesehatan", href: "#" },
  { label: "Panduan Ibu", href: "#" },
  { label: "Dokumentasi API", href: "#" },
  { label: "Bantuan", href: "#" },
];
