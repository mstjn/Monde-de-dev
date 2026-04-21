// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Navbar from "@/components/common/navbar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/articles"),
}));
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));
vi.mock("@/lib/actions/auth", () => ({ logout: vi.fn() }));

describe("Navbar", () => {
  it("affiche les liens de navigation", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: "Articles" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Thèmes" })[0]).toBeInTheDocument();
  });

  it("affiche le bouton de déconnexion", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("button", { name: "Se déconnecter" })[0]).toBeInTheDocument();
  });

  it("est cachée sur les pages login et register", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/login");
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toHaveClass("hidden");
  });
});