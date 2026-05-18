"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// ─── Fade-up on scroll ────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Thin horizontal rule ─────────────────────────────────────────────────────
function Rule() {
  return <div className="w-full h-px bg-border/50" />;
}

// ─── PRINCIPLES data ──────────────────────────────────────────────────────────
const PRINCIPLES = [
  "Clarity over clutter.",
  "Workflows over dashboards.",
  "Calm systems over operational chaos.",
  "Software should reduce cognitive overhead.",
  "Infrastructure should feel invisible.",
];

// ─── CAPABILITIES data ────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    label: "Collections Workflows",
    body: "Structured systems that track outstanding payments, send reminders, and surface overdue accounts — without relying on manual memory.",
  },
  {
    label: "WhatsApp Operations",
    body: "Operational coordination over WhatsApp — parsing messages, routing tasks, logging decisions, and reducing context switching.",
  },
  {
    label: "Invoice & Order Visibility",
    body: "A single view of what's been ordered, what's been invoiced, and what's outstanding. No more cross-referencing spreadsheets.",
  },
  {
    label: "Workflow Structuring",
    body: "Converting ad-hoc, memory-dependent processes into repeatable, auditable workflows with clear ownership and status.",
  },
];

// ─── INITIATIVES data ─────────────────────────────────────────────────────────
const INITIATIVES = [
  {
    tag: "Research",
    title: "Operational Memory",
    body: "Systems that retain context across conversations, decisions, and time — so businesses don't lose institutional knowledge when people move.",
  },
  {
    tag: "Exploration",
    title: "Workflow Structuring Layer",
    body: "A reusable layer for converting manual, coordination-heavy processes into structured, automatable workflows.",
  },
  {
    tag: "Exploration",
    title: "Business Coordination",
    body: "How do teams coordinate when tools are fragmented? We're exploring lightweight coordination infrastructure that reduces operational noise.",
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="w-full">

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO                                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-void"
      >
        {/* Extremely subtle top glow — barely visible */}
        <div className="absolute inset-0 bg-gradient-void pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 text-label font-medium text-text-dim uppercase tracking-widest">
              <span className="w-4 h-px bg-border" />
              Chandigarh, India — Est. 2024
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-text-primary text-balance leading-[1.04]"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.25rem)",
                letterSpacing: "-0.035em",
              }}
            >
              Software designed for
              <br />
              <span className="text-text-muted font-light">operational clarity.</span>
            </motion.h1>
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-muted text-body-lg font-normal max-w-xl mb-14 leading-relaxed"
          >
            We build systems that reduce payment delays, structure workflows,
            and automate operational coordination for modern businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              id="hero-cta-primary"
              href="#distributor-os"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-[13px] rounded-lg transition-all duration-300 hover:bg-accent-muted active:scale-[0.98]"
            >
              Explore DistributorOS
            </Link>
            <Link
              id="hero-cta-secondary"
              href="#why-we-exist"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary font-medium text-[13px] rounded-lg transition-all duration-300 hover:border-border-subtle/80 hover:text-text-primary active:scale-[0.98]"
            >
              Why we exist
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-10 left-8"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-transparent via-text-dim to-transparent"
            />
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2 — WHY WE EXIST                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="why-we-exist" className="bg-void py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left — eyebrow + heading */}
            <FadeUp className="lg:col-span-5">
              <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-8">
                Why We Exist
              </span>
              <h2
                className="font-display font-semibold text-text-primary text-balance"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.028em",
                  lineHeight: 1.1,
                }}
              >
                Businesses today are operationally fragmented.
              </h2>
            </FadeUp>

            {/* Right — body copy */}
            <FadeUp delay={0.15} className="lg:col-span-7 lg:pt-16">
              <div className="space-y-6 text-text-secondary text-body-md leading-relaxed">
                <p>
                  Communication happens in WhatsApp threads, spreadsheets, and memory.
                  Workflows are disconnected from the people who need to act on them.
                  Critical execution — following up on payments, tracking orders,
                  coordinating deliveries — depends entirely on individual recall
                  and manual coordination.
                </p>
                <p>
                  When someone is unavailable, the workflow breaks. When a team grows,
                  the coordination overhead grows faster. The tools that exist were
                  built for other kinds of businesses, and they add complexity
                  rather than removing it.
                </p>
                <p className="text-text-primary font-medium">
                  We believe operational software should reduce complexity — not add to it.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3 — DISTRIBUTOR OS (Anchor Product)                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="distributor-os" className="bg-[#0f0f11] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <FadeUp className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-border/40 pb-8">
              <div>
                <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-4">
                  Current Build
                </span>
                <div className="flex items-baseline gap-4">
                  <h2
                    className="font-display font-semibold text-text-primary"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Fables DistributorOS
                  </h2>
                  <span className="text-[11px] font-medium text-accent bg-accent-subtle border border-accent/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    In Development
                  </span>
                </div>
              </div>
              <p className="text-text-muted text-[13px] max-w-xs leading-relaxed">
                The first major operational system we are building.
              </p>
            </div>
          </FadeUp>

          {/* Problem statement */}
          <FadeUp className="mb-20">
            <div className="max-w-2xl">
              <p className="text-text-secondary text-body-lg leading-relaxed mb-4">
                Distributors and wholesalers run on relationships, credit, and trust.
                But their operational reality is chaotic:
              </p>
              <ul className="space-y-2 text-text-muted text-body-md">
                {[
                  "Payments get delayed because follow-ups are manual and inconsistent.",
                  "Orders are tracked in WhatsApp messages and memory.",
                  "No one has a clear view of what's outstanding, what's delivered, what's unpaid.",
                  "Coordination between sales, dispatch, and collections happens through calls.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-text-dim shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Capabilities grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 rounded-xl overflow-hidden">
            {CAPABILITIES.map((cap, i) => (
              <FadeUp key={cap.label} delay={i * 0.08}>
                <div className="bg-surface p-8 lg:p-10 h-full">
                  <h3
                    className="font-display font-semibold text-text-primary mb-3"
                    style={{ fontSize: "1.0625rem", letterSpacing: "-0.01em" }}
                  >
                    {cap.label}
                  </h3>
                  <p className="text-text-muted text-body-sm leading-relaxed">
                    {cap.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Operational reality note */}
          <FadeUp className="mt-12">
            <div className="border-l-2 border-accent/30 pl-6 py-1">
              <p className="text-text-muted text-[13px] leading-relaxed italic">
                &ldquo;The goal is not to build another dashboard. It&rsquo;s to build
                systems that people in distribution businesses actually use — because
                they reduce real friction in their daily work.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4 — CURRENT FOCUS                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="current-focus" className="bg-void py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <FadeUp className="lg:col-span-4">
              <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-6">
                Current Focus
              </span>
              <h2
                className="font-display font-semibold text-text-primary"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                What we are actively building right now.
              </h2>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border/40 rounded-xl overflow-hidden">
                {[
                  {
                    area: "Distributor Operations",
                    detail: "Operational systems for wholesalers and distributors running on credit and relationships.",
                  },
                  {
                    area: "Collections Workflows",
                    detail: "Structured, automated follow-up systems so outstanding payments don't depend on memory.",
                  },
                  {
                    area: "WhatsApp Coordination",
                    detail: "Parsing, routing, and logging operational communication from WhatsApp into structured records.",
                  },
                  {
                    area: "Operational Visibility",
                    detail: "A single place where teams can see what's ordered, invoiced, delivered, and outstanding.",
                  },
                ].map((item, i) => (
                  <FadeUp key={item.area} delay={i * 0.07}>
                    <div className="p-7 border-b border-r border-border/30 last:border-b-0 [&:nth-child(even)]:border-r-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0">
                      <p className="font-medium text-text-primary text-[14px] mb-2">
                        {item.area}
                      </p>
                      <p className="text-text-muted text-[13px] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5 — PRINCIPLES                                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="principles" className="bg-[#0f0f11] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <FadeUp className="mb-16">
            <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-6">
              Principles
            </span>
            <h2
              className="font-display font-semibold text-text-primary max-w-md"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              Software should reduce operational complexity.
            </h2>
          </FadeUp>

          <div className="border-t border-border/40">
            {PRINCIPLES.map((p, i) => (
              <FadeUp key={p} delay={i * 0.06}>
                <div className="flex items-center gap-6 py-6 border-b border-border/30 group">
                  <span className="font-mono text-[10px] text-text-dim w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-display font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {p}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 6 — RESEARCH & INITIATIVES                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="initiatives" className="bg-void py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <FadeUp className="mb-6">
            <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-6">
              Research & Initiatives
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/40 pb-8">
              <h2
                className="font-display font-semibold text-text-primary"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.12,
                }}
              >
                Directions we are
                <br />
                <span className="text-text-muted font-light">actively exploring.</span>
              </h2>
              <p className="text-text-muted text-[13px] max-w-xs leading-relaxed pb-1">
                These are not finished products. They are active research directions
                that inform where we build next.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/20 mt-px rounded-xl overflow-hidden">
            {INITIATIVES.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="bg-void p-8 lg:p-10 h-full">
                  <span className="inline-block text-label font-medium text-text-dim uppercase tracking-widest mb-5">
                    {item.tag}
                  </span>
                  <h3
                    className="font-display font-semibold text-text-primary mb-4"
                    style={{ fontSize: "1.0625rem", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-body-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 7 — CLOSING                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="contact-cta" className="bg-[#0f0f11] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="block text-label font-medium text-text-dim uppercase tracking-widest mb-8">
                Get in Touch
              </span>
              <h2
                className="font-display font-semibold text-text-primary mb-6 text-balance"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                If you run a distribution business and this resonates — we&rsquo;d like
                to hear from you.
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="text-text-muted text-body-md leading-relaxed mb-10">
                We are early-stage and selective. We are talking to businesses where
                operational friction is a real, daily problem — not a talking point.
              </p>
              <Link
                id="cta-contact"
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-[13px] rounded-lg transition-all duration-300 hover:bg-accent-muted active:scale-[0.98]"
              >
                Talk to us
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

    </div>
  );
}
