"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComment(postId: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  await prisma.comment.create({
    data: { content, postId, authorId: session.user.id },
  });

  // reload the page to display the new comment
  revalidatePath(`/articles/${postId}`);
}
