import { test, expect } from "@playwright/test";

test("home renders hero and cards", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /De ahora en adelante/i }),
  ).toBeVisible();

  await expect(page.getByText(/Transferí dinero/i)).toBeVisible();
  await expect(page.getByText(/Pago de servicios/i)).toBeVisible();
});
