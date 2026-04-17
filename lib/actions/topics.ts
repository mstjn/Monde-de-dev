"use server";

import { prisma } from "@/lib/prisma";

export async function getTopics() {
  return prisma.topic.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true, subscriptions: true } } },
  });
}
