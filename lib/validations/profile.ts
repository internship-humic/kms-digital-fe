import * as z from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  posyanduId: z.string().min(1, "Silakan pilih Posyandu"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  phone: z
    .string()
    .min(9, "Nomor telepon tidak valid")
    .max(15, "Nomor telepon terlalu panjang"),
  address: z.string().min(10, "Alamat terlalu singkat, mohon lengkapi"),
});

export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[a-z]/, "Harus mengandung huruf kecil")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[^a-zA-Z\s]/, "Harus mengandung angka atau simbol"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
