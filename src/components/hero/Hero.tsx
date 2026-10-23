"use client";

import Link from "next/link";
import FablesArtifact from "@/components/three/FablesArtifact";
import { useReducedMotion } from "@/lib/motion";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col bg-background overflow-hidden"
    >
      {/* 3D artifact canvas — right-aligned, behind content on desktop */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pr-10 lg:pr-20" aria-hidden="true">
        <FablesArtifact reducedMotion={reducedMotion} />
      </div>

      {/* Content overlay — left-aligned editorial composition */}
      <div className="relative z-10 flex flex-col justify-center py-16 px-4 lg:px-8 text-on-surface">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start">
            {/* Positioning label + headline — left columns */}
            <div className="lg:col-span-6">
              <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
                Independent Digital Solutions Studio
              </span>

              <h1
                className="mb-8 font-display text-[clamp(3rem,8vw,4.5rem)] leading-[1.02] tracking-tight text-on-surface text-balance"
              >
                Where Intelligence{" "}
                <span className="block">
                  Becomes Digital Reality
                </span>
                .
              </h1>

              <p className="mb-10 max-w-xs text-body-lg text-on-surface-variant leading-relaxed">
                We design, engineer, and scale digital experiences through AI,
                full-stack development, thoughtful design, and intelligent
                growth.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Start a Project
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-outline-variant/40 bg-transparent text-[11px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>

            {/* Empty right column preserves asymmetric composition */}
            <div className="lg:col-span-6 hidden lg:block" />
          </div>

          {/* Scroll cue */}
          <div className="mt-16 flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-muted">
              Scroll to explore
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/30" />
            <div className="flex h-5 w-5 flex-col items-center justify-center rounded-full border border-outline-variant/40">
              <span className="h-[1px] w-2 bg-bronze animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
