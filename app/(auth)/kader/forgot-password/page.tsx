"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, MailCheck } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export default function KaderForgotPasswordPage() {
  const { form, onSubmit, globalError, isSuccess } = useForgotPassword();
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
        <h1 className="text-6xl font-bold text-text-main mb-3 text-center tracking-tight">
          Lupa Kata Sandi
        </h1>
        <p className="text-base font-normal text-text-main/60 text-center w-full max-w-[320px] leading-relaxed">
          Masukkan email akun kader Anda, kami akan mengirimkan tautan atur
          ulang kata sandi.
        </p>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary-light/60 flex items-center justify-center text-btn-primary">
            <MailCheck size={28} strokeWidth={2.5} />
          </div>
          <p className="text-sm font-medium text-text-main/70 leading-relaxed max-w-[300px]">
            Jika email terdaftar, tautan atur ulang kata sandi telah kami kirim.
            Silakan periksa kotak masuk (atau folder spam) Anda.
          </p>
          <Link
            href="/kader/login"
            className="text-sm leading-[16px] tracking-[0.48px] text-btn-primary font-semibold hover:underline transition-all cursor-pointer mt-2"
          >
            Kembali ke Halaman Masuk
          </Link>
        </div>
      ) : (
        <>
          {globalError && (
            <div
              className="bg-danger/10 border border-danger/20 text-danger p-3.5 rounded-xl text-sm font-medium mb-5 flex items-center"
              role="alert"
            >
              {globalError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <InputField
              label="Email"
              placeholder="Masukan Email Kader Anda"
              type="email"
              icon={Mail}
              {...register("email")}
              error={errors.email?.message}
              aria-invalid={!!errors.email}
            />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-6 w-full"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Tautan"}
            </Button>
          </form>

          <div className="mt-8 flex justify-center items-center gap-1.5 text-sm leading-[16px] tracking-[0.48px]">
            <Link
              href="/kader/login"
              className="flex items-center gap-1 text-btn-primary font-semibold hover:underline transition-all cursor-pointer"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </>
      )}

      <div className="h-10"></div>
    </div>
  );
}
