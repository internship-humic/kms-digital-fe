import InsightsFeed from "@/features/parent/artikel/components/InsightsFeed";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticles } from "@/services/article.service";

export const metadata = {
  title: "Edukasi | JagaCilik",
  description: "Artikel dan tips kesehatan untuk anak Anda",
};

export default async function InsightsPage() {
  const articlesData = await getArticles({ limit: 50 });

  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-6">
      <div className="flex items-center px-6 pt-10 pb-4 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-border-input/10 relative">
        <Link
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 absolute left-6 z-40 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </Link>
        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          Edukasi
        </h1>
      </div>

      <InsightsFeed initialArticles={articlesData} />
    </div>
  );
}
