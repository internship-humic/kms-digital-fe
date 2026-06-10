import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Share2, Clock, BadgeCheck } from "lucide-react";
import { getArticleDetailMockData } from "@/features/parent/insights/data/mockInsights";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await getArticleDetailMockData(id);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <Link
          href="/insights"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </Link>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -mr-2 cursor-pointer">
          <Share2 size={22} className="text-btn-primary" strokeWidth={2.5} />
        </button>
      </div>

      <div className="relative w-full h-[280px] bg-border-input/20">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-20 bg-background rounded-t-[32px] -mt-8 px-6 pt-8 pb-12 min-h-[500px] shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="bg-primary-light/60 border border-primary-light text-btn-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-icon-muted">
              <Clock size={14} />
              <span className="text-sm font-medium">{article.timeToRead}</span>
            </div>
          </div>
          <span className="text-sm font-medium text-icon-muted">
            {article.date}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-text-main leading-tight mb-6">
          {article.title}
        </h1>

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
              {article.author.name}
            </h3>
            <p className="text-sm text-icon-muted leading-snug">
              {article.author.role}
            </p>
          </div>
        </div>

        <div className="text-[#434654] text-md leading-relaxed">
          {article.content.map((paragraph, index) => {
            if (index === 2) {
              return (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-text-main mt-8 mb-3">
                    Zat Besi adalah Kunci
                  </h3>
                  <p className="mb-5">{paragraph}</p>
                  <div className="bg-primary-light/40 border-l-[3px] border-btn-primary p-4 rounded-r-xl my-6">
                    <p className="text-base text-btn-primary font-medium italic leading-relaxed">
                      "Ingat, MPASI pertama bukan tentang seberapa banyak bayi
                      makan, melainkan tentang mengenalkan rasa, tekstur, dan
                      melatih otot mengunyah."
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <p key={index} className="mb-5">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
