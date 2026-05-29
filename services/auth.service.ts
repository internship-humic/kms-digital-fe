import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";

export const loginService = async (data: LoginFormValues) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (data.email === "error@mail.com") {
    throw new Error("Akun tidak ditemukan atau password salah.");
  }

  return {
    token: "dummy-token-123",
    user: { email: data.email },
  };
};

export const registerService = async (data: RegisterFormValues) => {
  const { confirmPassword, ...payload } = data;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (payload.email === "exist@mail.com") {
    throw new Error("Email ini sudah terdaftar.");
  }

  return {
    message: "Registrasi berhasil",
    user: { email: payload.email, fullName: payload.fullName },
  };
};
