type Topic = {
  id: string;
  name: string;
  description: string | null;
  _count: { posts: number; subscriptions: number };
};

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3 hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-foreground">{topic.name}</h2>
      {topic.description && (
        <p className="text-sm text-muted-foreground">{topic.description}</p>
      )}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>{topic._count.posts} article{topic._count.posts !== 1 ? "s" : ""}</span>
        <span>{topic._count.subscriptions} abonné{topic._count.subscriptions !== 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}
