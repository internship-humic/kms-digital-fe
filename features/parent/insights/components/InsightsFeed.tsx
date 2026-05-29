"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb, ArrowRight, Clock } from "lucide-react";
import { InsightData } from "../types";

export default function InsightsFeed({
  initialData,
}: {
  initialData: InsightData;
}) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  return (
    <div className="flex-1 flex flex-col gap-6 pt-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 px-6">
        {initialData.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap text-[13.5px] font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-btn-primary text-white shadow-md shadow-blue-500/20"
                : "bg-primary-light/40 text-icon-muted hover:bg-primary-light/60 border border-border-input/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-6 flex flex-col gap-6">
        <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-light rounded-full opacity-80"></div>

          <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 relative z-10 border border-primary-light/50">
            <Lightbulb
              size={24}
              className="text-btn-primary"
              strokeWidth={2.5}
            />
          </div>

          <h2 className="text-[20px] font-bold text-text-main leading-snug mb-3 relative z-10 pr-4">
            {initialData.featuredTip.title}
          </h2>

          <p className="text-[14.5px] text-icon-muted leading-relaxed mb-5 relative z-10">
            {initialData.featuredTip.description}
          </p>

          <button className="flex items-center gap-2 text-btn-primary font-bold text-[14px] hover:opacity-80 transition-opacity relative z-10 w-fit cursor-pointer">
            Baca selengkapnya
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[18px] font-bold text-text-main">
              Artikel Terbaru
            </h3>
            <button className="text-[13px] font-semibold tracking-[0.6px] text-btn-primary hover:underline cursor-pointer">
              Lihat Semua
            </button>
          </div>

          {initialData.articles
            .filter(
              (art) =>
                activeCategory === "Semua" || art.category === activeCategory,
            )
            .map((article) => (
              <Link
                key={article.id}
                href={`/insights/article/${article.id}`}
                className="block relative bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.1)] active:scale-[0.98]"
              >
                <div className="relative w-full h-[180px] bg-border-input/20 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-border-input/20">
                    <Clock size={14} className="text-btn-primary" />
                    <span className="text-[12px] font-bold text-text-main">
                      {article.timeToRead}
                    </span>
                  </div>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <div className="flex gap-2 mb-2.5">
                    <span className="bg-primary-light/60 border border-primary-light text-btn-primary px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-[17px] font-bold text-text-main leading-snug mb-2 group-hover:text-btn-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-[13.5px] text-icon-muted line-clamp-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
