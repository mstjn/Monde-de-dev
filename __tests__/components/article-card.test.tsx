// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import ArticleCard from "@/components/ui/article-card";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

const props = {
  id: "post-1",
  title: "Mon article",
  content: "Contenu de test",
  date: new Date("2024-01-15"),
  author: { username: "alice" },
};

describe("ArticleCard", () => {
  it("affiche le titre, l'auteur et le contenu", () => {
    render(<ArticleCard {...props} />);
    expect(screen.getByText("Mon article")).toBeInTheDocument();
    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByText("Contenu de test")).toBeInTheDocument();
  });

  it("affiche la date formatée", () => {
    render(<ArticleCard {...props} />);
    expect(screen.getByText(new Date("2024-01-15").toLocaleDateString())).toBeInTheDocument();
  });

  it("redirige vers la page de l'article au clic", () => {
    render(<ArticleCard {...props} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/articles/post-1");
  });
});