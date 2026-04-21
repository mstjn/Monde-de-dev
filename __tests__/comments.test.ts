import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { comment: { create: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { createComment } from "@/lib/actions/comments";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const session = { user: { id: "user-1" } };

describe("createComment", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(createComment("post-1", "Super")).rejects.toThrow("Non authentifié");
  });

  it("lève une erreur si le contenu est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    await expect(createComment("post-1", "")).rejects.toThrow("Le commentaire est requis");
  });

  it("lève une erreur si le contenu dépasse 1000 caractères", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    await expect(createComment("post-1", "a".repeat(1001))).rejects.toThrow("1000 caractères maximum");
  });

  it("crée le commentaire si les données sont valides", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.comment.create).mockResolvedValue({} as any);
    await createComment("post-1", "Super article !");
    expect(prisma.comment.create).toHaveBeenCalledWith({
      data: { content: "Super article !", postId: "post-1", authorId: "user-1" },
    });
  });
});
