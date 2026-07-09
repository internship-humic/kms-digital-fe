import Link from "next/link";
import { Image as ImageIcon, Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { ArtikelItem } from "../types";

export default function ArticleCard({ article }: { article: ArtikelItem }) {
  const getCategoryLabel = (type: string) => {
    switch (type) {
      case "HEALTH":
        return "Kesehatan";
      case "NUTRITION":
        return "Gizi";
      case "ACTIVITY":
        return "Aktivitas";
      default:
        return type;
    }
  };

  const imageUrl = article.cover_image
    ? `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${article.cover_image}`
    : null;

  return (
    <Link
      href={`/insights/article/${article.id}`}
      className="block relative bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.98]"
    >
      <div className="relative w-full h-[180px] bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-border-input/20">
          <Clock size={14} className="text-btn-primary" />
          <span className="text-xs font-bold text-text-main">
            {formatRelativeTime(article.created_at)}
          </span>
        </div>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <ImageIcon size={40} className="text-gray-300" strokeWidth={1.5} />
        )}
      </div>

      <div className="p-5">
        <div className="flex gap-2 mb-2.5">
          <span className="bg-primary-light/60 border border-primary-light text-btn-primary px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase">
            {getCategoryLabel(article.type)}
          </span>
        </div>
        <h4 className="text-xl font-bold text-text-main leading-snug mb-2 group-hover:text-btn-primary transition-colors line-clamp-2">
          {article.title}
        </h4>
        <p className="text-sm text-icon-muted line-clamp-2 leading-relaxed">
          {article.description}
        </p>
      </div>
    </Link>
  );
}
