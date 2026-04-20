import ArticleCard from "@/components/ui/article-card";
import SortButton from "@/components/ui/sort-button";
import { getPosts } from "@/lib/actions/articles";
import Link from "next/link";

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  const posts = await getPosts(sort)
  return (
    <main className="md:p-15 p-5 flex flex-col gap-10">
      <section className="flex md:justify-between md:flex-row flex-col justify-center items-center gap-2">
         <Link href="/articles/new" className="self-center flex justify-center items-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">Créer un article</Link>
        <SortButton />
      </section>

      <section className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {posts.map(post => <ArticleCard key={post.id} title={post.title} content={post.content} date={post.createdAt} author={post.author} />)}
      </section>
    </main>
  );
}
