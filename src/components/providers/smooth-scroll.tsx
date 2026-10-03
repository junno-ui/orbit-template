"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/scroll-motion";

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const tick = (seconds: number) => lenis?.raf(seconds * 1000);
    const destroy = () => {
      gsap.ticker.remove(tick);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      lenis = undefined;
    };

    const sync = () => {
      // Radix owns scrolling while its modal is open. Restore native scroll immediately.
      const native =
        preference.matches || document.hidden || document.body.hasAttribute("data-scroll-locked");
      if (native) {
        destroy();
      } else if (!lenis) {
        lenis = new Lenis({
          autoRaf: false,
          lerp: 0.09,
          smoothWheel: true,
          syncTouch: false,
          anchors: { duration: 1.05 },
          stopInertiaOnNavigate: true,
          prevent: (node) => node.matches("textarea, [data-lenis-prevent]"),
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      destroy();
    };
  }, []);

  return null;
}
