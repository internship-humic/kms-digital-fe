"use server";

import { cookies } from "next/headers";
import { updateProfileService, changePasswordService, UpdateProfilePayload, ChangePasswordPayload } from "@/services/auth.service";

export async function setAuthCookies(token: string, role: string) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };

  cookieStore.set("token", token, cookieOptions);
  cookieStore.set("role", role, cookieOptions);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");
}

export async function updateProfileAction(data: UpdateProfilePayload) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Sesi Anda telah berakhir, silakan login kembali.");
  return await updateProfileService(data, token);
}

export async function changePasswordAction(data: ChangePasswordPayload) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Sesi Anda telah berakhir, silakan login kembali.");
  return await changePasswordService(data, token);
}
