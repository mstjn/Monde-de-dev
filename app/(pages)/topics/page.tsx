import { getTopics } from "@/lib/actions/topics";
import { TopicCard } from "@/components/topic-card";

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <main className="md:p-15 p-5 flex flex-col gap-10">
      <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </section>
    </main>
  );
}
