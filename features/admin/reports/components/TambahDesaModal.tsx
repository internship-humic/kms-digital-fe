"use client";

import { Button } from "@/components/ui/button";

type TambahDesaModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TambahDesaModal({ isOpen, onClose }: TambahDesaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[640px] bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-gray-100 relative">
          <h2 className="text-[22px] font-bold text-gray-900 mb-1">Tambah Desa Baru</h2>
          <p className="text-[14px] text-gray-500">Tambahkan unit administratif desa/kelurahan baru ke dalam cakupan wilayah operasional sistem JagaCilik.</p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-800">
              Nama Desa / Kelurahan <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="Masukkan nama desa..." 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-700 outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-gray-800">
              Kecamatan / Kabupaten <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[15px] text-gray-700 outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary appearance-none">
                <option value="" disabled selected>Pilih Kecamatan/Kabupaten...</option>
                <option value="kec1">Kecamatan Sukarame</option>
                <option value="kec2">Kecamatan Karanganyar</option>
                <option value="kec3">Kecamatan Sidomulyo</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-[#dbeafe] text-[#1d4ed8] border-transparent hover:bg-blue-200 hover:text-[#1e3a8a] px-6"
          >
            Batal
          </Button>
          <Button 
            onClick={onClose}
            className="bg-[#004bd9] hover:bg-blue-800 text-white px-6 gap-2 flex items-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 21 20.4142 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Simpan Desa
          </Button>
        </div>
      </div>
    </div>
  );
}
