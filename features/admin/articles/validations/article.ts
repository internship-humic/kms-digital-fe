import { z } from "zod";

export const articleFormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  type: z.enum(["ACTIVITY", "NUTRITION", "HEALTH"], {
    error: "Pilih kategori artikel",
  }),
  writer_name: z.string().min(1, "Nama penulis wajib diisi"),
  writer_identity: z.string().min(1, "Identitas penulis wajib diisi"),
  content: z.string().min(1, "Konten artikel wajib diisi"),
  cover_image: z.any().optional(),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;
