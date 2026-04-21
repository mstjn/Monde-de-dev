// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { useActionState } from "react";

vi.mock("@/lib/actions/user", () => ({ updateProfile: vi.fn() }));
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return { ...actual as object, useActionState: vi.fn(() => [undefined, vi.fn()]) };
});

import UpdateProfileForm from "@/components/form/profile-form";

describe("UpdateProfileForm", () => {
  beforeEach(() => {
    vi.mocked(useActionState).mockReturnValue([undefined, vi.fn(), false]);
  });

  it("affiche les champs pré-remplis avec les valeurs de l'utilisateur", () => {
    render(<UpdateProfileForm username="alice" email="alice@test.com" />);
    expect(screen.getByDisplayValue("alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("alice@test.com")).toBeInTheDocument();
  });

  it("affiche le champ mot de passe", () => {
    render(<UpdateProfileForm username="alice" email="alice@test.com" />);
    expect(screen.getByPlaceholderText("mot de passe")).toBeInTheDocument();
  });

  it("affiche le bouton Sauvegarder", () => {
    render(<UpdateProfileForm username="alice" email="alice@test.com" />);
    expect(screen.getByRole("button", { name: "Sauvegarder" })).toBeInTheDocument();
  });

  it("affiche le message de succès si state.success", () => {
    vi.mocked(useActionState).mockReturnValue([{ success: true }, vi.fn(), false]);
    render(<UpdateProfileForm username="alice" email="alice@test.com" />);
    expect(screen.getByText("Profil mis à jour")).toBeInTheDocument();
  });

  it("affiche le message d'erreur si state.error", () => {
    vi.mocked(useActionState).mockReturnValue([{ error: "Mot de passe incorrect" }, vi.fn(), false]);
    render(<UpdateProfileForm username="alice" email="alice@test.com" />);
    expect(screen.getByText("Mot de passe incorrect")).toBeInTheDocument();
  });
});