"use client";

import Link from "next/link";
import { User, Mail, Phone, Home } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { Button } from "@/components/ui/button";

export default function AdminRegisterPage() {
  const { form, onSubmit, globalError } = useRegister("admin");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <main className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center bg-[#f8f5ff] px-6">
      <section className="w-full max-w-[1024px] rounded-[10px] border border-border-input/70 bg-white px-12 py-20 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-main mb-1.5">Buat Akun Baru</h1>
          <p className="text-[13px] text-text-main/70">
            Mohon berikan informasi untuk membuat akun Anda!
          </p>
        </div>

        {globalError && (
          <div
            className="mb-6 rounded-xl border border-danger/20 bg-danger/10 p-3.5 text-sm font-medium text-danger"
            role="alert"
          >
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            <InputField
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              icon={User}
              {...register("fullName")}
              error={errors.fullName?.message}
              aria-invalid={!!errors.fullName}
            />

            <InputField
              label="Alamat Rumah"
              placeholder="Masukan Alamat Rumah"
              icon={Home}
              {...register("address")}
              error={errors.address?.message}
              aria-invalid={!!errors.address}
            />

            <InputField
              label="Alamat Email"
              placeholder="Masukan Email Anda"
              type="email"
              icon={Mail}
              {...register("email")}
              error={errors.email?.message}
              aria-invalid={!!errors.email}
            />

            <PasswordField
              label="Password Baru"
              placeholder="Masukan Password Anda"
              {...register("password")}
              error={errors.password?.message}
              aria-invalid={!!errors.password}
            />

            <InputField
              label="Nomor Telepon"
              placeholder="Masukan Nomor Telepon"
              type="tel"
              icon={Phone}
              {...register("phone")}
              error={errors.phone?.message}
              aria-invalid={!!errors.phone}
            />

            <PasswordField
              label="Re-enter Password"
              placeholder="Masukan Ulang Password Anda"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              aria-invalid={!!errors.confirmPassword}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="mt-10 w-full text-lg"
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </Button>
        </form>

        <div className="mt-7 flex justify-center gap-1 text-sm">
          <span className="text-icon-muted">Sudah mempunyai akun?</span>
          <Link
            href="/admin/login"
            className="font-semibold text-btn-primary hover:underline"
          >
            Masuk disini
          </Link>
        </div>
      </section>
    </main>
  );
}
