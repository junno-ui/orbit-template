import { expect, test } from "@playwright/test";

test("scroll scenes respond to scrolling and restore readable static layouts", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.locator('#contact button[type="submit"]')).toBeEnabled();
  await expect(page.locator(".destination-card")).toHaveCount(3);
  const expand = page.locator(".scroll-expand");
  const stack = page.locator(".scroll-stack");
  const firstWord = page.locator(".editorial-intro .scroll-reveal-word").first();
  const frame = page.locator(".scroll-expand-frame");
  const animated = await page.evaluate(
    () =>
      matchMedia(
        "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
      ).matches,
  );

  if (animated) {
    await expect(expand).toHaveAttribute("data-expand-enabled", "true");
    await expect(stack).toHaveAttribute("data-stack-enabled", "true");
    await expect
      .poll(() => firstWord.evaluate((el) => Number(getComputedStyle(el).opacity)))
      .toBeLessThan(0.5);

    await page.locator(".editorial-intro h2").evaluate((el) => {
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: "instant" });
    });
    await expect
      .poll(() => firstWord.evaluate((el) => Number(getComputedStyle(el).opacity)))
      .toBeGreaterThan(0.98);

    await page
      .locator(".scroll-stack-marker")
      .last()
      .evaluate((el) => {
        window.scrollTo({
          top: el.getBoundingClientRect().top + scrollY - 168,
          behavior: "instant",
        });
      });
    await expect
      .poll(() =>
        page
          .locator(".scroll-stack-card")
          .evaluateAll(
            (cards) =>
              cards[0].getBoundingClientRect().width / cards.at(-1)!.getBoundingClientRect().width,
          ),
      )
      .toBeLessThan(0.95);

    await expand.evaluate((el) => {
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: "instant" });
    });
    await expect.poll(() => frame.evaluate((el) => getComputedStyle(el).clipPath)).toContain("24%");
    await expand.evaluate((el) => {
      window.scrollTo({
        top: el.getBoundingClientRect().top + scrollY + innerHeight,
        behavior: "instant",
      });
    });
    await expect
      .poll(() => frame.evaluate((el) => getComputedStyle(el).clipPath))
      .toBe("inset(0%)");
    await expect(page.locator(".scroll-expand-overlay")).toHaveCSS("opacity", "1");

    // An OS preference change must remove transforms and the extra pinned scroll space.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(expand).not.toHaveAttribute("data-expand-enabled", "true");
    await expect(stack).not.toHaveAttribute("data-stack-enabled", "true");
    await expect(frame).toHaveCSS("clip-path", "none");
    await expect(firstWord).toHaveCSS("opacity", "1");
    await expect(firstWord).toHaveCSS("filter", "none");
    await expect(page.locator(".scroll-stack-card").first()).toHaveCSS("transform", "none");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(expand).toHaveAttribute("data-expand-enabled", "true");
  } else {
    await expect(frame).toHaveCSS("clip-path", "none");
    await expect(firstWord).toHaveCSS("opacity", "1");
  }

  await page.setViewportSize({ width: 320, height: 800 });
  await expect(expand).not.toHaveAttribute("data-expand-enabled", "true");
  await expect(stack).not.toHaveAttribute("data-stack-enabled", "true");
  await expect(frame).toHaveCSS("clip-path", "none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const faq = page.locator("#faq button").first();
  await faq.click();
  await expect(faq).toHaveAttribute("aria-expanded", "true");
  expect(errors).toEqual([]);
});
