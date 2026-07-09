"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { getPaginatedArticles } from "@/services/article.service";
import DeleteArticleModal from "./DeleteArticleModal";

export default function ArticlesFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const {
    page,
    limit,
    totalItems,
    totalPages,
    setPaginationData,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(10);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getPaginatedArticles({
        page,
        limit,
        search: searchQuery,
      });

      const data = response?.data || [];
      const pagination = response?.pagination;

      setArticles(data);
      setPaginationData(pagination?.total || 0, pagination?.totalPages || 1);
    } catch (error) {
      console.error("Gagal mengambil data artikel:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchQuery, setPaginationData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchArticles]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (page !== 1) goToPage(1);
  };

  const getCategoryStyle = (type: string) => {
    switch (type) {
      case "HEALTH":
        return "bg-rose-50 text-danger";
      case "NUTRITION":
        return "bg-emerald-50 text-status-normal";
      case "ACTIVITY":
        return "bg-primary-light text-btn-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main">
            Manajemen Artikel
          </h1>
          <p className="text-[16px] font-normal leading-[24px] tracking-[0px] align-middle text-icon-muted mt-2">
            Kelola edukasi, nutrisi, dan aktivitas yang akan tampil di aplikasi
            Orang Tua.
          </p>
        </div>

        <Button asChild className="px-5 gap-2 shadow-md shadow-blue-500/20">
          <Link href="/admin/articles/create">
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-semibold">Tulis Artikel</span>
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-input/30 flex justify-between items-center bg-white">
          <div className="relative w-[320px]">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-placeholder"
              size={18}
              strokeWidth={2.5}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari judul atau penulis..."
              className="pl-11 pr-4 py-3 w-full rounded-xl border border-border-input/60 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-[15px] placeholder:text-text-placeholder text-text-main transition-all"
            />
          </div>
        </div>

        <div className="relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-input/30">
                <th className="px-6 py-4 text-sm font-bold text-text-main w-[40%]">
                  Judul Artikel
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-main w-[15%]">
                  Kategori
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-main w-[20%]">
                  Penulis
                </th>
                <th className="px-6 py-4 text-sm font-bold text-text-main text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && articles.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-[15px] text-icon-muted"
                  >
                    Data artikel tidak ditemukan.
                  </td>
                </tr>
              ) : (
                articles.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border-input/20 last:border-b-0 hover:bg-background transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                          {row.cover_image ? (
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${row.cover_image}`}
                              alt={row.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-semibold text-text-main line-clamp-1">
                            {row.title}
                          </span>
                          <span className="text-[12px] text-icon-muted line-clamp-1 mt-0.5">
                            {row.description}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-md text-[11px] font-bold tracking-wide ${getCategoryStyle(row.type)}`}
                      >
                        {row.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-icon-muted">
                      <div className="flex flex-col">
                        <span className="font-semibold text-text-main">
                          {row.writer_name}
                        </span>
                        <span className="text-[12px]">
                          {row.writer_identity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/articles/${row.id}/edit`}
                          className="text-btn-primary hover:text-btn-hover transition-colors cursor-pointer"
                        >
                          <Pencil size={18} strokeWidth={2.5} />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedDeleteId(row.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-danger hover:text-danger/80 transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border-input/30 flex items-center justify-between bg-white">
          <span className="text-sm text-icon-muted">
            Menampilkan {totalItems === 0 ? 0 : (page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, totalItems)} dari {totalItems} Artikel
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={page === 1 || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${page === pageNum ? "bg-primary-light text-btn-primary" : "text-icon-muted hover:bg-background"}`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === page - 2 || pageNum === page + 2)
                return (
                  <span key={pageNum} className="text-icon-muted px-1">
                    ...
                  </span>
                );
              return null;
            })}
            <button
              onClick={nextPage}
              disabled={page === totalPages || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <DeleteArticleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchArticles}
        articleId={selectedDeleteId}
      />
    </div>
  );
}
