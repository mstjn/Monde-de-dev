import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { topic: { findMany: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { getTopics, getTopicsByUser } from "@/lib/actions/topics";
import { prisma } from "@/lib/prisma";

const mockTopics = [
  { id: "topic-1", name: "JavaScript", description: null, _count: { posts: 5, subscriptions: 10 } },
  { id: "topic-2", name: "TypeScript", description: null, _count: { posts: 3, subscriptions: 7 } },
];

describe("getTopics", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne tous les thèmes triés par nom", async () => {
    vi.mocked(prisma.topic.findMany).mockResolvedValue(mockTopics as any);
    const result = await getTopics();
    expect(prisma.topic.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true, subscriptions: true } } },
    });
    expect(result).toEqual(mockTopics);
  });
});

describe("getTopicsByUser", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne les thèmes souscrits par l'utilisateur", async () => {
    vi.mocked(prisma.topic.findMany).mockResolvedValue([mockTopics[0]] as any);
    const result = await getTopicsByUser("user-1");
    expect(prisma.topic.findMany).toHaveBeenCalledWith({
      where: { subscriptions: { some: { userId: "user-1" } } },
      orderBy: { name: "asc" },
    });
    expect(result).toHaveLength(1);
  });
});
