import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/actions/articles";
import { CommentForm } from "@/components/comment-form";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  return (
    <main className="md:px-25 md:py-15 p-5 flex flex-col gap-10">
      <div className="flex items-start gap-4">
        <Link href="/articles" className="mt-1 shrink-0">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-bold text-2xl">{post.title}</h1>
      </div>

      <div className="flex flex-wrap gap-x-10 text-xl">
        <span>{post.createdAt.toLocaleDateString()}</span>
        <span>{post.author.username}</span>
        
        <br className="md:hidden" />
        <br className="md:hidden" />
        <span>{post.topic.name}</span>
      </div>

      <p className="text-xl">{post.content}</p>

      <hr className="border-black" />

      <section className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">Commentaires</h2>

        {post.comments.map((comment) => (
          <div key={comment.id} className="flex flex-col md:flex-row md:items-start gap-2">
            <span className="text-xl font-medium self-end md:self-auto md:mt-3 md:mr-2 whitespace-nowrap text-right md:text-left">
              {comment.author.username}
            </span>
            <div className="bg-[#F5F5F5] rounded-2xl p-4 w-fit max-w-lg text-xl">
              {comment.content}
            </div>
          </div>
        ))}

        <CommentForm postId={post.id} />
      </section>
    </main>
  );
}
