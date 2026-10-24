import Link from "next/link";

export default function Philosophy() {
  return (
    <section className="w-full bg-canvas-white py-space-section">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-5 space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Studio Philosophy</span>
            <h2 className="font-display-lg text-display-lg text-ink-primary tracking-tight">Technology is the tool. The outcome is the point.</h2>
            <p className="font-body-large text-body-large text-ink-secondary">
              Too many software teams obsess over speculative frameworks instead of customer retention, reliability, and business impact. We build software that performs cleanly in the real world.
            </p>
            <div className="pt-space-sm">
              <Link href="/about" className="inline-flex items-center gap-space-xs font-body-strong text-body-strong text-action-blue-base hover:text-action-blue-focus transition-colors">
                Read Our Full Studio Manifesto
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-gutter mt-space-xl lg:mt-0">
            <div className="bg-surface-container rounded-2xl p-space-lg space-y-space-sm">
              <span className="material-symbols-outlined text-action-blue-base text-[28px]">search_check</span>
              <h3 className="font-body-strong text-body-strong text-ink-primary">Clear Problem Definition</h3>
              <p className="font-caption text-caption text-ink-secondary">
                We never write a single line of code until we understand what metrics truly define victory for your business.
              </p>
            </div>
            <div className="bg-surface-container rounded-2xl p-space-lg space-y-space-sm">
              <span className="material-symbols-outlined text-green text-[28px]">code_blocks</span>
              <h3 className="font-body-strong text-body-strong text-ink-primary">Maintainable Engineering</h3>
              <p className="font-caption text-caption text-ink-secondary">
                Clean typing, comprehensive test harnesses, and predictable data flow your internal team can gladly adopt.
              </p>
            </div>
            <div className="bg-surface-container rounded-2xl p-space-lg space-y-space-sm">
              <span className="material-symbols-outlined text-electric-violet text-[28px]">handshake</span>
              <h3 className="font-body-strong text-body-strong text-ink-primary">Honest Communication</h3>
              <p className="font-caption text-caption text-ink-secondary">
                Radical transparency around technical tradeoffs, schedules, and costs. No account management telephone games.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
