"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Récupère l'id de l'utilisateur connecté ou lève une erreur. */
async function getAuthenticatedUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Non authentifié");
  return userId;
}

/**
 * Abonne l'utilisateur connecté à un thème.
 * @param topicId - L'id du thème
 */
export async function newSubscription(topicId: string) {
  const userId = await getAuthenticatedUserId();
  await prisma.subscription.create({
    data: { userId, topicId },
  });
}

/**
 * Désabonne l'utilisateur connecté d'un thème.
 * @param topicId - L'id du thème
 */
export async function removeSubscription(topicId: string) {
  const userId = await getAuthenticatedUserId();
  await prisma.subscription.delete({
    where: { userId_topicId: { userId, topicId } },
  });
}

/**
 * Récupère les ids des thèmes auxquels l'utilisateur connecté est abonné.
 * @returns Liste d'ids de thèmes
 */
export async function getUserSubscribedTopicIds(): Promise<string[]> {
  const userId = await getAuthenticatedUserId();
  const subs = await prisma.subscription.findMany({
    where: { userId },
    select: { topicId: true },
  });
  return subs.map((s) => s.topicId);
}
