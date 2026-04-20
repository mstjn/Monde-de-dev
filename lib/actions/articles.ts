"use server"

import { prisma } from "@/lib/prisma";

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