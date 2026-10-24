import Link from "next/link";

export default function SelectedWorks() {
  return (
    <section className="w-full bg-background py-space-section" id="selected-work">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin space-y-space-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Selected Works</span>
            <h2 className="font-display-lg text-display-lg text-ink-primary mt-space-xs tracking-tight">Built to solve real problems.</h2>
          </div>
          <p className="font-body text-body text-ink-secondary max-w-md">
            A curated selection of software systems, intelligence engines, and commerce platforms engineered to deliver demonstrable return on effort.
          </p>
        </div>
        <article className="w-full bg-canvas-warm rounded-2xl p-space-xl lg:p-space-2xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container font-label-sm text-label-sm text-electric-violet">
                <span className="w-2 h-2 rounded-full bg-electric-violet"></span>
                AI • Enterprise Intelligence
              </div>
              <h3 className="font-display-md text-display-md text-ink-primary font-semibold">Webloom</h3>
              <p className="font-body-large text-body-large text-ink-secondary">
                A comprehensive decision intelligence platform translating unstructured corporate operational data into validated, high-confidence planning vectors.
              </p>
              <div className="grid grid-cols-2 gap-space-md pt-space-xs">
                <div className="bg-canvas-white p-space-md rounded-xl">
                  <span className="font-label-sm text-label-sm text-ink-muted">Confidence Metric</span>
                  <p className="font-display-md text-display-md text-electric-violet font-semibold">98.4%</p>
                  <span className="font-caption text-caption text-ink-secondary">Automated anomaly detection</span>
                </div>
                <div className="bg-canvas-white p-space-md rounded-xl">
                  <span className="font-label-sm text-label-sm text-ink-muted">Planning Velocity</span>
                  <p className="font-display-md text-display-md text-ink-primary font-semibold">4.8×</p>
                  <span className="font-caption text-caption text-ink-secondary">Cycle acceleration</span>
                </div>
              </div>
              <div className="pt-space-sm">
                <Link href="/work" className="inline-flex items-center gap-space-xs font-body-strong text-body-strong text-action-blue-base hover:text-action-blue-focus transition-colors">
                  View Case Archive
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-canvas-white p-space-md">
                <div className="w-full h-80 lg:h-96 rounded-lg bg-gradient-to-br from-surface-container to-canvas-parchment flex items-center justify-center">
                  <img
        src="/Users/surajkumar/Desktop/TheFablesLab/The-Fables-Lab-Production/public/webloom-preview.png"
        alt="The Fables Lab project preview"
        className="w-full h-full object-cover rounded-lg"
      />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
