"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function KaderOnboardingStep1Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 relative">
      <div className="flex-1 flex flex-col items-center justify-center mt-10">
        <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mb-12">
          <div className="absolute inset-0 bg-primary-light/30 rounded-full scale-[0.85]" />
          <Image
            src="/images/onboardingkader-1.svg"
            alt="Ilustrasi Laporan Otomatis"
            width={280}
            height={280}
            className="relative z-10 w-full h-auto object-contain drop-shadow-sm"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center px-2">
          <h1 className="text-[24px] font-bold text-text-main mb-4 leading-tight tracking-tight">
            Ekspor Laporan Otomatis
          </h1>
          <p className="text-[15px] font-normal text-text-main/70 leading-relaxed max-w-[280px]">
            Pelaporan satu klik untuk kebutuhan administrasi Puskesmas dengan
            data terstruktur.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mb-4 mt-auto pt-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-2 bg-btn-primary rounded-full transition-all duration-300" />
          <div className="w-2 h-2 bg-border-input/50 rounded-full transition-all duration-300" />
        </div>

        <Link
          href="/kader/onboarding/step-2"
          className="w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold py-4 rounded-[16px] flex items-center justify-center gap-2 transition-all shadow-[0_8px_24px_-4px_rgba(37,99,235,0.3)] active:scale-95 cursor-pointer"
        >
          <span className="text-[15px] tracking-wide">Selanjutnya</span>
          <ArrowRight size={20} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
