"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Home,
  SquarePlus,
  ChevronDown,
  Lock,
  EyeOff,
  Eye,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8 overflow-y-auto">
      {/* Header & Logo */}
      <div className="flex flex-col items-center mb-8 mt-4">
        {/* Logo Placeholder */}
        <div className="w-16 h-16 bg-primary-light/50 rounded-2xl flex items-center justify-center mb-5">
          <div className="flex items-center gap-1">
            <span className="text-primary text-[10px] font-bold">
              Jaga Cilik
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Buat Akun</h1>
        <p className="text-sm text-foreground/60 text-center max-w-[280px]">
          Lengkapi data diri untuk mendaftar di JagaCilik
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4">
        {/* Nama Lengkap */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Nama Lengkap
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Alamat Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Alamat Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="contoh@email.com"
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Nomor Telepon */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Nomor Telepon
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              placeholder="081234567890"
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Alamat Rumah */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Alamat Rumah
          </label>
          <div className="relative">
            <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan alamat lengkap"
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Pilih Posyandu */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Pilih Posyandu Terdaftar
          </label>
          <div className="relative">
            <SquarePlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              defaultValue=""
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-foreground"
            >
              <option value="" disabled className="text-gray-400">
                Pilih Posyandu
              </option>
              <option value="posyandu-1">Posyandu Mawar</option>
              <option value="posyandu-2">Posyandu Melati</option>
              <option value="posyandu-3">Posyandu Anggrek</option>
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimal 8 karakter"
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-primary hover:bg-primary-base text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors shadow-md shadow-primary/20"
        >
          Daftar Sekarang
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-8 mb-4 flex justify-center items-center gap-1.5 text-sm">
        <span className="text-foreground/70">Sudah punya akun?</span>
        <Link
          href="/login"
          className="text-primary font-bold hover:underline transition-all"
        >
          Masuk
        </Link>
      </div>
    </div>
  );
}
