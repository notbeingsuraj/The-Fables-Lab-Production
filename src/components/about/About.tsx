"use client";

const DIFFERENTIATORS = [
  {
    title: "Connected thinking",
    description: "Strategy, design, engineering, and growth are treated as connected parts of one process.",
  },
  {
    title: "Solutions tailored to the problem",
    description: "We build around your actual needs, not off-the-shelf templates or forced scope.",
  },
  {
    title: "Clear communication",
    description: "Defined scope, transparent updates, and deliberate execution from first conversation to launch.",
  },
  {
    title: "Practical technology choices",
    description: "We choose tools that are reliable, maintainable, and fit the problem at hand.",
  },
  {
    title: "A focus on outcomes",
    description: "Success is measured by what the product helps you achieve, not by the technology used.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.12em] text-on-surface-muted">
            Why The Fables Lab
          </p>
          <h2 className="text-headline-xl text-on-surface text-balance">
            Precision without pretension
          </h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
            The Fables Lab is a premium digital solutions studio. Where Ancient Stories Meet Future Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-outline-variant p-8"
            >
              <h3 className="text-lg text-on-surface">{item.title}</h3>
              <p className="mt-3 text-sm text-on-surface-variant">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
