import ArticleForm from "@/features/admin/articles/components/ArticleForm";
import { getArticleById } from "@/services/article.service";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Artikel | JagaCilik Admin",
};

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return <ArticleForm initialData={article} />;
}
