import { LoginFormValues, RegisterFormValues } from "@/lib/validations/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

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
      throw new Error(result.message || "Gagal membuat akun kader.");
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

export const updateProfileService = async (data: UpdateProfilePayload, token: string) => {
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
      throw new Error(result.message || "Gagal memperbarui profil.");
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

export const changePasswordService = async (data: ChangePasswordPayload, token: string) => {
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
      throw new Error(result.message || "Gagal mengubah kata sandi.");
    }

    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan koneksi ke server.");
  }
};
