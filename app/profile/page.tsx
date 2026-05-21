"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Lock, LogOut, Pen, PlusSquare, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-4 bg-[#fdfdfd] flex flex-col">
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
            Profil Orang Tua
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola data diri dan preferensi akun Anda.
          </p>
        </div>

        <div className="relative bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] overflow-hidden mb-6 border border-gray-50">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#E6F0FF] rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#E6F0FF] rounded-full"></div>

          <div className="relative p-5 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 ring-4 ring-white shadow-sm">
              <Image
                src="https://i.pravatar.cc/150?img=1"
                alt="Profile Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-900">Arjanti Atma</h2>
              <p className="text-sm text-gray-500">arjanti@gmail.com</p>
              <div className="flex items-center gap-1 bg-green-100/80 text-green-700 px-2.5 py-1 rounded-full mt-2 w-fit">
                <CheckCircle2 size={12} className="fill-green-600 text-white" />
                <span className="text-xs font-semibold">Akun Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6 border border-gray-50 p-5 overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-26 h-22 bg-[#E6F0FF] rounded-full"></div>

          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-3 relative">
              <User size={20} className="text-blue-600" />
              <h3 className="font-bold text-gray-900 text-[17px]">
                Personal Information
              </h3>
            </div>
            <Link
              href="/profile/personal-info"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 shadow-sm bg-white relative hover:bg-gray-50 transition-colors z-10"
            >
              <Pen size={14} className="text-blue-600" />
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </p>
              <p className="text-[15px] text-gray-800 font-medium">Arjanti Atma</p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Posyandu
              </p>
              <div className="flex items-center gap-2">
                <PlusSquare size={14} className="text-gray-500" />
                <p className="text-[15px] text-gray-800 font-medium">
                  Posyandu Melati 1
                </p>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Email
              </p>
              <p className="text-[15px] text-gray-800 font-medium">
                arjanti@gmail.com
              </p>
            </div>

            <div className="border-b border-gray-100 pb-3">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Nomor Telepon
              </p>
              <p className="text-[15px] text-gray-800 font-medium">
                +62 812-3456-7890
              </p>
            </div>

            <div className="pb-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Alamat Rumah
              </p>
              <p className="text-[15px] text-gray-800 font-medium leading-snug">
                Jl. Kenangan Indah No. 42, RT 03/RW 05, Kelurahan Damai, Jakarta
                Selatan
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-8 border border-gray-50 p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-blue-600" />
              <h3 className="font-bold text-gray-900 text-[17px]">Keamanan Akun</h3>
            </div>
            <Link href="/profile/security" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-100 shadow-sm bg-white hover:bg-gray-50 transition-colors">
              <Pen size={14} className="text-blue-600" />
            </Link>
          </div>

          <div className="border-b border-gray-100 pb-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Password
            </p>
            <p className="text-[15px] text-gray-800 font-medium tracking-widest mt-1">
              ••••••••
            </p>
          </div>
        </div>

        <div className="mt-auto pt-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3.5 rounded-full transition-colors"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
