/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import HeroNowShowing from "@/components/dashboard/HeroNowShowing";

describe("HeroNowShowing", () => {
  beforeEach(() => {
    // @ts-expect-error - we're mocking fetch
    global.fetch = vi.fn((url: string) => {
      if (url.includes("/api/movies/trending")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              films: [
                { id: 1, title: "Film A", poster_path: "/a.jpg", release_date: "2024", vote_average: 8, overview: "" },
                { id: 2, title: "Film B", poster_path: "/b.jpg", release_date: "2024", vote_average: 7, overview: "" },
                { id: 3, title: "Film C", poster_path: null,    release_date: "2024", vote_average: 7, overview: "" },
              ],
            }),
        } as Response);
      }
      return Promise.reject(new Error("unexpected fetch"));
    });
  });
  afterEach(() => vi.clearAllMocks());

  it("renders 3 mini posters after loading", async () => {
    render(<HeroNowShowing />);
    await waitFor(() => {
      const items = screen.getAllByRole("link");
      expect(items.length).toBe(3);
    });
  });

  it("renders the 'Now showing' label", () => {
    render(<HeroNowShowing />);
    expect(screen.getByText(/Now showing/i)).toBeInTheDocument();
  });

  it("handles fetch failure silently (no items, label still visible)", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("boom")));
    render(<HeroNowShowing />);
    await waitFor(() => {
      expect(screen.queryAllByRole("link").length).toBe(0);
    });
    expect(screen.getByText(/Now showing/i)).toBeInTheDocument();
  });
});
