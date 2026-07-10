"use client";

import { Users, Stethoscope, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SolutionsSection() {
  const solutions = [
    {
      icon: Users,
      title: "Untuk Orang Tua",
      description: "Pantau kesehatan dan tumbuh kembang anak Anda secara digital. Terima notifikasi jadwal imunisasi langsung ke HP Anda dan dapatkan tips pola asuh gizi harian.",
      actionText: "Daftar sebagai Orang Tua",
      href: "/login"
    },
    {
      icon: Stethoscope,
      title: "Untuk Tenaga Kesehatan (Kader/Bidan)",
      description: "Singkirkan repotnya rekapitulasi buku fisik KMS. Catat data balita secara terpusat, buat grafik WHO instan, dan temukan anak yang butuh penanganan stunting ekstra.",
      actionText: "Login Portal Nakes",
      href: "/kader/login"
    },
    {
      icon: Building2,
      title: "Untuk Instansi / Puskesmas",
      description: "Laporan data analitik komprehensif tingkat wilayah, memantau kinerja Posyandu, dan mengambil keputusan cepat berkat integrasi sistem dashboard yang terpusat.",
      actionText: "Akses Dashboard Admin",
      href: "/admin/login"
    }
  ];

  return (
    <section id="solusi" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-btn-primary tracking-widest uppercase mb-3">Solusi Terintegrasi di Ekosistem Kesehatan</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-text-main max-w-3xl mx-auto leading-tight">
            Menghubungkan orang tua, posyandu, dan tenaga kesehatan dalam satu platform digital yang aman.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, idx) => (
            <div key={idx} className="bg-white rounded-[24px] p-8 border border-border-input/20 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center mb-6">
                <solution.icon className="text-btn-primary w-7 h-7" strokeWidth={2.5} />
              </div>
              <h4 className="text-xl font-bold text-text-main mb-4">{solution.title}</h4>
              <p className="text-sm text-icon-muted leading-relaxed mb-8 flex-1">
                {solution.description}
              </p>
              
              <Link href={solution.href} className="mt-auto text-sm font-bold text-btn-primary flex items-center gap-1 hover:gap-2 transition-all">
                {solution.actionText} 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
