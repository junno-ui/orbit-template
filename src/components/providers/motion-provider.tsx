"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { observeReveals } from "@/lib/reveal";
export function MotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return observeReveals(root.current);
  }, []);
  return <div ref={root}>{children}</div>;
}
