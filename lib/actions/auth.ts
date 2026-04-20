"use server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

/**
 * Inscrit un nouvel utilisateur et le connecte automatiquement.
 * @param _prevState - État précédent du formulaire
 * @param formData - Données du formulaire (username, email, password)
 */
export async function register(_prevState: unknown, formData: FormData) {
  const parsed = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { errors: { email: ["Email déjà utilisé"] } };

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.create({
    data: { ...parsed.data, password: hashedPassword },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/articles",
  });
}

/**
 * Connecte un utilisateur avec son email/username et mot de passe.
 * @param _prevState - État précédent du formulaire
 * @param formData - Données du formulaire (emailOrUsername, password)
 */
export async function login(_prevState: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      emailOrUsername: formData.get("emailOrUsername"),
      password: formData.get("password"),
      redirectTo: "/articles",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Identifiants incorrects" }
    }
    throw error
  }
}

/** Déconnecte l'utilisateur et redirige vers l'accueil. */
export async function logout() {
  "use server"
  await signOut({redirectTo: "/"})
}
