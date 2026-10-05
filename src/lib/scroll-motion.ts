"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export const desktopScrollMotion =
  "(min-width: 900px) and (min-height: 500px) and (prefers-reduced-motion: no-preference)";

/** Fonts settle before measuring. Each component owns and reverts only its own effects. */
export function setupScrollMotion(root: HTMLElement, setup: () => void | (() => void)) {
  const media = gsap.matchMedia();
  let disposed = false;
  void document.fonts.ready.then(() => {
    if (disposed) return;
    media.add(desktopScrollMotion, setup, root);
    ScrollTrigger.refresh();
  });
  return () => {
    disposed = true;
    media.revert();
  };
}
