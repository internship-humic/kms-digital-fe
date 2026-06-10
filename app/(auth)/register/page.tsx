"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, Home } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import CustomSelect from "@/components/ui/CustomSelect";
import TextAreaField from "@/components/ui/TextAreaField";
import { POSYANDU_OPTIONS } from "@/lib/constants";
import { Controller } from "react-hook-form";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const { form, onSubmit, globalError } = useRegister();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

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
        <h1 className="mb-2 text-2xl font-bold text-text-main">
          Buat Akun Baru
        </h1>
        <p className="max-w-[250px] text-center text-sm text-text-main/70">
          Mohon berikan informasi untuk membuat akun Anda!
        </p>
      </div>

      {globalError && (
        <div
          className="bg-danger/10 border border-danger/20 text-danger p-3.5 rounded-xl text-sm font-medium mb-5 flex items-center"
          role="alert"
        >
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap"
          icon={User}
          {...register("fullName")}
          error={errors.fullName?.message}
          aria-invalid={!!errors.fullName}
        />

        <Controller
          name="posyanduId"
          control={control}
          render={({ field }) => (
            <CustomSelect
              label="Posyandu"
              placeholder="Pilih Posyandu"
              options={POSYANDU_OPTIONS}
              value={
                POSYANDU_OPTIONS.find((opt) => opt.id === field.value) || null
              }
              onChange={(option) => field.onChange(option.id)}
              error={errors.posyanduId?.message}
            />
          )}
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

        <InputField
          label="Nomor Telepon"
          placeholder="Masukan Nomor Telepon"
          type="tel"
          icon={Phone}
          {...register("phone")}
          error={errors.phone?.message}
          aria-invalid={!!errors.phone}
        />

        <TextAreaField
          label="Alamat Rumah"
          placeholder="Masukan Alamat Rumah"
          icon={Home}
          rows={3}
          {...register("address")}
          error={errors.address?.message}
          aria-invalid={!!errors.address}
        />

        <PasswordField
          label="Password"
          placeholder="Masukan Password Anda"
          {...register("password")}
          error={errors.password?.message}
          aria-invalid={!!errors.password}
        />

        <PasswordField
          label="Konfirmasi Password"
          placeholder="Masukan Ulang Password Anda"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          aria-invalid={!!errors.confirmPassword}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          aria-label={
            isSubmitting ? "Sedang memproses registrasi" : "Daftar akun baru"
          }
          className="mt-6 w-full"
        >
          {isSubmitting ? "Mendaftar..." : "Daftar"}
        </Button>
      </form>

      <div className="mt-8 mb-4 flex justify-center items-center gap-1.5 text-xs leading-[12px] tracking-[0.48px]">
        <span className="text-text-main/70">Sudah mempunyai akun?</span>
        <Link
          href="/login"
          className="font-semibold text-btn-primary transition-all hover:underline cursor-pointer"
        >
          Masuk disini
        </Link>
      </div>
    </div>
  );
}
