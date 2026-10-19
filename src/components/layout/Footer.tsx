"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Marquee from "@/components/ui/Marquee";
import { useSynth } from "@/components/providers/SynthProvider";

const FEED_ITEMS = [
  { label: "Strategy", tone: "text-tertiary-fixed-dim", href: "/services" },
  { label: "Interactive 3D", tone: "text-primary", href: "/services" },
  { label: "AI-Powered Experiences", tone: "text-secondary-fixed-dim", href: "/services" },
  { label: "Rapid MVP Engineering", tone: "text-primary-fixed", href: "/services" },
  { label: "WebGL Shaders", tone: "text-tertiary-fixed", href: "/services" },
  { label: "Kinetic Hardware", tone: "text-secondary", href: "/process" },
  { label: "NYC After Hours", tone: "text-on-surface-variant", href: "/about" },
];

// Writes the timestamp straight to the DOM via ref — a per-second setState
// would re-render this always-mounted fixed bar (and its marquees) 60x/min.
function useEstClockRef() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      try {
        el.textContent = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour12: true,
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

/**
 * Fixed bottom-edge telemetry feed bar — live NYC clock, looping capability
 * ticker, and the global synth (SFX) toggle.
 */
export default function Footer() {
  const clockRef = useEstClockRef();
  const { play, toggle, enabled } = useSynth();

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-md">
      <div className="w-full h-0.5 bg-outline-variant/30" />
      <div className="h-11 w-full px-space-md flex items-center justify-between gap-space-md overflow-hidden">
        <div className="flex items-center gap-space-sm flex-1 overflow-hidden">
          <span className="font-mono text-label-mono-sm text-secondary uppercase font-bold shrink-0">
            FEED &gt;&gt;
          </span>
          <Marquee>
            {FEED_ITEMS.map((item, i) => (
              <span key={`${item.label}-${i}`}>
                <Link
                  href={item.href}
                  className={`${item.tone} uppercase tracking-wider hover:text-primary-fixed transition-colors`}
                >
                  {item.label}
                </Link>
                <span className="text-outline-variant">{" // "}</span>
              </span>
            ))}
          </Marquee>
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <span className="hidden sm:flex items-center gap-space-xs font-mono text-label-mono-sm text-on-surface-variant uppercase tracking-wider">
            <span className="text-tertiary-fixed-dim">NYC_LOC:</span>
            <span className="tabular-nums">
              <span ref={clockRef}>02:00:00</span> EST
            </span>
          </span>
          <button
            type="button"
            onClick={() => {
              toggle();
              play(600, 0.05);
            }}
            aria-pressed={enabled}
            className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 font-mono text-label-mono-sm uppercase tracking-wider text-tertiary-fixed-dim transition-colors hover:bg-surface-bright"
          >
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${enabled ? "bg-tertiary-fixed-dim animate-ping" : "bg-outline"}`}
            />
            [SFX: {enabled ? "44.1kHz" : "MUTED"}]
          </button>
        </div>
      </div>
    </footer>
  );
}
