 import { z } from "zod"

  export const registerSchema = z.object({
    email: z.string().email("Email invalide"),
    username: z.string().min(3, "3 caractères minimum").max(20),
    password: z.string()
      .min(8, "8 caractères minimum")
      .regex(/[0-9]/, "Au moins un chiffre requis")
      .regex(/[a-z]/, "Au moins une lettre minuscule requise")
      .regex(/[A-Z]/, "Au moins une lettre majuscule requise")
      .regex(/[^a-zA-Z0-9]/, "Au moins un caractère spécial requis"),
  })

   export const loginSchema = z.object({                                           
    emailOrUsername: z.string().min(1, "Champ requis"),                           
    password: z.string().min(1, "Mot de passe requis"),                           
  })

  export type RegisterInput = z.infer<typeof registerSchema>
  export type LoginInput = z.infer<typeof loginSchema>