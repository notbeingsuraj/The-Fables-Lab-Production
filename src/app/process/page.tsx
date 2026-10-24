import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process — The Fables Lab",
  description: "Our methodology for turning ideas into production-ready systems.",
};

export default function ProcessPage() {
  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "We define the problem, success metrics, constraints, and technical feasibility." },
    { num: "02", title: "Architecture & Design", desc: "We map system architecture, UX flows, and design direction with clear tradeoffs." },
    { num: "03", title: "Build & Iterate", desc: "Tight feedback loops with working prototypes and incremental delivery." },
    { num: "04", title: "Deploy & Support", desc: "Production-ready release with testing, monitoring, and handoff documentation." },
  ];

  return (
    <div className="w-full pt-16 bg-background">
      <section className="w-full bg-canvas-white py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Methodology</span>
            <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">From idea to production, with precision.</h1>
            <p className="font-body-large text-body-large text-ink-secondary">
              A disciplined, transparent process focused on shipping what actually moves the needle.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {steps.map((step) => (
            <div key={step.num} className="bg-canvas-white rounded-2xl p-space-lg space-y-space-sm">
              <span className="font-micro-legal text-micro-legal text-ink-muted uppercase tracking-widest">{step.num}</span>
              <h3 className="font-body-strong text-body-strong text-ink-primary">{step.title}</h3>
              <p className="font-caption text-caption text-ink-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-tile-dark text-ink-inverse py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-space-md">
            <h2 className="font-hero-display text-hero-display text-ink-inverse tracking-tight">Ready to start?</h2>
            <p className="font-lead text-lead text-ink-muted">
              Tell us about your project and we&apos;ll get back with a concrete plan.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
              <Link href="/contact" className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-2xl py-space-md rounded-full shadow-lg active:scale-95 transition-all">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
