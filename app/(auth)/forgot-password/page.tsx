"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, MailCheck } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const { form, onSubmit, globalError, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8 min-h-screen bg-white justify-center">
      <div className={`flex flex-col items-center ${isSuccess ? 'mb-4' : 'mb-8'}`}>
        <Image
          src="/images/logo.svg"
          alt="JagaCilik Logo"
          width={280}
          height={90}
          className={`h-16 sm:h-20 w-auto object-contain ${isSuccess ? 'mb-2' : 'mb-6'}`}
          priority
        />
        {!isSuccess && (
          <>
            <h1 className="text-6xl font-bold text-text-main mb-2 text-center">
              Lupa Password?
            </h1>
            <p className="text-sm font-normal text-text-main text-center w-full">
              Masukkan email Anda, kami akan mengirimkan tautan reset password.
            </p>
          </>
        )}
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary-light/60 flex items-center justify-center text-btn-primary">
            <MailCheck size={28} strokeWidth={2.5} />
          </div>
          <p className="text-base font-medium text-text-main/80 leading-relaxed max-w-[320px]">
            Jika email terdaftar, tautan reset password telah kami kirim.
            Silakan periksa kotak masuk (atau folder spam) Anda.
          </p>
          <Link
            href="/login"
            className="text-base font-semibold text-btn-primary hover:underline mt-2"
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
              placeholder="Masukan Email Terdaftar Anda"
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
              className="mt-2 w-full"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
            </Button>
          </form>

          <div className="mt-8 mb-4 flex justify-center items-center gap-1.5 text-xs leading-[16px] tracking-[0.48px]">
            <Link
              href="/login"
              className="flex items-center gap-1 text-btn-primary font-semibold hover:underline transition-all cursor-pointer"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
