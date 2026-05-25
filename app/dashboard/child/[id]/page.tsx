"use client";

import { ArrowLeft, Info, Download, Smile, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const MOCK_DATA = [
  { month: "Bulan 0", weight: 3, height: 50 },
  { month: "Bulan 1", weight: 4.5, height: 54 },
  { month: "Bulan 2", weight: 4.2, height: 57 },
  { month: "Bulan 3", weight: 5.5, height: 60 },
  { month: "Bulan 4", weight: 7, height: 62 },
  { month: "Bulan 5", weight: 6.5, height: 64 },
  { month: "Bulan 6", weight: 6.0, height: 66 },
  { month: "Bulan 7", weight: 7.2, height: 68 },
  { month: "Bulan 8", weight: 8.5, height: 70 },
  { month: "Bulan 9", weight: 9.5, height: 72 },
  { month: "Bulan 10", weight: 9.0, height: 73 },
  { month: "Bulan 11", weight: 8.5, height: 74 },
  { month: "Bulan 12", weight: 9.2, height: 76 },
  { month: "Bulan 13", weight: 10.0, height: 77 },
  { month: "Bulan 14", weight: 10.5, height: 78 },
  { month: "Bulan 15", weight: 11.2, height: 80 },
];

const CustomTooltip = ({ active, payload, isWeight }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-[14px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] p-2.5 flex items-center gap-3 border border-gray-100">
        <div className="bg-blue-600 text-white rounded-full p-1 shrink-0">
          <Smile size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col pr-2">
           <span className="text-blue-600 font-bold text-[13px] leading-tight">
             {isWeight ? `Berat ${payload[0].value} kg` : `Tinggi ${payload[0].value} cm`}
           </span>
           <span className="text-gray-500 font-medium text-[11px] mt-0.5">Usia {payload[0].payload.month.split(' ')[1]} Bulan</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ChildDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'bb' | 'tb'>('bb');

  const isWeight = activeTab === 'bb';

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfdfd] relative">
      <div className="flex items-center px-6 py-5 bg-[#fdfdfd] sticky top-0 z-10">
        <Link
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors -ml-2 absolute left-6 z-20"
        >
          <ArrowLeft size={24} className="text-blue-600" />
        </Link>
        <h1 className="text-[20px] font-bold text-blue-600 w-full text-center">
          KMS Digital
        </h1>
      </div>

      <div className="px-6 pb-32 pt-2 flex-1 overflow-y-auto">
        <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-50 p-4 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-100 shrink-0">
             <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop" alt="Elzhard" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
             <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">Elzhard Rahadian</h2>
             <p className="text-gray-500 text-[13px]">Laki-laki &bull; 3 Tahun 2 Bulan</p>
          </div>
          <div className="bg-[#10B981] text-white text-[12px] font-bold px-3 py-1.5 rounded-full shrink-0 transition-all">
             {isWeight ? 'BB Normal' : 'TB Normal'}
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-50 p-5 mb-4">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-bold text-gray-900">Grafik Pertumbuhan</h3>
            <button className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              <Info size={14} />
              <span className="text-[12px] font-semibold">Standar WHO</span>
            </button>
          </div>

          <div className="flex bg-[#f8fafc] p-1.5 rounded-2xl mb-6 relative">
            <button 
              onClick={() => setActiveTab('bb')}
              className={`flex-1 font-semibold text-[13.5px] py-2.5 rounded-xl transition-all z-10 ${isWeight ? 'bg-white text-gray-900 shadow-sm font-bold' : 'text-gray-500'}`}
            >
              Berat Badan (BB)
            </button>
            <button 
              onClick={() => setActiveTab('tb')}
              className={`flex-1 font-semibold text-[13.5px] py-2.5 rounded-xl transition-all z-10 ${!isWeight ? 'bg-white text-gray-900 shadow-sm font-bold' : 'text-gray-500'}`}
            >
              Tinggi Badan (TB)
            </button>
          </div>

          <div className="bg-[#f8fafc] rounded-[20px] p-4 pt-6 h-[260px] relative mb-6 border border-gray-100/50">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <Tooltip content={<CustomTooltip isWeight={isWeight} />} cursor={{ stroke: '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                 <Area 
                    type="monotone" 
                    dataKey={isWeight ? "weight" : "height"} 
                    stroke="#2563EB" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorGradient)" 
                    activeDot={{ r: 6, fill: '#2563EB', stroke: 'white', strokeWidth: 3 }} 
                 />
               </AreaChart>
             </ResponsiveContainer>
             <div className="absolute top-4 left-4 text-[11px] font-semibold text-gray-500">
               {isWeight ? 'Berat (kg)' : 'Tinggi (cm)'}
             </div>
             <div className="flex justify-between items-center w-full mt-3 px-1 text-[11px] font-semibold text-gray-400">
                <span>Bulan 0</span>
                <span>Bulan 15</span>
             </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-[#f8fafc] rounded-2xl p-4 border border-gray-100/50">
              <p className="text-[12px] font-semibold text-gray-500 mb-2">Pengukuran Terakhir</p>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-[28px] font-bold text-gray-900 leading-none tracking-tight">
                  {isWeight ? '11.2' : '80'}
                </span>
                <span className="text-[14px] font-semibold text-gray-700">
                  {isWeight ? 'kg' : 'cm'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 font-bold text-[13px]">
                <TrendingUp size={16} strokeWidth={3} />
                <span>{isWeight ? '+0.4 kg' : '+2 cm'}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-[#f8fafc] rounded-2xl p-4 border border-gray-100/50 flex flex-col justify-between">
              <p className="text-[12px] font-semibold text-gray-500 mb-2">Status WHO</p>
              <div className="flex items-center gap-2.5 mb-2">
                 <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                 <span className="text-[#10B981] font-bold text-[15px]">Normal (P50)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-6 bg-gradient-to-t from-[#fdfdfd] via-[#fdfdfd]/90 to-transparent pb-8 pt-12 pointer-events-none">
        <button className="w-full bg-[#0A52D1] hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/20 transition-transform active:scale-95 pointer-events-auto">
          <Download size={20} strokeWidth={2.5} />
          <span className="text-[15px]">Unduh Laporan (PDF)</span>
        </button>
      </div>

    </div>
  );
}
