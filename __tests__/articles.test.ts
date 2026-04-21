import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    post: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("@/auth", () => ({ auth: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { getPost } from "@/lib/actions/articles";
import { prisma } from "@/lib/prisma";

const mockPost = {
  id: "post-1",
  title: "Mon article",
  content: "Contenu de l'article",
  createdAt: new Date("2024-01-15"),
  author: { username: "alice" },
  topic: { name: "JavaScript" },
  comments: [
    {
      id: "comment-1",
      content: "Super article !",
      createdAt: new Date("2024-01-16"),
      author: { username: "bob" },
    },
  ],
};

describe("getPost", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retourne l'article avec auteur, thème et commentaires quand l'id existe", async () => {
    vi.mocked(prisma.post.findUnique).mockResolvedValue(mockPost as any);

    const result = await getPost("post-1");

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: "post-1" },
      include: {
        author: { select: { username: true } },
        topic: { select: { name: true } },
        comments: {
          include: { author: { select: { username: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    expect(result).toEqual(mockPost);
  });

  it("retourne null quand l'article n'existe pas", async () => {
    vi.mocked(prisma.post.findUnique).mockResolvedValue(null);

    const result = await getPost("id-inexistant");

    expect(result).toBeNull();
  });

  it("propage l'erreur si prisma échoue", async () => {
    vi.mocked(prisma.post.findUnique).mockRejectedValue(new Error("DB error"));

    await expect(getPost("post-1")).rejects.toThrow("DB error");
  });
});
