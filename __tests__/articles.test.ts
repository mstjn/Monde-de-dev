import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { post: { findUnique: vi.fn(), create: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));

import { getPost, createPost } from "@/lib/actions/articles";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const session = { user: { id: "user-1" } };

const mockPost = {
  id: "post-1",
  title: "Mon article",
  content: "Contenu de l'article",
  createdAt: new Date("2024-01-15"),
  author: { username: "alice" },
  topic: { name: "JavaScript" },
  comments: [{ id: "comment-1", content: "Super !", createdAt: new Date(), author: { username: "bob" } }],
};

function makeFormData(data: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe("getPost", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne l'article quand l'id existe", async () => {
    vi.mocked(prisma.post.findUnique).mockResolvedValue(mockPost as any);
    const result = await getPost("post-1");
    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: "post-1" },
      include: {
        author: { select: { username: true } },
        topic: { select: { name: true } },
        comments: { include: { author: { select: { username: true } } }, orderBy: { createdAt: "asc" } },
      },
    });
    expect(result).toEqual(mockPost);
  });

  it("retourne null si l'article n'existe pas", async () => {
    vi.mocked(prisma.post.findUnique).mockResolvedValue(null);
    expect(await getPost("inexistant")).toBeNull();
  });
});

describe("createPost", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(createPost(undefined, makeFormData({ topic: "t1", title: "T", content: "C" }))).rejects.toThrow("Non authentifié");
  });

  it("retourne les erreurs si le titre est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    const result = await createPost(undefined, makeFormData({ topic: "t1", title: "", content: "C" }));
    expect(result).toMatchObject({ errors: { title: expect.any(Array) } });
  });

  it("retourne les erreurs si le contenu est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    const result = await createPost(undefined, makeFormData({ topic: "t1", title: "T", content: "" }));
    expect(result).toMatchObject({ errors: { content: expect.any(Array) } });
  });

  it("retourne les erreurs si le topicId est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    const result = await createPost(undefined, makeFormData({ topic: "", title: "T", content: "C" }));
    expect(result).toMatchObject({ errors: { topicId: expect.any(Array) } });
  });

  it("crée l'article et redirige si les données sont valides", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.post.create).mockResolvedValue({} as any);
    await createPost(undefined, makeFormData({ topic: "t1", title: "Titre", content: "Contenu" }));
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: { title: "Titre", content: "Contenu", topicId: "t1", authorId: "user-1" },
    });
    expect(redirect).toHaveBeenCalledWith("/articles");
  });
});
