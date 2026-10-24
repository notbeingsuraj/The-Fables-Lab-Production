"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { useSynth } from "@/components/providers/SynthProvider";

/** SECTION 06 — Terminal dispatch: route visitors into /contact. */
export default function DispatchCta() {
  const { play } = useSynth();

  return (
    <section
      id="contact-dispatch"
      className="relative w-full overflow-hidden bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop"
    >
      <SectionHeading
        tone="magenta"
        eyebrow="// DISPATCH PROTOCOL [06 / 06]"
        title={<>INITIATE TRANSMISSION // LAUNCH YOUR FABLE</>}
        right={
          <span className="flex items-center gap-space-xs border border-primary-fixed/40 bg-surface-container px-space-md py-space-xs text-primary-fixed">
            <span className="text-[16px] leading-none">⏣</span>
            <span>ENCRYPTED DIRECT CHANNEL</span>
          </span>
        }
      />

      <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
        {/* Communicator card */}
        <div className="space-y-space-lg lg:col-span-5">
          <div className="space-y-space-md border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-magenta">
            <h3 className="text-headline-sm uppercase tracking-wide text-primary">
              THE LAB COMMUNICATOR
            </h3>
            <p className="text-body-sm leading-relaxed text-on-surface-variant">
              Have an ambitious digital product, a speculative 3D project, or an
              unhinged narrative experiment? We answer incoming dispatches within
              24 operational hours.
            </p>
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center gap-space-sm font-mono text-label-mono-sm">
                <span className="w-24 uppercase text-outline">STUDIO BASE:</span>
                <span className="font-bold text-primary">NEW YORK CITY, NY</span>
              </div>
              <div className="flex items-center gap-space-sm font-mono text-label-mono-sm">
                <span className="w-24 uppercase text-outline">COMMS:</span>
                <span className="text-primary-fixed">IMYSURAJ1218@gmail.COM</span>
              </div>
              <div className="flex items-center gap-space-sm font-mono text-label-mono-sm">
                <span className="w-24 uppercase text-outline">OPERATIONS:</span>
                <span className="text-tertiary-fixed-dim">24/7 DEDICATED SPRINT LAB</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-md border border-outline-variant/30 bg-surface-container p-space-md">
            <div className="flex h-10 w-10 items-center justify-center bg-primary-container font-display text-headline-sm text-on-primary-container shadow-[2px_2px_0px_0px_#000]">
              !
            </div>
            <div>
              <span className="block font-mono text-label-mono-sm font-bold uppercase text-primary">
                ACCEPTING Q2 / Q3 CLIENT COMMISSIONS
              </span>
              <span className="font-mono text-label-mono-sm uppercase text-outline">
                3 SLOTS REMAINING FOR IMMERSIVE R&amp;D
              </span>
            </div>
          </div>
        </div>

        {/* Terminal console — routes to the full dispatch form */}
        <div className="border border-outline-variant/30 bg-surface-container p-space-lg shadow-acid lg:col-span-7 lg:p-space-xl">
          <div className="space-y-space-md font-mono text-label-mono-md">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
              <span className="text-outline">&gt; /dispatch --open</span>
              <span className="text-primary-fixed">[FORM: CONTACT]</span>
            </div>
            <p className="text-on-surface-variant">
              <span className="text-primary-fixed">&gt;</span> Name the entity. Declare the
              vector. Attach the payload.
            </p>
            <p className="text-on-surface-variant">
              <span className="text-secondary">&gt;</span> The full terminal accepts agent
              name, return frequency, project scope chips, and transmission payload.
            </p>
            <p className="animate-blink text-primary-fixed">&gt; READY_</p>
          </div>
          <div className="mt-space-lg flex flex-wrap items-center justify-between gap-space-md">
            <Link
              href="/contact"
              onClick={() => play(720, 0.08)}
              className="flex items-center gap-space-sm bg-primary-container px-space-xl py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-cyan transition-all hover:bg-secondary-container hover:text-on-secondary"
            >
              <span>[ OPEN DISPATCH TERMINAL ↗ ]</span>
            </Link>
            <span className="font-mono text-label-mono-sm uppercase text-outline-variant">
              PAYLOAD ID: 0xTRANSMIT_FL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
