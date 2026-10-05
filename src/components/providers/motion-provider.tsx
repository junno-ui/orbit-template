"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { observeReveals } from "@/lib/reveal";
export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return observeReveals(root.current);
  }, [pathname]);
  return <div ref={root}>{children}</div>;
}
