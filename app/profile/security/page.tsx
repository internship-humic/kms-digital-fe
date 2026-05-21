"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, Check } from "lucide-react";

export default function SecurityPage() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          Keamanan Akun
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 pb-8 pt-2">
        <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          {/* Blue top border accent */}
          <div className="h-1.5 w-full bg-blue-600"></div>

          <div className="p-6">
            <h2 className="text-[22px] font-bold text-gray-900 mb-2">
              Ubah Kata Sandi
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
              Untuk menjaga keamanan akun Anda, silakan buat kata sandi baru
              yang kuat sebelum melanjutkan.
            </p>

            {/* Kata Sandi Baru */}
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                Kata Sandi Baru
              </label>
              <div className="relative flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <Lock size={18} className="text-gray-400 mr-3 shrink-0" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  defaultValue="Itnajra1O!"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="shrink-0 p-1 -mr-1"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              <div className="mt-4">
                <div className="flex gap-2 w-full mb-2">
                  <div className="h-1.5 flex-1 bg-[#2e7d32] rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-[#2e7d32] rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-[#2e7d32] rounded-full"></div>
                  <div className="h-1.5 flex-1 bg-[#2e7d32] rounded-full"></div>
                </div>
                <div className="flex justify-between items-center text-[12px] font-semibold mb-5">
                  <span className="text-[#2e7d32]">Kuat</span>
                  <span className="text-[#f57c00]">Cukup baik!</span>
                </div>

                {/* Criteria List */}
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="fill-[#2e7d32] text-white" />
                    <span className="text-[14px] text-gray-600">Minimal 8 karakter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="fill-[#2e7d32] text-white" />
                    <span className="text-[14px] text-gray-600">Mengandung huruf besar & kecil</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="fill-[#2e7d32] text-white" />
                    <span className="text-[14px] text-gray-600">Mengandung angka atau simbol</span>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Konfirmasi Kata Sandi */}
            <div className="mb-8">
              <label className="block text-[13px] font-bold text-gray-900 mb-2.5">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative flex items-center bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all mb-3">
                <Lock size={18} className="text-gray-400 mr-3 shrink-0" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  defaultValue="Itnajra1O!"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="shrink-0 p-1 -mr-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-500" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-[#2e7d32]">
                <Check size={14} strokeWidth={3} />
                <span className="text-[13px] font-medium">Kata sandi cocok</span>
              </div>
            </div>

            <button className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-blue-500/20">
              Perbarui Kata Sandi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
