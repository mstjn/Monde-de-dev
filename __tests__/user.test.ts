import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { user: { findUnique: vi.fn(), update: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("bcryptjs", () => ({ default: { compare: vi.fn(), hash: vi.fn() } }));

import { getProfile, updateProfile } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

const session = { user: { id: "user-1" } };
const mockUser = { id: "user-1", username: "alice", email: "alice@test.com", password: "hashed" };

function makeFormData(data: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe("getProfile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(getProfile()).rejects.toThrow("Non authentifié");
  });

  it("retourne le profil de l'utilisateur connecté", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    const result = await getProfile();
    expect(result).toMatchObject({ username: "alice", email: "alice@test.com" });
  });
});

describe("updateProfile", () => {
  beforeEach(() => vi.clearAllMocks());

  it("lève une erreur si non authentifié", async () => {
    vi.mocked(auth).mockResolvedValue(null as any);
    await expect(updateProfile(undefined, makeFormData({ username: "alice", email: "a@a.com", password: "pass" }))).rejects.toThrow("Non authentifié");
  });

  it("retourne une erreur si le username est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    expect(await updateProfile(undefined, makeFormData({ username: "", email: "a@a.com", password: "pass" }))).toMatchObject({ error: "Le nom d'utilisateur est requis" });
  });

  it("retourne une erreur si l'email est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    expect(await updateProfile(undefined, makeFormData({ username: "alice", email: "", password: "pass" }))).toMatchObject({ error: "L'email est requis" });
  });

  it("retourne une erreur si le mot de passe est vide", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    expect(await updateProfile(undefined, makeFormData({ username: "alice", email: "a@a.com", password: "" }))).toMatchObject({ error: "Le mot de passe est requis" });
  });

  it("retourne une erreur si le mot de passe est incorrect", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as any);
    expect(await updateProfile(undefined, makeFormData({ username: "alice", email: "a@a.com", password: "mauvais" }))).toMatchObject({ error: "Mot de passe incorrect" });
  });

  it("met à jour le profil si les données sont valides", async () => {
    vi.mocked(auth).mockResolvedValue(session as any);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(mockUser as any);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as any);
    vi.mocked(prisma.user.update).mockResolvedValue({} as any);
    const result = await updateProfile(undefined, makeFormData({ username: "alice", email: "a@a.com", password: "pass" }));
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: "user-1" }, data: { username: "alice", email: "a@a.com" } });
    expect(result).toMatchObject({ success: true });
  });
});
