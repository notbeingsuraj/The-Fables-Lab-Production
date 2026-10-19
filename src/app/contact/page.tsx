import type { Metadata } from "next";
import Link from "next/link";
import Chip from "@/components/ui/Chip";
import DispatchForm from "@/components/contact/DispatchForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open a direct channel to The Fables Lab. Transmit your project vector and get a response within 24 operational hours — NYC night-shift studio, three commission slots per quarter.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact // The Fables Lab",
    description:
      "Have a wild idea? Transmit the dispatch. We answer within 24 operational hours.",
    url: "https://thefableslab.com/contact",
    type: "website",
  },
};

const CHANNELS = [
  { label: "COMMS", value: "HELLO@THEFABLESLAB.COM", href: "mailto:hello@thefableslab.com", tone: "text-primary-fixed" },
  { label: "BASE", value: "NEW YORK CITY, NY", href: null, tone: "text-primary" },
  { label: "HOURS", value: "24/7 DEDICATED SPRINT LAB", href: null, tone: "text-tertiary-fixed-dim" },
  { label: "SLOTS", value: "3 COMMISSIONS / QUARTER", href: null, tone: "text-secondary" },
] as const;

const FAQ = [
  ["HOW FAST DO YOU MOVE?", "Spikes ship in 1–2 weeks. Full product sprints run 2–6 weeks. Discovery starts within days of a signed scope."],
  ["WHAT DOES A PROJECT COST?", "Every commission is fixed-bid per sprint after discovery — no open-ended hourly meters, no surprise change orders."],
  ["DO YOU WORK REMOTE?", "Yes — globally. The lab operates on NYC time with async-heavy communication and weekly playable builds."],
  ["CAN YOU TAKE OVER AN EXISTING CODEBASE?", "Often. We start with a technical audit sprint that maps risk, then stabilize before extending."],
] as const;

/** CONTACT — the terminal dispatch channel. */
export default function ContactPage() {
  return (
    <div className="w-full pt-14">
      {/* Header */}
      <section className="relative w-full overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-10 top-0 select-none font-display text-[220px] leading-none text-surface-container-highest/25 lg:text-[320px]">
          05
        </div>
        <div className="relative z-10 max-w-5xl">
          <div className="mb-space-md flex flex-wrap items-center gap-space-sm">
            <Chip tone="acid" dot>
              SYS_FILE // DISPATCH
            </Chip>
            <span className="font-mono text-label-mono-md uppercase tracking-wider text-outline">
              // ENCRYPTED DIRECT CHANNEL
            </span>
          </div>
          <h1 className="font-display text-[48px] uppercase leading-[0.95] tracking-tight text-primary sm:text-[72px] lg:text-[104px]">
            LAUNCH YOUR{" "}
            <span className="chromatic-glitch inline-block bg-surface-container-low px-space-sm text-primary-fixed shadow-magenta">
              FABLE.
            </span>
          </h1>
          <p className="mt-space-lg max-w-2xl text-body-lg leading-relaxed text-on-surface-variant">
            Have an ambitious digital product, a speculative 3D project, or an
            unhinged narrative experiment? Fill the console below — we answer
            incoming dispatches within 24 operational hours.
          </p>
        </div>
      </section>

      {/* Form + comms rail */}
      <section className="w-full bg-background px-space-md py-space-2xl lg:px-margin-desktop">
        <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12">
          <div className="space-y-space-md lg:col-span-4 lg:order-2">
            {/* Comms board */}
            <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-magenta">
              <div className="mb-space-md flex items-center justify-between border-b border-outline-variant/30 pb-space-sm">
                <span className="font-mono text-label-mono-sm font-bold uppercase tracking-widest text-secondary">
                  [COMMS BOARD]
                </span>
                <span className="flex items-center gap-1.5 font-mono text-label-mono-sm text-tertiary-fixed-dim">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-tertiary-fixed-dim" />
                  ONLINE
                </span>
              </div>
              <div className="space-y-space-md">
                {CHANNELS.map((channel) => {
                  const inner = (
                    <div className="flex items-center gap-space-sm">
                      <span className="w-16 shrink-0 font-mono text-label-mono-sm uppercase text-outline">
                        {channel.label}
                      </span>
                      <span className={`font-mono text-label-mono-sm ${channel.tone}`}>
                        {channel.value}
                      </span>
                    </div>
                  );
                  return channel.href ? (
                    <a
                      key={channel.label}
                      href={channel.href}
                      className="block transition-opacity hover:opacity-75"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={channel.label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Availability alert */}
            <div className="flex items-center gap-space-md border border-outline-variant/30 bg-surface-container p-space-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-container font-display text-headline-sm text-on-primary-container shadow-[2px_2px_0px_0px_#000]">
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

            {/* FAQ feed */}
            <div className="border border-outline-variant/30 bg-surface-container-low p-space-lg shadow-cyan-sm">
              <span className="mb-space-sm block border-b border-outline-variant/30 pb-space-sm font-mono text-label-mono-sm font-bold uppercase tracking-widest text-tertiary-fixed-dim">
                &gt; FREQUENT_SIGNALS
              </span>
              <div className="space-y-space-md">
                {FAQ.map(([q, a]) => (
                  <div key={q}>
                    <p className="font-mono text-label-mono-sm font-bold uppercase text-primary">
                      {q}
                    </p>
                    <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 lg:order-1">
            <DispatchForm />
          </div>
        </div>
      </section>

      {/* Closing band */}
      <section className="w-full border-t border-outline-variant/30 bg-surface-container-lowest px-space-md py-space-xl lg:px-margin-desktop">
        <div className="flex flex-wrap items-center justify-between gap-space-md">
          <span className="font-mono text-label-mono-sm uppercase tracking-wider text-outline">
            &gt;&gt; PREFER TO READ FIRST?
          </span>
          <div className="flex flex-wrap gap-space-sm">
            <Link
              href="/projects"
              className="border border-outline-variant/50 px-space-lg py-space-sm font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
            >
              [ WORK ARCHIVE ]
            </Link>
            <Link
              href="/process"
              className="border border-outline-variant/50 px-space-lg py-space-sm font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
            >
              [ SPRINT PROTOCOL ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
