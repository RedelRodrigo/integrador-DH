import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../app/components/Button";
import { describe, it } from "node:test";

describe("Button", () => {
  it("renders primary variant by default", () => {
    render(<Button>Continuar</Button>);

    const button = screen.getByRole("button", { name: /Continuar/i });
    expect(button).toHaveClass("bg-primary");
  });

  it("renders outline variant", () => {
    render(<Button variant="outline">Ingresar</Button>);

    const button = screen.getByRole("button", { name: /Ingresar/i });
    expect(button).toHaveClass("border-primary");
  });

  it("renders gray variant", () => {
    render(<Button variant="gray">Cancelar</Button>);

    const button = screen.getByRole("button", { name: /Cancelar/i });
    expect(button).toHaveClass("bg-[#3A393E]");
  });

  it("fires onClick", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Accion</Button>);

    const button = screen.getByRole("button", { name: /Accion/i });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
function expect(button: HTMLElement) {
  throw new Error("Function not implemented.");
}
