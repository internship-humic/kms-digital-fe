"use client";

import { Plus } from "lucide-react";

export default function DashboardActions() {
  const handleAddChild = () => {
    console.log("Navigasi ke form tambah anak");
  };

  return (
    <div className="sticky bottom-6 w-full flex justify-end px-6 z-20 mt-auto pointer-events-none">
      <button
        onClick={handleAddChild}
        aria-label="Tambah data anak"
        className="pointer-events-auto w-14 h-14 bg-btn-primary hover:bg-btn-hover text-white rounded-[16px] flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>
    </div>
  );
}
