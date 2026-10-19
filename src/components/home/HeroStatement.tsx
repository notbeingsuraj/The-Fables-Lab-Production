"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import { useSynth } from "@/components/providers/SynthProvider";

const STATS = [
  { value: "120+", label: "Interactive Worlds Deployed", tone: "text-primary" },
  { value: "60 FPS", label: "Zero-Jank WebGL Engine", tone: "text-tertiary-fixed-dim" },
  { value: "14MS", label: "Global Edge Response", tone: "text-secondary" },
  { value: "02:00", label: "NYC Lab Operating Hours", tone: "text-primary-fixed" },
];

const RADAR_ITEMS =
  "STRATEGY // INTERACTIVE 3D // AI-POWERED EXPERIENCES // RAPID MVP ENGINEERING // WEBGL SHADERS // SPATIAL SOUND // HARDWARE PROTOTYPING // GENERATIVE LORE // NYC AFTER HOURS";

// Ref-based tick — the hero is above the fold on every visit; a per-second
// setState here would re-render the whole section (counters, radar, stats)
// once per second for a clock the size of a fingernail.
function useEstClockRef() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      try {
        el.textContent = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: false,
        });
      } catch {
        el.textContent = new Date().toLocaleTimeString();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return ref;
}

/** SECTION 02 — Monumental hero statement with telemetry impact stats. */
export default function HeroStatement() {
  const clockRef = useEstClockRef();
  const { play } = useSynth();

  return (
    <section id="hero-statement" className="relative w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
      {/* Asymmetric top sub-header */}
      <div className="mb-space-xl flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="bg-primary-fixed px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest text-on-primary-fixed shadow-cyan-sm">
            SYS_ORIGIN // 00 / 06
          </span>
          <span className="hidden font-mono text-label-mono-md uppercase tracking-wider text-outline sm:inline-block">
            {"// Creative Technology Studio"}
          </span>
        </div>
        <div className="flex items-center gap-space-xs font-mono text-label-mono-sm uppercase tracking-wider text-tertiary-fixed-dim">
          <span className="text-[16px] leading-none">▸</span>
          <span className="tabular-nums">
            SYS_TIME: <span ref={clockRef}>02:14:59</span> EST
          </span>
          <span className="text-outline-variant">:: [NYC_CHAMBER]</span>
        </div>
      </div>

      {/* Monumental headline */}
      <div className="w-full max-w-7xl">
        <h1 className="font-display text-[54px] uppercase leading-[0.92] tracking-tighter text-primary sm:text-[76px] lg:text-[110px] xl:text-[128px]">
          WE TURN{" "}
          <span className="chromatic-glitch inline-block -rotate-1 bg-surface-container-low px-space-sm py-1 text-primary-fixed shadow-magenta sm:px-space-md">
            IMPOSSIBLE
          </span>
          <br />
          INTO{" "}
          <span className="inline-block rotate-1 bg-surface-container-highest px-space-sm py-1 text-secondary shadow-cyan sm:px-space-md">
            INTERACTIVE.
          </span>
        </h1>
      </div>

      {/* Split asymmetrical content grid */}
      <div className="mt-space-xl grid grid-cols-1 items-end gap-space-xl pt-space-lg lg:grid-cols-12">
        {/* Left editorial statement */}
        <div className="space-y-space-md lg:col-span-7">
          <div className="h-1 w-16 bg-primary-fixed shadow-acid-sm" />
          <p className="max-w-2xl text-body-lg leading-relaxed text-on-surface text-balance">
            From ancient mythology to future-facing software. We design, engineer,
            and deploy high-voltage digital experiences built to exist beyond
            conventional web design. WebGL shaders, agentic intelligence, tactical
            interfaces, and kinetic hardware.
          </p>
          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <Link
              href="/services"
              onClick={() => play(680, 0.06)}
              className="flex items-center gap-space-sm bg-primary-container px-space-xl py-space-md font-display text-headline-sm uppercase font-normal tracking-widest text-on-primary-container shadow-cyan transition-all hover:bg-secondary-container hover:text-on-secondary"
            >
              <span>[ EXPLORE THE LAB ]</span>
              <span className="text-[20px] leading-none">↗</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => play(520, 0.05)}
              className="flex items-center gap-space-xs bg-surface-container-high px-space-lg py-space-md font-mono text-label-mono-md uppercase tracking-wider text-tertiary-fixed-dim shadow-panel-sm transition-colors hover:bg-surface-bright"
            >
              <span className="h-2 w-2 animate-ping rounded-full bg-tertiary-fixed-dim" />
              HAVE A WILD IDEA?
            </Link>
          </div>
        </div>

        {/* Right metric matrix panel */}
        <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-panel">
          <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
              {"// TELEMETRIC IMPACT STATS"}
            </span>
            <span className="font-mono text-label-mono-sm text-outline-variant">INDEX: 0x992</span>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <span className={`font-display text-headline-lg tracking-tight ${stat.tone}`}>
                  {stat.value}
                </span>
                <p className="font-mono text-label-mono-sm uppercase text-on-surface-variant">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Looping technical ribbon ticker */}
      <div className="mt-space-2xl flex w-full items-center gap-space-md overflow-hidden border-y border-outline-variant/40 bg-surface-container-highest px-space-sm py-space-xs">
        <span className="shrink-0 bg-primary-fixed px-space-xs py-0.5 font-mono text-label-mono-sm font-bold uppercase text-on-primary-fixed">
          RADAR
        </span>
        <Marquee>
          <span className="font-mono text-label-mono-sm uppercase tracking-widest text-on-surface-variant">
            {`${RADAR_ITEMS} // `}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
