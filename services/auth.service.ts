"use server";

import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";
import { fetchWithAuth } from "@/lib/fetcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

function translateError(msg: string): string {
  if (!msg) return msg;
  
  let translated = msg;
  const mappings = [
    { en: "Password must contain at least 1 uppercase letter.", id: "Kata sandi harus mengandung minimal 1 huruf kapital." },
    { en: "Password must contain at least 1 lowercase letter.", id: "Kata sandi harus mengandung minimal 1 huruf kecil." },
    { en: "Password must contain at least 1 number.", id: "Kata sandi harus mengandung minimal 1 angka." },
    { en: "Password must contain at least 1 special character.", id: "Kata sandi harus mengandung minimal 1 karakter spesial." },
    { en: "Phone number already registered", id: "Nomor telepon sudah terdaftar." },
    { en: "Email already registered", id: "Email sudah terdaftar." },
    { en: "Email is already registered", id: "Email sudah terdaftar." },
    { en: "Invalid credentials", id: "Email atau kata sandi salah." },
    { en: "User not found", id: "Pengguna tidak ditemukan." },
    { en: "Incorrect password", id: "Kata sandi salah." },
    { en: "must be a valid email", id: "harus berupa alamat email yang valid" },
    { en: "is required", id: "wajib diisi" },
    { en: "is not allowed to be empty", id: "tidak boleh kosong" },
    { en: "length must be at least", id: "panjang minimal harus" },
    { en: "characters long", id: "karakter" },
    { en: "fails to match the required pattern", id: "tidak memenuhi format yang ditentukan" },
    { en: "must match", id: "harus sama dengan" },
    { en: "must be \\[ref:password\\]", id: "harus sama dengan kata sandi" },
  ];

  for (const map of mappings) {
    translated = translated.replace(new RegExp(map.en, "gi"), map.id);
  }

  return translated.replace(/"/g, "");
}

function formatErrorMessage(msg: string): string {
  if (!msg) return "Terjadi kesalahan.";
  try {
    const jsonStart = msg.indexOf("{");
    if (jsonStart !== -1) {
      const jsonStr = msg.substring(jsonStart);
      const parsed = JSON.parse(jsonStr);
      const messages: string[] = [];
      
      for (const key in parsed) {
        if (Array.isArray(parsed[key])) {
          messages.push(...parsed[key].map((m: string) => translateError(m)));
        } else if (typeof parsed[key] === "string") {
          messages.push(translateError(parsed[key]));
        }
      }
      
      if (messages.length > 0) {
        return messages.join(", ");
      }
    }
  } catch (e) {
    // Ignore parsing errors
  }
  return translateError(msg);
}

export type ActivateCadrePayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

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
      throw new Error(formatErrorMessage(result.error?.message || result.message || "Gagal melakukan login."));
    }

    const normalizedRole = result.data.role.toLowerCase();

    const roleMap: Record<string, string> = {
      parents: "parent",
      cadre: "kader",
      admin: "admin",
    };

    const finalRole = roleMap[normalizedRole] || normalizedRole;

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
      let errorMsg = result.error?.message || result.message || "Gagal melakukan registrasi.";
      if (result.error?.details && Array.isArray(result.error.details)) {
        errorMsg += " " + result.error.details.map((d: any) => d.message || d).join(", ");
      } else if (result.error?.details) {
        errorMsg += " " + JSON.stringify(result.error.details);
      }
      throw new Error(formatErrorMessage(errorMsg));
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export const activateCadreService = async (data: ActivateCadrePayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/activation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(formatErrorMessage(result.error?.message || result.message || "Gagal membuat akun kader."));
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export type UpdateProfilePayload = {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  clinic_id: string;
};

export const updateProfileService = async (
  data: UpdateProfilePayload,
  token: string,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(formatErrorMessage(result.error?.message || result.message || "Gagal memperbarui profil."));
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  password_confirmation: string;
};

export const changePasswordService = async (
  data: ChangePasswordPayload,
  token: string,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(formatErrorMessage(result.error?.message || result.message || "Gagal mengubah kata sandi."));
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export const getProfile = async <T = unknown>(): Promise<T | null> => {
  try {
    const data = await fetchWithAuth("/auth/me");
    return data ?? null;
  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    return null;
  }
};

export type ForgotPasswordPayload = {
  email: string;
};

export const requestPasswordResetService = async (
  data: ForgotPasswordPayload,
) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(
        formatErrorMessage(result.error?.message || result.message || "Gagal mengirim permintaan reset password.")
      );
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};

export type ResetPasswordPayload = {
  token: string;
  new_password: string;
  password_confirmation: string;
};

export const resetPasswordService = async (data: ResetPasswordPayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error(formatErrorMessage(result.error?.message || result.message || "Gagal mereset password."));
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};
