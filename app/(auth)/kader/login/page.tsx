"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function KaderLoginPage() {
  const { form, onSubmit, globalError } = useLogin("kader");
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8 min-h-screen bg-white justify-center">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/images/logo.svg"
          alt="JagaCilik Logo"
          width={280}
          height={90}
          className="mb-8 h-16 sm:h-20 w-auto object-contain"
          priority
        />
        <h1 className="text-[26px] font-bold text-text-main mb-3 text-center tracking-tight">
          Masuk ke Akun Kader
        </h1>
        <p className="text-[14.5px] font-normal text-text-main/60 text-center w-full max-w-[320px] leading-relaxed">
          Kelola data balita, jadwal posyandu, dan informasi kesehatan anak
          dalam satu aplikasi.
        </p>
      </div>

      {globalError && (
        <div
          className="bg-danger/10 border border-danger/20 text-danger p-3.5 rounded-xl text-[13.5px] font-medium mb-5 flex items-center"
          role="alert"
        >
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <InputField
          label="Email"
          placeholder="Masukan Email Anda"
          icon={Mail}
          {...register("email")}
          error={errors.email?.message}
          aria-invalid={!!errors.email}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            label="Kata Sandi"
            placeholder="Masukan Kata Sandi"
            {...register("password")}
            error={errors.password?.message}
            aria-invalid={!!errors.password}
          />
          <div className="flex justify-end mt-2">
            <Link
              href="/kader/forgot-password"
              className="text-[13px] leading-[16px] tracking-[0.48px] text-btn-primary font-semibold hover:underline transition-all cursor-pointer"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? "Sedang memproses login" : "Masuk ke akun Kader"
          }
          className="mt-6 w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 cursor-pointer tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <div className="h-10"></div>
    </div>
  );
}
