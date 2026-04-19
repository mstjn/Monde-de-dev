import { getTopics } from "@/lib/actions/topics";
import { TopicCard } from "@/components/topic-card";

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Thèmes</h1>
        <div className="grid gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </main>
  );
}
