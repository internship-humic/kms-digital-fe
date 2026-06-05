"use client";

import { ArrowLeft, Weight, Ruler, Circle, Calculator, FileText, Download, Maximize2, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { DetailBalitaData } from "../types";

export default function DetailBalitaFeed({ data }: { data: DetailBalitaData }) {
  const router = useRouter();

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0] ? names[0][0].toUpperCase() : "B";
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col relative min-h-screen">
      {/* Header */}
      <div className="flex items-center px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <button 
          onClick={() => router.back()}
          className="mr-4 text-btn-primary hover:bg-blue-50 p-2 -ml-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="text-[18px] font-bold text-btn-primary flex-1 text-center pr-10">
          Detail Data Balita
        </h1>
      </div>

      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[20px] p-5 border border-border-input/20 shadow-sm flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full bg-blue-100 text-btn-primary font-bold text-xl flex items-center justify-center shrink-0 shadow-inner">
            {getInitials(data.name)}
          </div>
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold text-text-main leading-snug">{data.name}</h2>
            <p className="text-[14px] text-gray-500 mt-0.5">{data.gender} &bull; {data.age}</p>
          </div>
        </div>

        {/* Status & Stats */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full w-max shadow-sm shadow-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-[13px] font-semibold tracking-wide">Status: {data.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-[16px] border border-border-input/20 shadow-sm flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <Weight size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 mb-0.5">Berat</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-bold text-text-main">{data.latestMeasurements.berat.toFixed(1)}</span>
                  <span className="text-[12px] font-medium text-gray-400">kg</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-[16px] border border-border-input/20 shadow-sm flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <Ruler size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 mb-0.5">Tinggi</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-bold text-text-main">{data.latestMeasurements.tinggi.toFixed(1)}</span>
                  <span className="text-[12px] font-medium text-gray-400">cm</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[16px] border border-border-input/20 shadow-sm flex flex-col gap-3 col-span-2">
              <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500">
                <Circle size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 mb-0.5">Lingkar Kepala</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-bold text-text-main">{data.latestMeasurements.lingkarKepala.toFixed(1)}</span>
                  <span className="text-[12px] font-medium text-gray-400">cm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Graphic Area */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-text-main leading-snug">Grafik Tren Pertumbuhan<br/>Otomatis</h3>
              <p className="text-[12px] text-gray-500 mt-1">Visualisasi Berat Badan vs Umur (Bulan)</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                <Download size={14} strokeWidth={2.5} />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                <Maximize2 size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="bg-white border border-border-input/20 rounded-[16px] p-4 shadow-sm w-full h-[280px] flex flex-col relative overflow-hidden">
             {/* Mockup Chart SVG */}
             <div className="flex-1 w-full relative">
               <svg viewBox="0 0 300 180" className="w-full h-full" preserveAspectRatio="none">
                 {/* Grid Lines */}
                 <line x1="0" y1="30" x2="300" y2="30" stroke="#f0f0f0" strokeWidth="1" />
                 <line x1="0" y1="90" x2="300" y2="90" stroke="#f0f0f0" strokeWidth="1" />
                 <line x1="0" y1="150" x2="300" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                 {/* Border lines */}
                 <line x1="0" y1="0" x2="0" y2="180" stroke="#e5e7eb" strokeWidth="2" />
                 <line x1="0" y1="180" x2="300" y2="180" stroke="#e5e7eb" strokeWidth="2" />
                 
                 {/* Ambang Batas (Red) */}
                 <path d="M 0 160 Q 150 140 300 80" fill="none" stroke="#fca5a5" strokeWidth="2" />
                 <path d="M 0 140 Q 150 120 300 50" fill="none" stroke="#fca5a5" strokeWidth="2" />
                 
                 {/* Garis Normal (Green) */}
                 <path d="M 0 150 Q 150 130 300 65" fill="none" stroke="#86efac" strokeWidth="2.5" />
                 
                 {/* Data Line & Points (Blue) */}
                 <path d="M 20 165 L 80 150 L 150 125" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
                 <circle cx="20" cy="165" r="4" fill="#2563eb" />
                 <circle cx="80" cy="150" r="4" fill="#2563eb" />
                 <circle cx="150" cy="125" r="4" fill="#2563eb" />
               </svg>
               <div className="absolute top-0 left-2 text-[10px] text-gray-400 rotate-90 origin-top-left translate-y-6">Berat (kg)</div>
               <div className="absolute bottom-1 left-2 text-[10px] text-gray-400">Bulan 0</div>
               <div className="absolute bottom-1 right-2 text-[10px] text-gray-400">Bulan 24</div>
             </div>
             
             {/* Legend */}
             <div className="flex items-center justify-between mt-4 px-2">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                 <span className="text-[9px] font-bold text-gray-500 tracking-wider">GARIS NORMAL</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                 <span className="text-[9px] font-bold text-gray-500 tracking-wider">AMBANG BATAS</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                 <span className="text-[9px] font-bold text-gray-500 tracking-wider">DATA ARKA</span>
               </div>
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <button className="w-full bg-gray-100 rounded-[16px] p-4 flex items-center gap-4 hover:bg-gray-200 transition-colors text-left border border-transparent hover:border-gray-300">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-btn-primary shrink-0">
              <Calculator size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-text-main mb-0.5">Kalkulasi Z-Score Otomatis</h4>
              <p className="text-[12px] text-gray-500">Hasil instan setiap input data baru</p>
            </div>
          </button>
          
          <button className="w-full bg-gray-100 rounded-[16px] p-4 flex items-center gap-4 hover:bg-gray-200 transition-colors text-left border border-transparent hover:border-gray-300">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-btn-primary shrink-0">
              <FileText size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-text-main mb-0.5">Standar Antropometri Kemenkes</h4>
              <p className="text-[12px] text-gray-500">Sesuai Permenkes No. 2 Tahun 2020</p>
            </div>
          </button>
        </div>

        {/* History Table */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-text-main">Riwayat Pengukuran</h3>
            <button className="text-[13px] font-medium text-btn-primary hover:underline">Lihat Semua {">"}</button>
          </div>
          
          <div className="bg-white border border-border-input/20 rounded-[16px] overflow-hidden shadow-sm flex flex-col">
            <div className="grid grid-cols-4 bg-gray-50/80 p-4 border-b border-gray-100">
              <div className="text-[11px] font-bold text-gray-500 tracking-wider">TANGGAL</div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">BERAT</div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">TINGGI</div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-right pr-2">Z-SCORE</div>
            </div>
            
            <div className="flex flex-col">
              {data.riwayat.map((row, idx) => (
                <div key={row.id} className={`grid grid-cols-4 p-4 items-center ${idx !== data.riwayat.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="text-[13px] text-gray-700">{row.tanggal}</div>
                  <div className="text-[13px] text-gray-700 text-center">{row.berat.toFixed(1)} kg</div>
                  <div className="text-[13px] text-gray-700 text-center">{row.tinggi.toFixed(1)} cm</div>
                  <div className="text-[13px] font-bold text-btn-primary text-right pr-2">{row.zScore.toFixed(2)}</div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-2">
              <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-relaxed text-justify">
                Audit Trail: Seluruh data pertumbuhan telah divalidasi secara sistem menggunakan algoritma WHO Anthro 2005. Perubahan data historis hanya dapat dilakukan melalui otoritas Admin Puskesmas dengan alasan medis yang valid.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
