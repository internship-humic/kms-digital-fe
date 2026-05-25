"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Home } from "lucide-react";
import CustomSelect, { SelectOption } from "@/components/ui/CustomSelect";
import { useState, useEffect } from "react";

const posyanduOptions = [
  { id: "posyandu-1", label: "Posyandu Mawar" },
  { id: "posyandu-2", label: "Posyandu Melati" },
  { id: "posyandu-3", label: "Posyandu Dahlia" },
  { id: "posyandu-4", label: "Posyandu Mekar" },
  { id: "posyandu-5", label: "Posyandu Anggrek" },
];

export default function PersonalInfoPage() {
  const router = useRouter();
  const [selectedPosyandu, setSelectedPosyandu] = useState<SelectOption | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        router.push("/profile");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showModal, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfdfd]">
      <div className="flex items-center px-6 py-5 bg-[#fdfdfd] sticky top-0 z-10 relative">
        <Link
          href="/profile"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors -ml-2 absolute left-6 z-20"
        >
          <ArrowLeft size={24} className="text-blue-600" />
        </Link>
        <h1 className="text-[20px] font-bold text-blue-600 w-full text-center">
          Personal Information
        </h1>
      </div>

      <div className="px-6 pb-8 pt-2">
        <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          <div className="h-1.5 w-full bg-blue-600"></div>

          <div className="p-6">
            <h2 className="text-[22px] font-bold text-gray-900 mb-2">
              Edit Profil
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
              Perbarui informasi pribadi Anda untuk memastikan data akun tetap akurat.
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                  Nama Lengkap
                </label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <User size={18} className="text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Masukan Nama Lengkap"
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <CustomSelect
                label="Posyandu"
                placeholder="Pilih Posyandu"
                options={posyanduOptions}
                value={selectedPosyandu}
                onChange={setSelectedPosyandu}
              />

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                  Email
                </label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <Mail size={18} className="text-gray-400 mr-3 shrink-0" />
                  <input
                    type="email"
                    placeholder="Masukan Email"
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                  Nomor Telepon
                </label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <Phone size={18} className="text-gray-400 mr-3 shrink-0" />
                  <input
                    type="tel"
                    placeholder="Masukan Nomor Telepon"
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                  Alamat Rumah
                </label>
                <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <Home size={18} className="text-gray-400 mr-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Masukan Alamat Rumah"
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
              >
                Edit Profil
              </button>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-6 scale-110">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="20" width="50" height="65" rx="4" fill="#D3A581"/>
                <rect x="30" y="25" width="40" height="55" fill="#FFFFFF"/>
                <rect x="35" y="60" width="30" height="2" fill="#E2E8F0"/>
                <rect x="35" y="66" width="30" height="2" fill="#E2E8F0"/>
                <rect x="35" y="72" width="20" height="2" fill="#E2E8F0"/>
                
                <circle cx="50" cy="42" r="12" fill="#F87171"/>
                <circle cx="50" cy="39" r="4.5" fill="#38BDF8"/>
                <path d="M42 48 C42 44.5, 58 44.5, 58 48" fill="#38BDF8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
                
                <rect x="42" y="15" width="16" height="8" rx="2" fill="#E2E8F0"/>
                <circle cx="50" cy="19" r="2" fill="#F8FAFC"/>
                
                <g transform="translate(68, 20) rotate(35)">
                  <path d="M0 0 L8 0 L8 25 L4 32 L0 25 Z" fill="#FCD34D"/>
                  <path d="M0 0 L8 0 L8 6 L0 6 Z" fill="#475569"/>
                  <path d="M4 32 L2.5 29 L5.5 29 Z" fill="#94A3B8"/>
                </g>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">
              Profil Berhasil Diperbarui!
            </h3>
            <p className="text-[14px] text-gray-500 text-center leading-relaxed mb-2">
              Profil Anda telah berhasil diubah dan siap digunakan kembali.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
