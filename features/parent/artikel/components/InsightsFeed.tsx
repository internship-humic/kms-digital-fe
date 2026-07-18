"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ArticleCard from "./ArticleCard";
import type { ArtikelItem } from "../types";
import { getArticles } from "@/services/article.service";

const CATEGORIES = [
  { id: "Semua", label: "Semua" },
  { id: "HEALTH", label: "Kesehatan" },
  { id: "NUTRITION", label: "Gizi" },
  { id: "ACTIVITY", label: "Aktivitas" },
];

export default function InsightsFeed({
  initialArticles,
}: {
  initialArticles?: ArtikelItem[];
}) {
  const [articles, setArticles] = useState<ArtikelItem[]>(
    initialArticles ?? [],
  );
  const [isLoading, setIsLoading] = useState(!initialArticles);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showAllArticles, setShowAllArticles] = useState(false);

  useEffect(() => {
    if (initialArticles) return;

    const fetchData = async () => {
      setIsLoading(true);
      const data = await getArticles({ limit: 20 });
      setArticles(data);
      setIsLoading(false);
    };

    fetchData();
  }, [initialArticles]);

  const filteredArticles = articles.filter(
    (art) => activeCategory === "Semua" || art.type === activeCategory,
  );

  const displayedArticles = showAllArticles
    ? filteredArticles
    : filteredArticles.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col gap-6 pt-6 bg-background min-h-screen">
      {/* Horizontal Category Filter */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 px-6 hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-btn-primary text-white shadow-md shadow-blue-500/20"
                : "bg-white text-icon-muted hover:bg-primary-light/60 border border-border-input/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="px-6 flex flex-col gap-6 pb-12">
        {/* Articles List */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2 mt-2">
            <h2 className="text-xl font-bold text-text-main">
              Artikel Terbaru
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-1 items-center justify-center py-10">
              <Loader2 className="w-7 h-7 text-btn-primary animate-spin" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white rounded-[24px] border border-border-input/40">
              <p className="text-sm font-medium text-icon-muted">
                Belum ada artikel di kategori ini.
              </p>
            </div>
          ) : (
            displayedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
