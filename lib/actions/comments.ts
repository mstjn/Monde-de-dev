"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createCommentSchema } from "@/lib/validations/content";

/**
 * Crée un commentaire sur un article et revalide la page.
 * @param postId - L'id de l'article
 * @param content - Le contenu du commentaire
 */
export async function createComment(postId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  const parsed = createCommentSchema.safeParse({ content });
  if (!parsed.success) throw new Error(parsed.error.flatten().fieldErrors.content?.[0]);

  await prisma.comment.create({
    data: { content: parsed.data.content, postId, authorId: session.user.id },
  });

  revalidatePath(`/articles/${postId}`);
}
