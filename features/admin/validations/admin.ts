import { z } from "zod";

export const tambahDesaSchema = z.object({
  namaDesa: z.string().min(1, "Nama desa wajib diisi"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
});
export type TambahDesaFormValues = z.infer<typeof tambahDesaSchema>;

export const tambahPosyanduSchema = z.object({
  desaId: z.string().min(1, "Desa wajib dipilih"),
  namaPosyandu: z.string().min(1, "Nama posyandu wajib diisi"),
  alamatLengkap: z.string().min(1, "Alamat lengkap wajib diisi"),
});
export type TambahPosyanduFormValues = z.infer<typeof tambahPosyanduSchema>;

export const buatAkunKaderSchema = z.object({
  namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email wajib diisi"),
  desaId: z.string().min(1, "Desa penugasan wajib dipilih"),
  posyanduId: z.string().optional(),
});
export type BuatAkunKaderFormValues = z.infer<typeof buatAkunKaderSchema>;
