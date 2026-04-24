/**
 * @vitest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import SearchToolbar from "@/components/dashboard/SearchToolbar";

const baseProps = {
  onResults: vi.fn(),
  onActiveCategory: vi.fn(),
  onExpand: vi.fn(),
};

describe("SearchToolbar", () => {
  afterEach(() => vi.clearAllMocks());

  it("renders the search input and category pills", () => {
    render(<SearchToolbar {...baseProps} />);
    expect(screen.getByPlaceholderText(/film, actor/i)).toBeInTheDocument();
    expect(screen.getByText(/Trending/)).toBeInTheDocument();
    expect(screen.getByText(/Top Rated/)).toBeInTheDocument();
  });

  it("fires onExpand when a pill is clicked", () => {
    render(<SearchToolbar {...baseProps} />);
    fireEvent.click(screen.getByText(/Trending/));
    expect(baseProps.onExpand).toHaveBeenCalled();
  });

  it("fires onExpand when the input receives focus", () => {
    render(<SearchToolbar {...baseProps} />);
    fireEvent.focus(screen.getByPlaceholderText(/film, actor/i));
    expect(baseProps.onExpand).toHaveBeenCalled();
  });
});
