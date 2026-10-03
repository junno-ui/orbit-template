import { expect, test } from "@playwright/test";

test("Lenis respects live preferences and anchors land below the glass navigation", async ({
  page,
}, info) => {
  await page.goto("/");
  const reduced = info.project.name === "reduced-motion";
  if (reduced) await expect(page.locator("html")).not.toHaveClass(/lenis/);
  else await expect(page.locator("html")).toHaveClass(/lenis/);

  await page.getByRole("link", { name: "Explore the journeys" }).click();
  await expect
    .poll(() =>
      page.locator("#destinations").evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(112);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveClass(/lenis/);
});

test("card light is pointer-only and glass has an opaque fallback", async ({
  page,
  isMobile,
}, info) => {
  await page.goto("/");
  const card = page.locator(".interactive-card").first();
  await card.scrollIntoViewIfNeeded();
  if (!isMobile && info.project.name !== "reduced-motion") {
    await card.hover({ position: { x: 70, y: 70 } });
    await expect(card.locator(".card-spotlight")).toHaveCSS("opacity", "1");
    await page.mouse.move(0, 0);
    await expect(card.locator(".card-spotlight")).toHaveCSS("opacity", "0");
  } else if (info.project.name === "reduced-motion") {
    await expect(card.locator(".card-light")).toHaveCSS("display", "none");
  }

  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setEmulatedMedia", {
    features: [
      { name: "prefers-reduced-transparency", value: "reduce" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ],
  });
  expect(
    await page
      .locator(".header-inner")
      .evaluate((el) => getComputedStyle(el, "::before").backdropFilter),
  ).toBe("none");
  await expect(page.locator(".destination-content").first()).toHaveCSS(
    "background-color",
    "rgb(21, 25, 29)",
  );
  await session.detach();
});

test("header becomes glass after scrolling and clears on returning to the top", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  const glassOpacity = () =>
    page.locator(".header-inner").evaluate((el) => getComputedStyle(el, "::before").opacity);
  await expect(header).toHaveAttribute("data-scrolled", "false");
  await expect.poll(glassOpacity).toBe("0");
  await page.evaluate(() => window.scrollTo({ top: 100, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-scrolled", "true");
  await expect.poll(glassOpacity).toBe("1");
  await page.getByRole("link", { name: "orbit home", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(header).toHaveAttribute("data-scrolled", "false");
  await expect.poll(glassOpacity).toBe("0");
});

test("story follows chapters in both directions and collapses for reduced motion", async ({
  page,
  isMobile,
}, info) => {
  await page.goto("/");
  const story = page.locator(".experience-grid");
  const visual = page.locator(".experience-visual");
  if (isMobile || info.project.name === "reduced-motion") {
    await expect(story).toHaveAttribute("data-story-enabled", "false");
    await expect(visual).toHaveCSS("position", "static");
    await expect(page.locator(".hero-content")).toHaveCSS("animation-name", "none");
    return;
  }
  await expect(story).toHaveAttribute("data-story-enabled", "true");
  await expect(visual).toHaveCSS("position", "sticky");
  for (const index of [0, 1, 2, 1, 0]) {
    await page.locator(`[data-chapter="${index}"]`).evaluate((el) => {
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.3,
        behavior: "instant",
      });
    });
    await expect(story).toHaveAttribute("data-active", String(index));
    await expect(page.locator(`.experience-image [data-scene="${index}"]`)).toHaveCSS(
      "opacity",
      "1",
    );
    // Native sticky releases at its container edge instead of overlapping the next section.
    const position = await visual.evaluate((el) => {
      const bounds = el.getBoundingClientRect();
      return {
        actual: Math.round(bounds.top),
        expected: Math.round(
          Math.min(140, el.parentElement!.getBoundingClientRect().bottom - bounds.height),
        ),
      };
    });
    expect(position.actual).toBe(position.expected);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(story).toHaveAttribute("data-story-enabled", "false");
  await expect(visual).toHaveCSS("position", "static");
  await expect(page.locator(".hero-content")).toHaveCSS("animation-name", "none");
});
