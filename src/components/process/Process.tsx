"use client";

import Link from "next/link";
import { revealOnScroll, revealGroupOnScroll } from "@/lib/motion";
import { useEffect, useRef } from "react";

interface ProcessStep {
  num: string;
  title: string;
  description: string;
  gate: string;
}

const STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    description:
      "Understand the business, its users, constraints, and desired outcomes.",
    gate: "Scope and outcomes agreed",
  },
  {
    num: "02",
    title: "Define",
    description:
      "Establish the scope, technical direction, priorities, and success criteria.",
    gate: "Specification signed off",
  },
  {
    num: "03",
    title: "Design",
    description:
      "Create the experience, architecture, and implementation plan.",
    gate: "Prototype reviewed",
  },
  {
    num: "04",
    title: "Build",
    description:
      "Develop, integrate, test, and refine the solution.",
    gate: "Feature-complete on staging",
  },
  {
    num: "05",
    title: "Launch",
    description:
      "Deploy, validate, measure, and improve the result.",
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

    return () => {
      cleanupHeader?.();
      cleanupSteps?.();
    };
  }, []);

  return (
    <section id="process" className="w-full bg-background py-section lg:py-[10rem] px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[900px] mx-auto">
        <header ref={wrapperRef} className="mb-24 lg:mb-32 reveal text-center lg:text-left">
          <span className="inline-block mb-8 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
            How we work
          </span>
          <h2
            className="mb-10 font-display text-[clamp(2.5rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-on-surface text-balance"
          >
            Built with intention. Delivered with discipline.
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-[560px]">
            Each phase ends with a hard gate. Nothing moves forward until the
            previous step is signed off — no ambiguity, no surprise scope.
          </p>
        </header>

        <div className="steps-grid space-y-16 lg:space-y-24 border-l border-outline-variant/20 pl-12 lg:pl-16">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="reveal relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12"
            >
              {/* Number rail */}
              <div className="lg:col-span-2 flex items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-bronze bg-bronze text-[13px] font-mono font-bold uppercase text-surface">
                  {step.num}
                </span>
              </div>

              <div className="lg:col-span-10">
                <div className="flex items-start gap-3 mb-6">
                  <h3 className="font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface">
                    {step.title}
                  </h3>
                  <span className="flex shrink-0 items-center text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
                    {step.gate}
                  </span>
                </div>
                <p className="mb-6 text-sm lg:text-base text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 lg:mt-32 border border-outline-variant/20 rounded-lg p-8 lg:p-12 bg-background flex flex-col items-center gap-6 lg:flex-row lg:justify-between lg:text-left">
          <div className="text-center lg:text-left">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
              Ready to begin
            </span>
            <h3 className="mt-2 font-display text-lg lg:text-xl leading-tight text-on-surface">
              Secure a build slot
            </h3>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
