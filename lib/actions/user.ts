"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

/**
 * Récupère le profil de l'utilisateur connecté.
 * @returns Données du profil (id, username, email)
 */
export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");
  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, username: true, email: true },
  });
}

/**
 * Met à jour le profil de l'utilisateur connecté après vérification du mot de passe.
 * @param _prevState - État précédent du formulaire
 * @param formData - Données du formulaire (username, email, password)
 */
export async function updateProfile(_prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Non authentifié");

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!username?.trim()) return { error: "Le nom d'utilisateur est requis" };
  if (!email?.trim()) return { error: "L'email est requis" };
  if (!password?.trim()) return { error: "Le mot de passe est requis" };

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const passwordValid = user && await bcrypt.compare(password, user.password);
  if (!passwordValid) return { error: "Mot de passe incorrect" };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username, email },
  });

  revalidatePath("/profile");
  return { success: true };
}
