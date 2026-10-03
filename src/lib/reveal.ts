import { animate, inView, type AnimationPlaybackControls } from "motion";

/** Progressive enhancement: content stays visible without JavaScript. */
export function observeReveals(root: HTMLElement) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set<AnimationPlaybackControls>();
  const stop = inView(
    root.querySelectorAll<HTMLElement>("[data-reveal]"),
    (element) => {
      if (preference.matches) return;
      const animation = animate(
        element,
        { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0)"] },
        {
          duration: 0.65,
          delay: element.parentElement?.matches(".destination-grid, .pricing-grid")
            ? Math.min(Array.from(element.parentElement.children).indexOf(element), 2) * 0.08
            : 0,
          ease: [0.16, 1, 0.3, 1],
        },
      );
      animations.add(animation);
      void animation.then(() => animations.delete(animation));
    },
    { amount: 0.12 },
  );
  const cancel = () => {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  };
  const change = () => {
    if (preference.matches) cancel();
  };
  preference.addEventListener("change", change);
  return () => {
    stop();
    cancel();
    preference.removeEventListener("change", change);
  };
}
