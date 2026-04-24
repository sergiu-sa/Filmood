/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import TrendingBox from "@/components/dashboard/TrendingBox";

describe("TrendingBox", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            films: Array.from({ length: 7 }).map((_, i) => ({
              id: i, title: `Film ${i}`, genre_ids: [28], poster_path: "/p.jpg",
            })),
          }),
      } as Response),
    );
  });
  afterEach(() => vi.clearAllMocks());

  it("renders the 'Trending today' label", () => {
    render(<TrendingBox onExpand={vi.fn()} isCollapsed={false} />);
    expect(screen.getByText(/Trending today/i)).toBeInTheDocument();
  });

  it("fetches and shows top 5 films", async () => {
    render(<TrendingBox onExpand={vi.fn()} isCollapsed={false} />);
    await waitFor(() => expect(screen.getByText("Film 0")).toBeInTheDocument());
    // Only 5 rendered
    expect(screen.queryByText("Film 5")).not.toBeInTheDocument();
  });
});
