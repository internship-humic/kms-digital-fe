"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowUpDown, Activity } from "lucide-react";

const CHILDREN_DATA = [
  {
    id: 1,
    name: "Elzhard Rahadian",
    details: "Laki-laki • 24 bulan",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nadlyne Aurora",
    details: "Perempuan • 10 bulan",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop"
  }
];

export default function GrowthPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChild, setActiveChild] = useState(CHILDREN_DATA[0]);

  return (
    <AppLayout>
      <div className="flex-1 bg-[#fcfcfd] flex flex-col min-h-0 relative">
        <div className="px-6 py-5 bg-[#fcfcfd] sticky top-0 z-10">
          <h1 className="text-[20px] font-bold text-blue-700 text-center">
            Growth
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 pt-2">
          
          <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 p-2 mb-6 transition-all duration-300">
            <div 
              className="flex items-center gap-4 p-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shrink-0">
                <img src={activeChild.image} alt={activeChild.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">{activeChild.name}</h2>
                <p className="text-gray-400 text-[13px]">{activeChild.details}</p>
              </div>
              <div className="text-blue-700 pr-2">
                {isOpen ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                )}
              </div>
            </div>

            {isOpen && (
              <div className="mt-2 pt-2 border-t border-gray-50 flex flex-col gap-1">
                {CHILDREN_DATA.map((child) => {
                  if (child.id === activeChild.id) return null;
                  return (
                    <div 
                      key={child.id}
                      className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors"
                      onClick={() => {
                        setActiveChild(child);
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 shrink-0 opacity-70">
                        <img src={child.image} alt={child.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 opacity-70">
                        <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">{child.name}</h2>
                        <p className="text-gray-400 text-[13px]">{child.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-6">
            <div className="bg-[#10B981] text-white rounded-full px-4 py-2 font-bold text-[14px] flex items-center gap-2 w-fit mb-6">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              Status: NORMAL
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-6 h-6 border-[2px] border-gray-400 rounded flex items-center justify-center mb-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-[13px] text-gray-400 font-medium mb-1">Berat</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-bold text-gray-900">12.5</span>
                  <span className="text-[13px] text-gray-500 font-medium">kg</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <ArrowUpDown size={24} className="text-gray-400 mb-3" strokeWidth={2} />
                <p className="text-[13px] text-gray-400 font-medium mb-1">Tinggi</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-bold text-gray-900">86.2</span>
                  <span className="text-[13px] text-gray-500 font-medium">cm</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-6 h-6 border-[2px] border-gray-400 rounded-full mb-3"></div>
                <p className="text-[13px] text-gray-400 font-medium mb-1">Lingkar Kepala</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-bold text-gray-900">48.0</span>
                  <span className="text-[13px] text-gray-500 font-medium">cm</span>
                </div>
              </div>

              <Link 
                href={`/dashboard/child/${activeChild.id}`}
                className="bg-[#f8fafc] rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <Activity size={32} className="text-blue-600" strokeWidth={2.5} />
                <span className="text-[13px] font-semibold text-blue-600 text-center">Lihat KMS Digital</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-[32px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 p-6 mb-4 min-h-[300px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[17px] font-bold text-gray-900">Riwayat Pemeriksaan</h3>
              <button className="text-[13px] font-bold text-blue-600">Lihat Semua</button>
            </div>

            <div className="relative pl-3">
              <div className="absolute top-2 bottom-0 left-[18px] w-0.5 bg-blue-100"></div>
              
              <div className="relative mb-6">
                <div className="absolute -left-3 top-1 w-6 h-6 bg-blue-100 rounded flex items-center justify-center z-10 shadow-sm border border-white">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-sm flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                  </div>
                </div>
                
                <div className="pl-8">
                  <p className="text-[12px] font-semibold text-gray-500 mb-2">15 Mei 2026</p>
                  <div className="bg-[#fcfcfd] rounded-2xl border border-gray-100 p-4">
                    <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">Posyandu Melati 2</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      Pemeriksaan rutin bulanan. Imunisasi DPT lanjutan...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}
