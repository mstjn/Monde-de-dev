// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import CreateArticleForm from "@/components/form/create-article-form";

vi.mock("@/lib/actions/articles", () => ({ createPost: vi.fn() }));
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return { ...actual as object, useActionState: vi.fn(() => [undefined, vi.fn()]) };
});

const topics = [
  { id: "t1", name: "JavaScript", description: null },
  { id: "t2", name: "TypeScript", description: null },
];

describe("CreateArticleForm", () => {
  it("affiche les champs titre, contenu et le select de thèmes", () => {
    render(<CreateArticleForm topics={topics as any} />);
    expect(screen.getByLabelText("Titre")).toBeInTheDocument();
    expect(screen.getByLabelText("Contenu")).toBeInTheDocument();
    expect(screen.getByLabelText("Thème")).toBeInTheDocument();
  });

  it("affiche les thèmes dans le select", () => {
    render(<CreateArticleForm topics={topics as any} />);
    expect(screen.getByRole("option", { name: "JavaScript" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "TypeScript" })).toBeInTheDocument();
  });

  it("met à jour le titre à la saisie", () => {
    render(<CreateArticleForm topics={topics as any} />);
    const input = screen.getByLabelText("Titre");
    fireEvent.change(input, { target: { value: "Mon titre" } });
    expect(input).toHaveValue("Mon titre");
  });

  it("met à jour le contenu à la saisie", () => {
    render(<CreateArticleForm topics={topics as any} />);
    const textarea = screen.getByLabelText("Contenu");
    fireEvent.change(textarea, { target: { value: "Mon contenu" } });
    expect(textarea).toHaveValue("Mon contenu");
  });

  it("affiche le bouton Créer", () => {
    render(<CreateArticleForm topics={topics as any} />);
    expect(screen.getByRole("button", { name: "Créer" })).toBeInTheDocument();
  });
});