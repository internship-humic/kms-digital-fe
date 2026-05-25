"use client";

import AppLayout from "@/components/layout/AppLayout";
import { Lightbulb, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = ["Semua", "Nutrisi", "Kesehatan", "Aktivitas"];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  return (
    <AppLayout>
      <div className="flex-1 bg-[#fcfcfd] flex flex-col min-h-0 relative">
        <div className="px-6 py-5 bg-[#fcfcfd] sticky top-0 z-10">
          <h1 className="text-[20px] font-bold text-blue-700 text-center">
            Insights
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pb-24">
          
          <div className="px-6 mb-6 flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-[14px] font-semibold transition-all ${
                  activeCategory === cat 
                    ? "bg-[#0A52D1] text-white shadow-md shadow-blue-500/20" 
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="px-6 flex flex-col gap-8">
            
            <div className="bg-white rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-50 rounded-full opacity-70"></div>
              
              <div className="w-14 h-14 bg-[#E6F0FF] rounded-full flex items-center justify-center mb-5 relative z-10">
                <Lightbulb size={24} className="text-blue-600" strokeWidth={2.5} />
              </div>
              
              <h2 className="text-[20px] font-bold text-gray-900 leading-snug mb-3 relative z-10 pr-4">
                Tips Harian: Jadwal Tidur Konsisten
              </h2>
              
              <p className="text-[15px] text-gray-500 leading-relaxed mb-5 relative z-10">
                Membangun rutinitas tidur yang sama setiap hari membantu mengatur jam biologis anak, meningkatkan kualitas istirahat, dan mendukung pertumbuhan otak yang optimal.
              </p>
              
              <button className="flex items-center gap-2 text-blue-600 font-bold text-[14.5px] hover:text-blue-700 transition-colors relative z-10 w-fit">
                Baca selengkapnya
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-[20px] font-bold text-gray-900">Artikel Terbaru</h3>
                <button className="text-[13.5px] font-bold text-blue-600">Lihat Semua</button>
              </div>

              <Link href="/insights/article/1" className="block relative bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden group">
                <div className="relative w-full h-[180px] bg-gray-100 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Clock size={14} className="text-blue-600" />
                    <span className="text-[12px] font-bold text-gray-800">5 menit baca</span>
                  </div>
                  <img 
                    src="/images/Hero Image.png" 
                    alt="MPASI Bayi" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex gap-2 mb-2.5">
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">Nutrisi</span>
                  </div>
                  <h4 className="text-[17px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                    Tips Gizi MPASI untuk Bayi 6 Bulan Pertama
                  </h4>
                  <p className="text-[13px] text-gray-500 line-clamp-2">
                    Memasuki usia 6 bulan, kebutuhan nutrisi bayi tidak lagi bisa dipenuhi hanya dengan ASI. Inilah saatnya memperkenalkan Makanan Pendamping ASI...
                  </p>
                </div>
              </Link>
            </div>
            
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AppLayout>
  );
}
