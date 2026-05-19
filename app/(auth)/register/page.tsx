"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, Home } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import CustomSelect, { SelectOption } from "@/components/ui/CustomSelect";

const posyanduOptions = [
  { id: "posyandu-1", label: "Posyandu Mawar" },
  { id: "posyandu-2", label: "Posyandu Melati" },
  { id: "posyandu-3", label: "Posyandu Dahlia" },
  { id: "posyandu-4", label: "Posyandu Mekar" },
  { id: "posyandu-5", label: "Posyandu Anggrek" },
];

export default function RegisterPage() {
  const [selectedPosyandu, setSelectedPosyandu] = useState<SelectOption | null>(
    null,
  );

  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
      <div className="mb-8 mt-4 flex flex-col items-center">
        <Image
          src="/images/logo.svg"
          alt="JagaCilik Logo"
          width={280}
          height={90}
          priority
          className="mb-6 h-16 w-auto object-contain sm:h-20"
        />
        <h1 className="mb-2 text-2xl font-bold text-text-main">Buat Akun</h1>
        <p className="max-w-[280px] text-center text-sm text-text-main/70">
          Lengkapi data diri untuk mendaftar di JagaCilik
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <InputField
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          icon={User}
        />

        <CustomSelect
          label="Posyandu"
          placeholder="Pilih Posyandu"
          options={posyanduOptions}
          value={selectedPosyandu}
          onChange={setSelectedPosyandu}
        />

        <InputField
          label="Alamat Email"
          placeholder="Masukan Email Anda"
          type="email"
          icon={Mail}
        />

        <InputField
          label="Nomor Telepon"
          placeholder="Masukan Nomor Telepon"
          type="tel"
          icon={Phone}
        />

        <InputField
          label="Alamat Rumah"
          placeholder="Masukan Alamat Rumah"
          icon={Home}
        />

        <PasswordField label="Password" placeholder="Masukan Password Anda" />

        <PasswordField
          label="Konfirmasi Password"
          placeholder="Masukan Ulang Password Anda"
        />

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-btn-primary py-3.5 font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-btn-hover cursor-pointer"
        >
          Daftar Sekarang
        </button>
      </form>

      <div className="mb-4 mt-8 flex items-center justify-center gap-1.5 text-sm">
        <span className="text-text-main/70">Sudah punya akun?</span>
        <Link
          href="/login"
          className="font-bold text-btn-primary transition-all hover:underline cursor-pointer"
        >
          Masuk
        </Link>
      </div>
    </div>
  );
}
