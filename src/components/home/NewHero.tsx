"use client";

import Link from "next/link";

export default function NewHero() {
  return (
    <section className="relative w-full bg-canvas-white pt-28 pb-space-section overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[640px] h-[640px] bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -top-32 -left-20 w-[480px] h-[480px] bg-tertiary-fixed/35 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="relative z-10 max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 flex flex-col items-start space-y-space-lg">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container font-caption text-caption text-ink-primary">
              <span className="w-2 h-2 rounded-full bg-action-blue-focus"></span>
              Independent Digital Atelier • SF &amp; ZRH
            </div>
            <h1 className="font-hero-display text-hero-display text-ink-primary tracking-tight">
              Big ideas deserve better execution.
            </h1>
            <p className="font-lead text-lead text-ink-secondary max-w-xl">
              We design, engineer, and launch digital products, AI-powered solutions, and digital experiences built around real business needs.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-xl py-space-md rounded-full shadow-md active:scale-95 transition-all"
              >
                Start a Project
              </Link>
              <Link
                href="#selected-work"
                className="inline-flex items-center justify-center bg-transparent hover:bg-surface-container text-action-blue-base font-body-strong text-body-strong px-space-xl py-space-md rounded-full transition-colors"
              >
                Explore Our Work
                <span className="material-symbols-outlined ml-space-xs text-[20px]">➜</span>
              </Link>
            </div>
            <div className="pt-space-md flex items-center gap-space-lg">
              <div className="flex flex-col">
                <span className="font-display-md text-display-md text-ink-primary font-semibold">100%</span>
                <span className="font-caption text-caption text-ink-muted">In-house engineering</span>
              </div>
              <div className="w-px h-8 bg-hairline-subtle"></div>
              <div className="flex flex-col">
                <span className="font-display-md text-display-md text-ink-primary font-semibold">14d</span>
                <span className="font-caption text-caption text-ink-muted">Sprint cadence to prototype</span>
              </div>
              <div className="w-px h-8 bg-hairline-subtle"></div>
              <div className="flex flex-col">
                <span className="font-display-md text-display-md text-ink-primary font-semibold">99.9%</span>
                <span className="font-caption text-caption text-ink-muted">Production reliability</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative mt-space-xl lg:mt-0">
            <div className="relative w-full rounded-2xl bg-canvas-parchment p-space-lg shadow-xl">
              <div className="flex items-center justify-between pb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-coral"></span>
                  <span className="w-3 h-3 rounded-full bg-amber"></span>
                  <span className="w-3 h-3 rounded-full bg-green"></span>
                  <span className="ml-space-sm font-label-sm text-label-sm text-ink-muted">fables.runtime.engine • v4.12</span>
                </div>
                <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-canvas-white shadow-sm font-label-sm text-label-sm text-ink-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse"></span>
                  Cluster nominal
                </div>
              </div>
              <div className="grid grid-cols-12 gap-space-md">
                <div className="col-span-8 bg-canvas-white rounded-xl p-space-md shadow-md space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-caption-strong text-caption-strong text-ink-primary">Inference Topology</span>
                    <span className="font-label-sm text-label-sm text-electric-violet bg-tertiary-fixed px-space-xs py-0.5 rounded-full">Neural Model #09</span>
                  </div>
                  <div className="h-28 w-full flex items-end justify-between gap-1 pt-space-xs">
                    <div className="w-full bg-surface-container rounded-t h-[35%]"></div>
                    <div className="w-full bg-surface-container rounded-t h-[52%]"></div>
                    <div className="w-full bg-surface-container rounded-t h-[48%]"></div>
                    <div className="w-full bg-surface-container rounded-t h-[75%]"></div>
                    <div className="w-full bg-primary-container rounded-t h-[92%]"></div>
                    <div className="w-full bg-surface-container rounded-t h-[68%]"></div>
                    <div className="w-full bg-surface-container rounded-t h-[84%]"></div>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-ink-muted">
                    <span>Latency: 10ms</span>
                    <span>Tokens/s: 1,420</span>
                    <span className="text-green font-semibold">Live stream ↑</span>
                  </div>
                </div>
                <div className="col-span-4 bg-surface-tile-dark text-ink-inverse rounded-xl p-space-md shadow-md flex flex-col justify-between">
                  <div className="space-y-space-xs">
                    <span className="font-label-sm text-label-sm text-ink-muted uppercase tracking-wider">Verification</span>
                    <p className="font-body-strong text-body-strong text-ink-inverse">P2P Ledger Sync</p>
                  </div>
                  <div className="py-space-sm">
                    <svg className="w-14 h-14 mx-auto text-green" viewBox="0 0 36 36">
                      <path className="text-surface-tile-elevated" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                      <path className="text-green" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="88, 100" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                    <div className="text-center font-caption-strong text-caption-strong text-green mt-1">99.8% Confirmed</div>
                  </div>
                  <span className="font-micro-legal text-micro-legal text-ink-muted text-center">Zero-knowledge proof active</span>
                </div>
                <div className="col-span-12 -mt-space-sm bg-canvas-warm rounded-xl p-space-md shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-tile-dark flex items-center justify-center text-ink-inverse">
                      <span className="material-symbols-outlined text-[10px]">terminal</span>
                    </div>
                    <div>
                      <div className="font-body-strong text-body-strong text-ink-primary">TypeScript • Rust • PyTorch</div>
                      <div className="font-caption text-caption text-ink-secondary">Production-hardened microservices ready for sovereign deployment.</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-action-blue-base text-[28px]">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
