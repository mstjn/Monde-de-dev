import type { Topic } from "@/types";
export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <article className="bg-[#F5F5F5] rounded-2xl p-8 text-base flex flex-col gap-5">
      <h2 className="font-bold text-lg">{topic.name}</h2>

      <p>{topic.description}</p>

      <button className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">S&apos;abonner</button>
    </article>
  );
}
