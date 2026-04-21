import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { user: { findUnique: vi.fn(), create: vi.fn() } },
}));
vi.mock("@/auth", () => ({ auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }));
vi.mock("bcryptjs", () => ({ default: { hash: vi.fn(), compare: vi.fn() } }));
vi.mock("next-auth", () => ({ AuthError: class AuthError extends Error {} }));

import { register, login, logout } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

function makeFormData(data: Record<string, string>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(data)) fd.append(k, v);
  return fd;
}

describe("register", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne les erreurs de validation si les données sont invalides", async () => {
    const result = await register(undefined, makeFormData({ username: "ab", email: "pas-un-email", password: "123" }));
    expect(result).toMatchObject({ errors: expect.any(Object) });
  });

  it("retourne une erreur si l'email est déjà utilisé", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: "existing" } as any);
    const result = await register(undefined, makeFormData({ username: "alice", email: "alice@test.com", password: "Password1!" }));
    expect(result).toMatchObject({ errors: { email: ["Email déjà utilisé"] } });
  });

  it("crée l'utilisateur et le connecte si les données sont valides", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashed" as any);
    vi.mocked(prisma.user.create).mockResolvedValue({} as any);
    vi.mocked(signIn).mockResolvedValue(undefined as any);
    await register(undefined, makeFormData({ username: "alice", email: "alice@test.com", password: "Password1!" }));
    expect(prisma.user.create).toHaveBeenCalled();
    expect(signIn).toHaveBeenCalledWith("credentials", expect.objectContaining({ email: "alice@test.com" }));
  });
});

describe("login", () => {
  beforeEach(() => vi.clearAllMocks());

  it("retourne une erreur si les identifiants sont incorrects", async () => {
    vi.mocked(signIn).mockRejectedValue(new AuthError("Invalid"));
    const result = await login(undefined, makeFormData({ emailOrUsername: "alice", password: "mauvais" }));
    expect(result).toMatchObject({ error: "Identifiants incorrects" });
  });

  it("connecte l'utilisateur si les identifiants sont corrects", async () => {
    vi.mocked(signIn).mockResolvedValue(undefined as any);
    await login(undefined, makeFormData({ emailOrUsername: "alice", password: "pass" }));
    expect(signIn).toHaveBeenCalledWith("credentials", expect.objectContaining({ emailOrUsername: "alice" }));
  });
});

describe("logout", () => {
  it("appelle signOut avec redirection vers /", async () => {
    vi.mocked(signOut).mockResolvedValue(undefined as any);
    await logout();
    expect(signOut).toHaveBeenCalledWith({ redirectTo: "/" });
  });
});
