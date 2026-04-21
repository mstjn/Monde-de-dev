// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { TopicCard } from "@/components/ui/topic-card";

vi.mock("@/lib/actions/subscriptions", () => ({
  newSubscription: vi.fn().mockResolvedValue(undefined),
  removeSubscription: vi.fn().mockResolvedValue(undefined),
}));

const topic = { id: "topic-1", name: "JavaScript", description: "Le langage du web" };

describe("TopicCard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("affiche le nom et la description du thème", () => {
    render(<TopicCard topic={topic as any} isSubscribed={false} />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Le langage du web")).toBeInTheDocument();
  });

  it("affiche 'S'abonner' si non souscrit", () => {
    render(<TopicCard topic={topic as any} isSubscribed={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("S'abonner");
  });

  it("affiche 'Déjà abonné' si souscrit", () => {
    render(<TopicCard topic={topic as any} isSubscribed={true} />);
    expect(screen.getByRole("button")).toHaveTextContent("Déjà abonné");
  });

  it("affiche 'Se désabonner' en variant profil si souscrit", () => {
    render(<TopicCard topic={topic as any} isSubscribed={true} profileVariant />);
    expect(screen.getByRole("button")).toHaveTextContent("Se désabonner");
  });

  it("bascule l'état optimiste au clic", async () => {
    render(<TopicCard topic={topic as any} isSubscribed={false} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("button")).toHaveTextContent("Déjà abonné"));
  });

  it("revert l'état si l'action échoue", async () => {
    const { removeSubscription } = await import("@/lib/actions/subscriptions");
    vi.mocked(removeSubscription).mockRejectedValueOnce(new Error("Erreur"));
    render(<TopicCard topic={topic as any} isSubscribed={true} />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByRole("button")).toHaveTextContent("Déjà abonné"));
  });
});