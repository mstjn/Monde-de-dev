"use client";
import { useState } from "react";
import { newSubscription, removeSubscription } from "@/lib/actions/subscriptions";
import type { Topic } from "@/types";

export function TopicCard({ topic, isSubscribed: initialIsSubscribed }: { topic: Topic; isSubscribed: boolean }) {
  const [isSubscribed, setIsSubscribed] = useState(initialIsSubscribed);

  async function handleToggle() {
    setIsSubscribed(!isSubscribed);
    try {
      if (isSubscribed) {
        await removeSubscription(topic.id);
      } else {
        await newSubscription(topic.id);
      }
    } catch {
      setIsSubscribed(isSubscribed);
    }
  }

  return (
    <article className="bg-[#F5F5F5] rounded-2xl p-8 text-base flex flex-col gap-5">
      <h2 className="font-bold text-lg">{topic.name}</h2>

      <p>{topic.description}</p>

      <button
        onClick={handleToggle}
        className={`self-center h-10 w-35 rounded-lg font-bold transition-colors text-white ${
          isSubscribed
            ? " bg-[#939393]"
            : " bg-(--main-purple)"
        }`}
      >
        {isSubscribed ? "Déjà abonné" : "S'abonner"}
      </button>
    </article>
  );
}
