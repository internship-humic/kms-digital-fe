"use client";

import { use } from "react";
import { ArrowLeft, Share2, Clock, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -mr-2 cursor-pointer">
          <Share2 size={22} className="text-btn-primary" strokeWidth={2.5} />
        </button>
      </div>

      <div className="relative w-full h-[280px] bg-border-input/20">
        <img
          src="/images/Hero Image.png"
          alt="Sayuran MPASI"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop";
          }}
        />
      </div>

      <div className="relative z-20 bg-background rounded-t-[32px] -mt-8 px-6 pt-8 pb-12 min-h-[500px] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="bg-primary-light/60 border border-primary-light text-btn-primary px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-wider">
              Nutrisi
            </span>
            <div className="flex items-center gap-1.5 text-icon-muted">
              <Clock size={14} />
              <span className="text-[13px] font-medium">5 menit baca</span>
            </div>
          </div>
          <span className="text-[13px] font-medium text-icon-muted">
            12 Okt 2026
          </span>
        </div>

        <h1 className="text-[24px] md:text-[26px] font-bold text-text-main leading-tight mb-6">
          Tips Gizi MPASI untuk Bayi 6 Bulan Pertama
        </h1>

        <div className="bg-primary-light/20 rounded-2xl p-4 flex items-center gap-4 mb-8 border border-border-input/30">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center shrink-0 border border-border-input/20">
            <BadgeCheck
              size={24}
              className="text-btn-primary [&>path:first-child]:fill-current [&>path:last-child]:stroke-white"
              strokeWidth={2.5}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-text-main mb-0.5">
              Dr. Sarah Anindita, Sp.A
            </h3>
            <p className="text-[13px] text-icon-muted leading-snug">
              Dokter Spesialis Anak - RSIA Harapan Kita
            </p>
          </div>
        </div>

        <div className="text-[#434654] text-[15.5px] leading-relaxed">
          <p className="mb-5">
            Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa
            dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan
            Pendamping ASI (MPASI) yang bergizi seimbang untuk mendukung tumbuh
            kembang optimalnya.
          </p>
          <p className="mb-5">
            Pada tahap awal ini, pencernaan bayi masih beradaptasi, sehingga
            penting untuk memulai dengan tekstur yang sangat halus (puree) dan
            perlahan ditingkatkan kekentalannya seiring bertambahnya usia.
          </p>

          <h3 className="text-[18px] font-bold text-text-main mt-8 mb-3">
            Zat Besi adalah Kunci
          </h3>
          <p className="mb-5">
            Salah satu nutrisi paling kritis di usia 6 bulan adalah zat besi.
            Cadangan zat besi bawaan dari lahir mulai habis di usia ini. Berikan
            makanan kaya zat besi seperti hati ayam, daging sapi cincang halus,
            atau sereal yang difortifikasi.
          </p>

          <div className="bg-primary-light/40 border-l-[3px] border-btn-primary p-4 rounded-r-xl my-6">
            <p className="text-[14px] text-btn-primary font-medium italic leading-relaxed">
              "Ingat, MPASI pertama bukan tentang seberapa banyak bayi makan,
              melainkan tentang mengenalkan rasa, tekstur, dan melatih otot
              mengunyah."
            </p>
          </div>

          <p className="mb-5">
            Pastikan juga setiap porsi makanan mengandung karbohidrat
            (nasi/kentang tumbuk), protein hewani, lemak tambahan (minyak
            kelapa/zaitun mentega), serta sedikit sayur atau buah untuk
            pengenalan serat.
          </p>
        </div>
      </div>
    </div>
  );
}
