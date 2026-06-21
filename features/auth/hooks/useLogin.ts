import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { loginService } from "@/services/auth.service";
import { setAuthCookies } from "@/app/actions/auth";

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

      const finalRole = response.role || role;

      await setAuthCookies(response.token, finalRole);

      switch (finalRole) {
        case "kader":
          router.push("/kader/dashboard");
          break;
        case "admin":
          router.push("/admin/dashboard");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setGlobalError(error.message);
      } else {
        setGlobalError("Terjadi kesalahan sistem saat login.");
      }
    }
  };

  return {
    form,
    onSubmit,
    globalError,
  };
};
