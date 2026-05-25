"use client";

import { ArrowLeft, Share2, Clock, BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-6 py-5 bg-white sticky top-0 z-20">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors -ml-2"
        >
          <ArrowLeft size={24} className="text-blue-600" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors -mr-2">
          <Share2 size={22} className="text-blue-600" />
        </button>
      </div>

      <div className="relative w-full h-[280px]">
        <img 
          src="/images/Hero Image.png" 
          alt="Sayuran MPASI" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 bg-white rounded-t-[32px] -mt-8 px-6 pt-8 pb-12 min-h-[500px] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="bg-[#E6F0FF] text-blue-700 px-3.5 py-1.5 rounded-full text-[13px] font-bold">
              Nutrisi
            </span>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock size={15} />
              <span className="text-[13px] font-medium">5 menit</span>
            </div>
          </div>
          <span className="text-[13px] font-medium text-gray-500">12 Okt 2025</span>
        </div>

        <h1 className="text-[26px] font-bold text-gray-900 leading-tight mb-6">
          Tips Gizi MPASI untuk Bayi 6 Bulan Pertama
        </h1>

        <div className="bg-[#f8fafc] rounded-2xl p-4 flex items-center gap-4 mb-8 border border-gray-50">
          <div className="w-12 h-12 bg-[#E6F0FF] rounded-full flex items-center justify-center shrink-0">
            <BadgeCheck size={26} className="text-blue-600" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] font-bold text-gray-900 mb-0.5">Dr. Sarah Anindita, Sp.A</h3>
            <p className="text-[13px] text-gray-500 leading-snug">
              Dokter Spesialis Anak - RSIA Harapan Kita
            </p>
          </div>
        </div>

        <div className="text-gray-600 text-[16px] leading-relaxed">
          <p className="mb-5">
            Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan Pendamping ASI (MPASI) yang bergizi seimbang untuk mendukung tumbuh kembang optimalnya.
          </p>
          <p className="mb-5">
            Pada tahap awal ini, pencernaan bayi masih beradaptasi, sehingga penting untuk memulai dengan tekstur yang sangat halus (puree) dan perlahan ditingkatkan kekentalannya seiring bertambahnya usia.
          </p>
          <h3 className="text-[18px] font-bold text-gray-900 mt-8 mb-3">Zat Besi adalah Kunci</h3>
          <p className="mb-5">
            Salah satu nutrisi paling kritis di usia 6 bulan adalah zat besi. Cadangan zat besi bawaan dari lahir mulai habis di usia ini. Berikan makanan kaya zat besi seperti hati ayam, daging sapi cincang halus, atau sereal yang difortifikasi.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl my-6">
            <p className="text-[14px] text-blue-900 font-medium italic">
              "Ingat, MPASI pertama bukan tentang seberapa banyak bayi makan, melainkan tentang mengenalkan rasa, tekstur, dan melatih otot mengunyah."
            </p>
          </div>
          <p className="mb-5">
            Pastikan juga setiap porsi makanan mengandung karbohidrat (nasi/kentang tumbuk), protein hewani, lemak tambahan (minyak kelapa/zaitun mentega), serta sedikit sayur atau buah untuk pengenalan serat.
          </p>
        </div>

      </div>
    </div>
  );
}
