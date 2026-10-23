"use client";

interface Principle {
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Engineering and design considered together",
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
    title: "A connected approach to product, content, and distribution",
    description:
      "Engineering, marketing, design, and content are treated as one system. A great product still needs an audience, and a great campaign needs a product worth shipping.",
  },
  {
    title: "Maintainable systems rather than disposable demos",
    description:
      "We ship production code, not throwaway prototypes. Documentation, design systems, and admin tools are included so your team can operate the product after we leave.",
  },
  {
    title: "Clear scope, transparent communication, measurable objectives",
    description:
      "Fixed-bid sprints, defined deliverables, and honest timelines. You always know what is being built, why, and what success looks like.",
  },
] as const;

export default function Principles() {
  return (
    <section
      id="principles"
      className="w-full bg-background py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
            Our approach
          </span>
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
            What makes the lab different
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed max-w-xl">
            Concrete principles, not marketing adjectives. No claims of being
            revolutionary or world-class — just how we actually work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRINCIPLES.map((principle, idx) => (
            <div
              key={principle.title}
              className="border border-outline-variant/20 bg-surface rounded-xl p-6 lg:p-8 hover:border-bronze/50 transition-colors"
            >
              <span className="inline-block mb-4 h-8 w-8 rounded-sm border border-bronze bg-bronze/10 flex items-center justify-center text-[11px] font-mono font-bold uppercase text-bronze">
                {idx + 1}
              </span>
              <h3 className="mb-3 font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface">
                {principle.title}
              </h3>
              <p className="text-sm lg:text-base text-on-surface-variant leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
