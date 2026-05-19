"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token-123");
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8 min-h-screen bg-white justify-center">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo.svg"
          alt="JagaCilik Logo"
          width={280}
          height={90}
          className="mb-6 h-16 sm:h-20 w-auto object-contain"
          priority
        />
        <h1 className="text-[26px] font-bold text-text-main mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-sm font-normal text-text-main text-center w-full whitespace-nowrap">
          Enter your email and password to access your account
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <InputField
          label="Email atau Nomor Telepon"
          placeholder="Masukan Email atau Nomor Anda"
          icon={Mail}
          required
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            label="Password"
            placeholder="Masukan Password Anda"
            required
          />
          <div className="flex justify-end mt-1">
            <Link
              href="#"
              className="text-xs leading-[16px] tracking-[0.48px] text-btn-primary font-medium hover:underline transition-all cursor-pointer"
            >
              Lupa password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="mt-8 mb-4 flex justify-center items-center gap-1.5 text-xs leading-[16px] tracking-[0.48px]">
        <span className="text-text-main/70">Belum punya akun?</span>
        <Link
          href="/register"
          className="text-btn-primary font-bold hover:underline transition-all cursor-pointer"
        >
          Buat Akun
        </Link>
      </div>
    </div>
  );
}
