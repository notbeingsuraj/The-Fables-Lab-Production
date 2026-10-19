import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Chip from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The four-phase Fables sprint protocol: discovery & architecture, design system, rapid build, launch & iterate. Senior-only pods, ruthless scope, shipped outcomes.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process // The Fables Lab",
    description: "How a Fables sprint moves from raw concept to production in weeks, not quarters.",
    url: "https://thefableslab.com/process",
    type: "website",
  },
};

const STEPS = [
  {
    num: "01",
    title: "DISCOVERY & ARCHITECTURE",
    est: "EST: 3–5 DAYS",
    tone: "text-tertiary-fixed-dim",
    marker: "bg-tertiary-fixed-dim",
    shadow: "shadow-cyan-sm",
    desc: "We don't just write code; we interrogate the problem. In the first week we lock product scope, choose the optimal data model, and finalize the exact user journeys required for launch — including the ones that will scare stakeholders.",
    deliverables: ["Technical Specification", "Data Model / Schema", "User Flow Diagrams", "Risk + Scope Map"],
    gate: "GATE: SPEC SIGNED // NOTHING BUILDABLE IS AMBIGUOUS",
  },
  {
    num: "02",
    title: "DESIGN SYSTEM",
    est: "EST: 1 WEEK",
    tone: "text-secondary",
    marker: "bg-secondary",
    shadow: "shadow-magenta-sm",
    desc: "A product is only as good as its interface. We build a modular design system — tokens, geometry, motion, and telemetry voice — before a single line of frontend code is written. The brutalist language is decided here, not improvised later.",
    deliverables: ["Figma Prototype", "Component Library", "Motion + Sound Specs", "Token Pipeline"],
    gate: "GATE: CLICKABLE PROTOTYPE PASSES THE STRAIGHT-FACE TEST",
  },
  {
    num: "03",
    title: "RAPID BUILD",
    est: "EST: 1–4 WEEKS",
    tone: "text-primary-fixed",
    marker: "bg-primary-fixed",
    shadow: "shadow-acid-sm",
    desc: "Execution with ruthless efficiency. Frontend and backend are built simultaneously against the design system, with weekly playable builds instead of status theater. WebGL, agents, and hardware integrate against real data from day one.",
    deliverables: ["Frontend Application", "Backend / API Layer", "Admin Console", "Weekly Playable Builds"],
    gate: "GATE: FEATURE-COMPLETE ON STAGING WITH REAL DATA",
  },
  {
    num: "04",
    title: "LAUNCH & ITERATE",
    est: "EST: 3–5 DAYS + SUPPORT",
    tone: "text-signal",
    marker: "bg-signal",
    shadow: "shadow-[3px_3px_0px_0px_#ff5a1f]",
    desc: "The product deploys to production behind edge delivery with analytics, error budgets, and performance alarms wired in. We stay on standby through the first real users and iterate immediately on what the telemetry tells us.",
    deliverables: ["Production Deployment", "Analytics + Alerting", "Performance Audit", "Source Handoff"],
    gate: "GATE: 60 FPS BUDGET HELD // ERROR BUDGET GREEN",
  },
] as const;

const RULES = [
  ["NO DEAD MEETINGS", "Decisions happen in writing, in the spec, where they can be argued with."],
  ["ONE SENIOR POD", "No pyramid staffing. The people designing it are the people building it."],
  ["PLAYABLE WEEKLY", "If you can't touch it by Friday, the week didn't count."],
  ["SCOPE IS A WEAPON", "We cut features to protect the ones that make the product undeniable."],
] as const;

/** PROCESS — the four-phase sprint protocol. */
export default function ProcessPage() {
  return (
    <div className="w-full pt-14">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-surface-container-highest/25 lg:text-[320px]">
          03
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <Chip tone="magenta" dot>
              SYS_FILE // PROCESS
            </Chip>
            <span className="font-mono text-label-mono-md uppercase tracking-wider text-outline">
              // SPRINT PROTOCOL_REV_7
            </span>
          </div>
          <h1 className="font-display text-[48px] uppercase leading-[0.95] tracking-tight text-primary sm:text-[72px] lg:text-[104px]">
            FOUR PHASES.{" "}
            <span className="chromatic-glitch inline-block bg-surface-container-low px-space-sm text-tertiary-fixed-dim shadow-magenta">
              NO THEATER.
            </span>
          </h1>
          <p className="mt-space-lg max-w-2xl text-body-lg leading-relaxed text-on-surface-variant">
            We productized studio engineering. The sprint protocol minimizes risk,
            eliminates redundant meetings, and maximizes speed to market — with a
            hard gate at the end of every phase.
          </p>
        </div>
      </section>

      {/* Phase timeline */}
      <section className="w-full bg-background">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="grid grid-cols-1 items-stretch border-b border-outline-variant/40 transition-colors hover:bg-surface-container-low/40 lg:grid-cols-12"
          >
            {/* Numeral rail */}
            <div className="relative flex flex-col justify-center overflow-hidden border-b border-outline-variant/40 p-space-lg lg:col-span-4 lg:border-b-0 lg:border-r">
              <span className={`font-display text-[96px] leading-none tracking-tighter lg:text-[144px] ${step.tone}`}>
                {step.num}
              </span>
              <div className="relative z-10 mt-space-sm flex flex-wrap items-center gap-space-sm">
                <span className="font-mono text-label-mono-sm uppercase tracking-widest text-on-surface">
                  PHASE {parseInt(step.num)}
                </span>
                <span className="border border-outline-variant/50 px-2 py-0.5 font-mono text-label-mono-sm uppercase tracking-wider text-outline">
                  {step.est}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-space-lg lg:col-span-8 lg:p-space-xl">
              <div className="mb-space-md flex items-center gap-space-md border-b border-outline-variant/40 pb-space-md">
                <span className={`h-3 w-3 shrink-0 ${step.marker}`} />
                <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
                  {step.title}
                </h2>
              </div>
              <p className="max-w-2xl text-body-md leading-relaxed text-on-surface-variant">
                {step.desc}
              </p>

              <div className="mt-space-lg">
                <p className="mb-space-sm block font-mono text-label-mono-sm uppercase tracking-widest text-outline">
                  {"// KEY DELIVERABLES"}
                </p>
                <ul className="grid grid-cols-1 gap-space-xs sm:grid-cols-2">
                  {step.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-space-xs border border-outline-variant/40 bg-surface-container-lowest p-space-sm font-mono text-label-mono-sm uppercase tracking-wide text-on-surface"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 ${step.marker}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={`mt-space-md inline-block border border-outline-variant/40 px-space-sm py-1 font-mono text-label-mono-sm uppercase tracking-wider ${step.tone} ${step.shadow}`}>
                {step.gate}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* House rules */}
      <section className="w-full bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <SectionHeading
          eyebrow="// HOUSE_RULES"
          title={<>HOW THE LAB OPERATES</>}
          right={<span>LOCKED</span>}
        />
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          {RULES.map(([rule, desc], i) => (
            <div
              key={rule}
              className={`border border-outline-variant/40 bg-surface-container-low p-space-lg ${i === 0 ? "shadow-acid-sm" : i === 1 ? "shadow-magenta-sm" : i === 2 ? "shadow-cyan-sm" : "shadow-panel-sm"}`}
            >
              <h3 className="text-headline-sm uppercase tracking-wide text-primary">{rule}</h3>
              <p className="mt-space-sm text-body-sm leading-relaxed text-on-surface-variant">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-space-lg border border-outline-variant/30 bg-surface-container-low p-space-xl shadow-cyan">
          <div>
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-tertiary-fixed-dim">
              // NEXT_COHORT_OPEN
            </span>
            <h2 className="mt-space-sm font-display text-headline-lg uppercase tracking-tight text-primary">
              SECURE A BUILD SLOT.
            </h2>
          </div>
          <div className="flex flex-wrap gap-space-sm">
            <Link
              href="/contact"
              className="bg-primary-container px-space-xl py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
            >
              [ INITIALIZE DISCOVERY ↗ ]
            </Link>
            <Link
              href="/projects"
              className="border border-outline-variant/50 px-space-lg py-space-md font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
            >
              [ SEE THE OUTPUT ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
