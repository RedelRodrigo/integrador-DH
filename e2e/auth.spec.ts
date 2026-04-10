import { test, expect } from "@playwright/test";

test("navigate to login and register", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /Ingresar/i }).click();
  await expect(
    page.getByRole("heading", { name: /Ingresá tu e-mail/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Crear cuenta/i }).click();
  await expect(
    page.getByRole("heading", { name: /Crear cuenta/i }),
  ).toBeVisible();
});

// Optional login flow when credentials are provided
// Set E2E_LOGIN_EMAIL and E2E_LOGIN_PASSWORD to enable

test("login with real credentials (optional)", async ({ page }) => {
  const email = process.env.E2E_LOGIN_EMAIL;
  const password = process.env.E2E_LOGIN_PASSWORD;

  test.skip(!email || !password, "Missing E2E credentials");

  await page.goto("/login");
  await page.getByPlaceholder("Correo electrónico").fill(email as string);
  await page.getByRole("button", { name: /Continuar/i }).click();

  await page.getByPlaceholder("Contraseña").fill(password as string);
  await page.getByRole("button", { name: /Continuar/i }).click();

  await expect(page.getByText(/Contraseña incorrecta/i)).not.toBeVisible();
});
