"use client";

import Image from "next/image";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { MoreVertical, ArrowUpDown, Plus } from "lucide-react";

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="16" height="16" x="4" y="4" rx="3" />
    <path d="M8 9h8" />
    <path d="M12 14v.01" />
  </svg>
);

const MOCK_CHILDREN = [
  {
    id: 1,
    name: "Elzhard Rahadian",
    gender: "Laki-laki",
    age: "3 Tahun 2 Bulan",
    weight: "14.5 kg",
    height: "95 cm",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Nadlyne Aurora",
    gender: "Perempuan",
    age: "10 Bulan",
    weight: "8.2 kg",
    height: "72 cm",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop"
  }
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 bg-white flex flex-col relative overflow-y-auto pb-24">
        <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="w-10"></div>
          <div className="flex justify-center">
            <Image 
              src="/images/logo.svg" 
              alt="JagaCilik Logo" 
              width={110} 
              height={36} 
              priority
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="px-6 mt-4 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
            Hi, Arjanti 👋
          </h1>
          <p className="text-gray-500 text-[14.5px] leading-relaxed">
            Pantau terus tumbuh kembang si kecil dengan JagaCilik.
          </p>
        </div>

        <div className="px-6 flex flex-col gap-5">
          {MOCK_CHILDREN.map((child) => (
            <Link 
              href={`/dashboard/child/${child.id}`} 
              key={child.id} 
              className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 p-5 block transition-transform hover:scale-[1.02] active:scale-95"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-gray-100">
                  <img 
                    src={child.image} 
                    alt={child.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-2 relative z-10"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">{child.name}</h3>
              <p className="text-gray-500 text-[13.5px] mb-4">{child.gender} &bull; {child.age}</p>
              
              <div className="flex gap-2.5">
                <div className="flex items-center gap-1.5 bg-[#f1f5f9] px-3.5 py-1.5 rounded-full">
                  <ScaleIcon className="text-gray-600" />
                  <span className="text-[13.5px] font-semibold text-gray-700">{child.weight}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#f1f5f9] px-3.5 py-1.5 rounded-full">
                  <ArrowUpDown size={14} className="text-gray-600" />
                  <span className="text-[13.5px] font-semibold text-gray-700">{child.height}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all active:scale-95 z-20">
          <Plus size={26} strokeWidth={2.5} />
        </button>

      </div>
    </AppLayout>
  );
}
