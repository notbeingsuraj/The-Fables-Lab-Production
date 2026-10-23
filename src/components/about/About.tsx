"use client";

import Link from "next/link";

interface Principle {
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Design and engineering developed together",
    description:
      "We do not hand off designs over a wall. Designers and engineers work in the same pod from day one, so what is designed can be built — and what is built serves the design intent.",
  },
  {
    title: "AI applied where it solves a genuine problem",
    description:
      "We integrate AI into workflows where it reduces real friction — knowledge retrieval, automation, data extraction — not where it adds hype. No promises of autonomous intelligence or guaranteed accuracy.",
  },
  {
    title: "Solutions shaped around actual workflows",
    description:
      "Products are built around how your team already works, not the other way around. We start with your processes and engineer software that fits them.",
  },
  {
    title: "Maintainable architecture",
    description:
      "We ship production code, not throwaway prototypes. Documentation, design systems, and admin tools are included so your team can operate the product after we leave.",
  },
  {
    title: "Clear communication, measurable objectives",
    description:
      "Fixed-bid sprints, defined deliverables, and honest timelines. You always know what is being built, why, and what success looks like.",
  },
] as const;

export default function About() {
  return (
    <section id="about" className="w-full bg-background py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 lg:mb-24 lg:col-start-1 lg:col-span-8">
          <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
            Where stories meet technology
          </span>
          <h2 className="mb-8 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface text-balance">
            Thoughtful ideas. Serious engineering.
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
            The Fables Lab is an independent AI and full-stack digital
            solutions studio. We help businesses design, engineer, launch,
            and grow digital products through thoughtful design, serious
            engineering, practical AI, and business understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-8 lg:space-y-12">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
              Our approach
            </span>
            {PRINCIPLES.map((principle, idx) => (
              <div key={principle.title} className="border border-outline-variant/20 rounded-xl p-8 lg:p-10 hover:border-bronze/40 transition-colors">
                <span className="inline-block mb-4 h-9 w-9 rounded-sm border border-bronze bg-bronze/10 flex items-center justify-center text-[11px] font-mono font-bold uppercase text-bronze">
                  {idx + 1}
                </span>
                <h3 className="mb-4 font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface">
                  {principle.title}
                </h3>
                <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border border-outline-variant/20 rounded-xl p-8 lg:p-12 bg-surface flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-bronze">
                Brand philosophy
              </span>
              <h3 className="mt-4 font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface">
                Where Ancient Stories Meet Future Tech
              </h3>
              <p className="mt-6 text-body-lg text-on-surface-variant leading-relaxed">
                Our philosophy guides how we work. Every digital product
                tells a story — about the business that built it, the people
                who use it, and the problems it solves. We bring that
                narrative thinking together with modern engineering to
                create products that are meaningful, not just functional.
              </p>
            </div>
            <div className="mt-8 lg:mt-12 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-outline-variant/40 bg-transparent text-[11px] font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-bronze hover:text-bronze focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Explore Capabilities
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-bronze bg-bronze text-[11px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
