"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import NotifikasiList from "@/features/kader/notifikasi/components/NotifikasiList";
import { NOTIFIKASI_MOCK_DATA } from "@/features/kader/notifikasi/data/mockNotifikasi";

export default function NotifikasiPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background/95 backdrop-blur-md sticky top-0 z-20 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/40 transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-btn-primary w-full text-center">
          Notifikasi
        </h1>
      </div>

      <NotifikasiList items={NOTIFIKASI_MOCK_DATA} />
    </div>
  );
}
