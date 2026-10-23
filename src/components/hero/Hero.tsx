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
      <div className="absolute inset-0 z-0 flex items-center justify-center" aria-hidden="true">
        <FablesArtifact reducedMotion={reducedMotion} />
      </div>

      <div className="relative z-10 flex flex-col justify-center py-16 px-4 lg:px-8 text-on-surface">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <span className="inline-block mb-6 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
                Independent Digital Solutions Studio
              </span>

              <h1
                className="mb-6 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-on-surface"
              >
                Where Intelligence Becomes Digital Reality
              </h1>

              <p className="mb-8 max-w-xs text-body-md text-on-surface-variant leading-relaxed">
                We design, engineer, and scale digital experiences through AI,
                full-stack engineering, intelligent marketing, and thoughtful
                design.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-bronze bg-bronze text-xs font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Start a Project
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-outline-variant/50 bg-transparent text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 hidden lg:block" />
          </div>

          <div className="mt-12 flex items-center justify-between gap-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-muted">
              Scroll to explore
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/30" />
            <div className="flex h-5 w-5 flex-col items-center justify-center rounded-full border border-outline-variant/50">
              <span className="h-[1px] w-2 bg-bronze animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
