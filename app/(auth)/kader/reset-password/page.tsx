"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import PasswordField from "@/components/ui/PasswordField";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";

function KaderResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { form, onSubmit, globalError, isSuccess } = useResetPassword(
    token,
    "kader",
  );
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
          Atur Ulang Kata Sandi
        </h1>
        <p className="text-base font-normal text-text-main/60 text-center w-full max-w-[320px] leading-relaxed">
          Buat kata sandi baru untuk akun kader Anda.
        </p>
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 rounded-full bg-primary-light/60 flex items-center justify-center text-btn-primary">
            <CheckCircle2 size={28} strokeWidth={2.5} />
          </div>
          <p className="text-sm font-medium text-text-main/70 leading-relaxed max-w-[300px]">
            Kata sandi berhasil diperbarui. Anda akan diarahkan ke halaman
            masuk.
          </p>
        </div>
      ) : (
        <>
          {!token && (
            <div
              className="bg-danger/10 border border-danger/20 text-danger p-3.5 rounded-xl text-sm font-medium mb-5 flex items-center"
              role="alert"
            >
              Tautan atur ulang kata sandi tidak valid atau telah kedaluwarsa.
            </div>
          )}

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
            <PasswordField
              label="Kata Sandi Baru"
              placeholder="Masukan Kata Sandi Baru"
              {...register("password")}
              error={errors.password?.message}
            />

            <PasswordField
              label="Konfirmasi Kata Sandi"
              placeholder="Masukan Ulang Kata Sandi Baru"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || !token}
              className="mt-6 w-full"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Kata Sandi"}
            </Button>
          </form>

          <div className="mt-8 flex justify-center items-center gap-1.5 text-sm leading-[16px] tracking-[0.48px]">
            <Link
              href="/kader/login"
              className="text-btn-primary font-semibold hover:underline transition-all cursor-pointer"
            >
              Kembali ke Halaman Masuk
            </Link>
          </div>
        </>
      )}

      <div className="h-10"></div>
    </div>
  );
}

export default function KaderResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <KaderResetPasswordForm />
    </Suspense>
  );
}
