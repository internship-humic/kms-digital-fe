"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/ui/PasswordField";
import SuccessModal from "@/components/ui/SuccessModal";
import { usePasswordStrength } from "@/hooks/usePasswordStrength";
import {
  updatePasswordSchema,
  UpdatePasswordFormValues,
} from "@/lib/validations/profile";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
  });

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const {
    score,
    isMinLength,
    hasUpperLower,
    hasNumberOrSymbol,
    strengthText,
    strengthColorClass,
    strengthTextColorClass,
  } = usePasswordStrength(newPassword);

  const isPasswordMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  const onSubmit = async (data: UpdatePasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password berhasil diubah", data);

    setIsSuccessModalOpen(true);
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push("/profile");
  };

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 overflow-hidden relative">
        <div className="h-1.5 w-full bg-btn-primary" />

        <div className="p-6">
          <h2 className="text-4xl font-bold text-text-main mb-2">
            Ubah Kata Sandi
          </h2>

          <p className="text-base text-text-main/70 leading-relaxed mb-8">
            Untuk menjaga keamanan akun Anda, silakan buat kata sandi baru yang
            kuat sebelum melanjutkan.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="mb-6">
              <PasswordField
                label="Kata Sandi Baru"
                placeholder="Masukan Kata Sandi Baru"
                {...register("newPassword")}
                error={errors.newPassword?.message}
              />

              <div className="mt-4">
                <div className="flex gap-2 w-full mb-2">
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      score >= 1 ? strengthColorClass : "bg-border-input"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      score >= 2 ? strengthColorClass : "bg-border-input"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      score >= 3 ? strengthColorClass : "bg-border-input"
                    }`}
                  />
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      score >= 4 ? strengthColorClass : "bg-border-input"
                    }`}
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-semibold mb-5 h-4">
                  <span className={strengthTextColorClass}>{strengthText}</span>

                  <span
                    className={
                      score >= 3 ? "text-password-strong" : "text-transparent"
                    }
                  >
                    Cukup baik!
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-2">
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isMinLength
                          ? "bg-password-strong"
                          : "bg-border-input/50"
                      }`}
                    >
                      <Check
                        size={10}
                        className="text-white translate-x-[1px]"
                        strokeWidth={4}
                      />
                    </div>

                    <span
                      className={`text-base ${
                        isMinLength ? "text-text-main" : "text-text-main/50"
                      }`}
                    >
                      Minimal 8 karakter
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        hasUpperLower
                          ? "bg-password-strong"
                          : "bg-border-input/50"
                      }`}
                    >
                      <Check
                        size={10}
                        className="text-white translate-x-[1px]"
                        strokeWidth={4}
                      />
                    </div>

                    <span
                      className={`text-base ${
                        hasUpperLower ? "text-text-main" : "text-text-main/50"
                      }`}
                    >
                      Mengandung huruf besar & kecil
                    </span>
                  </li>

                  <li className="flex items-center gap-2">
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                        hasNumberOrSymbol
                          ? "bg-password-strong"
                          : "bg-border-input/50"
                      }`}
                    >
                      <Check
                        size={10}
                        className="text-white translate-x-[1px]"
                        strokeWidth={4}
                      />
                    </div>

                    <span
                      className={`text-base ${
                        hasNumberOrSymbol
                          ? "text-text-main"
                          : "text-text-main/50"
                      }`}
                    >
                      Mengandung angka atau simbol
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-border-input/40 my-6" />

            <div className="mb-8">
              <PasswordField
                label="Konfirmasi Kata Sandi"
                placeholder="Masukan Ulang Kata Sandi"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              {isPasswordMatch && (
                <div className="flex items-center gap-1.5 text-password-strong mt-3 animate-in fade-in zoom-in duration-300">
                  <Check size={14} strokeWidth={3} />

                  <span className="text-sm font-medium">Kata sandi cocok</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full tracking-wide"
            >
              {isSubmitting ? "Menyimpan..." : "Perbarui Kata Sandi"}
            </Button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleModalClose}
        imageSrc="/images/katasandiberhasil.svg"
        title="Kata Sandi Berhasil Diubah!"
        description="Kata sandi baru Anda telah berhasil dibuat dan perubahan berhasil disimpan pada akun Anda."
      />
    </>
  );
}
