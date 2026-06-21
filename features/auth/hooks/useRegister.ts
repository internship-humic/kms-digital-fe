import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { registerService } from "@/services/auth.service";

type UserRole = "parent" | "kader" | "admin";

export const useRegister = (role: UserRole = "parent") => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setGlobalError(null);

      await registerService(data);

      switch (role) {
        case "admin":
          router.push("/admin/login");
          break;
        case "kader":
          router.push("/kader/login");
          break;
        default:
          router.push("/login");
      }
    } catch (error: any) {
      setGlobalError(
        error.message || "Terjadi kesalahan sistem saat mendaftar.",
      );
    }
  };

  return { form, onSubmit, globalError };
};
