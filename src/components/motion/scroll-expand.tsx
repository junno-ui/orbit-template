"use client";

// React Bits ScrollExpand's frame/media choreography, on Orbit's shared GSAP scroll clock.
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, setupScrollMotion } from "@/lib/scroll-motion";
import "./scroll-effects.css";

interface ScrollExpandProps {
  src: string;
  alt: string;
  title: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function ScrollExpand({
  src,
  alt,
  title,
  scrollHint = "SCROLL TO CHANGE YOUR PERSPECTIVE",
  startWidth = 72,
  startHeight = 76,
  startRadius = 18,
  endRadius = 0,
  mediaZoom = 1.08,
  scrollDistance = 0.65,
  holdDistance = 0.12,
  smoothing = 0.1,
  enabled = true,
  children,
  className = "",
}: ScrollExpandProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !enabled) return;
    return setupScrollMotion(element, () => {
      element.dataset.expandEnabled = "true";
      element.style.setProperty(
        "--expand-travel",
        String(Math.max(0.1, scrollDistance) + Math.max(0, holdDistance)),
      );
      const frame = element.querySelector(".scroll-expand-frame");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: () => `+=${innerHeight * Math.max(0.1, scrollDistance)}`,
          scrub: smoothing || true,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(
          frame,
          {
            clipPath: `inset(${(100 - startHeight) / 2}% ${(100 - startWidth) / 2}% round ${startRadius}px)`,
          },
          { clipPath: `inset(0% 0% round ${endRadius}px)`, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          element.querySelector("img"),
          { scale: mediaZoom },
          { scale: 1, duration: 1, ease: "none" },
          0,
        )
        .fromTo(
          element.querySelector(".scroll-expand-title"),
          { opacity: 1, y: 0 },
          { opacity: 0, y: -28, duration: 0.4 },
          0.3,
        )
        .fromTo(
          element.querySelector(".scroll-expand-hint"),
          { opacity: 1 },
          { opacity: 0, duration: 0.15 },
          0,
        );
      if (children)
        timeline.fromTo(
          element.querySelector(".scroll-expand-overlay"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.7,
        );
      return () => {
        delete element.dataset.expandEnabled;
        element.style.removeProperty("--expand-travel");
      };
    });
  }, [
    enabled,
    children,
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
  ]);
  return (
    <section ref={root} className={`scroll-expand ${className}`} aria-label={title}>
      <div className="scroll-expand-stage">
        <div className="scroll-expand-frame">
          <img src={src} alt={alt} width={1600} height={1000} loading="lazy" />
          <div className="scroll-expand-scrim" />
        </div>
        <h2 className="scroll-expand-title">{title}</h2>
        {children && <div className="scroll-expand-overlay">{children}</div>}
        <span className="scroll-expand-hint" aria-hidden="true">
          {scrollHint}
        </span>
      </div>
    </section>
  );
}
