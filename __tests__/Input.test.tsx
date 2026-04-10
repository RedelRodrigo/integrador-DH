import { render, screen } from "@testing-library/react";
import { Input } from "../app/components/Input";

describe("Input", () => {
  it("renders with error styles", () => {
    render(<Input placeholder="Email" error />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toHaveClass("border-red-500");
  });

  it("applies password tracking when value present", () => {
    render(
      <Input
        type="password"
        placeholder="Clave"
        value="Secret123!"
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("Clave");
    expect(input).toHaveClass("tracking-[0.15em]");
  });

  it("uses normal text size for non-password", () => {
    render(<Input placeholder="Usuario" value="Ana" onChange={() => {}} />);

    const input = screen.getByPlaceholderText("Usuario");
    expect(input).toHaveClass("text-base");
  });
});
