import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="w-full bg-surface-tile-dark text-ink-inverse py-space-section">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="max-w-3xl space-y-space-md">
          <span className="font-caption-strong text-caption-strong text-action-blue-on-dark uppercase tracking-wider">Let&apos;s Build</span>
          <h2 className="font-hero-display text-hero-display text-ink-inverse tracking-tight">Have an idea worth building?</h2>
          <p className="font-lead text-lead text-ink-muted">
            We are currently reviewing project requests for upcoming quarters. Tell us what you want to achieve, and we will outline an architectural roadmap within 48 hours.
          </p>
          <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
            <Link href="/contact" className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-2xl py-space-md rounded-full shadow-lg active:scale-95 transition-all">
              Schedule a Strategy Call
            </Link>
            <Link href="/work" className="inline-flex items-center justify-center bg-surface-tile-subtle hover:bg-surface-tile-elevated text-ink-inverse font-body-strong text-body-strong px-space-2xl py-space-md rounded-full transition-colors">
              Browse All Work
            </Link>
          </div>
          <div className="pt-space-xl flex items-center gap-space-lg text-ink-muted font-caption text-caption">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-green text-[18px]">verified</span>
              <span>Direct partner involvement</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-green text-[18px]">verified</span>
              <span>Fixed timeline accountability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
