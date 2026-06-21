import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const loginService = async (data: LoginFormValues) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Gagal melakukan login.");
    }

    const normalizedRole = result.data.role.toLowerCase();
    const finalRole = normalizedRole === "parents" ? "parent" : normalizedRole;

    return {
      token: result.data.accessToken,
      user: result.data.user,
      role: finalRole,
    };
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export const registerService = async (data: RegisterFormValues) => {
  try {
    const payload = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      address: data.address,
      clinic_id: data.posyanduId,
      phone_number: data.phone,
    };

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Gagal melakukan registrasi.");
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};
