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
    description: "From interface to infrastructure.",
    detail:
      "Custom web applications, backend systems and APIs, database architecture, authentication, admin dashboards, e-commerce platforms, third-party integrations, deployment, and maintenance.",
  },
  {
    id: "ai",
    number: "02",
    title: "AI Solutions",
    description: "Intelligence with a purpose.",
    detail:
      "LLM integrations, AI-powered applications, knowledge assistants and RAG systems, workflow automation, data extraction pipelines, AI agents and tool integrations, evaluation, and reliability improvements.",
  },
  {
    id: "marketing",
    number: "03",
    title: "Marketing Solutions",
    description: "Make the right things discoverable.",
    detail:
      "Marketing strategy, SEO, campaign planning, landing-page optimization, audience research, analytics, conversion improvements, and content distribution planning.",
  },
  {
    id: "design",
    number: "04",
    title: "UI/UX Design",
    description: "Every interaction has a reason.",
    detail:
      "User research, information architecture, wireframes and user flows, high-fidelity interfaces, interactive prototypes, design systems, responsive design, and developer-ready handoff.",
  },
  {
    id: "community",
    number: "05",
    title: "Community Building",
    description: "Turn shared interests into lasting connections.",
    detail:
      "Community strategy, platform selection, onboarding, engagement programming, moderation workflows, feedback collection, member retention, and community operations.",
  },
  {
    id: "content",
    number: "06",
    title: "Content Management",
    description: "Your content. Under your control.",
    detail:
      "CMS implementation, custom admin dashboards, content models, product and catalogue management, publishing workflows, media management, SEO metadata, and website integrations.",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="w-full bg-background py-section lg:py-[6rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
          <div className="lg:col-span-5">
            <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
              From the first idea
            </span>
            <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface text-balance">
              To the systems that make it work
            </h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-xs">
              The Fables Lab combines engineering, intelligence, design,
              distribution, and content into connected digital solutions.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-8">
            {CAPABILITIES.map((cap) => (
              <div key={cap.id} className="group border border-outline-variant/30 rounded-xl p-8 transition-colors hover:border-bronze/40">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-bronze bg-bronze text-[10px] font-mono font-bold uppercase text-surface">
                    {cap.number}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-bronze transition-colors">
                    {cap.title}
                  </span>
                </div>
                <p className="mb-4 text-sm text-on-surface-variant leading-relaxed">
                  {cap.description}
                </p>
                <p className="text-[11px] font-mono text-on-surface-muted leading-relaxed">
                  {cap.detail}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-bronze hover:underline transition-colors"
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
