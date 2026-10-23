/**
 * THE FABLES LAB — Motion Utilities
 * Reusable helpers for GSAP + ScrollTrigger animations.
 *
 * Keeps animation logic out of components so the same easing/duration
 * scale is applied everywhere.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

// Register ScrollTrigger once (client-side only).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ──────────────── Easing / Duration Scale ────────────────
export const EASE = {
  out: "power2.out",
  outExpo: "power3.out",
  inOut: "power2.inOut",
  outQuart: "power4.out",
} as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  slower: 1.6,
} as const;

// ──────────────── Reveal (ScrollTrigger) ────────────────
/**
 * Animate a single element into view when it enters the viewport.
 * Returns a cleanup function that kills the ScrollTrigger.
 */
export function revealOnScroll(
  element: HTMLElement | null,
  options: {
    duration?: number;
    ease?: string;
    y?: number;
    delay?: number;
    once?: boolean;
  } = {}
): () => void {
  if (!element || typeof window === "undefined") return () => {};

  const {
    duration = DURATION.base,
    ease = EASE.out,
    y = 30,
    delay = 0,
    once = true,
  } = options;

  gsap.set(element, { opacity: 0, y });

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: "top 85%",
    toggleActions: once ? "play none none reverse" : "play reverse play reverse",
    onEnter: () =>
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay,
        clearProps: "opacity,y",
      }),
    onLeave: once
      ? undefined
      : () =>
        gsap.to(element, { opacity: 0, y, duration: duration * 0.6, ease }),
    onEnterBack: once
      ? undefined
      : () =>
        gsap.to(element, { opacity: 1, y: 0, duration, ease, delay }),
  });

  return () => trigger.kill();
}

// ──────────────── Reveal Group (staggered children) ────────────────
export function revealGroupOnScroll(
  container: HTMLElement | null,
  selector: string,
  options: {
    duration?: number;
    ease?: string;
    y?: number;
    stagger?: number;
    delay?: number;
    once?: boolean;
  } = {}
): () => void {
  if (!container || typeof window === "undefined") return () => {};

  const {
    duration = DURATION.base,
    ease = EASE.out,
    y = 30,
    stagger = 0.12,
    delay = 0,
  } = options;

  const children = Array.from(container.querySelectorAll<HTMLElement>(selector));
  children.forEach((el) => gsap.set(el, { opacity: 0, y }));

  const trigger = ScrollTrigger.create({
    trigger: container,
    start: "top 85%",
    toggleActions: "play none none reverse",
    onEnter: () =>
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        delay,
        clearProps: "opacity,y",
      }),
  });

  return () => trigger.kill();
}

// ──────────────── Entrance (hero mount) ────────────────
export function entranceFrom(
  element: HTMLElement | null,
  options: {
    duration?: number;
    ease?: string;
    y?: number;
    opacity?: number;
    delay?: number;
  } = {}
): gsap.core.Tween | null {
  if (!element || typeof window === "undefined") return null;

  const {
    duration = DURATION.base,
    ease = EASE.out,
    y = 40,
    opacity = 0,
    delay = 0,
  } = options;

  return gsap.fromTo(
    element,
    { opacity, y },
    { opacity: 1, y: 0, duration, ease, delay, clearProps: "opacity,y" }
  );
}

// ──────────────── Button press feedback ────────────────
export function buttonPress(element: HTMLElement): void {
  if (!element || typeof window === "undefined") return;
  gsap.to(element, {
    scale: 0.96,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: EASE.out,
  });
}

// ──────────────── Scroll-linked value (for 3D camera / object) ────────────────
/**
 * Create a ScrollTrigger that maps scroll progress to a mutable value object.
 * Useful for driving Three.js camera position or object rotation without
 * React state updates on every frame.
 */
export function scrollToValue(
  currentValue: { current: number },
  options: {
    start?: string;
    end?: string;
    to: number;
    from?: number;
    ease?: string;
  } = { to: 0 }
): () => void {
  if (typeof window === "undefined") return () => {};

  const { start = "top bottom", end = "bottom top", to, from = 0 } = options;

  const trigger = ScrollTrigger.create({
    start,
    end,
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress; // 0-1
      currentValue.current = from + (to - from) * p;
    },
  });

  // Set initial
  currentValue.current = from;

  return () => trigger.kill();
}

// ──────────────── Cleanup all ScrollTriggers ────────────────
export function killAllScrollTriggers(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  ScrollTrigger.refresh();
}

// Type alias for cleaner imports
export type { RefObject };

// ──────────────── Reduced motion hook ────────────────
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
