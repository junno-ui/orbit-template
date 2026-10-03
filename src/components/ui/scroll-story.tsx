"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Enhances server-rendered chapters without rendering on every scroll frame. */
export function ScrollStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia(
      "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    );
    let observer: IntersectionObserver | undefined;
    const sync = () => {
      observer?.disconnect();
      element.dataset.storyEnabled = String(media.matches);
      element.dataset.active = "0";
      if (!media.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          const chapter = entries.find((entry) => entry.isIntersecting);
          if (chapter) element.dataset.active = (chapter.target as HTMLElement).dataset.chapter;
        },
        // Pixel margins keep the activation band tied to height on ultrawide screens.
        {
          rootMargin: `-${Math.round(innerHeight * 0.4)}px 0px -${Math.round(innerHeight * 0.5)}px 0px`,
          threshold: 0,
        },
      );
      element.querySelectorAll("[data-chapter]").forEach((chapter) => observer?.observe(chapter));
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div ref={root} className="container experience-grid" data-active="0">
      {children}
    </div>
  );
}
