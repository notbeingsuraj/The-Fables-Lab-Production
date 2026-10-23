"use client";

import Link from "next/link";

interface Engagement {
  title: string;
  subtitle: string;
  description: string;
  bestFor: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    title: "Focused Build",
    subtitle: "Defined website, feature, or integration",
    description:
      "For a clearly defined website, feature, integration, or smaller digital project with a fixed scope and timeline.",
    bestFor: "Single deliverable projects",
  },
  {
    title: "Product Development",
    subtitle: "Web application, AI implementation, or integrated product",
    description:
      "For a broader web application, AI implementation, or integrated digital product requiring design, engineering, and deployment phases.",
    bestFor: "Multi-phase product builds",
  },
  {
    title: "Ongoing Partnership",
    subtitle: "Continuous engineering and product evolution",
    description:
      "For continuous engineering, optimization, marketing support, or product evolution with reserved capacity and priority response.",
    bestFor: "Long-term collaboration",
  },
] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="w-full bg-surface py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 lg:mb-24 lg:col-start-1 lg:col-span-8 text-center lg:text-left">
          <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
            Engagement options
          </span>
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface text-balance">
            Scope and cost depend on your project
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
            Every project is custom-priced based on complexity, integrations,
            deliverables, and ongoing requirements. These are proposed
            engagement categories — not fixed packages. Contact us to
            discuss your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {ENGAGEMENTS.map((engagement) => (
            <div key={engagement.title} className="border border-outline-variant/30 rounded-xl p-8 lg:p-10 hover:border-bronze/40 transition-colors flex flex-col h-full">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted mb-4">
                {engagement.subtitle}
              </span>
              <h3 className="mb-4 font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface">
                {engagement.title}
              </h3>
              <p className="mb-6 text-sm lg:text-base text-on-surface-variant leading-relaxed flex-1">
                {engagement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24 border-t border-outline-variant/20 pt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:items-center">
          <p className="text-xs text-on-surface-muted">
            Scope and cost are determined after an initial discovery conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}
