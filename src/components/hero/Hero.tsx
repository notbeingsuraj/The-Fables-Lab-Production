"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-accent-subtle/40 via-background to-background" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-20">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-[1000px]">
            <p className="mb-8 text-label-sm uppercase tracking-[0.14em] text-on-surface-muted">
              THE FABLES LAB
            </p>
            <h1 className="text-display-hero text-on-surface text-balance">
              Ideas deserve exceptional execution.
            </h1>
            <p className="mt-8 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
              A premium digital studio building real products — from full-stack apps and AI workflows to design systems and growth. Strategy, engineering, and craft brought together with precision.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-2.5 text-sm text-white shadow-soft transition-all duration-300 hover:bg-accent-strong hover:shadow-soft-lg"
              >
                Start a project
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center justify-center rounded-full px-2 py-2.5 text-sm text-on-surface-variant transition-colors duration-300 hover:text-on-surface"
              >
                See real work →
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant pt-6">
          <span className="text-sm text-on-surface-muted">Where Ancient Stories Meet Future Tech.</span>
          <span className="hidden sm:block text-sm text-on-surface-muted">Precision. Clarity. Craft.</span>
        </div>
      </div>
    </section>
  );
}
