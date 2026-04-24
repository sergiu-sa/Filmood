import { test, expect } from "@playwright/test";

test.describe("Home hero — guest", () => {
  test("renders headline + cycling mood word + chips", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Start with mood/i })).toBeVisible();
    await expect(page.getByText(/Play Your/i)).toBeVisible();
    await expect(page.getByText(/\+ 12 more/)).toBeVisible();
  });

  test("clicking a chip scrolls to dashboard and MoodBox", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByRole("region", { name: /Filmood — Play Your Mood/i });
    await hero.getByRole("button", { name: "Laugh", exact: true }).click();
    await expect(page.locator("#dashboard")).toBeInViewport();
  });

  test("cycling mood word is keyboard-accessible", async ({ page }) => {
    await page.goto("/");
    const cycler = page.getByRole("button", { name: /Start with mood/i });
    await cycler.focus();
    await expect(cycler).toBeFocused();
    await cycler.press("Enter");
    await expect(page.locator("#dashboard")).toBeInViewport();
  });
});

test.describe("Home hero — light mode", () => {
  test("renders without hydration errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(String(err)));
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
    await expect(page.getByText(/Play Your/i)).toBeVisible();
  });
});
