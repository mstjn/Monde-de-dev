import Link from "next/link";
import { Post } from "@/types";

type ArticleCardProps = Pick<Post, "id" | "title" | "content"> & {
  date: Date;
  author: { username: string };
};

export default function ArticleCard({id, title, date, author, content} : ArticleCardProps) {
  return (
    <Link href={`/articles/${id}`} className="h-full">
      <article className="h-full bg-[#F5F5F5] rounded-2xl p-8 text-base flex flex-col gap-5 cursor-pointer">
          <h2 className="font-bold text-lg">{title}</h2>
          <div className="flex justify-between">
              <p>{date.toLocaleDateString()}</p>
              <p>{author.username}</p>
          </div>
          <p>{content}</p>
      </article>
    </Link>
  )
}