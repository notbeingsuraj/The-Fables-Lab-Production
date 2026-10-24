"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full bg-background"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-[1200px] flex-col px-6 pt-32 pb-16 lg:px-10 lg:pt-40 lg:pb-20">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-[1000px]">
            <p className="mb-8 text-label-sm uppercase tracking-[0.12em] text-on-surface-muted">
              THE FABLES LAB
            </p>
            <h1 className="text-display-hero text-on-surface text-balance">
              Ideas deserve exceptional execution.
            </h1>
            <p className="mt-8 max-w-[680px] text-body-xl text-on-surface-variant text-pretty">
              We design, engineer, and grow digital products that help ambitious businesses move forward. Strategy, design, engineering, and AI, brought together to build with precision.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-on-surface px-7 py-2.5 text-sm text-background transition-opacity duration-300 hover:opacity-90"
              >
                Start a project
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full px-2 py-2.5 text-sm text-on-surface-variant transition-colors duration-300 hover:text-on-surface"
              >
                Explore our capabilities →
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
