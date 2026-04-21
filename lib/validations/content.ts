import { z } from "zod"

export const createPostSchema = z.object({
  title:   z.string().min(1, "Le titre est requis").max(150, "150 caractères maximum"),
  content: z.string().min(1, "Le contenu est requis").max(5000, "5000 caractères maximum"),
  topicId: z.string().min(1, "Le thème est requis"),
})

export const createCommentSchema = z.object({
  content: z.string().min(1, "Le commentaire est requis").max(1000, "1000 caractères maximum"),
})

export const subscriptionSchema = z.object({
  topicId: z.string().min(1, "L'id du thème est requis"),
})
