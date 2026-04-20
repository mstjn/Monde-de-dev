import { getTopics } from "@/lib/actions/topics";
import { TopicCard } from "@/components/topic-card";
import { getUserSubscribedTopicIds } from "@/lib/actions/subscriptions";

export default async function TopicsPage() {
  // 2 promises at the same time to save time
  const [topics, subscribedIds] = await Promise.all([getTopics(), getUserSubscribedTopicIds()]);
  const subscribedTopicIds = new Set(subscribedIds);

  return (
    <main className="md:p-15 p-5 flex flex-col gap-10">
      <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} isSubscribed={subscribedTopicIds.has(topic.id)} />
        ))}
      </section>
    </main>
  );
}
