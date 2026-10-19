import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Chip from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Three engines: digital products & next-gen web, AI experiences & agentic spaces, and immersive worldbuilding with tactile hardware. Full capability dossier.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Capabilities // The Fables Lab",
    description:
      "WebGL products, agentic AI systems, and kinetic hardware — engineered as one stack.",
    url: "https://thefableslab.com/services",
    type: "website",
  },
};

const ENGINES = [
  {
    id: "01",
    code: "GL_RENDER_PIPELINE",
    title: "DIGITAL PRODUCTS & NEXT-GEN WEB",
    summary:
      "Ultra-responsive, GPU-accelerated applications and bespoke design systems. We engineer digital flagships that refuse to look like standard SaaS templates — cinematic micro-interactions included.",
    tone: {
      chip: "bg-tertiary-container text-on-tertiary-container",
      text: "text-tertiary-fixed-dim",
      shadow: "shadow-acid",
      border: "border-outline-variant/30",
    },
    services: [
      ["WebGL / Three.js Experiences", "Real-time 3D scenes, shader materials, and interactive product tours running at a locked 60 FPS."],
      ["Bespoke Design Systems", "Token-driven component libraries with the brutalist geometry, motion specs, and accessibility baked in."],
      ["Full-Stack Product Builds", "Next.js + Node/MongoDB applications architected for edge delivery and instant iteration."],
      ["Rapid MVP Sprints", "Investor-ready products shipped in 2–6 weeks — scoped hard, built senior-only, delivered live."],
    ],
    stack: ["THREE.JS", "WEBGL / GLSL", "REACT / NEXT.JS", "TYPESCRIPT", "FRAMER MOTION", "EDGE RUNTIME"],
    deliverables: ["Interactive prototype", "Production codebase", "Design token library", "Performance budget report"],
  },
  {
    id: "02",
    code: "AGENT_FABRIC_AI",
    title: "AI EXPERIENCES & AGENTIC SPACES",
    summary:
      "Autonomous creative engines, generative dialogue trees, and personalized mythic lore architectures powered by custom neural models and real-time prompt orchestration.",
    tone: {
      chip: "bg-secondary-container text-on-secondary",
      text: "text-secondary",
      shadow: "shadow-magenta",
      border: "border-outline-variant/30",
    },
    services: [
      ["Agentic Workflows", "Multi-step agents with tools, memory, and guardrails that execute real operational work — not chat demos."],
      ["Generative Narrative Systems", "Dialogue trees, lore engines, and adaptive story states tuned to your brand's mythology."],
      ["LLM Product Integration", "Streaming interfaces, eval harnesses, and cost/latency budgets for production AI features."],
      ["Creative R&D Sprints", "Two-week explorations that pressure-test an AI idea before you commit a roadmap to it."],
    ],
    stack: ["LLM ORCHESTRATION", "VECTOR MEMORY", "TOOL CALLING", "EVAL HARNESS", "STREAMING UI", "PYTHON / NODE"],
    deliverables: ["Agent architecture", "Prompt + eval suite", "Integration layer", "Monitoring dashboard"],
  },
  {
    id: "03",
    code: "HARDWARE_CHASSIS",
    title: "IMMERSIVE WORLDBUILDING & TACTILE HARDWARE",
    summary:
      "We close the gap between digital software and physical matter. Custom mechanical keyboards, tactile MIDI triggers, spatial audio environments, and installation interfaces engineered for live venues.",
    tone: {
      chip: "bg-tertiary-fixed-dim text-on-tertiary-fixed",
      text: "text-primary-fixed",
      shadow: "shadow-cyan",
      border: "border-outline-variant/30",
    },
    services: [
      ["Kinetic Hardware Builds", "Mechanical switch boards, MIDI/control surfaces, and microcontroller-driven installations."],
      ["Spatial Audio Environments", "WebAudio synthesis, 44.1kHz playback pipelines, and location-aware soundscapes."],
      ["Exhibition & Event Protocols", "Kiosk modes, offline resilience, and telemetry logging for live interactive venues."],
      ["Haptic & Motion Systems", "Actuators, lighting rigs, and physical feedback loops synced to digital state."],
    ],
    stack: ["WEBAUDIO", "WEBSERIAL / USB", "ARDUINO / RP2040", "MIDI", "SIGNAL PROCESSING", "3D PRINTING"],
    deliverables: ["Hardware prototype", "Firmware + host software", "Venue install plan", "Spare-parts kit"],
  },
] as const;

const ENGAGEMENTS = [
  {
    name: "SPIKE",
    duration: "1–2 WEEKS",
    price: "FIXED FEE",
    tone: "text-tertiary-fixed-dim",
    shadow: "shadow-cyan-sm",
    best: "Pressure-testing one idea: a shader, an agent, a hardware interaction.",
    includes: ["Technical feasibility report", "Working proof-of-concept", "Scope + risk map"],
  },
  {
    name: "SPRINT",
    duration: "2–6 WEEKS",
    price: "MOST COMMISSIONS",
    tone: "text-primary-fixed",
    shadow: "shadow-acid",
    best: "Shipping a complete product slice — design, build, and launch.",
    includes: ["Product + design system", "Full-stack build", "Production deployment", "Handoff + support window"],
  },
  {
    name: "RESIDENCY",
    duration: "QUARTERLY",
    price: "RETAINER",
    tone: "text-secondary",
    shadow: "shadow-magenta",
    best: "Continuous R&D — a lab on call for ambitious teams.",
    includes: ["Reserved senior capacity", "Monthly build reviews", "Roadmap co-authoring", "Priority incident response"],
  },
] as const;

const INITIATIVES = [
  {
    name: "FABLES FLOW",
    status: "IN DEVELOPMENT",
    tone: "acid" as const,
    desc: "The operational backbone for distribution businesses running on credit and relationships — WhatsApp order parsing to cleared payment, as an AI-native workflow system.",
  },
  {
    name: "TACTILE CORE MX",
    status: "PROTOTYPE",
    tone: "cyan" as const,
    desc: "An open hardware experiment: a web-driven mechanical switch matrix that triggers WebGL scenes and audio synthesis with sub-frame latency.",
  },
  {
    name: "GENERATIVE LORE ENGINE",
    status: "RESEARCH",
    tone: "magenta" as const,
    desc: "A narrative runtime that maintains persistent mythologies for brands and games — archetypes, quests, and consequences as structured data.",
  },
];

/** CAPABILITIES — the three engines, engagement models, and lab initiatives. */
export default function ServicesPage() {
  return (
    <div className="w-full pt-14">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-surface-container-highest/25 lg:text-[320px]">
          02
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <Chip tone="acid" dot>
              SYS_FILE // CAPABILITIES
            </Chip>
            <span className="font-mono text-label-mono-md uppercase tracking-wider text-outline">
              {"// ENGINE SPECIFICATIONS"}
            </span>
          </div>
          <h1 className="font-display text-[48px] uppercase leading-[0.95] tracking-tight text-primary sm:text-[72px] lg:text-[104px]">
            THREE ENGINES.{" "}
            <span className="inline-block bg-surface-container-highest px-space-sm text-secondary shadow-cyan">
              ZERO TEMPLATES.
            </span>
          </h1>
          <p className="mt-space-lg max-w-2xl text-body-lg leading-relaxed text-on-surface-variant">
            Every commission runs on the same stack: GPU-accelerated product
            engineering, agentic intelligence, and tactile hardware. Pick an
            engine — or bolt all three together.
          </p>
        </div>
      </section>

      {/* Engine dossiers */}
      {ENGINES.map((engine, i) => (
        <section
          key={engine.id}
          className={`w-full px-space-md py-space-2xl lg:px-margin-desktop ${i % 2 === 1 ? "bg-surface-container-lowest" : "bg-background"}`}
        >
          <div className={`border ${engine.tone.border} bg-surface-container-low p-space-lg lg:p-space-xl ${engine.tone.shadow}`}>
            <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12">
              {/* Narrative column */}
              <div className="space-y-space-md lg:col-span-5">
                <div className="flex flex-wrap items-center gap-space-sm">
                  <span className={`px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase tracking-wider ${engine.tone.chip}`}>
                    CAPABILITY // {engine.id}
                  </span>
                  <span className={`font-mono text-label-mono-sm ${engine.tone.text}`}>
                    {engine.code}
                  </span>
                </div>
                <h2 className="font-display text-headline-lg uppercase text-primary">
                  {engine.title}
                </h2>
                <p className="text-body-md leading-relaxed text-on-surface-variant">
                  {engine.summary}
                </p>

                <div className="pt-space-sm">
                  <p className="mb-space-sm font-mono text-label-mono-sm uppercase tracking-widest text-outline">
                    {"// KEY DELIVERABLES"}
                  </p>
                  <div className="grid grid-cols-1 gap-space-xs sm:grid-cols-2">
                    {engine.deliverables.map((d) => (
                      <div
                        key={d}
                        className="flex items-center gap-space-xs border border-outline-variant/30 bg-surface-container-lowest p-space-sm font-mono text-label-mono-sm uppercase text-on-surface-variant"
                      >
                        <span className={`h-1.5 w-1.5 shrink-0 ${engine.tone.chip.split(" ")[0]}`} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service rows */}
              <div className="lg:col-span-7">
                <div className="border-t border-outline-variant/40">
                  {engine.services.map(([title, desc], j) => (
                    <div
                      key={title}
                      className="group flex items-start gap-space-md border-b border-outline-variant/40 py-space-md transition-colors hover:bg-surface-container"
                    >
                      <span className={`shrink-0 pt-1 font-mono text-label-mono-sm ${engine.tone.text}`}>
                        &gt;&gt;
                      </span>
                      <div className="flex-1">
                        <h3 className="text-headline-sm uppercase tracking-wide text-primary">
                          {title}
                        </h3>
                        <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
                          {desc}
                        </p>
                      </div>
                      <span className="hidden shrink-0 pt-1 font-mono text-label-mono-sm text-outline-variant sm:block">
                        {engine.id}.{String(j + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-space-md flex flex-wrap items-center gap-space-xs">
                  {engine.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-outline-variant/30 bg-surface-container px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-surface"
                    >
                      [{tech}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Engagement models */}
      <section className="w-full bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <SectionHeading
          eyebrow="// ENGAGEMENT_PROTOCOL [04 / 05]"
          title={<>HOW TO Commission THE LAB</>}
          right={<span>Q2 / Q3 SLOTS OPEN</span>}
        />
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
          {ENGAGEMENTS.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between border border-outline-variant/40 bg-surface-container-low p-space-lg ${plan.shadow}`}
            >
              <div>
                <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
                  <span className={`font-display text-headline-sm uppercase tracking-widest ${plan.tone}`}>
                    {plan.name}
                  </span>
                  <span className="font-mono text-label-mono-sm text-outline">{plan.duration}</span>
                </div>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">{plan.best}</p>
                <ul className="mt-space-md space-y-space-xs">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-space-xs font-mono text-label-mono-sm uppercase text-on-surface"
                    >
                      <span className="text-primary-fixed">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-space-lg flex items-center justify-between border-t border-outline-variant/30 pt-space-md">
                <span className="font-mono text-label-mono-sm font-bold uppercase text-outline">
                  {plan.price}
                </span>
                <Link
                  href="/contact"
                  className={`font-mono text-label-mono-sm font-bold uppercase tracking-wider ${plan.tone} hover:underline`}
                >
                  REQUEST ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab initiatives */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <SectionHeading
          tone="cyan"
          eyebrow="// LAB_INITIATIVES [05 / 05]"
          title={<>BUILT ON OUR OWN TIME</>}
          right={<span>R&amp;D ACTIVE</span>}
        />
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
          {INITIATIVES.map((item) => (
            <div
              key={item.name}
              className="border border-outline-variant/30 bg-surface-container-low p-space-lg transition-colors hover:bg-surface-container"
            >
              <div className="mb-space-sm flex items-center justify-between">
                <span className="text-headline-sm uppercase tracking-wide text-primary">
                  {item.name}
                </span>
                <Chip tone={item.tone}>{item.status}</Chip>
              </div>
              <p className="text-body-sm leading-relaxed text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-space-lg border border-outline-variant/30 bg-surface-container-low p-space-xl shadow-acid">
          <div>
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
              {"// READY_WHEN_YOU_ARE"}
            </span>
            <h2 className="mt-space-sm font-display text-headline-lg uppercase tracking-tight text-primary">
              PICK AN ENGINE. START THE SPRINT.
            </h2>
          </div>
          <Link
            href="/contact"
            className="bg-primary-container px-space-xl py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
          >
            [ INITIATE DISCOVERY ↗ ]
          </Link>
        </div>
      </section>
    </div>
  );
}
