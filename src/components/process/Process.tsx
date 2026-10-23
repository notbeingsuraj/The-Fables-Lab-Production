"use client";

import Link from "next/link";
import { revealOnScroll, revealGroupOnScroll } from "@/lib/motion";
import { useEffect, useRef } from "react";

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
      "Understand the business, its users, constraints, and desired outcomes.",
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
      "Establish the scope, technical direction, priorities, and success criteria.",
    deliverables: [
      "Technical specification",
      "Stack and architecture",
      "Project roadmap",
      "Risk register",
    ],
    gate: "Specification signed off",
  },
  {
    num: "03",
    title: "Design",
    description:
      "Create the experience, architecture, and implementation plan.",
    deliverables: [
      "User flows and wireframes",
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
      "Develop, integrate, test, and refine the solution.",
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
      "Deploy, validate, measure, and improve the result.",
    deliverables: [
      "Production deployment",
      "Analytics and alerting",
      "Performance audit",
      "Source handoff",
    ],
    gate: "Live and monitored",
  },
] as const;

export default function Process() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof window === "undefined") return;

    const cleanupHeader = revealOnScroll(el.querySelector("header"), {
      duration: 0.8,
      y: 30,
    });
    const cleanupSteps = revealGroupOnScroll(el.querySelector(".steps-grid"), {
      duration: 0.8,
      y: 30,
      stagger: 0.12,
    });
    const cleanupCta = revealOnScroll(el.querySelector(".cta"), {
      duration: 0.8,
      y: 30,
      delay: 0.2,
    });

    return () => {
      cleanupHeader?.();
      cleanupSteps?.();
      cleanupCta?.();
    };
  }, []);

  return (
    <section id="process" className="w-full bg-background py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <header ref={wrapperRef} className="mb-16 lg:mb-24 reveal">
          <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
            How we work
          </span>
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface text-balance">
            Built with intention. Delivered with discipline.
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
            Each phase ends with a hard gate. Nothing moves forward until the
            previous step is signed off — no ambiguity, no surprise scope.
          </p>
        </header>

        <div className="steps-grid space-y-10 lg:space-y-16 border-y border-outline-variant/20 py-16">
          {STEPS.map((step) => (
            <div key={step.num} className="reveal grid grid-cols-1 items-start gap-8 lg:grid-cols-12 border-b border-outline-variant/20 pb-16 lg:pb-20 last:border-0 last:pb-0">
              <div className="lg:col-span-2 flex flex-col items-start lg:items-center">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-bronze bg-bronze text-[14px] font-mono font-bold uppercase text-surface">
                  {step.num}
                </span>
                <span className="mt-4 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted lg:text-center">
                  Phase {step.num}
                </span>
              </div>

              <div className="lg:col-span-10">
                <div className="flex items-start gap-3 mb-5">
                  <h3 className="font-display text-lg lg:text-xl leading-tight text-on-surface">
                    {step.title}
                  </h3>
                  <span className="flex shrink-0 items-center text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
                    {step.gate}
                  </span>
                </div>
                <p className="mb-6 text-sm lg:text-base text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {step.deliverables.map((d) => (
                    <span key={d} className="inline-block border border-outline-variant/30 rounded-sm px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta reveal mt-20 lg:mt-28 border border-outline-variant/20 rounded-xl p-8 lg:p-12 bg-surface flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:text-left">
          <div className="text-center lg:text-left">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
              Ready to begin
            </span>
            <h3 className="mt-1 font-display text-lg lg:text-xl leading-tight text-on-surface">
              Secure a build slot
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
