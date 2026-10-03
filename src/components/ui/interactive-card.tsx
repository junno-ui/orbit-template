"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/** A transform-only light follows fine pointers; touch and keyboard get CSS feedback. */
export function InteractiveCard({ children }: { children: ReactNode }) {
  const bounds = useRef<DOMRect | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 230, damping: 32 });
  const springY = useSpring(y, { stiffness: 230, damping: 32 });
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (reduced) opacity.set(0);
  }, [reduced, opacity]);

  function enter(event: PointerEvent<HTMLDivElement>) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    bounds.current = event.currentTarget.getBoundingClientRect();
    const left = event.clientX - bounds.current.left - 140;
    const top = event.clientY - bounds.current.top - 140;
    springX.jump(left);
    springY.jump(top);
    x.set(left);
    y.set(top);
    opacity.set(1);
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    if (reduced || !bounds.current) return;
    x.set(event.clientX - bounds.current.left - 140);
    y.set(event.clientY - bounds.current.top - 140);
  }

  return (
    <div
      className="interactive-card"
      data-reveal
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={() => {
        opacity.set(0);
        bounds.current = null;
      }}
    >
      {children}
      <span className="card-light" aria-hidden="true">
        <motion.span className="card-spotlight" style={{ x: springX, y: springY, opacity }} />
      </span>
    </div>
  );
}
