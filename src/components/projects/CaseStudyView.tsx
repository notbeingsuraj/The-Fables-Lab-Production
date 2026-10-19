"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSynth } from "@/components/providers/SynthProvider";
import { PROJECT_TONES } from "@/components/ui/ProjectCard";

export interface CaseStudyData {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  client: string;
  role: string;
  duration: string;
  color: string;
  heroText: string;
  heroImage: string;
  solutionImage: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  thoughtProcess: { id: number; title: string; text: string }[];
  process: {
    dfd: { title: string; description: string; image: string };
    prototyping: { title: string; description: string; image: string };
  };
}

const PHASES = [
  { phase: "01", title: "DISCOVERY", quality: "Obsessive Deep Dive", desc: "Before writing a single line of code, we map the entire psychological and technical surface area of the product." },
  { phase: "02", title: "ARCHITECTURE", quality: "Scalable Precision", desc: "Setting up a bulletproof Next.js foundation, defining schemas, and constructing the structural grid system." },
  { phase: "03", title: "EXECUTION", quality: "Relentless Build", desc: "Isolating to build out the components, injecting motion math, and wiring the entire application together." },
  { phase: "04", title: "LAUNCH", quality: "Zero-Tolerance Deploy", desc: "Running intense QA, performance audits, and ensuring the final live build matches the visual intent." },
];

/** Full case-study narrative rendered in the maximalist system. */
export default function CaseStudyView({ project }: { project: CaseStudyData }) {
  const tone = PROJECT_TONES[project.color] ?? PROJECT_TONES["neon-cyan"];
  const { play } = useSynth();

  return (
    <div className="w-full pt-14">
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest">
        {project.heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={project.heroImage}
              alt=""
              aria-hidden
              decoding="async"
              className="h-full w-full object-cover opacity-30 saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/85 to-surface-container-lowest/40" />
          </div>
        )}
        <div className="relative z-10 px-space-md py-space-2xl lg:px-margin-desktop">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <span className={`border border-outline-variant/50 bg-surface-container-lowest/90 px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest backdrop-blur-md ${tone.text}`}>
              CASE FILE // INITIALIZED
            </span>
            <span className="font-mono text-label-mono-sm uppercase tracking-wider text-outline">
              DATA.LOG :: {project.name}
            </span>
          </div>
          <h1 className="max-w-5xl font-display text-[44px] uppercase leading-[0.9] tracking-tight text-primary sm:text-[72px] lg:text-[96px]">
            {project.heroText || project.name}
          </h1>
          {project.tags.length > 0 && (
            <div className="mt-space-lg flex flex-wrap gap-space-xs">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-outline-variant/40 bg-surface-container-low px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-surface-variant"
                >
                  [{tag}]
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Meta specs */}
      <section className="w-full border-b border-outline-variant/40 bg-surface-container-low">
        <div className="grid grid-cols-2 gap-space-lg px-space-md py-space-lg lg:grid-cols-4 lg:px-margin-desktop">
          {[
            ["ENTITY", project.client],
            ["PROTOCOL ROLE", project.role],
            ["EXECUTION TIME", project.duration],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="mb-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest text-outline">
                {label}
              </p>
              <p className="text-headline-sm text-primary">{value || "—"}</p>
            </div>
          ))}
          <div>
            <p className="mb-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest text-outline">
              STATUS
            </p>
            <p className={`text-headline-sm ${tone.text}`}>DEPLOYED ✓</p>
          </div>
        </div>
      </section>

      {/* Vision + Conflict/Solution */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className={`mb-space-sm block font-mono text-label-mono-sm font-bold uppercase tracking-widest ${tone.text}`}>
              {"// INITIALIZATION"}
            </span>
            <h2 className="mb-space-md font-display text-headline-lg uppercase tracking-tight text-primary">
              THE VISION
            </h2>
            <p className="text-body-lg leading-relaxed text-on-surface-variant">
              {project.summary}
            </p>

            {project.solutionImage && (
              <div className="relative mt-space-xl border border-outline-variant/40 p-space-sm">
                <img
                  src={project.solutionImage}
                  alt="Solution context"
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover"
                />
                <span className={`absolute bottom-space-sm right-space-sm bg-surface-container-lowest/90 px-space-xs py-0.5 font-mono text-label-mono-sm uppercase backdrop-blur-md ${tone.text}`}>
                  VISUAL_ASSET.JPG
                </span>
              </div>
            )}
          </div>

          <div className="space-y-space-lg lg:col-span-6 lg:col-start-7">
            <div className="relative border border-outline-variant/40 bg-surface-container-low p-space-lg shadow-magenta-sm">
              <span className="absolute left-0 top-0 h-full w-1 bg-secondary-container" />
              <div className="mb-space-sm flex items-center gap-space-sm">
                <span className="h-2 w-2 bg-secondary-container" />
                <h3 className="font-mono text-label-mono-lg font-bold uppercase tracking-widest text-primary">
                  THE CONFLICT
                </h3>
              </div>
              <p className="text-body-md leading-relaxed text-on-surface-variant">
                {project.problem}
              </p>
            </div>

            <div className="relative border border-outline-variant/40 bg-surface-container-low p-space-lg shadow-acid-sm">
              <span className="absolute right-0 top-0 h-full w-1 bg-primary-fixed" />
              <div className="mb-space-sm flex items-center gap-space-sm">
                <span className="h-2 w-2 bg-primary-fixed" />
                <h3 className="font-mono text-label-mono-lg font-bold uppercase tracking-widest text-primary">
                  THE SOLUTION
                </h3>
              </div>
              <p className="text-body-md leading-relaxed text-on-surface-variant">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thought process */}
      {project.thoughtProcess.length > 0 && (
        <section className="w-full border-y border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
          <div className="mb-space-xl">
            <span className={`mb-space-sm block font-mono text-label-mono-sm font-bold uppercase tracking-widest ${tone.text}`}>
              {"// COGNITIVE FLOW"}
            </span>
            <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
              THOUGHT PROCESS.
            </h2>
          </div>
          <div className="relative ml-4 space-y-space-xl border-l border-outline-variant/50 pl-space-lg md:ml-8 md:pl-space-xl">
            {project.thoughtProcess.map((step, index) => (
              <div key={step.id ?? index} className="relative">
                <span className={`absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 ${tone.chip} md:-left-[calc(2.5rem+5px)]`} />
                <h3 className={`mb-space-xs font-mono text-label-mono-lg font-bold uppercase tracking-widest ${tone.text}`}>
                  {step.title}
                </h3>
                <p className="max-w-3xl text-body-md leading-relaxed text-on-surface-variant">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Architecture & prototyping */}
      {(project.process.dfd.title || project.process.prototyping.title) && (
        <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
          <div className="flex items-center gap-space-md mb-space-xl">
            <h2 className="font-mono text-label-mono-lg font-bold uppercase tracking-widest text-primary">
              ARCHITECTURE &amp; DATA FLOW
            </h2>
            <span className="h-px flex-1 bg-outline-variant/40" />
          </div>

          {project.process.dfd.title && (
            <div className="mb-space-2xl grid grid-cols-1 items-center gap-space-xl lg:grid-cols-2">
              <div className="space-y-space-sm">
                <h3 className={`font-display text-headline-lg uppercase tracking-tight ${tone.text}`}>
                  {project.process.dfd.title}
                </h3>
                <p className="text-body-md leading-relaxed text-on-surface-variant">
                  {project.process.dfd.description}
                </p>
              </div>
              {project.process.dfd.image && (
                <div className="relative border border-outline-variant/40 p-space-sm">
                  <img
                    src={project.process.dfd.image}
                    alt="Data flow diagram"
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                  <span className={`absolute right-space-sm top-space-sm bg-surface-container-lowest/90 px-space-xs py-0.5 font-mono text-label-mono-sm uppercase backdrop-blur-md ${tone.text}`}>
                    SYS_ARCH.PNG
                  </span>
                </div>
              )}
            </div>
          )}

          {project.process.prototyping.title && (
            <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-2">
              {project.process.prototyping.image && (
                <div className="relative border border-outline-variant/40 p-space-sm">
                  <img
                    src={project.process.prototyping.image}
                    alt="Prototyping iterations"
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover opacity-90 transition-opacity hover:opacity-100"
                  />
                  <span className={`absolute bottom-space-sm left-space-sm bg-surface-container-lowest/90 px-space-xs py-0.5 font-mono text-label-mono-sm uppercase backdrop-blur-md ${tone.text}`}>
                    UI_ITERATIONS.FIG
                  </span>
                </div>
              )}
              <div className="space-y-space-sm">
                <h3 className={`font-display text-headline-lg uppercase tracking-tight ${tone.text}`}>
                  {project.process.prototyping.title}
                </h3>
                <p className="text-body-md leading-relaxed text-on-surface-variant">
                  {project.process.prototyping.description}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Four-phase protocol */}
      <section className="w-full border-y border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="mb-space-xl text-center">
          <span className={`mb-space-sm block font-mono text-label-mono-sm font-bold uppercase tracking-widest ${tone.text}`}>
            EXECUTION BLUEPRINT
          </span>
          <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
            THE FOUR-PHASE PROTOCOL.
          </h2>
          <p className="mx-auto mt-space-sm max-w-2xl text-body-md text-on-surface-variant">
            Exactly how this fable moved from raw concept to a fully realized
            production environment.
          </p>
        </div>
        <div className="grid grid-cols-1 divide-y divide-outline-variant/40 border border-outline-variant/40 bg-surface-container-low md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PHASES.map((step) => (
            <div key={step.phase} className="group relative p-space-lg">
              <span className={`absolute right-space-md top-space-sm font-display text-5xl opacity-10 transition-opacity group-hover:opacity-40 ${tone.text}`}>
                {step.phase}
              </span>
              <h3 className="mt-10 mb-space-sm font-mono text-label-mono-lg font-bold uppercase tracking-widest text-primary">
                {step.title}
              </h3>
              <span className={`mb-space-sm inline-block border border-outline-variant/40 px-2 py-0.5 font-mono text-label-mono-sm uppercase tracking-wider ${tone.text}`}>
                {step.quality}
              </span>
              <p className="text-body-sm leading-relaxed text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div
          className={`grid grid-cols-1 divide-y divide-outline-variant/40 border-b border-outline-variant/40 md:divide-x md:divide-y-0 ${
            project.metrics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {project.metrics.map((metric, i) => (
            <div key={i} className="bg-surface-container-low p-space-xl text-center transition-colors md:text-left">
              <p className="mb-space-xs font-display text-[56px] leading-none tracking-tight text-primary lg:text-[72px]">
                {metric.value}
              </p>
              <p className={`font-mono text-label-mono-sm font-bold uppercase tracking-widest ${tone.text}`}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tech stack */}
      {project.techStack.length > 0 && (
        <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
          <div className="mb-space-lg flex items-center gap-space-md">
            <span className={`font-mono text-label-mono-sm font-bold uppercase tracking-widest ${tone.text}`}>
              {"</> CORE COMPONENTS"}
            </span>
            <span className="h-px flex-1 bg-outline-variant/40" />
          </div>
          <div className="flex flex-wrap gap-space-sm">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`border bg-surface-container-low px-space-md py-space-sm font-mono text-label-mono-md font-bold uppercase tracking-wider text-primary transition-colors ${tone.border} border-outline-variant/50`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Return to archive */}
      <section className="relative w-full overflow-hidden border-t border-outline-variant/40 bg-surface-container-lowest px-space-md py-space-2xl text-center lg:px-margin-desktop">
        <p className="mb-space-sm font-mono text-label-mono-sm font-bold uppercase tracking-widest text-outline">
          REVIEW NEXT IMPLEMENTATION
        </p>
        <Link href="/projects" className="group block">
          <h2 className="font-display text-[40px] uppercase tracking-tight text-primary transition-colors sm:text-[64px] group-hover:text-primary-fixed">
            RETURN TO ARCHIVE.
          </h2>
        </Link>
        <div className="mt-space-lg flex flex-wrap justify-center gap-space-sm">
          <button
            type="button"
            onClick={() => play(560, 0.05)}
            className="border border-outline-variant/50 bg-surface-container px-space-lg py-space-md font-mono text-label-mono-md font-bold uppercase tracking-wider text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
          >
            [ VIEW ALL CASE FILES ]
          </button>
          <Link
            href="/contact"
            className="bg-primary-container px-space-lg py-space-md font-mono text-label-mono-md font-bold uppercase tracking-wider text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
          >
            [ COMMISSION YOURS ↗ ]
          </Link>
        </div>
      </section>
    </div>
  );
}
