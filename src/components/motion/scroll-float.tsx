"use client";

// Adapted from the requester-supplied React Bits ScrollFloat. See THIRD_PARTY_NOTICES.md.
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, setupScrollMotion } from "@/lib/scroll-motion";
import "./scroll-effects.css";

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}: ScrollFloatProps) {
  const root = useRef<HTMLHeadingElement>(null);
  const text = typeof children === "string" ? children : undefined;
  useEffect(() => {
    if (!root.current || !text) return;
    const element = root.current;
    return setupScrollMotion(element, () => {
      const characters = element.querySelectorAll<HTMLElement>(".scroll-float-char");
      const originalStyles = Array.from(characters, (character) => character.style.cssText);
      gsap.set(characters, {
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      });
      gsap.to(characters, {
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        duration: animationDuration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: element,
          scroller: scrollContainerRef?.current ?? undefined,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      return () =>
        characters.forEach((character, index) => {
          character.style.cssText = originalStyles[index];
        });
    });
  }, [text, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);
  return (
    <h2 ref={root} className={`scroll-float ${containerClassName}`} aria-label={text}>
      <span className={`scroll-float-text ${textClassName}`} aria-hidden={text ? true : undefined}>
        {text
          ? text.split(/(\s+)/).map((word, index) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span className="scroll-float-word" key={index}>
                  {Array.from(word).map((char, charIndex) => (
                    <span className="scroll-float-char" key={charIndex}>
                      {char}
                    </span>
                  ))}
                </span>
              ),
            )
          : children}
      </span>
    </h2>
  );
}
