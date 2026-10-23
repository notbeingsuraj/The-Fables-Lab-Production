"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll, revealGroupOnScroll } from "@/lib/motion";

/**
 * ScrollReveal — wraps children and reveals them on scroll via GSAP +
 * ScrollTrigger. Automatically cleans up on unmount.
 *
 * @param stagger - when true, reveals direct children one after another.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: boolean;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  stagger = false,
  once = true,
}: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof window === "undefined") return;

    let cleanup: () => void;
    if (stagger) {
      cleanup = revealGroupOnScroll(el, "> *", {
        duration: 0.8,
        y: 30,
        stagger: 0.15,
        once,
      });
    } else {
      cleanup = revealOnScroll(el, {
        duration: 0.8,
        y: 30,
        once,
      });
    }

    return () => cleanup();
  }, [stagger, once]);

  return <div ref={wrapperRef} className="reveal">{children}</div>;
}
