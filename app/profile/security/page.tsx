"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, Check } from "lucide-react";

export default function SecurityPage() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          Keamanan Akun
        </h1>
      </div>

      <div className="px-6 pb-8 pt-2">
        <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 overflow-hidden">
          <div className="h-1.5 w-full bg-blue-600"></div>

          <div className="p-6">
            <h2 className="text-[22px] font-bold text-gray-900 mb-2">
              Ubah Kata Sandi
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
              Untuk menjaga keamanan akun Anda, silakan buat kata sandi baru
              yang kuat sebelum melanjutkan.
            </p>

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

            <button 
              onClick={handleSubmit}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-blue-500/20"
            >
              Perbarui Kata Sandi
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-6 scale-110">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="25" width="60" height="40" rx="2" fill="#3B82F6"/>
                <rect x="25" y="22" width="50" height="40" rx="2" fill="#60A5FA"/>
                <rect x="28" y="25" width="44" height="34" fill="#93C5FD"/>
                <rect x="45" y="62" width="10" height="8" fill="#E2E8F0"/>
                <path d="M35 70 L65 70 L60 62 L40 62 Z" fill="#CBD5E1"/>
                
                <circle cx="50" cy="36" r="10" fill="#3B82F6"/>
                <circle cx="50" cy="34" r="3.5" fill="#F87171"/>
                <path d="M44 41 C44 38, 56 38, 56 41" fill="#F87171" stroke="#F87171" strokeWidth="2" strokeLinecap="round"/>
                
                <rect x="35" y="48" width="30" height="8" rx="4" fill="#E2E8F0"/>
                <circle cx="40" cy="52" r="1" fill="#3B82F6"/>
                <circle cx="44" cy="52" r="1" fill="#3B82F6"/>
                <circle cx="48" cy="52" r="1" fill="#3B82F6"/>
                <circle cx="52" cy="52" r="1" fill="#3B82F6"/>
                
                <path d="M54 52 C54 50, 58 50, 58 52 L58 60 C58 58, 62 58, 62 60 L62 62 C62 60, 66 60, 66 62 L66 64 C66 62, 70 62, 70 64 L70 72 C70 76, 62 80, 58 80 L52 80 C48 80, 44 76, 44 72 L44 64 L48 62 L50 64 L50 52 C50 50, 54 50, 54 52 Z" fill="#FDBA74"/>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-blue-700 mb-3 text-center">
              Kata Sandi Berhasil Diubah!
            </h3>
            <p className="text-[14px] text-gray-500 text-center leading-relaxed mb-2">
              Kata sandi baru Anda telah berhasil dibuat dan perubahan berhasil disimpan pada akun Anda.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
