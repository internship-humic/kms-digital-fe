"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { articleFormSchema, ArticleFormValues } from "../validations/article";
import {
  createArticleAction,
  updateArticleAction,
} from "@/app/actions/article";

export default function ArticleForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  let initialContentStr = "";
  if (initialData?.content) {
    try {
      const contentObj =
        typeof initialData.content === "string"
          ? JSON.parse(initialData.content)
          : initialData.content;
      initialContentStr = contentObj.content?.[0]?.content?.[0]?.text || "";
    } catch {
      initialContentStr = initialData.content;
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      type: initialData?.type || "HEALTH",
      writer_name: initialData?.writer_name || "",
      writer_identity: initialData?.writer_identity || "",
      content: initialContentStr,
    },
  });

  useEffect(() => {
    if (initialData?.cover_image) {
      setImagePreview(
        `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${initialData.cover_image}`,
      );
    }
  }, [initialData]);

  const onSubmit = async (data: ArticleFormValues) => {
    setGlobalError(null);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("writer_name", data.writer_name);
      formData.append("writer_identity", data.writer_identity);

      const contentJson = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: data.content }],
          },
        ],
      };
      formData.append("content", JSON.stringify(contentJson));

      if (data.cover_image?.[0]) {
        formData.append("cover_image", data.cover_image[0]);
      }

      if (initialData?.id) {
        await updateArticleAction(initialData.id, formData);
      } else {
        await createArticleAction(formData);
      }

      router.push("/admin/articles");
    } catch (error: any) {
      setGlobalError(error.message || "Gagal menyimpan artikel.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto p-8 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/articles"
          className="p-2 border border-border-input/40 rounded-full hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-icon-muted" />
        </Link>
        <div>
          <h1 className="text-[28px] font-bold text-text-main leading-tight">
            {initialData ? "Edit Artikel" : "Tulis Artikel Baru"}
          </h1>
          <p className="text-[14px] text-icon-muted mt-1">
            Lengkapi form di bawah untuk menerbitkan artikel.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm p-8">
        {globalError && (
          <div className="mb-6 p-4 rounded-xl border border-danger/20 bg-danger/10 text-sm font-medium text-danger">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Judul Artikel <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none"
              placeholder="Masukkan judul..."
            />
            {errors.title && (
              <span className="text-xs text-danger">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">
                Nama Penulis <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register("writer_name")}
                className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none"
                placeholder="Cth: Dr. Andi"
              />
              {errors.writer_name && (
                <span className="text-xs text-danger">
                  {errors.writer_name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">
                Identitas Penulis <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                {...register("writer_identity")}
                className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none"
                placeholder="Cth: Dokter Anak"
              />
              {errors.writer_identity && (
                <span className="text-xs text-danger">
                  {errors.writer_identity.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Kategori <span className="text-danger">*</span>
            </label>
            <select
              {...register("type")}
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none bg-white"
            >
              <option value="HEALTH">Kesehatan (Health)</option>
              <option value="NUTRITION">Gizi (Nutrition)</option>
              <option value="ACTIVITY">Aktivitas (Activity)</option>
            </select>
            {errors.type && (
              <span className="text-xs text-danger">{errors.type.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Deskripsi Singkat <span className="text-danger">*</span>
            </label>
            <textarea
              rows={2}
              {...register("description")}
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none resize-none"
              placeholder="Ringkasan artikel..."
            />
            {errors.description && (
              <span className="text-xs text-danger">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Cover Image
            </label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 rounded-xl border border-dashed border-border-input/80 flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </div>
              <div className="flex flex-col justify-center gap-2 pt-2">
                <input
                  type="file"
                  accept="image/*"
                  {...register("cover_image")}
                  onChange={(e) => {
                    register("cover_image").onChange(e);
                    handleImageChange(e);
                  }}
                  className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-btn-primary hover:file:bg-primary-light/80"
                />
                <p className="text-xs text-icon-muted">
                  Format yang didukung: JPG, PNG. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-main">
              Isi Artikel <span className="text-danger">*</span>
            </label>
            <textarea
              rows={10}
              {...register("content")}
              className="w-full px-4 py-3 rounded-xl border border-border-input/60 focus:ring-2 focus:ring-btn-primary/20 focus:border-btn-primary outline-none"
              placeholder="Ketik isi artikel disini..."
            />
            {errors.content && (
              <span className="text-xs text-danger">
                {errors.content.message}
              </span>
            )}
          </div>

          <div className="mt-4 pt-6 border-t border-border-input/30 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/articles")}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
