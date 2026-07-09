import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { requestPasswordResetService } from "@/services/auth.service";

export const useForgotPassword = () => {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setGlobalError(null);
      await requestPasswordResetService(data);
      setIsSuccess(true);
    } catch (error: any) {
      setGlobalError(error.message || "Terjadi kesalahan sistem.");
    }
  };

  return { form, onSubmit, globalError, isSuccess };
};
