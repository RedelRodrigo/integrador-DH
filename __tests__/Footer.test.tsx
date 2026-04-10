import { render, screen } from "@testing-library/react";
import { Footer } from "../app/components/Footer";

describe("Footer", () => {
  it("renders footer text", () => {
    render(<Footer />);

    expect(screen.getByText(/Digital Money House/i)).toBeInTheDocument();
  });
});
