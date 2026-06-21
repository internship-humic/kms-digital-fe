"use client";

import { Button } from "@/components/ui/button";

type TambahPosyanduModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TambahPosyanduModal({
  isOpen,
  onClose,
}: TambahPosyanduModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[640px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40">
        <div className="p-8 border-b border-border-input/30 relative">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Tambah Posyandu Baru
          </h2>
          <p className="text-[14px] text-icon-muted">
            Daftarkan unit Posyandu baru dan tentukan lokasi operasionalnya.
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text-main">
              Pilih Desa <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <select
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-text-placeholder">
                  Pilih Desa Operasional
                </option>
                <option value="sukarame">Sukarame</option>
                <option value="karanganyar">Karanganyar</option>
                <option value="sidomulyo">Sidomulyo</option>
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
            <label className="text-[13px] font-bold text-text-main">
              Nama Posyandu <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan nama Posyandu (contoh: Melati 1)"
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main placeholder:text-text-placeholder outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-text-main">
              Alamat / Lokasi Lengkap <span className="text-danger">*</span>
            </label>
            <textarea
              placeholder="Detail alamat lokasi operasional Posyandu..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 bg-white text-[15px] text-text-main placeholder:text-text-placeholder outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary resize-none transition-all"
            ></textarea>
            <p className="text-[13px] text-icon-muted mt-1">
              Sertakan detail seperti RT/RW, nama jalan, atau patokan lokasi
              terdekat.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-background">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-transparent px-6 text-btn-primary hover:bg-primary-light"
          >
            Batal
          </Button>
          <Button onClick={onClose} className="px-6 gap-2 flex items-center">
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
            Simpan Posyandu
          </Button>
        </div>
      </div>
    </div>
  );
}
