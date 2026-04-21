// @vitest-environment jsdom
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
afterEach(() => cleanup());

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SortButton from "@/components/ui/sort-button";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("SortButton", () => {
  it("affiche 'Plus récent' par défaut", () => {
    render(<SortButton />);
    expect(screen.getByText("Plus récent")).toBeInTheDocument();
  });

  it("navigue vers date_asc au clic quand on est sur date_desc", () => {
    render(<SortButton />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("?sort=date_asc");
  });
});
