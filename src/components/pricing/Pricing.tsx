"use client";

import Link from "next/link";

const ENGAGEMENTS = [
  {
    title: "Build Sprint",
    subtitle: "Defined scope",
    description:
      "For a clearly defined website, feature, integration, or small application. Scoping covers deliverables, timeline, and acceptance criteria.",
    details: [
      "Discovery and scope alignment",
      "Design/engineering to defined spec",
      "Testing and deployment",
      "Handover documentation",
    ],
    note: "Timeline depends on scope complexity.",
  },
  {
    title: "Product Build",
    subtitle: "End-to-end",
    description:
      "For applications/digital products requiring connected design, frontend, backend, and potentially AI capabilities with architecture planned upfront.",
    details: [
      "Discovery, UX, and architecture",
      "Iterative development",
      "Testing and hardening",
      "Deployment, handover, and docs",
    ],
    note: "Engaged as a focused product build.",
  },
  {
    title: "Ongoing Partnership",
    subtitle: "Long-term",
    description:
      "For continuing product development, maintenance, improvements, and technical collaboration with agreed priorities and reserved capacity.",
    details: [
      "Prioritized backlog and roadmap",
      "Ongoing development/maintenance",
      "Proactive improvements",
      "Flexible capacity as needed",
    ],
    note: "Capacity and deliverables agreed per period.",
  },
];

export default function Pricing() {
  return (
    <section id="engagement" className="section-padding relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-teal-subtle/30 via-background to-background" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.14em] text-on-surface-muted">
            Engagement & Pricing
          </p>
          <h2 className="text-headline-xl text-on-surface">How we work together</h2>
          <p className="mt-6 max-w-[760px] text-body-xl text-on-surface-variant">
            Pricing is determined by project scope. These are the engagement models we use — we’ll provide a scoped estimate after understanding your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((engagement) => (
            <article
              key={engagement.title}
              className="rounded-2xl border border-outline-variant p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <p className="text-sm text-on-surface-muted">{engagement.subtitle}</p>
              <h3 className="mt-4 text-xl text-on-surface">{engagement.title}</h3>
              <p className="mt-4 text-sm text-on-surface-variant">
                {engagement.description}
              </p>
              <ul className="mt-6 space-y-2">
                {engagement.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-on-surface-muted">{engagement.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-outline-variant bg-surface-tint-blue p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <p className="text-sm text-on-surface-muted">Project consultation</p>
            <h3 className="mt-2 text-headline-sm text-on-surface">
              Get a scoped estimate for your project
            </h3>
            <p className="mt-2 text-sm text-on-surface-variant">
              Tell us about your goals, timeline, and requirements — we’ll provide a clear, transparent estimate.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-2.5 text-sm text-white transition-colors hover:bg-accent-strong"
          >
            Request estimate
          </Link>
        </div>
      </div>
    </section>
  );
}
