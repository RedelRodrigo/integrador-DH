import { render, screen } from "@testing-library/react";
import { FeatureCard } from "../app/components/FeatureCard";

describe("FeatureCard", () => {
  it("renders title and description", () => {
    render(
      <FeatureCard
        title="Transferi dinero"
        description="Descripcion de prueba"
      />,
    );

    expect(screen.getByText("Transferi dinero")).toBeInTheDocument();
    expect(screen.getByText("Descripcion de prueba")).toBeInTheDocument();
  });
});
