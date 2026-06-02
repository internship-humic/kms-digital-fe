"use client";

import Image from "next/image";
import Link from "next/link";

export default function KaderOnboardingStep2Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary-light/10 to-transparent pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center mt-10">
        <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center mb-10">
          <Image
            src="/images/onboardingkader-2.svg"
            alt="Ilustrasi Pemantauan & Intervensi Cepat"
            width={320}
            height={320}
            className="relative z-10 w-full h-auto object-contain drop-shadow-sm"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center px-4 relative z-10">
          <h1 className="text-[24px] font-bold text-text-main mb-4 leading-[1.3] tracking-tight">
            Pemantauan &{" "}
            <span className="text-btn-primary">
              Intervensi
              <br />
              Cepat
            </span>
          </h1>
          <p className="text-[15px] font-normal text-text-main/70 leading-relaxed max-w-[300px]">
            Pantau pertumbuhan balita secara akurat dengan standar WHO dan
            sistem rujukan otomatis untuk penanganan dini.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full mb-4 mt-auto pt-8 relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-border-input/50 rounded-full transition-all duration-300" />
          <div className="w-8 h-2 bg-btn-primary rounded-full transition-all duration-300" />
        </div>

        <Link
          href="/kader/login"
          className="w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold py-4 rounded-[16px] flex items-center justify-center transition-all shadow-[0_8px_24px_-4px_rgba(37,99,235,0.3)] active:scale-95 cursor-pointer"
        >
          <span className="text-[15px] tracking-wide">Masuk sebagai Kader</span>
        </Link>
      </div>
    </div>
  );
}
