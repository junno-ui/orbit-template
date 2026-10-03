import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("navigation, FAQ, enquiry and responsive layout work", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Some journeys");
  if (isMobile) {
    const toggle = page.getByRole("button", { name: "Toggle navigation", includeHidden: true });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("dialog", { name: "orbit" })).toBeVisible();
    await page.getByRole("dialog").evaluate(async (element) => {
      await Promise.all(element.getAnimations().map((animation) => animation.finished));
    });
    const menuAudit = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(menuAudit.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await toggle.click();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Destinations" })
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  }
  await page.locator("#journey-voyage").getByRole("link").click();
  await expect(page.getByLabel("Your horizon")).toHaveValue("Voyage");
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("What are you dreaming of?").fill("Earth & stars + a quiet journey");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiry is ready." })).toBeFocused();
  const mailto = await page.getByRole("link", { name: "Open email draft" }).getAttribute("href");
  expect(decodeURIComponent(mailto!)).toContain("Earth & stars + a quiet journey");
  await page.getByRole("button", { name: "Edit enquiry" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("Alex Example");
  const question = page.getByRole("button", { name: "Is Orbit a real space-travel operator?" });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "Is Orbit a real space-travel operator?" }),
  ).toContainText("fictional brand");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) => {
        img.loading = "eager";
        return img.decode().catch(() => {});
      }),
    );
  });
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
      ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test("shadcn controls, form validation, and route metadata", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('[data-slot="card"]')).toHaveCount(3);
  await expect(page.locator('[data-slot="accordion-trigger"]')).toHaveCount(5);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/images\/og-image\.png$/,
  );
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await expect(page.getByRole("heading", { name: "Your enquiry is ready." })).toHaveCount(0);
  const response = await request.get("/a-page-that-does-not-exist");
  expect(response.status()).toBe(404);
  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.json", "/images/og-image.png"]) {
    expect((await request.get(path)).ok()).toBeTruthy();
  }
});

test("server content remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:3100");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Prepare my enquiry" })).toBeDisabled();
  await expect(page.locator("noscript .form-note")).toBeVisible();
  await expect(page.locator("noscript .form-note")).toContainText("Enable JavaScript");
  await context.close();
});

test("accessibility and reduced motion", async ({ page }, info) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(1200);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  if (info.project.name === "reduced-motion") {
    expect(await page.locator("h1").evaluate((el) => getComputedStyle(el).animationName)).toBe(
      "none",
    );
    expect(await page.locator("html").evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe(
      "auto",
    );
    await page.locator("#experience").scrollIntoViewIfNeeded();
    expect(
      await page.locator(".experience-copy").evaluate((el) => getComputedStyle(el).transform),
    ).toBe("none");
  }
});
