import Marquee from "@/components/ui/Marquee";

const CREED =
  "IDEAS ARE CHEAP. EXECUTION IS THE EXPERIMENT. // ARCHETYPES + COMPUTE // ACCELERATE AMBITION // NEVER SHIP BORING INTERFACES // 60 FPS OR DIE // BOLD GRAPHIC BRUTALISM";

/**
 * SECTION 04 — The lab manifesto. Full acid-green inversion with a black
 * creed card and a running ribbon marquee.
 */
export default function Manifesto({ className = "" }: { className?: string }) {
  return (
    <section
      id="manifesto-section"
      className={`relative w-full overflow-hidden bg-primary-container px-space-md py-space-2xl text-on-primary-container lg:px-margin-desktop ${className}`}
    >
      {/* Watermark numeral */}
      <div className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[200px] leading-none text-black/10 lg:text-[340px]">
        02
      </div>

      {/* Registration marks */}
      <div className="mb-space-xl flex flex-wrap items-center justify-between gap-space-sm font-mono text-label-mono-sm font-bold uppercase tracking-widest text-black">
        <span>+ REG: MANIFESTO_SCALE_1:1</span>
        <span className="hidden sm:inline">[DOC_ID: LAB_THESIS_REV_7]</span>
        <span>+ SECTION_TERMINATION</span>
      </div>

      <div className="relative z-10 max-w-5xl space-y-space-lg">
        <div className="inline-block bg-black px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed shadow-cyan-sm">
          {"// UNAPOLOGETIC CREATIVE CODE"}
        </div>
        <h2 className="font-display text-[48px] uppercase leading-[0.92] tracking-tight text-black sm:text-[70px] lg:text-[96px]">
          THE FUTURE DOESN&apos;T BUILD ITSELF.
        </h2>
        <div className="grid grid-cols-1 gap-space-lg pt-space-md md:grid-cols-12">
          <div className="space-y-space-md md:col-span-8">
            <p className="text-headline-sm uppercase font-bold leading-snug text-black">
              We don&apos;t wait for the future to become obvious. We prototype it,
              break it, rebuild it with raw compute power, and ship it to the world.
            </p>
            <p className="text-body-md leading-relaxed text-black/80">
              The modern web has grown timid, homogenized into predictable modular
              templates and muted gray palettes. The Fables Lab stands as an
              aggressive antidote. We fuse ancient narrative archetypes—monsters,
              epics, quests, and allegories—with real-time graphics pipelines, deep
              neural synthesis, and hardware-grade tactical feedback.
            </p>
          </div>
          <div className="flex flex-col justify-between border border-black bg-black p-space-md text-primary shadow-magenta md:col-span-4">
            <span className="font-mono text-label-mono-sm font-bold uppercase tracking-wider text-primary-fixed">
              {"// CREED_RULE_01"}
            </span>
            <p className="text-headline-sm uppercase tracking-tight text-primary py-space-sm">
              &quot;IDEAS ARE CHEAP. EXECUTION IS THE EXPERIMENT.&quot;
            </p>
            <div className="flex items-center justify-between font-mono text-label-mono-sm text-outline">
              <span>HASH: 0xDEADBEEF</span>
              <span className="font-bold text-secondary">100% UNCOMPROMISING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Running black ribbon */}
      <div className="-mx-space-md mt-space-2xl flex w-[calc(100%+2rem)] items-center overflow-hidden bg-black px-space-sm py-space-xs text-primary-fixed lg:-mx-margin-desktop lg:w-[calc(100%+6rem)]">
        <Marquee speed="fast">
          <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest">
            {`${CREED} // `}
          </span>
        </Marquee>
      </div>
    </section>
  );
}
