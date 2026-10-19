"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSynth } from "@/components/providers/SynthProvider";

// WebGL scene is client-only — keep it out of the server bundle.
const ThreeKeyScene = dynamic(() => import("./ThreeKeyScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-label-mono-sm uppercase tracking-widest text-outline animate-pulse">
        {"// Booting WebGL buffers..."}
      </span>
    </div>
  ),
});

const BOOT_LINES = [
  { text: "> HOST: NYC_NODE_247 CONNECTED", className: "text-outline" },
  { text: "> THREE.JS SHADER: RUNTIME_READY", className: "text-tertiary-fixed-dim" },
  { text: "> WEBAUDIO: 44.1kHz ENGINE LOADED", className: "text-on-surface-variant" },
  { text: "> READY: STRIKE KEY OR CLICK 3D CORE", className: "text-primary-fixed font-bold" },
];

interface Strike {
  id: number;
  key: string;
}

/**
 * SECTION 01 — Cinematic boot gateway. Full-viewport interactive switch core
 * framed by telemetry rails, a live terminal feed, and the engage console.
 */
export default function BootGateway() {
  const { play, toggle, enabled } = useSynth();
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [displacement, setDisplacement] = useState("0.00 mm");
  const [coords, setCoords] = useState({ x: "0.00", y: "0.00" });
  const [ping, setPing] = useState(11);
  const [isWarping, setIsWarping] = useState(false);
  const displacementTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Terminal feed + keystroke telemetry, driven by the 3D scene's events.
  useEffect(() => {
    const onKeyPress = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      const label = detail?.key || "KEY";
      play(420 + Math.random() * 120, 0.06);
      setStrikes((prev) => [...prev.slice(-4), { id: Date.now() + Math.random(), key: label }]);
      setDisplacement(`${(Math.random() * 1.8 + 2.2).toFixed(2)} mm [DEPRESSED]`);
      if (displacementTimer.current) clearTimeout(displacementTimer.current);
      displacementTimer.current = setTimeout(() => setDisplacement("0.00 mm"), 220);
    };
    window.addEventListener("fables-key-press", onKeyPress);
    return () => {
      window.removeEventListener("fables-key-press", onKeyPress);
      if (displacementTimer.current) clearTimeout(displacementTimer.current);
    };
  }, [play]);

  // Cursor coordinate tracker.
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth).toFixed(2),
        y: (e.clientY / window.innerHeight).toFixed(2),
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Edge latency jitter for liveliness.
  useEffect(() => {
    const id = setInterval(() => setPing(9 + Math.floor(Math.random() * 6)), 3000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Multi-stage cinematic warp into the lab.
  const executeCinematicWarp = useCallback(() => {
    if (isWarping) return;
    setIsWarping(true);
    play(680, 0.12);

    window.dispatchEvent(new CustomEvent("fables-unlock-burst"));

    const flash = document.createElement("div");
    flash.className = "fixed inset-0 z-50 pointer-events-none transition-opacity duration-300";
    flash.style.background =
      "radial-gradient(circle, rgba(204,242,0,0.4) 0%, rgba(255,66,173,0.3) 60%, rgba(0,0,0,0) 100%)";
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 400);
    }, 100);

    setTimeout(() => {
      scrollTo("hero-statement");
      setIsWarping(false);
    }, 450);
  }, [isWarping, play, scrollTo]);

  return (
    <section
      id="boot-gateway"
      className="relative flex w-full min-h-[92vh] flex-col justify-between overflow-hidden border-b-2 border-primary-fixed/20 bg-surface-container-lowest px-space-md pb-space-md pt-16 lg:px-margin-desktop"
    >
      {/* Architectural grid markers */}
      <div className="z-30 mb-space-sm flex w-full flex-wrap items-center justify-between gap-space-sm">
        <span className="select-none font-mono text-label-mono-sm uppercase tracking-widest text-outline-variant">
          + [NODE_GATEWAY_V5.0 // TACTILE_OVERDRIVE] :: STANDBY
        </span>
        <span className="hidden select-none items-center gap-space-xs font-mono text-label-mono-sm uppercase tracking-widest text-primary-fixed sm:flex">
          <span className="h-2 w-2 animate-ping rounded-full bg-primary-fixed" />
          LAT 40.7128° N // LON 74.0060° W [EDGE_{ping}MS]
        </span>
      </div>

      {/* Telemetry diagnostic sub-rail */}
      <div className="z-30 mt-2 flex w-full flex-wrap items-center justify-between gap-space-sm border border-outline-variant/30 bg-surface-container-low px-space-md py-space-sm shadow-acid-sm">
        <div className="flex flex-wrap items-center gap-space-md font-mono text-label-mono-sm uppercase text-outline">
          <span className="flex items-center gap-1.5 font-bold text-tertiary-fixed-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-tertiary-fixed-dim" />
            MEM: 64TB ALLOC
          </span>
          <span className="hidden text-outline-variant sm:inline">|</span>
          <span className="font-semibold text-secondary">QUANTUM STATE: COHERENT</span>
          <span className="hidden text-outline-variant md:inline">|</span>
          <span className="text-primary-fixed">
            LATENCY PING: <span className="tabular-nums">{ping}ms</span>
          </span>
          <span className="hidden text-outline-variant lg:inline">|</span>
          <span className="hidden lg:inline">CLOCK: 44.100kHz WEBAUDIO</span>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            aria-pressed={enabled}
            title="Toggle Mechanical Audio Synthesis"
            className="flex items-center gap-1.5 border border-outline-variant/40 bg-surface-container px-space-sm py-1 font-mono text-label-mono-sm uppercase tracking-wider text-tertiary-fixed-dim transition-colors hover:bg-surface-bright"
          >
            <span className="text-[15px] text-primary-fixed">
              {enabled ? "◉" : "◎"}
            </span>
            SYNTH: {enabled ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={() => {
              play(300, 0.04);
              scrollTo("experience-matrix");
            }}
            className="border border-outline-variant/40 bg-surface-container-high px-space-md py-1 font-mono text-label-mono-sm uppercase tracking-wider text-primary-fixed shadow-cyan-sm transition-all hover:bg-secondary-container hover:text-on-secondary"
          >
            [ SKIP INTRO // ESC ]
          </button>
        </div>
      </div>

      {/* Boot chamber central stage */}
      <div className="relative my-space-sm flex min-h-[500px] w-full flex-1 flex-col justify-between overflow-hidden border border-outline-variant/40 bg-surface-container-low p-space-md lg:min-h-[580px]">
        {/* 3D interactive mechanical scene */}
        <div className="absolute inset-0 z-10 h-full w-full cursor-pointer">
          <ThreeKeyScene />
        </div>

        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center">
          <span className="font-display text-[140px] uppercase leading-none tracking-tighter text-surface-container-highest/20 sm:text-[200px] lg:text-[280px]">
            FABLES
          </span>
        </div>

        {/* Left tactical telemetry node */}
        <div className="pointer-events-none relative z-20 max-w-xs space-y-space-md">
          <div className="pointer-events-auto border border-outline-variant/50 bg-surface-container-lowest/90 p-space-md shadow-acid-sm backdrop-blur-md">
            <span className="mb-1 block font-mono text-label-mono-sm uppercase tracking-widest text-tertiary-fixed-dim">
              {"// SYS_SPEC 001 :: TACTILE CORE"}
            </span>
            <h1 className="font-display text-headline-sm uppercase tracking-tight text-primary">
              MECHANICAL SWITCH GATEWAY
            </h1>
            <p className="mt-1 text-body-sm leading-snug text-on-surface-variant">
              Strike the physical key or spacebar to modulate audio frequency,
              calibrate WebGL buffers, and break into neural fables.
            </p>
            <div className="mt-space-sm space-y-1 border-t border-outline-variant/30 pt-space-xs font-mono text-label-mono-sm">
              <div className="flex justify-between">
                <span className="uppercase text-outline">ACTUATION FORCE</span>
                <span className="font-bold text-primary-fixed">45g CRISP CLICK</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase text-outline">SWITCH TYPE</span>
                <span className="font-bold text-tertiary-fixed-dim">FABLES_MX_NEON</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase text-outline">DISPLACEMENT</span>
                <span className="font-bold tabular-nums text-secondary">{displacement}</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase text-outline">STRIKES LOGGED</span>
                <span className="font-bold tabular-nums text-primary">
                  {String(strikes.length).padStart(4, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right live terminal feed HUD */}
        <div className="pointer-events-none relative z-20 flex max-w-sm flex-col self-end">
          <div className="pointer-events-auto border border-secondary/40 bg-surface-container-lowest/90 p-space-md shadow-magenta-sm backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between border-b border-outline-variant/30 pb-1 font-mono text-label-mono-sm">
              <span className="font-bold uppercase text-secondary">&gt; DAEMON_TELEMETRY</span>
              <span className="animate-pulse text-primary-fixed">[STREAMING]</span>
            </div>
            <div className="flex h-28 flex-col justify-end overflow-hidden space-y-1 font-mono text-label-mono-sm">
              {strikes.map((strike) => (
                <p key={strike.id} className="font-bold text-primary-fixed">
                  &gt; STRIKE: {strike.key} [45g] // VBO_PULSE_OK
                </p>
              ))}
              {BOOT_LINES.map((line) => (
                <p key={line.text} className={line.className}>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom action console */}
        <div className="pointer-events-auto relative z-20 flex w-full flex-wrap items-center justify-between gap-space-sm border border-primary-fixed/40 bg-surface-container-lowest/90 p-space-sm shadow-cyan backdrop-blur-md">
          <div className="flex items-center gap-space-sm">
            <span className="inline-block h-3 w-3 animate-ping bg-primary-fixed" />
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-wider text-primary">
              [ TAP 3D KEY OR PRESS SPACE TO INITIALIZE SYSTEM ]
            </span>
          </div>
          <button
            type="button"
            onClick={executeCinematicWarp}
            disabled={isWarping}
            className="flex items-center gap-space-xs bg-primary-container px-space-lg py-space-sm font-display text-headline-sm uppercase tracking-widest text-on-primary-container shadow-magenta-sm transition-all hover:bg-secondary-container hover:text-on-secondary disabled:opacity-70"
          >
            <span>[ ENGAGE TACTILE OVERDRIVE // ENTER LAB ↗ ]</span>
          </button>
        </div>
      </div>

      {/* Boot chamber footer telemetry bar */}
      <div className="z-30 flex w-full flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/20 pt-space-xs font-mono text-label-mono-sm text-outline">
        <div className="flex items-center gap-space-md">
          <span>
            COORD: [X: <span className="tabular-nums text-tertiary-fixed-dim">{coords.x}</span> | Y:{" "}
            <span className="tabular-nums text-primary-fixed">{coords.y}</span>]
          </span>
          <span>PACKET: 0x992B1</span>
        </div>
        <div>
          <span className="uppercase text-secondary">HYPERVISOR CO-PROCESSING:</span>{" "}
          <span className="font-bold text-primary-fixed">ONLINE</span>
        </div>
      </div>
    </section>
  );
}
