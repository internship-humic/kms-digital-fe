"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import { useLogin } from "@/features/auth/hooks/useLogin";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const { form, onSubmit, globalError } = useLogin("admin");
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
            alt="Admin Login Illustration"
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
          <div className="w-full max-w-[342px]">
            <div className="mb-12 text-center">
              <h1 className="text-7xl font-bold text-text-main">
                Selamat Datang !
              </h1>
              <p className="mt-4 text-sm text-text-main">
                Masukkan email dan password untuk mengakses akun Anda.
              </p>
            </div>

            {globalError && (
              <div
                className="mb-5 rounded-xl border border-danger/20 bg-danger/10 p-3.5 text-sm font-medium text-danger"
                role="alert"
              >
                {globalError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="mb-5">
                <InputField
                  label="Email atau Nomor Telepon"
                  placeholder="Masukan Email atau Nomor Anda"
                  icon={Mail}
                  {...register("email")}
                  error={errors.email?.message}
                  aria-invalid={!!errors.email}
                />
              </div>

              <div>
                <PasswordField
                  label="Password"
                  placeholder="Masukan Password Anda"
                  {...register("password")}
                  error={errors.password?.message}
                  aria-invalid={!!errors.password}
                />

                <div className="mt-3 flex justify-end">
                  <Link
                    href="#"
                    className="text-sm font-semibold text-btn-primary hover:underline"
                  >
                    Lupa Password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-10 w-full text-lg"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-11 flex justify-center gap-1 text-sm">
              <span className="text-icon-muted">Tidak punya akun?</span>
              <Link
                href="/admin/register"
                className="font-semibold text-btn-primary hover:underline"
              >
                Daftar disini
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
