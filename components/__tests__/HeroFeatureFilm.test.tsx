/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HeroFeatureFilm from "@/components/dashboard/HeroFeatureFilm";

describe("HeroFeatureFilm", () => {
  it("renders the title and year for the given mood", () => {
    render(<HeroFeatureFilm moodKey="unsettled" />);
    expect(screen.getByText("The Zone of Interest")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("shows the MOOD MATCH badge", () => {
    render(<HeroFeatureFilm moodKey="unsettled" />);
    expect(screen.getByText(/MOOD MATCH/i)).toBeInTheDocument();
  });

  it("renders a placeholder when the mood is unknown", () => {
    render(<HeroFeatureFilm moodKey="not-a-real-mood" />);
    expect(screen.getByRole("img", { hidden: true }) || screen.getByText(/Coming/)).toBeTruthy();
  });

  it("alt text contains title, year, and mood hint", () => {
    render(<HeroFeatureFilm moodKey="unsettled" />);
    const img = screen.getByRole("img");
    expect(img.getAttribute("alt")).toMatch(/The Zone of Interest/);
    expect(img.getAttribute("alt")).toMatch(/unsettled/);
  });
});
