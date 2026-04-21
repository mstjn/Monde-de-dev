import CreateArticleForm from "@/components/form/create-article-form";
import { getTopics } from "@/lib/actions/topics";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewArticlePage() {
  const topics = await getTopics();

  return (
    <main className="md:p-15 p-5 flex flex-col gap-10 relative">
      <Link href="/articles" className="absolute top-4 left-4"><ArrowLeft size={24} /></Link>
      <h1 className="font-bold text-2xl text-center">Créer un nouvel article</h1>
      <CreateArticleForm topics={topics} />
    </main>
  );
}
