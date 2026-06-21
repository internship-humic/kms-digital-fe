import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
// import { registerService } from "@/services/auth.service"; // <- Di-comment sementara

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

      // ==========================================
      // MOCK API CALL (Untuk Frontend Development)
      // ==========================================

      // Simulasi loading network selama 1.5 detik
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`[MOCK] Register sebagai ${role} dengan data:`, data);

      // Redirect ke halaman login masing-masing setelah register sukses
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

      // ==========================================
      // REAL API CALL (Uncomment saat backend siap)
      // ==========================================
      /*
      const response = await registerService(data);
      console.log("Response Register:", response);

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
      */
    } catch (error: any) {
      setGlobalError(
        error.message || "Terjadi kesalahan sistem saat mendaftar.",
      );
    }
  };

  return { form, onSubmit, globalError };
};
