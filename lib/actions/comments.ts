"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Crée un commentaire sur un article et revalide la page.
 * @param postId - L'id de l'article
 * @param content - Le contenu du commentaire
 */
export async function createComment(postId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  await prisma.comment.create({
    data: { content, postId, authorId: session.user.id },
  });

  revalidatePath(`/articles/${postId}`);
}
