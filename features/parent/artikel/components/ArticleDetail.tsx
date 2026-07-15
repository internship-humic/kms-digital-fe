"use client";

import { useRouter } from "next/navigation";
import type { JSX } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Share2,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { ArtikelItem } from "../types";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";

export default function ArticleDetail({ article }: { article: ArtikelItem }) {
  const router = useRouter();

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
    ? article.cover_image.startsWith("http")
      ? article.cover_image
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}${article.cover_image}`
    : null;

  let renderedContent = "";

  if (typeof article.content === "object" && article.content !== null) {
    try {
      const content = structuredClone(article.content);

      const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

      const updateImageSrc = (node: any) => {
        if (
          node.type === "image" &&
          node.attrs?.src &&
          !node.attrs.src.startsWith("http")
        ) {
          node.attrs.src = `${backendUrl}${node.attrs.src}`;
        }

        if (Array.isArray(node.content)) {
          node.content.forEach(updateImageSrc);
        }
      };

      updateImageSrc(content);

      renderedContent = generateHTML(content, [
        StarterKit,
        ImageExtension.configure({
          inline: true,
          allowBase64: true,
        }),
        LinkExtension,
      ]);
    } catch (e) {
      console.error("Failed to generate HTML from Tiptap JSON", e);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Floating */}
      <div className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -mr-2 cursor-pointer">
          <Share2 size={22} className="text-btn-primary" strokeWidth={2.5} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[280px] bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon size={50} className="text-gray-300" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 bg-background rounded-t-[32px] -mt-8 px-6 pt-8 pb-12 min-h-[500px] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="bg-primary-light/60 border border-primary-light text-btn-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
              {getCategoryLabel(article.type)}
            </span>
          </div>
          <span className="text-sm font-medium text-icon-muted flex items-center gap-1.5">
            <Clock size={14} />
            {formatRelativeTime(article.created_at)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text-main leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author Card */}
        <div className="bg-primary-light/20 rounded-2xl p-4 flex items-center gap-4 mb-8 border border-border-input/30">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center shrink-0 border border-border-input/20">
            <BadgeCheck
              size={24}
              className="text-btn-primary [&>path:first-child]:fill-current [&>path:last-child]:stroke-white"
              strokeWidth={2.5}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-md font-bold text-text-main mb-0.5">
              {article.writer_name || "Tim Redaksi JagaCilik"}
            </h3>
            <p className="text-sm text-icon-muted leading-snug">
              {article.writer_identity || "Ahli Kesehatan & Gizi Anak"}
            </p>
          </div>
        </div>

        {/* Article Prose */}
        <article className="prose prose-sm sm:prose-base max-w-none text-[#434654] text-md leading-relaxed">
          {typeof renderedContent === "string" &&
          renderedContent.startsWith("<") ? (
            <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
          ) : (
            <div className="whitespace-pre-line">{renderedContent}</div>
          )}
        </article>
      </div>
    </div>
  );
}
