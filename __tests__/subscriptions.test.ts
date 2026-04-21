import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { subscription: { create: vi.fn(), delete: vi.fn(), findMany: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn() }));

import { newSubscription, removeSubscription, getUserSubscribedTopicIds } from "@/lib/actions/subscriptions";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const session = { user: { id: "user-1" } };

describe("newSubscription", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(newSubscription("topic-1")).rejects.toThrow("Non authentifié");
  });

  it("lève une erreur si le topicId est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    await expect(newSubscription("")).rejects.toThrow("L'id du thème est requis");
  });

  it("crée la souscription si les données sont valides", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.subscription.create).mockResolvedValue({} as any);
    await newSubscription("topic-1");
    expect(prisma.subscription.create).toHaveBeenCalledWith({
      data: { userId: "user-1", topicId: "topic-1" },
    });
  });
});

describe("removeSubscription", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(removeSubscription("topic-1")).rejects.toThrow("Non authentifié");
  });

  it("supprime la souscription si authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.subscription.delete).mockResolvedValue({} as any);
    await removeSubscription("topic-1");
    expect(prisma.subscription.delete).toHaveBeenCalledWith({
      where: { userId_topicId: { userId: "user-1", topicId: "topic-1" } },
    });
  });
});

describe("getUserSubscribedTopicIds", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(getUserSubscribedTopicIds()).rejects.toThrow("Non authentifié");
  });

  it("retourne la liste des topicIds souscrits", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.subscription.findMany).mockResolvedValue([
      { topicId: "topic-1" }, { topicId: "topic-2" },
    ] as any);
    expect(await getUserSubscribedTopicIds()).toEqual(["topic-1", "topic-2"]);
  });
});
