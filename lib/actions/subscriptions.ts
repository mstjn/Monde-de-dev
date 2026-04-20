"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getAuthenticatedUserId() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Non authentifié");
  return userId;
}

export async function newSubscription(topicId: string) {
  const userId = await getAuthenticatedUserId();
  await prisma.subscription.create({
    data: { userId, topicId },
  });
}

export async function removeSubscription(topicId: string) {
  const userId = await getAuthenticatedUserId();
  await prisma.subscription.delete({
    where: { userId_topicId: { userId, topicId } },
  });
}

export async function getUserSubscribedTopicIds(): Promise<string[]> {
    const userId = await getAuthenticatedUserId();
    const subs = await prisma.subscription.findMany({
      where: { userId },
      select: { topicId: true },
    });
    return subs.map((s) => s.topicId);
  }
