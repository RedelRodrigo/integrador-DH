import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../app/(auth)/login/page";
import { renderWithProviders } from "../test/test-utils";

describe("LoginPage", () => {
  it("renders email step by default", () => {
    renderWithProviders(<LoginPage />);

    expect(
      screen.getByRole("heading", { name: /Ingresá tu e-mail/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Correo electrónico/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Continuar/i }),
    ).toBeInTheDocument();
  });

  it("shows validation message when email is missing", async () => {
    renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(screen.getByText(/Ingresá tu email/i)).toBeInTheDocument();
  });

  it("moves to password step after existing email", async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    const originalFetch = (globalThis as { fetch?: typeof fetch }).fetch;
    (globalThis as { fetch?: typeof fetch }).fetch = fetchMock;

    renderWithProviders(<LoginPage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText(/Correo electrónico/i),
      "demo@demo.com",
    );
    await user.click(screen.getByRole("button", { name: /Continuar/i }));

    expect(
      await screen.findByRole("heading", { name: /Ingresá tu contraseña/i }),
    ).toBeInTheDocument();

    (globalThis as { fetch?: typeof fetch }).fetch = originalFetch;
  });
});
