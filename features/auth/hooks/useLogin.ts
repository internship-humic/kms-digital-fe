import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
// import { loginService } from "@/services/auth.service"; // <- Di-comment sementara
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

      // ==========================================
      // MOCK API CALL (Untuk Frontend Development)
      // ==========================================

      // Simulasi loading network selama 1 detik
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`[MOCK] Login sebagai ${role} dengan data:`, data);

      // Buat token bohongan
      const mockToken = `mock-jwt-token-for-${role}-${Date.now()}`;

      // Set cookie menggunakan server action
      await setAuthCookies(mockToken, role);

      // Redirect sesuai role
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

      // ==========================================
      // REAL API CALL (Uncomment saat backend siap)
      // ==========================================
      /*
      const response = await loginService(data);
      console.log("Response Login:", response);

      await setAuthCookies(response.token, role);

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
      */
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
