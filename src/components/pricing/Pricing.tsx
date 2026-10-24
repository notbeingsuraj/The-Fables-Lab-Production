"use client";

import Link from "next/link";

const ENGAGEMENTS = [
  {
    title: "Build Sprint",
    subtitle: "Defined scope",
    description:
      "For a clearly defined website, feature, or integration with fixed deliverables and timeline.",
  },
  {
    title: "Product Program",
    subtitle: "End-to-end",
    description:
      "For a full product build covering design, engineering, AI, and launch across connected features.",
  },
  {
    title: "Ongoing Partnership",
    subtitle: "Long-term",
    description:
      "For continuous product evolution, optimization, and strategic development with reserved capacity.",
  },
];

export default function Pricing() {
  return (
    <section id="engagement" className="section-padding">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.4em] text-on-surface-muted">
            Engagement
          </p>
          <h2 className="text-headline-xl text-on-surface">How we work together</h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant">
            Every project is scoped to fit your goals. No fixed packages —
            just the right approach for what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((engagement) => (
            <article
              key={engagement.title}
              className="rounded-2xl border border-outline p-8"
            >
              <p className="text-sm text-on-surface-muted">{engagement.subtitle}</p>
              <h3 className="mt-4 text-xl text-on-surface">{engagement.title}</h3>
              <p className="mt-4 text-sm text-on-surface-variant">
                {engagement.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-outline p-8 lg:flex-row lg:items-center lg:p-10">
          <div>
            <p className="text-sm text-on-surface-muted">Project consultation</p>
            <h3 className="mt-2 text-headline-sm text-on-surface">
              Start with a clear conversation
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-outline px-7 py-2.5 text-sm text-on-surface transition-colors hover:border-white/30"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
