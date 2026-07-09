import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { resetPasswordService } from "@/services/auth.service";

type UserRole = "parent" | "kader" | "admin";

export const useResetPassword = (token: string, role: UserRole = "parent") => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setGlobalError(null);

      if (!token) {
        setGlobalError(
          "Tautan reset password tidak valid atau telah kedaluwarsa.",
        );
        return;
      }

      await resetPasswordService({
        token,
        new_password: data.password,
        password_confirmation: data.confirmPassword,
      });

      setIsSuccess(true);

      const loginPath =
        role === "kader"
          ? "/kader/login"
          : role === "admin"
            ? "/admin/login"
            : "/login";

      setTimeout(() => {
        router.push(loginPath);
      }, 2000);
    } catch (error: any) {
      setGlobalError(error.message || "Terjadi kesalahan sistem.");
    }
  };

  return { form, onSubmit, globalError, isSuccess };
};
