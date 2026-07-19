import { z } from "zod";

export const tambahBalitaSchema = z.object({
  namaLengkap: z.string().min(2, "Nama lengkap minimal 2 karakter").max(100, "Nama lengkap maksimal 100 karakter"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    message: "Pilih jenis kelamin",
  }),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  beratLahir: z
    .string()
    .min(1, "Berat lahir wajib diisi")
    .refine((val) => parseFloat(val) >= 0.5 && parseFloat(val) <= 30, {
      message: "Berat badan harus antara 0.5 - 30 kg",
    }),
  tinggiLahir: z
    .string()
    .min(1, "Tinggi lahir wajib diisi")
    .refine((val) => parseFloat(val) >= 20 && parseFloat(val) <= 130, {
      message: "Tinggi badan harus antara 20 - 130 cm",
    }),
  alamatRumah: z.string().min(5, "Alamat rumah minimal 5 karakter").max(255, "Alamat rumah maksimal 255 karakter"),
});

export type TambahBalitaFormValues = z.infer<typeof tambahBalitaSchema>;
