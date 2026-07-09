import ArticleDetail from "@/features/parent/artikel/components/ArticleDetail";
import { getArticleById } from "@/services/article.service";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | JagaCilik",
    };
  }

  return {
    title: `${article.title} | Edukasi JagaCilik`,
    description: article.description,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
