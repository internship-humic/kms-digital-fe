import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { loginService } from "@/services/auth.service";

type UserRole = "parent" | "kader" | "admin";

export const useLogin = (role: UserRole) => {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setGlobalError(null);

      const response = await loginService(data);

      console.log("Response Login:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", role);

      switch (role) {
        case "kader":
          router.push("/kader/dashboard");
          break;

        case "admin":
          router.push("/admin/dashboard");
          break;

        default:
          router.push("/dashboard");
      }
    } catch (error: any) {
      setGlobalError(error?.message || "Terjadi kesalahan sistem saat login.");
    }
  };

  return {
    form,
    onSubmit,
    globalError,
  };
};
