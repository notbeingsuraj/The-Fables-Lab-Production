import type { Metadata } from "next";
import Link from "next/link";
import NycChamber from "@/components/home/NycChamber";
import Manifesto from "@/components/home/Manifesto";
import SectionHeading from "@/components/ui/SectionHeading";
import Chip from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "The Lab",
  description:
    "Inside The Fables Lab — a night-shift creative technology studio in New York City where mythic archetypes collide with WebGL pipelines, neural synthesis, and hardware-grade feedback.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "The Lab // The Fables Lab",
    description:
      "Where stories incubate under acid light. Our operating principles, night-shift protocol, and creative creed.",
    url: "https://thefableslab.com/about",
    type: "website",
  },
};

const PRINCIPLES = [
  {
    title: "EXECUTION OVER THEATER",
    text: "Ideas are cheap. We ship prototypes that argue back — built, broken, and rebuilt in the same week.",
  },
  {
    title: "TACTILITY IS NON-NEGOTIABLE",
    text: "Every surface should answer the hand. Sound, haptics, motion, and latency are design materials, not polish.",
  },
  {
    title: "NARRATIVE IS ARCHITECTURE",
    text: "Myths are the oldest information systems. We structure products like quests: stakes, thresholds, and payoffs.",
  },
  {
    title: "60 FPS OR DIE",
    text: "A dropped frame is a broken promise. Performance budgets are enforced from the first commit, not the last sprint.",
  },
  {
    title: "THE LAB RUNS AT NIGHT",
    text: "Deep work needs silence and voltage. Our renders bake while the city sleeps and ship before the morning train.",
  },
];

const OPS = [
  { label: "Operating Model", value: "NIGHT-SHIFT SPRINT LAB", tone: "text-primary-fixed" },
  { label: "Engagement Length", value: "2 – 12 WEEK SPRINTS", tone: "text-tertiary-fixed-dim" },
  { label: "Team Shape", value: "SENIOR-ONLY POD", tone: "text-secondary" },
  { label: "Output Class", value: "SHIPPED, NOT SLUSHED", tone: "text-primary" },
];

const ORIGIN_TAGS = [
  "EST. 2024",
  "NYC NODE_247",
  "FOUNDER-LED",
  "STORY-DRIVEN SYSTEMS",
  "WEBGL + AI + HARDWARE",
];

/** THE LAB — origin, principles, operating model, and the studio creed. */
export default function AboutPage() {
  return (
    <div className="w-full pt-14">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-surface-container-highest/25 lg:text-[320px]">
          01
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <Chip tone="acid" dot>
              SYS_FILE // THE_LAB
            </Chip>
            <span className="font-mono text-label-mono-md uppercase tracking-wider text-outline">
              {"// MANIFESTO & OPERATING SYSTEM"}
            </span>
          </div>
          <h1 className="font-display text-[48px] uppercase leading-[0.95] tracking-tight text-primary sm:text-[72px] lg:text-[104px]">
            WE WORK WHEN{" "}
            <span className="chromatic-glitch inline-block bg-surface-container-low px-space-sm text-primary-fixed shadow-magenta">
              THE CITY
            </span>{" "}
            SLEEPS.
          </h1>
          <p className="mt-space-lg max-w-2xl text-body-lg leading-relaxed text-on-surface-variant">
            The Fables Lab is a founder-led creative technology studio built on one
            conviction: software should feel like an event. We fuse ancient
            narrative archetypes with real-time graphics, agentic intelligence, and
            hardware-grade feedback — then ship it while the render farm is still
            warm.
          </p>
          <div className="mt-space-lg flex flex-wrap items-center gap-space-xs">
            {ORIGIN_TAGS.map((tag) => (
              <Chip key={tag} tone="dark">
                [{tag}]
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* Origin narrative + ops rail */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
          <div className="space-y-space-lg lg:col-span-7">
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-secondary">
              {"// ORIGIN_LOG :: 02:00 AM"}
            </span>
            <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
              A LAB, NOT A AGENCY FACTORY.
            </h2>
            <div className="space-y-space-md text-body-md leading-relaxed text-on-surface-variant">
              <p>
                Most studios optimize for billable calm — retainer decks, mood
                boards, and interfaces indistinguishable from the last twelve
                launches. We optimized for a different feeling: the one you get when
                a physical switch bottoms out, a shader snaps to 60 FPS, and a
                story structure suddenly carries an entire product.
              </p>
              <p>
                So we built a lab. A small, senior, founder-led pod that takes on a
                handful of ambitious commissions per quarter and treats each one
                like a fable: a protagonist (your user), an ordeal (the hard
                interaction problem), and a reward (a product that could not have
                come from anyone else).
              </p>
              <p className="font-medium text-on-surface">
                We are selective on purpose. Three commission slots per quarter. One
                standard: unapologetic execution.
              </p>
            </div>
          </div>

          {/* Ops telemetry rail */}
          <div className="space-y-space-md lg:col-span-5">
            <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-acid">
              <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
                <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
                  [OPERATIONS SPEC]
                </span>
                <span className="font-mono text-label-mono-sm text-outline">REV_07</span>
              </div>
              <div className="space-y-space-md">
                {OPS.map((op) => (
                  <div key={op.label}>
                    <div className="mb-1 flex justify-between font-mono text-label-mono-sm">
                      <span className="uppercase text-outline">{op.label}</span>
                      <span className={`font-bold ${op.tone}`}>{op.value}</span>
                    </div>
                    <div className="h-px w-full bg-outline-variant/40" />
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/process"
              className="flex items-center justify-between border border-outline-variant/30 bg-surface-container p-space-md shadow-panel-sm transition-colors hover:bg-surface-container-high"
            >
              <span className="font-mono text-label-mono-sm uppercase tracking-wider text-on-surface-variant">
                &gt;&gt; FULL SPRINT PROTOCOL
              </span>
              <span className="font-mono text-label-mono-sm font-bold text-tertiary-fixed-dim">
                /PROCESS ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Principles feed */}
      <section className="w-full bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <SectionHeading
          eyebrow="// CREED_INDEX [02 / 05]"
          title={<>OPERATING PRINCIPLES</>}
          right={<span>5 RULES LOCKED</span>}
        />
        <div className="border-t border-outline-variant/40">
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.title}
              className="group flex items-start gap-space-md border-b border-outline-variant/40 py-space-lg transition-colors hover:bg-surface-container-low sm:items-center sm:gap-space-xl"
            >
              <span className="font-mono text-label-mono-sm text-outline-variant transition-colors group-hover:text-primary-fixed">
                &gt;&gt;
              </span>
              <span className="w-8 shrink-0 font-mono text-label-mono-sm text-outline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="w-full max-w-xs shrink-0 text-headline-sm uppercase tracking-wide text-primary">
                {principle.title}
              </h3>
              <p className="hidden flex-1 text-body-md leading-relaxed text-on-surface-variant lg:block">
                {principle.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Night-shift environment */}
      <NycChamber />

      {/* Manifesto */}
      <Manifesto />

      {/* Closing CTA */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-space-lg border border-outline-variant/30 bg-surface-container-low p-space-xl shadow-cyan">
          <div>
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-tertiary-fixed-dim">
              {"// END_OF_FILE :: THE_LAB"}
            </span>
            <h2 className="mt-space-sm font-display text-headline-lg uppercase tracking-tight text-primary">
              THINK YOUR FABLE DESERVES A LAB?
            </h2>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <Link
              href="/contact"
              className="bg-primary-container px-space-lg py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
            >
              [ TRANSMIT DISPATCH ↗ ]
            </Link>
            <Link
              href="/projects"
              className="border border-outline-variant/50 px-space-lg py-space-md font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
            >
              [ REVIEW THE ARCHIVE ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
