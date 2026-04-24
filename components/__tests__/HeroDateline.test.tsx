/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import HeroDateline from "@/components/dashboard/HeroDateline";

describe("HeroDateline", () => {
  it("renders a guest dateline with N°01 prefix", () => {
    render(<HeroDateline name={null} />);
    expect(screen.getByText(/N°01/)).toBeInTheDocument();
  });

  it("renders the user name uppercased when given", () => {
    render(<HeroDateline name="sergiu" />);
    expect(screen.getByText(/SERGIU/)).toBeInTheDocument();
  });

  it("truncates long names to 10 chars", () => {
    render(<HeroDateline name="thisisaverylongusername" />);
    expect(screen.getByText(/THISISAVER/)).toBeInTheDocument();
    expect(screen.queryByText(/THISISAVERYLONG/)).not.toBeInTheDocument();
  });
});
