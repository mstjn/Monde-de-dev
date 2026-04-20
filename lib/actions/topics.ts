"use server";

import { prisma } from "@/lib/prisma";

/** Récupère tous les thèmes triés par nom avec le nombre de posts et abonnements. */
export async function getTopics() {
  return prisma.topic.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true, subscriptions: true } } },
  });
}

/**
 * Récupère les thèmes auxquels un utilisateur est abonné.
 * @param userId - L'id de l'utilisateur
 */
export async function getTopicsByUser(userId: string) {
  return prisma.topic.findMany({
    where: { subscriptions: { some: { userId } } },
    orderBy: { name: "asc" },
  });
}
