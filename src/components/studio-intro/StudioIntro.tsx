"use client";

export default function StudioIntro() {
  return (
    <section
      id="studio-intro"
      className="w-full bg-background py-section lg:py-[8rem] px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-center lg:text-left">
          <span className="inline-block mb-8 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
            The Fables Lab
          </span>
          <h2
            className="mb-10 font-display text-[clamp(2.5rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-on-surface text-balance"
          >
            Small details. Serious engineering.
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-[640px]">
            We are an independent AI and full-stack digital solutions studio.
            We help businesses design, engineer, launch, and grow digital
            products — combining thoughtful design, serious engineering,
            practical AI, and business understanding into connected solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
