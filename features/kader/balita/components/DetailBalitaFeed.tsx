"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Maximize2,
  Calculator,
  BookOpenText,
  Weight,
  ArrowUpDown,
  Ruler,
  Info,
} from "lucide-react";
import { BalitaDetail } from "../types";

export default function DetailBalitaFeed({ data }: { data: BalitaDetail }) {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-background pb-10">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/50 -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-btn-primary w-full text-center">
          Detail Data Balita
        </h1>
      </div>

      <div className="px-6 flex flex-col gap-6 pt-6">
        <div className="bg-white p-4 rounded-[20px] border border-border-input/40 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0 border border-primary-light/50 shadow-sm">
            <span className="text-[22px] font-bold text-btn-primary tracking-widest select-none">
              {data.nama.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-text-main align-middle leading-[28px]">
              {data.nama}
            </h2>
            <p className="text-[14px] font-normal text-icon-muted leading-[100%] align-middle">
              {data.jk} &bull; {data.usia}
            </p>
          </div>
        </div>

        <div className="bg-status-normal text-white px-4 py-2 rounded-full w-fit flex items-center gap-2 font-semibold text-[16px] leading-[16px]">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
          Status: {data.status}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <Weight
              className="text-btn-primary mb-3 h-6 w-6"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Berat
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {data.stats.berat}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                kg
              </span>
            </div>
          </div>
          <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <ArrowUpDown
              size={24}
              className="text-btn-primary mb-3"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Tinggi
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {data.stats.tinggi}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                cm
              </span>
            </div>
          </div>
          <div className="col-span-2 bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <Ruler
              className="text-btn-primary mb-3 h-6 w-6"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Lingkar Kepala
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {data.stats.lingkarKepala}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                cm
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-border-input/40 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[20px] font-semibold leading-[28px] text-text-main">
              Grafik Tren Pertumbuhan Otomatis
            </h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-[#E6E8EA] flex items-center justify-center text-text-main">
                <Download size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#E6E8EA] flex items-center justify-center text-text-main">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
          <p className="text-[14px] text-icon-muted mb-4">
            Visualisasi Berat Badan vs Umur (Bulan)
          </p>

          <div className="bg-white border border-border-input/20 rounded-[16px] p-4 shadow-sm w-full h-[280px] flex flex-col relative overflow-hidden">
            <div className="flex-1 w-full relative">
              <svg
                viewBox="0 0 300 180"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="30"
                  x2="300"
                  y2="30"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="90"
                  x2="300"
                  y2="90"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="150"
                  x2="300"
                  y2="150"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="180"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <line
                  x1="0"
                  y1="180"
                  x2="300"
                  y2="180"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M 0 160 Q 150 140 300 80"
                  fill="none"
                  stroke="#fca5a5"
                  strokeWidth="2"
                />
                <path
                  d="M 0 140 Q 150 120 300 50"
                  fill="none"
                  stroke="#fca5a5"
                  strokeWidth="2"
                />
                <path
                  d="M 0 150 Q 150 130 300 65"
                  fill="none"
                  stroke="#86efac"
                  strokeWidth="2.5"
                />
                <path
                  d="M 20 165 L 80 150 L 150 125"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <circle cx="20" cy="165" r="4" fill="#2563eb" />
                <circle cx="80" cy="150" r="4" fill="#2563eb" />
                <circle cx="150" cy="125" r="4" fill="#2563eb" />
              </svg>
              <div className="absolute top-0 left-2 text-[10px] text-gray-400 rotate-90 origin-top-left translate-y-6">
                Berat (kg)
              </div>
              <div className="absolute bottom-1 left-2 text-[10px] text-gray-400">
                Bulan 0
              </div>
              <div className="absolute bottom-1 right-2 text-[10px] text-gray-400">
                Bulan 24
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                <span className="text-[9px] font-bold text-gray-500 tracking-wider">
                  GARIS NORMAL
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                <span className="text-[9px] font-bold text-gray-500 tracking-wider">
                  AMBANG BATAS
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <span className="text-[9px] font-bold text-gray-500 tracking-wider">
                  DATA ARKA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border-input/40 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#DBE1FF] flex items-center justify-center text-btn-primary">
              <Calculator size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-text-main">
                Kalkulasi Z-Score Otomatis
              </span>
              <span className="text-[11px] text-icon-muted">
                Hasil instan setiap input data baru
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border-input/40 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#DBE1FF] flex items-center justify-center text-btn-primary">
              <BookOpenText size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-text-main">
                Standar Antropometri Kemenkes
              </span>
              <span className="text-[11px] text-icon-muted">
                Sesuai Permenkes No. 2 Tahun 2020
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-text-main">
              Riwayat Pengukuran
            </h3>
            <button className="text-[13px] font-medium text-btn-primary hover:underline">
              Lihat Semua {">"}
            </button>
          </div>

          <div className="bg-white border border-border-input/20 rounded-[16px] overflow-hidden shadow-sm flex flex-col">
            <div className="grid grid-cols-4 bg-gray-50/80 p-4 border-b border-gray-100">
              <div className="text-[11px] font-bold text-gray-500 tracking-wider">
                TANGGAL
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">
                BERAT
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">
                TINGGI
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-right pr-2">
                Z-SCORE
              </div>
            </div>

            <div className="flex flex-col">
              {data.riwayat.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-4 p-4 items-center ${idx !== data.riwayat.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="text-[13px] text-gray-700">{row.tanggal}</div>
                  <div className="text-[13px] text-gray-700 text-center">
                    {parseFloat(row.berat).toFixed(1)} kg
                  </div>
                  <div className="text-[13px] text-gray-700 text-center">
                    {parseFloat(row.tinggi).toFixed(1)} cm
                  </div>
                  <div className="text-[13px] font-bold text-btn-primary text-right pr-2">
                    {parseFloat(row.zscore).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-2">
              <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-relaxed text-justify">
                Audit Trail: Seluruh data pertumbuhan telah divalidasi secara
                sistem menggunakan algoritma WHO Anthro 2005. Perubahan data
                historis hanya dapat dilakukan melalui otoritas Admin Puskesmas
                dengan alasan medis yang valid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
