import type { Metadata } from "next";
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import ProjectArchive from "@/components/projects/ProjectArchive";

export const metadata: Metadata = {
  title: "Work Archive",
  description:
    "Selected case files from The Fables Lab — WebGL platforms, agentic products, and kinetic hardware shipped from the night-shift studio.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work Archive // The Fables Lab",
    description: "Selected MVPs, platforms, and interactive experiences engineered from the ground up.",
    url: "https://thefableslab.com/projects",
    type: "website",
  },
};

/** ARCHIVE — live case-file grid backed by the projects database. */
export default function ProjectsPage() {
  return (
    <div className="w-full pt-14">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-surface-container-highest/25 lg:text-[320px]">
          04
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <Chip tone="cyan" dot>
              SYS_FILE // ARCHIVE
            </Chip>
            <span className="font-mono text-label-mono-md uppercase tracking-wider text-outline">
              {"// CASE_FILES :: DECLASSIFIED"}
            </span>
          </div>
          <h1 className="font-display text-[48px] uppercase leading-[0.95] tracking-tight text-primary sm:text-[72px] lg:text-[104px]">
            SELECTED{" "}
            <span className="inline-block bg-surface-container-highest px-space-sm text-primary-fixed shadow-magenta">
              CASE FILES.
            </span>
          </h1>
          <p className="mt-space-lg max-w-2xl text-body-lg leading-relaxed text-on-surface-variant">
            MVPs, platforms, and interactive experiences engineered from the ground
            up. Every file below shipped to production — read the problem, the
            build, and the numbers.
          </p>
        </div>
      </section>

      {/* Archive grid */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <ProjectArchive />
      </section>

      {/* CTA */}
      <section className="w-full bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-space-lg border border-outline-variant/30 bg-surface-container-low p-space-xl shadow-acid">
          <div>
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
              {"// YOUR_FABLE_NEXT"}
            </span>
            <h2 className="mt-space-sm font-display text-headline-lg uppercase tracking-tight text-primary">
              WANT YOURS IN THE ARCHIVE?
            </h2>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <Link
              href="/contact"
              className="bg-primary-container px-space-xl py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
            >
              [ TRANSMIT DISPATCH ↗ ]
            </Link>
            <Link
              href="/services"
              className="border border-outline-variant/50 px-space-lg py-space-md font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
            >
              [ CAPABILITY DOSSIER ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
