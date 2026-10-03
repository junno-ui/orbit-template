import { expect, test } from "@playwright/test";

test("React Bits scenes animate with document scroll and revert live", async ({
  page,
  isMobile,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const float = page.locator(".scroll-float");
  const char = float.locator(".scroll-float-char").last();
  const expand = page.locator(".scroll-expand");
  const frame = expand.locator(".scroll-expand-frame");
  const stack = page.locator(".scroll-stack");
  await expect(float).toHaveAccessibleName("Where will wonder take you?");
  if (isMobile || info.project.name === "reduced-motion") {
    await expect(char).toHaveCSS("opacity", "1");
    await expect(char).toHaveCSS("transform", "none");
    await expect(stack).not.toHaveAttribute("data-stack-enabled", "true");
    await expect(expand).not.toHaveAttribute("data-expand-enabled", "true");
    await expect(frame).toHaveCSS("clip-path", "none");
    await expect(expand.locator(".scroll-expand-overlay")).toHaveCSS("opacity", "1");
  } else {
    await expect(stack).toHaveAttribute("data-stack-enabled", "true");
    await expect(expand).toHaveAttribute("data-expand-enabled", "true");
    await expect(char).toHaveCSS("opacity", "0");
    await float.evaluate((el) =>
      window.scrollTo({ top: scrollY + el.getBoundingClientRect().top - 140, behavior: "instant" }),
    );
    await expect(char).toHaveCSS("opacity", "1");
    await page
      .locator(".scroll-stack-marker")
      .nth(1)
      .evaluate((el) =>
        window.scrollTo({
          top: scrollY + el.getBoundingClientRect().top - 140,
          behavior: "instant",
        }),
      );
    await expect
      .poll(() =>
        page
          .locator(".scroll-stack-card")
          .first()
          .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a),
      )
      .toBeLessThan(0.99);
    await expand.evaluate((el) =>
      window.scrollTo({ top: scrollY + el.getBoundingClientRect().top, behavior: "instant" }),
    );
    await expect.poll(() => frame.evaluate((el) => getComputedStyle(el).clipPath)).toContain("12%");
    await expand.evaluate((el) =>
      window.scrollTo({
        top: scrollY + el.getBoundingClientRect().top + innerHeight * 0.7,
        behavior: "instant",
      }),
    );
    await expect(frame).toHaveCSS("clip-path", "inset(0%)");
    await expect(expand.locator(".scroll-expand-overlay")).toHaveCSS("opacity", "1");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(char).toHaveCSS("opacity", "0");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(char).toHaveCSS("transform", "none");
    await expect(char).toHaveCSS("opacity", "1");
    await expect(frame).toHaveCSS("clip-path", "none");
    await expect(stack).not.toHaveAttribute("data-stack-enabled", "true");
    await expect(expand).not.toHaveAttribute("data-expand-enabled", "true");
    await expect(page.locator(".scroll-reveal-word").last()).toHaveCSS("opacity", "1");
  }
  expect(errors).toEqual([]);
});

test("scroll content stays readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:3100");
  await expect(page.locator(".scroll-float-char").last()).toHaveCSS("opacity", "1");
  await expect(page.locator(".scroll-stack-item").first()).toHaveCSS("position", "static");
  await expect(page.locator(".scroll-expand-frame")).toHaveCSS("clip-path", "none");
  await expect(page.locator(".scroll-reveal-word").last()).toHaveCSS("opacity", "1");
  await context.close();
});
