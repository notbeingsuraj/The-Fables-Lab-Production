"use client";

const PROCESS_STEPS = [
  {
    id: "discover",
    number: "01",
    title: "Discover the problem.",
    description: "Understand the business, users, constraints, and desired outcomes.",
  },
  {
    id: "define",
    number: "02",
    title: "Define the strategy.",
    description: "Establish scope, direction, priorities, and measurable success criteria.",
  },
  {
    id: "design",
    number: "03",
    title: "Design the experience.",
    description: "Shape the architecture, user journeys, and interfaces with intent.",
  },
  {
    id: "build",
    number: "04",
    title: "Build the solution.",
    description: "Engineer, integrate, test, and refine with precision.",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch and improve.",
    description: "Deploy, validate, and iterate based on real feedback.",
  },
];

export default function Process() {
  return (
    <section id="approach" className="section-padding">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.12em] text-on-surface-muted">
            How we work
          </p>
          <h2 className="text-headline-xl text-on-surface text-balance">
            A disciplined path from idea to outcome
          </h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
            Clarity first. Deliberate execution. Measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.id}
              className="flex flex-col gap-4 rounded-2xl border border-outline-variant p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-muted">{step.number}</span>
              </div>
              <h3 className="text-lg text-on-surface">{step.title}</h3>
              <p className="text-sm text-on-surface-variant">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
