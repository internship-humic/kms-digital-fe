"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaFooter() {
  return (
    <section className="bg-white pb-24 pt-10 px-6">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[32px] p-12 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(30,58,138,0.2)]">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[40px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[60px]" />
        
        <div className="relative z-10">
          <h2 className="text-[22px] md:text-[28px] font-medium text-white mb-6 leading-tight">
            Bersama JagaCilik, Wujudkan Generasi Emas 2045 Bebas Stunting
          </h2>
          <p className="text-white/90 text-[15px] mb-10 max-w-2xl mx-auto leading-relaxed">
            Mulai langkah kecil hari ini untuk kesehatan masa depan anak-anak Indonesia<br className="hidden md:block" /> yang lebih cerah.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-xl px-10 bg-white hover:bg-gray-50 text-[#0b48c4] font-medium text-[15px] h-12 w-full sm:w-auto">
              <Link href="/onboarding">Gabung Sekarang</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-10 bg-transparent border-white/30 hover:bg-white/10 text-white font-medium text-[15px] h-12 w-full sm:w-auto">
              <Link href="mailto:support@jagacilik.com">Hubungi Tim Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
