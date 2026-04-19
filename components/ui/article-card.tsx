import { Article } from "@/types";

export default function ArticleCard({name, date, author, description} : Article) {
  return (
    <article className="bg-[#F5F5F5] rounded-2xl p-8 text-base flex flex-col gap-5">
        <h2 className="font-bold text-lg">{name}</h2>
        <div className="flex justify-between">
            <p>{date.toLocaleDateString()}</p>
            <p>{author}</p>
        </div>
        <p>{description}</p>
    </article>
  )
}