"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSynth } from "@/components/providers/SynthProvider";

const NEURAL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuByZF9yWmHjdRTpF6GefMBaQgk_aRd9nXlKsFJwn7Qznu_PQYM7P111ndPJ2_PV-g9fHLdD5RvS8aG-BlDWYRAj3i4ReGFp3cM4SnQdQA0fSiZ36y4OGHsiQTRRwbjIGF69lWAelyC7weFogOLYEr5C5uITCf-60pgQETgN0Rh6968I_wQjNjEz7QRK6OMhJ6Eix3hBvJASHKCxJMgSNj3yJdT0x0efOvHTqPjfMkPr0XJWq1rfY-8";

const SHADER_LINES = [
  [
    { text: "attribute ", tone: "text-secondary font-bold" },
    { text: "vec3", tone: "text-tertiary-fixed" },
    { text: " position;", tone: "" },
  ],
  [
    { text: "uniform ", tone: "text-secondary font-bold" },
    { text: "float", tone: "text-tertiary-fixed" },
    { text: " u_time;", tone: "" },
  ],
  [
    { text: "void ", tone: "text-primary-fixed font-bold" },
    { text: "main", tone: "text-tertiary-fixed-dim" },
    { text: "() {", tone: "" },
  ],
  [
    { text: "  vec3 ", tone: "text-tertiary-fixed" },
    { text: "p = position + ", tone: "" },
    { text: "sin", tone: "text-secondary font-bold" },
    { text: "(position.z * 10.0 + u_time) * 0.05;", tone: "" },
  ],
  [
    { text: "  gl_Position = projectionMatrix * modelViewMatrix * ", tone: "" },
    { text: "vec4", tone: "text-tertiary-fixed" },
    { text: "(p, 1.0);", tone: "" },
  ],
  [{ text: "}", tone: "" }],
];

const WAVEFORM_TONES = [
  "bg-primary-fixed", "bg-primary-fixed", "bg-primary-fixed", "bg-primary-fixed",
  "bg-tertiary-fixed-dim", "bg-tertiary-fixed-dim",
  "bg-secondary", "bg-secondary", "bg-secondary",
  "bg-primary-fixed", "bg-primary-fixed",
];

/** SECTION 05 — Three capability engines in an asymmetrical bento layout. */
export default function CapabilityMatrix() {
  const { play } = useSynth();
  const waveRef = useRef<HTMLDivElement>(null);
  const neuralBtnRef = useRef<HTMLButtonElement>(null);

  // Ambient equalizer drift + click-to-pulse burst.
  useEffect(() => {
    const container = waveRef.current;
    if (!container) return;
    const bars = Array.from(container.children) as HTMLElement[];
    const randomize = (max: number) => {
      bars.forEach((bar) => {
        bar.style.height = `${Math.floor(Math.random() * max + 10)}px`;
      });
    };
    const interval = setInterval(() => randomize(55), 450);
    const onClick = () => {
      play(520, 0.07);
      randomize(70);
    };
    container.addEventListener("click", onClick);
    return () => {
      clearInterval(interval);
      container.removeEventListener("click", onClick);
    };
  }, [play]);

  return (
    <section
      id="experience-matrix"
      className="relative w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop"
    >
      <SectionHeading
        eyebrow="// CAPABILITY ARCHITECTURE [03 / 06]"
        title={<>WHAT WE CREATE // THREE ENGINES</>}
        right={
          <>
            <span>STATUS: ACTIVE PIPELINE</span>
            <span className="h-2 w-2 animate-ping rounded-full bg-primary-fixed" />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
        {/* Engine 01 — Digital products (span 7) */}
        <div className="group flex flex-col justify-between border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-acid lg:col-span-7">
          <div>
            <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <span className="bg-tertiary-container px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-tertiary-container">
                CAPABILITY // 01
              </span>
              <span className="font-mono text-label-mono-sm text-tertiary-fixed-dim">
                GL_RENDER_PIPELINE
              </span>
            </div>
            <h3 className="mb-space-sm font-display text-headline-md uppercase text-primary">
              DIGITAL PRODUCTS &amp; NEXT-GEN WEB
            </h3>
            <p className="mb-space-md text-body-md leading-relaxed text-on-surface-variant">
              Ultra-responsive, GPU-accelerated applications and bespoke design
              systems. We engineer digital flagships that refuse to look like
              standard SaaS templates. High performance, dynamic shaders, and
              cinematic micro-interactions.
            </p>
            {/* Live code simulation window */}
            <div className="mb-space-md overflow-x-auto border border-outline-variant/20 bg-surface-container-lowest p-space-md font-mono text-label-mono-sm text-on-surface shadow-inner">
              <div className="mb-2 flex items-center justify-between border-b border-outline-variant/20 pb-1 text-outline-variant">
                <span>{"// WebGL Vertex Shader Snippet"}</span>
                <span className="font-bold text-primary-fixed">ACTIVE_PASS</span>
              </div>
              {SHADER_LINES.map((line, i) => (
                <p key={i}>
                  {line.map((token, j) => (
                    <span key={j} className={token.tone}>
                      {token.text}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs pt-space-sm">
            {[
              ["[THREE.JS]", "text-primary-fixed"],
              ["[WEBGL SHADERS]", "text-tertiary-fixed-dim"],
              ["[REACT / NEXT]", "text-secondary"],
              ["[HIGH-SPEED MVP]", "text-on-surface"],
            ].map(([label, tone]) => (
              <span
                key={label}
                className={`border border-outline-variant/30 bg-surface-container px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider ${tone}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Engine 02 — AI experiences (span 5) */}
        <div className="flex flex-col justify-between border border-outline-variant/30 bg-surface-container p-space-lg shadow-magenta lg:col-span-5">
          <div>
            <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <span className="bg-secondary-container px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-secondary">
                CAPABILITY // 02
              </span>
              <span className="font-mono text-label-mono-sm text-secondary">
                AGENT_FABRIC_AI
              </span>
            </div>
            <h3 className="mb-space-sm font-display text-headline-md uppercase text-primary">
              AI EXPERIENCES &amp; AGENTIC SPACES
            </h3>
            <p className="mb-space-md text-body-md leading-relaxed text-on-surface-variant">
              Autonomous creative engines, generative dialogue trees, and
              personalized mythic lore architectures powered by custom neural
              models and real-time prompt orchestration.
            </p>
            {/* Neural monitor */}
            <div className="group relative mb-space-md overflow-hidden border border-outline-variant/30 bg-surface-container-lowest p-space-md">
              <div
                role="img"
                aria-label="Abstract cybernetic neural network visualization with glowing magenta and ultraviolet vectors against void black."
                className="h-36 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${NEURAL_IMAGE}')` }}
              />
              <div className="absolute bottom-4 left-4 border border-secondary/40 bg-surface-container-high/90 px-space-xs py-0.5 font-mono text-label-mono-sm text-secondary">
                LATENT_SPACE: 1024-DIM
              </div>
              <button
                ref={neuralBtnRef}
                type="button"
                onClick={() => {
                  play(700, 0.08);
                  const btn = neuralBtnRef.current;
                  if (!btn) return;
                  btn.textContent = "SYNTHESIZED ✓";
                  setTimeout(() => {
                    if (btn) btn.textContent = "SYNTHESIZE ↗";
                  }, 1200);
                }}
                className="absolute right-4 top-4 bg-primary-container px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase text-on-primary-container"
              >
                SYNTHESIZE ↗
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs pt-space-sm">
            {[
              ["[NEURAL SYNTHESIS]", "text-secondary"],
              ["[AUTONOMOUS AGENTS]", "text-primary-fixed"],
              ["[DYNAMIC LORE]", "text-tertiary-fixed"],
            ].map(([label, tone]) => (
              <span
                key={label}
                className={`border border-outline-variant/30 bg-surface-container-low px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider ${tone}`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Engine 03 — Immersive worldbuilding (span 12) */}
        <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-cyan lg:p-space-xl lg:col-span-12">
          <div className="grid grid-cols-1 items-center gap-space-lg lg:grid-cols-12">
            <div className="space-y-space-md lg:col-span-7">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="bg-tertiary-fixed-dim px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase tracking-wider text-on-tertiary-fixed">
                  CAPABILITY // 03
                </span>
                <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
                  {"// HARDWARE CHASSIS & SOUND"}
                </span>
              </div>
              <h3 className="font-display text-headline-lg uppercase text-primary">
                IMMERSIVE WORLDBUILDING &amp; TACTILE HARDWARE
              </h3>
              <p className="max-w-2xl text-body-md leading-relaxed text-on-surface-variant">
                We close the gap between digital software and physical matter.
                Custom mechanical keyboards, tactile MIDI triggers, spatial audio
                environments, and physical installation interfaces engineered for
                live interactive venues.
              </p>
              <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                {[
                  ["[SPATIAL AUDIO 44.1kHz]", "text-primary-fixed"],
                  ["[KINETIC HARDWARE]", "text-tertiary-fixed-dim"],
                  ["[EXHIBITION PROTOCOLS]", "text-secondary"],
                  ["[HAPTIC ACTUATORS]", "text-on-surface"],
                ].map(([label, tone]) => (
                  <span
                    key={label}
                    className={`border border-outline-variant/30 bg-surface-container px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase ${tone}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive acoustic oscillator console */}
            <div
              id="equalizer-chassis"
              title="Click to trigger audio burst!"
              className="space-y-space-md border border-outline-variant/30 bg-surface-container-lowest p-space-md shadow-panel-sm lg:col-span-5"
            >
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-xs">
                <span className="font-mono text-label-mono-sm font-bold uppercase tracking-wider text-primary-fixed">
                  TACTILE FREQUENCY OSCILLATOR
                </span>
                <span className="h-2 w-2 animate-ping rounded-full bg-primary-fixed" />
              </div>
              <div
                ref={waveRef}
                className="flex h-24 items-end justify-between gap-1.5 bg-surface-container-high px-space-sm py-2"
              >
                {WAVEFORM_TONES.map((tone, i) => (
                  <div
                    key={i}
                    className={`w-full transition-all duration-150 ${tone}`}
                    style={{ height: `${16 + ((i * 13) % 64)}px` }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between font-mono text-label-mono-sm text-outline">
                <span>OUTPUT: STEREO DUAL-BUS</span>
                <span className="tabular-nums text-tertiary-fixed-dim">
                  0.0001ms JITTER [CLICK TO PULSE]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capability deep-dive CTA */}
      <div className="mt-space-xl flex flex-wrap items-center justify-between gap-space-md border border-outline-variant/30 bg-surface-container-low p-space-md">
        <span className="font-mono text-label-mono-sm uppercase tracking-wider text-on-surface-variant">
          FULL ENGINE SPECS, ENGAGEMENT MODELS &amp; DELIVERABLES
        </span>
        <Link
          href="/services"
          onClick={() => play(560, 0.05)}
          className="bg-surface-container-high px-space-lg py-space-sm font-mono text-label-mono-md font-bold uppercase tracking-wider text-primary-fixed shadow-cyan-sm transition-all hover:bg-primary-fixed hover:text-on-primary-fixed"
        >
          [ OPEN CAPABILITY DOSSIER ↗ ]
        </Link>
      </div>
    </section>
  );
}
