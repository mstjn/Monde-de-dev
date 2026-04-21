// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { CommentForm } from "@/components/form/comment-form";

vi.mock("@/lib/actions/comments", () => ({
  createComment: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("lucide-react", () => ({
  Send: () => <svg data-testid="send-icon" />,
}));

describe("CommentForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("affiche le textarea et le bouton d'envoi", () => {
    render(<CommentForm postId="post-1" />);
    expect(screen.getByPlaceholderText("Écrivez ici votre commentaire")).toBeInTheDocument();
    expect(screen.getByTestId("send-icon")).toBeInTheDocument();
  });

  it("ne soumet pas si le commentaire est vide", async () => {
    const { createComment } = await import("@/lib/actions/comments");
    render(<CommentForm postId="post-1" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(createComment).not.toHaveBeenCalled());
  });

  it("soumet et réinitialise le champ si le commentaire est valide", async () => {
    const { createComment } = await import("@/lib/actions/comments");
    render(<CommentForm postId="post-1" />);
    const textarea = screen.getByPlaceholderText("Écrivez ici votre commentaire");
    fireEvent.change(textarea, { target: { value: "Super article !" } });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(createComment).toHaveBeenCalledWith("post-1", "Super article !");
      expect(textarea).toHaveValue("");
    });
  });
});