import { z } from "zod";

export const tambahPosyanduSchema = z.object({
  desaId: z.string().min(1, "Desa/Kelurahan wajib dipilih"),
  namaPosyandu: z.string().min(1, "Nama Posyandu wajib diisi"),
  alamatLengkap: z.string().min(1, "Alamat lengkap wajib diisi"),
});

export const tambahDesaSchema = z.object({
  namaDesa: z.string().min(1, "Nama desa wajib diisi"),
  kecamatan: z.string().min(1, "Kecamatan/Kabupaten wajib dipilih"),
});

export type TambahDesaFormValues = z.infer<typeof tambahDesaSchema>;
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
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  desaId: z.string().optional(),
  posyanduId: z.string().optional(),
});

export const editParentSchema = z.object({
  namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  phone: z
    .string()
    .min(9, "Nomor telepon tidak valid")
    .max(15, "Nomor telepon terlalu panjang"),
  address: z.string().min(10, "Alamat domisili terlalu singkat"),
});

export type EditParentFormValues = z.infer<typeof editParentSchema>;
export type EditKaderFormValues = z.infer<typeof editKaderSchema>;
