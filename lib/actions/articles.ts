"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostSchema } from "@/lib/validations/content";

const sortMap = {
  date_desc: { createdAt: "desc" as const },
  date_asc:  { createdAt: "asc"  as const },
  title_asc: { title:     "asc"  as const },
  title_desc:{ title:     "desc" as const },
};

/**
 * Récupère tous les articles triés.
 * @param sort - Critère de tri (date_desc, date_asc, title_asc, title_desc)
 */
export async function getPosts(sort = "date_desc") {
  const orderBy = sortMap[sort as keyof typeof sortMap] ?? sortMap.date_desc;
  return prisma.post.findMany({ include: { author: true, topic: true }, orderBy });
}

/**
 * Récupère un article par son id avec auteur, thème et commentaires.
 * @param id - L'id de l'article
 */
export async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: { select: { username: true } },
      topic: { select: { name: true } },
      comments: {
        include: { author: { select: { username: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

/**
 * Crée un nouvel article.
 * @param _prevState - État précédent du formulaire
 * @param formData - Données du formulaire (title, content, topic)
 */
export async function createPost(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  const parsed = createPostSchema.safeParse({
    topicId: formData.get("topic"),
    title:   formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

  const { topicId, title, content } = parsed.data;

  await prisma.post.create({
    data: { title, content, topicId, authorId: session.user.id },
  });

  redirect("/articles");
}
