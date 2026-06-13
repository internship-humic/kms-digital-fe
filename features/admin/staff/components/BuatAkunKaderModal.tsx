"use client";

import { Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

type BuatAkunKaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BuatAkunKaderModal({ isOpen, onClose }: BuatAkunKaderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[800px] bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-gray-100 relative">
          <h2 className="text-[24px] font-bold text-[#1a1c29] mb-1">Buat Akun Kader Baru</h2>
          <p className="text-[15px] text-gray-500">Lengkapi data di bawah untuk memberikan akses kader ke sistem.</p>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Nama Lengkap
              </label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap kader" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-700 outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Email / Username
              </label>
              <input 
                type="text" 
                placeholder="contoh: siti.kader@desa.id" 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-700 outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary"
              />
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-100"></div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Desa Penugasan
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-700 outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary appearance-none">
                  <option value="" disabled selected>Pilih Desa</option>
                  <option value="sukamaju">Sukamaju</option>
                  <option value="karanganyar">Karanganyar</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-800">
                Posyandu Penugasan
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#f8f9fc] text-[15px] text-gray-400 outline-none appearance-none cursor-not-allowed" disabled>
                  <option value="" disabled selected>Pilih Posyandu</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="text-[13px] text-gray-500">*Pilih Desa terlebih dahulu</p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-100"></div>

          {/* Security Card */}
          <div className="bg-[#f8f9fc] border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-btn-primary">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 mb-1">Keamanan Akun</h3>
                <p className="text-[14px] text-gray-600">Buat password sementara untuk kader. Mereka akan diminta untuk menggantinya saat login pertama kali.</p>
              </div>
            </div>
            <div className="ml-9">
              <Button className="bg-[#dbeafe] hover:bg-blue-200 text-[#1d4ed8] font-semibold flex items-center gap-2 rounded-lg px-4 py-2 border-none">
                <Key size={16} />
                Generate Password Sementara
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 flex justify-end gap-3 bg-white">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-gray-700 border-gray-200 hover:bg-gray-50 px-8 py-6 rounded-lg font-semibold text-[15px]"
          >
            Batal
          </Button>
          <Button 
            onClick={onClose}
            className="bg-[#004bd9] hover:bg-blue-800 text-white px-8 py-6 rounded-lg font-semibold text-[15px]"
          >
            Simpan Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
