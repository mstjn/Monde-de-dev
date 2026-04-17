 import { z } from "zod"

  export const registerSchema = z.object({
    email: z.string().email("Email invalide"),
    username: z.string().min(3, "3 caractères minimum").max(20),
    password: z.string().min(8, "8 caractères minimum"),
  })

   export const loginSchema = z.object({                                           
    emailOrUsername: z.string().min(1, "Champ requis"),                           
    password: z.string().min(1, "Mot de passe requis"),                           
  })

  export type RegisterInput = z.infer<typeof registerSchema>
  export type LoginInput = z.infer<typeof loginSchema>