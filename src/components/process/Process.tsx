"use client";

import Link from "next/link";

interface ProcessStep {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
  gate: string;
}

const STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    description:
      "Understand the business, audience, problem, and desired outcome. We start with conversations, not assumptions, mapping the full context before any design or code begins.",
    deliverables: [
      "Problem statement",
      "Stakeholder interviews",
      "Success criteria",
      "Initial scope map",
    ],
    gate: "Scope and outcomes agreed",
  },
  {
    num: "02",
    title: "Define",
    description:
      "Establish scope, priorities, technical direction, and success criteria. We lock the technical architecture, choose the right stack, and define what " +
      "launch looks like so nothing is ambiguous once building starts.",
    deliverables: [
      "Technical specification",
      "Stack & architecture",
      "Project roadmap",
      "Risk register",
    ],
    gate: "Specification signed off",
  },
  {
    num: "03",
    title: "Design",
    description:
      "Develop the experience, architecture, and implementation plan. User flows, wireframes, interface design, and a design system — all developer-ready before a line of production code is written.",
    deliverables: [
      "User flows & wireframes",
      "High-fidelity design",
      "Design system",
      "Clickable prototype",
    ],
    gate: "Prototype reviewed",
  },
  {
    num: "04",
    title: "Build",
    description:
      "Engineer, integrate, and validate the solution. Frontend and backend built together against the design system, with weekly playable builds and real data from day one.",
    deliverables: [
      "Production codebase",
      "API layer",
      "Admin dashboard",
      "QA report",
    ],
    gate: "Feature-complete on staging",
  },
  {
    num: "05",
    title: "Launch",
    description:
      "Deploy, monitor, and refine the product. Edge delivery, analytics, error budgets, and performance alarms wired in. We stay available through the first real users.",
    deliverables: [
      "Production deployment",
      "Analytics & alerting",
      "Performance audit",
      "Source handoff",
    ],
    gate: "Live and monitored",
  },
] as const;

export default function Process() {
  return (
    <section
      id="process"
      className="w-full bg-surface py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
            How We Work
          </span>
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
            A Five-Phase Process, Not a Black Box
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed max-w-xl">
            Each phase ends with a hard gate. Nothing moves forward until the
            previous step is signed off — no ambiguity, no surprise scope.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12 border-y border-outline-variant/20 py-8 lg:py-16">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 border-b border-outline-variant/10 pb-8 lg:pb-12 last:border-0 last:pb-0"
            >
              {/* Number rail */}
              <div className="lg:col-span-2 flex flex-col items-start lg:items-center">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-bronze bg-bronze text-[14px] font-mono font-bold uppercase text-surface"
                >
                  {step.num}
                </span>
                <span className="mt-3 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted lg:text-center">
                  PHASE {step.num}
                </span>
              </div>

              {/* Content */}
              <div className="lg:col-span-10">
                <div className="flex items-start gap-3 mb-3">
                  <h3 className="font-display text-lg lg:text-xl leading-tight text-on-surface">
                    {step.title}
                  </h3>
                  <span className="flex shrink-0 items-center text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
                    {step.gate}
                  </span>
                </div>
                <p className="mb-5 text-sm lg:text-base text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="inline-block border border-outline-variant/30 rounded-sm px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-20 border border-outline-variant/20 bg-surface rounded-xl p-8 lg:p-12 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
              Ready to begin?
            </span>
            <h3 className="mt-1 font-display text-lg lg:text-xl leading-tight text-on-surface">
              Secure a build slot.
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-bronze bg-bronze text-xs font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
