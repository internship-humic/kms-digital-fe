"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, LineChart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

import MobileWrapper from "@/components/layout/MobileWrapper";

export default function OnboardingPage() {
  return (
    <MobileWrapper>
      <div className="flex flex-col flex-1 p-6 min-h-screen bg-white justify-between">
        <div className="flex flex-col items-center mt-6">
          <Image
            src="/images/onboarding.svg"
            alt="Ilustrasi Keluarga JagaCilik"
            width={320}
            height={320}
            className="w-full max-w-[320px] h-auto object-contain mb-8"
            priority
          />

          <h1 className="text-[26px] font-bold text-text-main text-center mb-4 leading-tight px-4">
            Pantau Tumbuh Kembang
            <br />
            Anak Lebih Mudah
          </h1>

          <p className="text-[15px] text-text-main/70 text-center mb-8 leading-relaxed px-2">
            JagaCilik hadir sebagai Buku KIA Digital Anda. Pantau metrik
            kesehatan, catat perkembangan, dan ekspor laporan PDF dengan aman.
          </p>

          <div className="flex flex-wrap justify-center gap-3 px-2">
            <div className="flex items-center gap-2 px-4 py-2 border border-border-input/60 rounded-full bg-white shadow-sm">
              <BookOpen strokeWidth={2.5} className="w-4 h-4 text-btn-primary" />
              <span className="text-xs font-semibold text-text-main">
                Digital KMS
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border border-border-input/60 rounded-full bg-white shadow-sm">
              <LineChart strokeWidth={2.5} className="w-4 h-4 text-btn-primary" />
              <span className="text-xs font-semibold text-text-main">
                Child Tracking
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border border-border-input/60 rounded-full bg-white shadow-sm">
              <FileText strokeWidth={2.5} className="w-4 h-4 text-btn-primary" />
              <span className="text-xs font-semibold text-text-main">
                PDF Reports
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4 flex flex-col gap-3 w-full px-2">
          <Link
            href="/login"
            className="w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold rounded-xl py-3.5 flex items-center justify-center transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
          >
            Masuk
          </Link>

          <div className="flex items-center justify-center gap-3 mt-4 text-[13px] font-medium text-text-main/60">
            <Link
              href="/kader/onboarding/step-1"
              className="hover:text-btn-primary transition-colors cursor-pointer"
            >
              Kader Posyandu
            </Link>
            <div className="w-1 h-1 bg-border-input/60 rounded-full" />
            <Link
              href="/admin/login"
              className="hover:text-btn-primary transition-colors cursor-pointer"
            >
              Admin Puskesmas
            </Link>
          </div>
        </div>
      </div>
    </MobileWrapper>
  );
}
