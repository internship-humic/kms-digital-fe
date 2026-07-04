import { z } from "zod";

export const tambahPosyanduSchema = z.object({
  desaId: z.string().min(1, "Desa/Kelurahan wajib dipilih"),
  namaPosyandu: z.string().min(1, "Nama Posyandu wajib diisi"),
  alamatLengkap: z.string().min(1, "Alamat lengkap wajib diisi"),
});

export type TambahPosyanduFormValues = z.infer<typeof tambahPosyanduSchema>;

export const buatAkunKaderSchema = z
  .object({
    namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    desaId: z.string().min(1, "Desa/Kelurahan wajib dipilih"),
    posyanduId: z.string().min(1, "Posyandu penugasan wajib dipilih"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type BuatAkunKaderFormValues = z.infer<typeof buatAkunKaderSchema>;

export const editKaderSchema = z.object({
  namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  desaId: z.string().optional(),
  posyanduId: z.string().optional(),
});

export type EditKaderFormValues = z.infer<typeof editKaderSchema>;
