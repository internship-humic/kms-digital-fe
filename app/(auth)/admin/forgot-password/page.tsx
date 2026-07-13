"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, MailCheck } from "lucide-react";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export default function AdminForgotPasswordPage() {
  const { form, onSubmit, globalError, isSuccess } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <main className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-[#f8f5ff] px-6">
      <section className="flex h-[600px] w-full max-w-[1024px] overflow-hidden rounded-[10px] border border-border-input/70 bg-white shadow-sm">
        <div className="relative hidden w-1/2 overflow-hidden border-r border-border-input/50 bg-[#eef9ff] lg:block">
          <Image
            src="/images/loginadmin.png"
            alt="Admin Forgot Password Illustration"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-6 pb-8 pt-20">
            <h2 className="text-[25px] font-bold text-btn-primary">
              JagaCilik
            </h2>
            <p className="mt-2 text-lg text-icon-muted">
              Sistem Informasi Pengawasan Kesehatan Anak Terpadu.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-8 lg:w-1/2">
          <div className="w-full max-w-[360px]">
            {!isSuccess && (
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-text-main mb-2">
                  Lupa Password?
                </h1>
                <p className="text-[13px] text-text-main/70">
                  Masukkan email admin Anda untuk menerima tautan reset password.
                </p>
              </div>
            )}

            {isSuccess ? (
              <div className="flex flex-col items-center text-center gap-4 py-2">
                <div className="w-14 h-14 rounded-full bg-primary-light/60 flex items-center justify-center text-btn-primary">
                  <MailCheck size={24} strokeWidth={2.5} />
                </div>
                <p className="text-[15px] font-medium text-text-main/70 leading-relaxed">
                  Jika email terdaftar, tautan reset password telah kami kirim.
                  Silakan periksa kotak masuk (atau folder spam) Anda.
                </p>
                <Link
                  href="/admin/login"
                  className="text-[15px] font-semibold text-btn-primary hover:underline mt-1"
                >
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            ) : (
              <>
                {globalError && (
                  <div
                    className="mb-5 rounded-xl border border-danger/20 bg-danger/10 p-3.5 text-sm font-medium text-danger"
                    role="alert"
                  >
                    {globalError}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col"
                >
                  <div className="mb-8">
                    <InputField
                      label="Email"
                      placeholder="Masukan Email Admin Anda"
                      icon={Mail}
                      {...register("email")}
                      error={errors.email?.message}
                      aria-invalid={!!errors.email}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full text-lg"
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Tautan Reset"}
                  </Button>
                </form>

                <div className="mt-6 flex justify-center">
                  <Link
                    href="/admin/login"
                    className="flex items-center gap-1 text-sm font-semibold text-btn-primary hover:underline"
                  >
                    <ArrowLeft size={14} strokeWidth={2.5} />
                    Kembali ke Halaman Masuk
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
