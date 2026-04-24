/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HeroPersonalized from "@/components/dashboard/HeroPersonalized";

const baseProps = {
  groupSession: null,
  watchlistPeek: [],
};

describe("HeroPersonalized", () => {
  it("renders nothing when both group and watchlist are empty", () => {
    const { container } = render(<HeroPersonalized {...baseProps} />);
    expect(container.textContent).toBe("");
  });

  it("renders the group chip when a session is given", () => {
    render(
      <HeroPersonalized
        groupSession={{ code: "EX72", waiting: 2, status: "lobby" }}
        watchlistPeek={[]}
      />,
    );
    expect(screen.getByText(/EX72/)).toBeInTheDocument();
    expect(screen.getByText(/2 waiting/i)).toBeInTheDocument();
  });

  it("renders the watchlist peek with film covers and 'open' link", () => {
    render(
      <HeroPersonalized
        groupSession={null}
        watchlistPeek={[
          { movie_id: 1, title: "A", poster_path: "/a.jpg" },
          { movie_id: 2, title: "B", poster_path: null },
          { movie_id: 3, title: "C", poster_path: "/c.jpg" },
        ]}
      />,
    );
    expect(screen.getByText(/Watchlist/i)).toBeInTheDocument();
    expect(screen.getByText(/3 saved/i)).toBeInTheDocument();
  });
});
