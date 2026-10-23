"use client";

import Link from "next/link";

interface Capability {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

const CAPABILITIES: Capability[] = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Solutions",
    description: "Digital products engineered from interface to infrastructure.",
    detail: "Custom web applications, frontend and backend engineering, API design, database architecture, and deployment.",
  },
  {
    id: "ai",
    number: "02",
    title: "AI Solutions",
    description: "Practical AI systems built around real business problems.",
    detail: "LLM integrations, RAG knowledge assistants, workflow automation, and AI agents with guardrails.",
  },
  {
    id: "marketing",
    number: "03",
    title: "Marketing Solutions",
    description: "Digital marketing systems that reach the right audience.",
    detail: "SEO, landing-page optimization, campaign planning, conversion improvements, and analytics.",
  },
  {
    id: "design",
    number: "04",
    title: "UI/UX Design",
    description: "Interfaces that make complex products clear and useful.",
    detail: "User research, information architecture, high-fidelity design, prototypes, and design systems.",
  },
  {
    id: "community",
    number: "05",
    title: "Community Building",
    description: "Meaningful communities around products, brands, and ideas.",
    detail: "Community strategy, platform setup, onboarding systems, content programming, and moderation.",
  },
  {
    id: "content",
    number: "06",
    title: "Content Management",
    description: "Structured, maintainable digital content operations.",
    detail: "CMS implementation, admin dashboards, content workflows, media management, and SEO controls.",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="w-full bg-surface py-section lg:py-[6rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 items-start">
          <div className="lg:col-span-5">
            <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
              From the first idea
            </span>
            <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
              To the systems that make it work
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              The Fables Lab combines engineering, intelligence, design,
              distribution, and content into connected digital solutions.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="group border border-outline-variant/30 bg-surface-elevated rounded-lg p-6 transition-colors hover:border-bronze/50"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-bronze bg-bronze text-[11px] font-mono font-bold uppercase text-surface">
                    {cap.number}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-on-surface-muted">
                    {cap.title}
                  </span>
                </div>
                <p className="mb-4 text-sm text-on-surface-variant leading-relaxed">
                  {cap.description}
                </p>
                <p className="text-[12px] font-mono text-on-surface-muted">
                  {cap.detail}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-bronze hover:underline"
                >
                  Start a Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
