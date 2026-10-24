import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — The Fables Lab",
  description: "The Fables Lab is an independent digital atelier translating craft into progressive software architecture.",
};

export default function AboutPage() {
  return (
    <div className="w-full pt-16 bg-background">
      <section className="w-full bg-canvas-white py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Atelier Manifesto</span>
            <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">Technology is the tool. The outcome is the point.</h1>
            <p className="font-body-large text-body-large text-ink-secondary">
              The Fables Lab is an industrial design and creative engineering practice. We translate tangible material craft into progressive software architectures, crafting artifacts of enduring digital culture.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="bg-canvas-white rounded-2xl p-space-lg space-y-space-sm">
            <span className="material-symbols-outlined text-action-blue-base text-[28px]">search_check</span>
            <h3 className="font-body-strong text-body-strong text-ink-primary">Clear Problem Definition</h3>
            <p className="font-caption text-caption text-ink-secondary">
              We never write a single line of code until we understand what metrics truly define victory for your business.
            </p>
          </div>
          <div className="bg-canvas-white rounded-2xl p-space-lg space-y-space-sm">
            <span className="material-symbols-outlined text-green text-[28px]">code_blocks</span>
            <h3 className="font-body-strong text-body-strong text-ink-primary">Maintainable Engineering</h3>
            <p className="font-caption text-caption text-ink-secondary">
              Clean typing, comprehensive test harnesses, and predictable data flow your internal team can gladly adopt.
            </p>
          </div>
          <div className="bg-canvas-white rounded-2xl p-space-lg space-y-space-sm">
            <span className="material-symbols-outlined text-electric-violet text-[28px]">handshake</span>
            <h3 className="font-body-strong text-body-strong text-ink-primary">Honest Communication</h3>
            <p className="font-caption text-caption text-ink-secondary">
              Radical transparency around technical tradeoffs, schedules, and costs. No account management telephone games.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-tile-dark text-ink-inverse py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-on-dark uppercase tracking-wider">Let&apos;s Build</span>
            <h2 className="font-hero-display text-hero-display text-ink-inverse tracking-tight">Have an idea worth building?</h2>
            <p className="font-lead text-lead text-ink-muted">
              Tell us what you want to achieve, and we will outline an architectural roadmap within 48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
              <Link href="/contact" className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-2xl py-space-md rounded-full shadow-lg active:scale-95 transition-all">
                Start a Project
              </Link>
              <Link href="/work" className="inline-flex items-center justify-center bg-surface-tile-subtle hover:bg-surface-tile-elevated text-ink-inverse font-body-strong text-body-strong px-space-2xl py-space-md rounded-full transition-colors">
                Browse All Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
