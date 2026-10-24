import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work — The Fables Lab",
  description: "Selected artifacts, systems, and digital products engineered by The Fables Lab.",
};

export default function WorkPage() {
  return (
    <div className="w-full pt-16 bg-background">
      <section className="w-full bg-canvas-white py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto space-y-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="space-y-space-md max-w-3xl">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container font-label-sm text-label-sm text-ink-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-action-blue-focus"></span>
                Atelier Portfolio • Systems &amp; Interfaces
              </div>
              <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">The Artifact Index</h1>
              <p className="font-body-large text-body-large text-ink-secondary">
                A monolithic record of engineered artifacts — spanning AI intelligence, digital commerce, fintech infrastructure, and automated workflows.
              </p>
            </div>
            <div className="flex items-center gap-space-md p-space-sm bg-surface-container-low rounded-full shadow-sm shrink-0 self-start lg:self-end">
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs bg-canvas-white rounded-full">
                <span className="font-caption-strong text-caption-strong text-ink-primary">6</span>
                <span className="font-caption text-caption text-ink-muted">Shipped Artifacts</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs text-ink-secondary font-caption text-caption">
                <span className="w-1.5 h-1.5 rounded-full bg-green"></span>
                Production Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas-parchment py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            <div className="lg:col-span-5 space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-micro-legal text-micro-legal uppercase tracking-widest text-ink-muted">Project Ref // 001-WBL</span>
                <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-canvas-white font-label-sm text-label-sm text-ink-primary shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green"></span>
                  Completed &amp; Verified
                </span>
              </div>
              <div className="space-y-space-xs">
                <h2 className="font-display-lg text-display-lg text-ink-primary tracking-tight">Webloom</h2>
                <p className="font-tagline text-tagline text-ink-secondary">Semantic Intelligence &amp; Market Research Audit Engine</p>
              </div>
              <p className="font-body text-body text-ink-secondary leading-relaxed">
                Enterprise intelligence platform that ingests multi-source datasets, synthesizes evidence graphs, and yields auditable confidence scores for strategic decisions.
              </p>
              <Link href="/projects" className="inline-flex items-center gap-space-xs font-body-strong text-body-strong text-action-blue-base hover:text-action-blue-focus transition-colors">
                Explore Case Files
                <span className="material-symbols-outlined text-[18px]">➜</span>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-canvas-white p-space-md">
                <div className="w-full h-80 lg:h-[420px] rounded-lg bg-gradient-to-br from-surface-container to-canvas-parchment flex items-center justify-center">
                  <span className="font-caption text-ink-muted">Webloom Interface Preview</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-tile-dark text-ink-inverse py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-on-dark uppercase tracking-wider">Let&apos;s Build</span>
            <h2 className="font-hero-display text-hero-display text-ink-inverse tracking-tight">Have an idea worth building?</h2>
            <p className="font-lead text-lead text-ink-muted">
              We are currently reviewing project requests for upcoming quarters. Tell us what you want to achieve, and we will outline an architectural roadmap within 48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
              <Link href="/contact" className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-2xl py-space-md rounded-full shadow-lg active:scale-95 transition-all">
                Start a Project
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center bg-surface-tile-subtle hover:bg-surface-tile-elevated text-ink-inverse font-body-strong text-body-strong px-space-2xl py-space-md rounded-full transition-colors">
                View Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
