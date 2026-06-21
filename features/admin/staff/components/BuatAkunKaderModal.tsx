"use client";

import { Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

type BuatAkunKaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BuatAkunKaderModal({
  isOpen,
  onClose,
}: BuatAkunKaderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[800px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40">
        <div className="p-8 border-b border-border-input/30 relative">
          <h2 className="text-[24px] font-bold text-text-main mb-1">
            Buat Akun Kader Baru
          </h2>
          <p className="text-[15px] text-icon-muted">
            Lengkapi data di bawah untuk memberikan akses kader ke sistem.
          </p>
        </div>

        <div className="p-8 flex flex-col gap-8">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-text-main">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap kader"
                className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main placeholder:text-text-placeholder outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-text-main">
                Email / Username
              </label>
              <input
                type="text"
                placeholder="contoh: siti.kader@desa.id"
                className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main placeholder:text-text-placeholder outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all"
              />
            </div>
          </div>

          <div className="h-[1px] w-full bg-border-input/40"></div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-text-main">
                Desa Penugasan
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-text-placeholder">
                    Pilih Desa
                  </option>
                  <option value="sukamaju">Sukamaju</option>
                  <option value="karanganyar">Karanganyar</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-icon-muted">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-text-main">
                Posyandu Penugasan
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-background text-[15px] text-text-placeholder outline-none appearance-none cursor-not-allowed"
                  disabled
                >
                  <option value="" disabled>
                    Pilih Posyandu
                  </option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-border-input">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-[13px] text-icon-muted">
                *Pilih Desa terlebih dahulu
              </p>
            </div>
          </div>

          <div className="h-[1px] w-full bg-border-input/40"></div>

          {/* Security Card */}
          <div className="bg-background border border-border-input/40 rounded-[16px] p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-btn-primary">
                <Shield size={20} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-text-main mb-1">
                  Keamanan Akun
                </h3>
                <p className="text-[14px] text-icon-muted">
                  Buat password sementara untuk kader. Mereka akan diminta untuk
                  menggantinya saat login pertama kali.
                </p>
              </div>
            </div>
            <div className="ml-9">
              <Button className="bg-primary-light hover:bg-primary-light/80 text-btn-primary font-semibold flex items-center gap-2 rounded-xl px-4 py-2 border-none">
                <Key size={16} strokeWidth={2.5} />
                Generate Password Sementara
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-text-main border-border-input hover:bg-background px-8 py-6 rounded-xl font-semibold text-[15px]"
          >
            Batal
          </Button>
          <Button
            onClick={onClose}
            className="px-8 py-6 gap-2 flex items-center rounded-xl font-semibold text-[15px]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 21 20.4142 21Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 21V13H7V21"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 3V8H15"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Simpan Akun
          </Button>
        </div>
      </div>
    </div>
  );
}
