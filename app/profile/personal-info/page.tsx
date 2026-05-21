"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, Home } from "lucide-react";
import CustomSelect, { SelectOption } from "@/components/ui/CustomSelect";
import { useState } from "react";

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

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfdfd]">
      {/* Header */}
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

      {/* Content */}
      <div className="px-6 pb-8 pt-2">
        <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          {/* Blue top border accent */}
          <div className="h-1.5 w-full bg-blue-600"></div>

          <div className="p-6">
            <h2 className="text-[22px] font-bold text-gray-900 mb-2">
              Edit Profil
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
              Perbarui informasi pribadi Anda untuk memastikan data akun tetap akurat.
            </p>

            <form className="flex flex-col gap-5">
              {/* Nama Lengkap */}
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

              {/* Posyandu */}
              <CustomSelect
                label="Posyandu"
                placeholder="Pilih Posyandu"
                options={posyanduOptions}
                value={selectedPosyandu}
                onChange={setSelectedPosyandu}
              />

              {/* Email */}
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

              {/* Nomor Telepon */}
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

              {/* Alamat Rumah */}
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
                type="button"
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
              >
                Edit Profil
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
