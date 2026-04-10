import { render, screen } from "@testing-library/react";
import { Navbar } from "../app/components/Navbar";

describe("Navbar", () => {
  it("renders default actions", () => {
    render(<Navbar />);

    expect(screen.getByText("Ingresar")).toBeInTheDocument();
    expect(screen.getByText("Crear cuenta")).toBeInTheDocument();
  });
});
