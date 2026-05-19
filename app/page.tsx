"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, LineChart, FileText } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col flex-1 p-6 min-h-screen bg-white justify-between">
      {/* Bagian Konten Utama */}
      <div className="flex flex-col items-center mt-6">
        <Image
          src="/images/onboarding.svg"
          alt="Ilustrasi Keluarga JagaCilik"
          width={320}
          height={320}
          className="w-full max-w-[320px] h-auto object-contain mb-8"
          priority
        />

        {/* Teks Judul & Deskripsi */}
        <h1 className="text-[26px] font-bold text-foreground text-center mb-4 leading-tight px-4">
          Pantau Tumbuh Kembang
          <br />
          Anak Lebih Mudah
        </h1>

        <p className="text-[15px] text-foreground/70 text-center mb-8 leading-relaxed px-2">
          JagaCilik hadir sebagai Buku KIA Digital Anda. Pantau metrik
          kesehatan, catat perkembangan, dan ekspor laporan PDF dengan aman.
        </p>

        {/* Badges / Fitur Pills */}
        <div className="flex flex-wrap justify-center gap-3 px-2">
          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Digital KMS
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            <LineChart className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Child Tracking
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full bg-white shadow-sm">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              PDF Reports
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Tombol */}
      <div className="mt-8 mb-6">
        <Link
          href="/login"
          className="w-full bg-primary hover:bg-primary-base text-white text-lg font-semibold rounded-xl py-4 flex items-center justify-center transition-colors shadow-lg shadow-primary/20"
        >
          Mulai!
        </Link>
      </div>
    </div>
  );
}
