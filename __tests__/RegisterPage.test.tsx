import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../app/(auth)/register/page";
import { renderWithProviders } from "../test/test-utils";

describe("RegisterPage", () => {
  it("renders registration form", () => {
    renderWithProviders(<RegisterPage />);

    expect(
      screen.getByRole("heading", { name: /Crear cuenta/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Crear cuenta/i }),
    ).toBeInTheDocument();
  });

  it("shows error when submitting empty form", async () => {
    renderWithProviders(<RegisterPage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(screen.getByText(/Revisá los campos marcados/i)).toBeInTheDocument();
  });

  it("shows mismatch error when passwords do not match", async () => {
    renderWithProviders(<RegisterPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/^Contraseña\*$/i), "Abcdef1!");
    await user.type(
      screen.getByPlaceholderText(/Confirmar contraseña\*/i),
      "Different1!",
    );
    await user.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(
      screen.getByText(/Las contraseñas no coinciden/i),
    ).toBeInTheDocument();
  });

  it("submits successfully with valid data", async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const originalFetch = (globalThis as { fetch?: typeof fetch }).fetch;
    (globalThis as { fetch?: typeof fetch }).fetch = fetchMock;

    renderWithProviders(<RegisterPage />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Nombre\*/i), "Ana");
    await user.type(screen.getByPlaceholderText(/Apellido\*/i), "Lopez");
    await user.type(screen.getByPlaceholderText(/DNI\*/i), "12345678");
    await user.type(
      screen.getByPlaceholderText(/Correo electrónico\*/i),
      "ana@demo.com",
    );
    await user.type(screen.getByPlaceholderText(/^Contraseña\*$/i), "Abcdef1!");
    await user.type(
      screen.getByPlaceholderText(/Confirmar contraseña\*/i),
      "Abcdef1!",
    );
    await user.type(screen.getByPlaceholderText(/Teléfono\*/i), "11223344");

    await user.click(screen.getByRole("button", { name: /Crear cuenta/i }));

    expect(
      await screen.findByRole("button", { name: /Continuar/i }),
    ).toBeInTheDocument();

    (globalThis as { fetch?: typeof fetch }).fetch = originalFetch;
  });
});
