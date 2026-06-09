import { z } from "zod";

export const tambahBalitaSchema = z.object({
  namaLengkap: z.string().min(1, "Nama lengkap wajib diisi"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    message: "Pilih jenis kelamin",
  }),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
  beratLahir: z.string().min(1, "Berat lahir wajib diisi"),
  tinggiLahir: z.string().min(1, "Tinggi lahir wajib diisi"),
  alamatRumah: z.string().min(1, "Alamat rumah wajib diisi"),
});

export type TambahBalitaFormValues = z.infer<typeof tambahBalitaSchema>;
