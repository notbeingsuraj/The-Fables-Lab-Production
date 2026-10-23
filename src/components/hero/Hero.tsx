"use client";

import Link from "next/link";
import FablesArtifact from "@/components/three/FablesArtifact";
import { useReducedMotion } from "@/lib/motion";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100vh] flex flex-col bg-background overflow-hidden"
    >
      {/* 3D artifact — full-height canvas positioned on the right side */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-end pr-[6vw] lg:pr-[8vw]"
        aria-hidden="true"
      >
        <FablesArtifact reducedMotion={reducedMotion} />
      </div>

      {/* Editorial content — left-aligned, asymmetric */}
      <div className="relative z-10 flex flex-col justify-center py-24 px-6 lg:px-8 text-on-surface">
        <div className="max-w-[720px]">
          {/* Positioning label */}
          <span className="inline-block mb-10 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
            THE FABLES LAB / DIGITAL SOLUTIONS STUDIO
          </span>

          {/* Oversized headline */}
          <h1
            className="mb-10 font-display text-[clamp(3.5rem,11vw,6rem)] leading-[1.0] tracking-tight text-on-surface text-balance"
          >
            Where Intelligence{" "}
            <span className="block text-bronze">
              Becomes Digital Reality
            </span>
            .
          </h1>

          {/* Supporting copy */}
          <p className="mb-12 max-w-[480px] text-body-lg text-on-surface-variant leading-relaxed">
            We design, engineer, and scale digital experiences through AI,
            full-stack development, thoughtful design, and intelligent growth.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-outline-variant/40 bg-transparent text-[11px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Explore Capabilities
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="mt-20 flex items-center justify-between gap-4 border-t border-outline-variant/10 pt-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-muted">
              Scroll to explore
            </span>
            <div className="flex h-4 w-4 flex-col items-center justify-center rounded-full border border-outline-variant/30">
              <span className="h-[1px] w-2 bg-bronze animate-[float_6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
