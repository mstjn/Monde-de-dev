"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const sortMap = {
  date_desc: { createdAt: "desc" as const },
  date_asc:  { createdAt: "asc"  as const },
  title_asc: { title:     "asc"  as const },
  title_desc:{ title:     "desc" as const },
};

export async function getPosts(sort = "date_desc") {
  const orderBy = sortMap[sort as keyof typeof sortMap] ?? sortMap.date_desc;
  return prisma.post.findMany({ include: { author: true }, orderBy });
}

export async function createPost(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  const topicId = formData.get("topic") as string;
  const title   = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!topicId) return { error: "Le thème est requis" };
  if (!title.trim()) return { error: "Le titre est requis" };
  if (!content.trim()) return { error: "Le contenu est requis" };

  await prisma.post.create({
    data: { title, content, topicId, authorId: session.user.id },
  });

  redirect("/articles");
}