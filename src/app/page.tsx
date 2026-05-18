"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  FileText, 
  AlertCircle,
  Search,
  Filter,
  ChevronRight,
  Activity,
  Layers
} from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Thin horizontal rule ─────────────────────────────────────────────────────
function Rule() {
  return <div className="w-full h-px bg-border/40" />;
}

// ─── UI FRAGMENT: Hero Collections Table ──────────────────────────────────────
function HeroUIFragment() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto mt-16 lg:mt-24 rounded-xl border border-border/50 bg-surface/40 backdrop-blur-md shadow-[0_0_80px_-20px_rgba(74,158,255,0.05)] overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 bg-elevated/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-border/80" />
          </div>
          <div className="h-4 w-px bg-border/50 mx-1" />
          <span className="text-text-muted text-[11px] font-mono tracking-widest uppercase">Collections / Aging</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-void border border-border/50">
            <Search className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-text-muted text-[12px] font-medium pr-4">Search invoices...</span>
          </div>
          <div className="p-1.5 rounded-md bg-void border border-border/50 text-text-muted">
            <Filter className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
      
      {/* Table Content */}
      <div className="px-5 pb-5 pt-2 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border/40 text-text-dim text-[11px] uppercase tracking-wider font-medium">
              <th className="py-4 font-medium w-1/4">Retailer</th>
              <th className="py-4 font-medium">Invoice ID</th>
              <th className="py-4 font-medium text-right">Amount</th>
              <th className="py-4 font-medium pl-6">Status</th>
              <th className="py-4 font-medium">Aging</th>
              <th className="py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-text-secondary">
            {[
              { retailer: "Sharma Provisions", id: "INV-24-0891", amount: "₹45,200", status: "Overdue", aging: "14 Days", action: "Follow up" },
              { retailer: "Apex Enterprises", id: "INV-24-0892", amount: "₹1,12,500", status: "Pending", aging: "2 Days", action: "Wait" },
              { retailer: "New India Stores", id: "INV-24-0885", amount: "₹28,400", status: "Overdue", aging: "21 Days", action: "Escalate" },
              { retailer: "Global Traders", id: "INV-24-0898", amount: "₹89,000", status: "Paid", aging: "-", action: "Archive" },
            ].map((row, i) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                key={row.id} 
                className="border-b border-border/20 last:border-b-0 hover:bg-border/10 transition-colors"
              >
                <td className="py-3.5 font-medium text-text-primary">{row.retailer}</td>
                <td className="py-3.5 font-mono text-text-muted text-[12px]">{row.id}</td>
                <td className="py-3.5 text-right tabular-nums text-text-primary">{row.amount}</td>
                <td className="py-3.5 pl-6">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider
                    ${row.status === "Overdue" ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                      row.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                      "bg-accent/10 text-accent border border-accent/20"}`}
                  >
                    {row.status === "Overdue" ? <AlertCircle className="w-3 h-3" /> : 
                     row.status === "Paid" ? <CheckCircle2 className="w-3 h-3" /> : 
                     <Clock className="w-3 h-3" />}
                    {row.status}
                  </div>
                </td>
                <td className="py-3.5 text-text-muted font-medium tabular-nums">{row.aging}</td>
                <td className="py-3.5 text-right">
                  <button className="text-text-muted hover:text-text-primary transition-colors text-[12px] font-medium">
                    {row.action}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── UI FRAGMENT: DistributorOS Parsing ───────────────────────────────────────
function DistributorOSFragment() {
  return (
    <div className="relative w-full h-[550px] md:h-[600px] rounded-2xl border border-border/40 bg-surface/30 overflow-hidden flex items-center justify-center p-6 lg:p-12 shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      
      {/* WhatsApp Message Panel */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10% 0px" }}
        className="absolute left-6 md:left-12 top-12 md:top-24 w-[280px] md:w-[320px] rounded-xl border border-border/60 bg-elevated/90 backdrop-blur-md shadow-2xl z-10"
      >
        <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <span className="text-[12px] font-medium text-text-primary">Incoming WhatsApp</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-dim uppercase tracking-wider font-medium">From: Ravi, Apex Enterprises</span>
            <div className="bg-surface border border-border/50 rounded-lg p-3.5 text-[13px] text-text-secondary leading-relaxed relative">
              &quot;Bhaiya, please send 50 peti of variant A and 20 peti of variant B. Also, adjust last month&apos;s pending 5,000 in this invoice.&quot;
            </div>
            <span className="text-[10px] text-text-dim font-mono text-right mt-1">10:42 AM</span>
          </div>
        </div>
      </motion.div>

      {/* AI Parsing Line */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "120px", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute left-[310px] md:left-[350px] top-[150px] md:top-[190px] h-[2px] bg-accent/40 hidden md:block"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(74,158,255,0.8)]" />
      </motion.div>

      {/* Structured Order Panel */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-10% 0px" }}
        className="absolute right-6 md:right-16 bottom-12 md:bottom-20 w-[300px] md:w-[360px] rounded-xl border border-border/60 bg-void/90 backdrop-blur-md shadow-2xl z-20"
      >
         <div className="px-4 py-3.5 border-b border-border/50 flex items-center justify-between bg-surface/50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-[12px] font-medium text-text-primary">Parsed Order</span>
          </div>
          <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded uppercase tracking-wider font-medium border border-accent/20">Auto-Extracted</span>
        </div>
        <div className="p-5 text-[13px]">
          <div className="space-y-5">
            <div>
              <span className="text-text-dim text-[10px] uppercase tracking-wider font-medium block mb-2">Line Items</span>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-elevated px-3 py-2.5 rounded-md border border-border/40">
                  <span className="text-text-primary font-medium">Variant A (Peti)</span>
                  <span className="text-text-secondary font-mono text-[12px]">x50</span>
                </div>
                <div className="flex justify-between items-center bg-elevated px-3 py-2.5 rounded-md border border-border/40">
                  <span className="text-text-primary font-medium">Variant B (Peti)</span>
                  <span className="text-text-secondary font-mono text-[12px]">x20</span>
                </div>
              </div>
            </div>
            <div>
               <span className="text-text-dim text-[10px] uppercase tracking-wider font-medium block mb-2">Detected Conditions</span>
               <div className="flex items-start gap-2.5 bg-yellow-500/10 text-yellow-500/90 border border-yellow-500/20 px-3 py-2.5 rounded-md text-[12px]">
                 <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                 <span className="leading-snug">Adjust ₹5,000 from previous balance</span>
               </div>
            </div>
            <div className="pt-2">
              <button className="w-full bg-accent text-void py-2.5 rounded-md font-medium text-[12px] hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(74,158,255,0.2)]">
                Generate Invoice & Workflow
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── UI FRAGMENT: Transitioning Fragmentation to Clarity ──────────────────────
function FragmentationUIFragment() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col justify-center gap-8 relative p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      
      {/* Fragmented state */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex gap-4 justify-center relative"
      >
        <div className="w-32 h-16 rounded border border-dashed border-border/60 bg-surface/30 flex items-center justify-center opacity-50 transform -rotate-6">
          <span className="text-[10px] text-text-dim uppercase tracking-wider">WhatsApp</span>
        </div>
        <div className="w-32 h-16 rounded border border-dashed border-border/60 bg-surface/30 flex items-center justify-center opacity-50 transform translate-y-4">
          <span className="text-[10px] text-text-dim uppercase tracking-wider">Spreadsheet</span>
        </div>
        <div className="w-32 h-16 rounded border border-dashed border-border/60 bg-surface/30 flex items-center justify-center opacity-50 transform rotate-6">
          <span className="text-[10px] text-text-dim uppercase tracking-wider">Memory</span>
        </div>
      </motion.div>

      {/* Funnel/Transition arrow */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 40, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="w-px bg-gradient-to-b from-transparent via-text-dim to-accent mx-auto"
      />

      {/* Structured state */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-sm rounded-lg border border-border bg-elevated shadow-lg p-4 relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <div>
            <div className="text-[12px] font-medium text-text-primary">Operational Record</div>
            <div className="text-[10px] text-text-muted">Structured & Auditable</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full bg-surface rounded-full" />
          <div className="h-2 w-3/4 bg-surface rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="w-full">

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO                                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void pt-32 pb-20"
      >
        {/* Extremely subtle top glow — barely visible */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-label-sm font-medium text-text-dim uppercase tracking-widest border border-border/40 px-3 py-1.5 rounded-full bg-surface/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              The Fables Lab
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-text-primary text-balance leading-[1.05]"
              style={{
                fontSize: "clamp(3rem, 7vw, 5.75rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Software designed for
              <br />
              <span className="text-text-muted font-light">operational clarity.</span>
            </motion.h1>
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-secondary text-body-lg font-normal max-w-2xl mb-12 leading-relaxed"
          >
            We build systems that reduce payment delays, structure workflows,
            and automate operational coordination.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#distributor-os"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-text-primary text-void font-medium text-[13px] rounded-lg transition-all duration-300 hover:bg-text-secondary active:scale-[0.98]"
            >
              Explore DistributorOS
            </Link>
            <Link
              href="#why-we-exist"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border/60 text-text-secondary font-medium text-[13px] rounded-lg transition-all duration-300 hover:border-border hover:text-text-primary active:scale-[0.98] bg-surface/20"
            >
              Why We Exist
            </Link>
          </motion.div>

          {/* Hero Visual */}
          <HeroUIFragment />

        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2 — WHY WE EXIST                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="why-we-exist" className="bg-surface/20 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left — Text */}
            <FadeUp>
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                01 / Why We Exist
              </span>
              <h2
                className="font-display font-medium text-text-primary text-balance mb-8"
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Businesses today are operationally fragmented.
              </h2>
              <div className="space-y-6 text-text-secondary text-body-md leading-relaxed">
                <p>
                  Communication is scattered. Workflows are disconnected. Critical execution depends on memory and manual coordination.
                </p>
                <p className="text-text-primary font-medium">
                  We believe operational software should reduce complexity — not add to it.
                </p>
              </div>
            </FadeUp>

            {/* Right — Visual */}
            <FadeUp delay={0.2} className="h-full">
              <FragmentationUIFragment />
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3 — PRINCIPLES                                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="principles" className="bg-void py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <FadeUp className="lg:col-span-5">
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                02 / Principles
              </span>
              <h2
                className="font-display font-medium text-text-primary"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.12,
                }}
              >
                Principles
              </h2>
            </FadeUp>

            <div className="lg:col-span-7">
              <div className="border-t border-border/40">
                {[
                  "Clarity over clutter.",
                  "Workflows over dashboards.",
                  "Calm systems over operational chaos.",
                  "Software should reduce cognitive overhead.",
                  "Infrastructure should feel invisible."
                ].map((p, i) => (
                  <FadeUp key={p} delay={i * 0.1}>
                    <div className="flex items-start sm:items-center gap-6 py-6 sm:py-8 border-b border-border/30 group">
                      <span className="font-mono text-[11px] text-text-dim w-6 shrink-0 pt-1 sm:pt-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className="font-display font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-500"
                        style={{
                          fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
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
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4 — DISTRIBUTOR OS (Anchor Product)                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="distributor-os" className="bg-surface/20 py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <FadeUp className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border/40">
              <div className="max-w-2xl">
                <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                  03 / In Development
                </span>
                <h2
                  className="font-display font-medium text-text-primary mb-4"
                  style={{
                    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  Fables DistributorOS
                </h2>
                <p className="text-text-secondary text-body-lg leading-relaxed">
                  This is the first major operational system we are building.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Visual Narrative */}
          <FadeUp delay={0.1} className="mb-20">
            <DistributorOSFragment />
          </FadeUp>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-4 h-4" />,
                title: "Invoice Workflows",
                desc: "Automated tracking from order to invoice to payment. Full visibility."
              },
              {
                icon: <Activity className="w-4 h-4" />,
                title: "Collections Systems",
                desc: "Structured follow-ups based on aging, priority, and retailer history."
              },
              {
                icon: <Layers className="w-4 h-4" />,
                title: "Retailer Coordination",
                desc: "All interactions, claims, and returns logged in a single structured record."
              }
            ].map((feat, i) => (
              <FadeUp key={feat.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border/40 bg-void">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-primary mb-5 border border-border/50">
                    {feat.icon}
                  </div>
                  <h3 className="text-[15px] font-medium text-text-primary mb-2 tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5 — CURRENT FOCUS                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="current-focus" className="bg-void py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <FadeUp className="lg:col-span-4">
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                04 / Focus Area
              </span>
              <h2
                className="font-display font-medium text-text-primary mb-6"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                Current Focus
              </h2>
              <p className="text-text-muted text-[14px] leading-relaxed">
                We are currently building systems focused on:
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/30 border border-border/30 rounded-xl overflow-hidden">
                {[
                  "Distributor operations",
                  "Collections workflows",
                  "WhatsApp-based operational coordination",
                  "Operational visibility"
                ].map((item, i) => (
                  <div key={i} className="bg-surface/50 p-6 flex items-start gap-3">
                    <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5 opacity-70" />
                    <span className="text-[14px] font-medium text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 6 — RESEARCH & INITIATIVES                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="initiatives" className="bg-surface/20 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          <FadeUp className="mb-16">
            <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
              05 / Explorations
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-10">
              <h2
                className="font-display font-medium text-text-primary"
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Research & Initiatives
              </h2>
              <p className="text-text-muted text-[13px] max-w-sm leading-relaxed pb-1">
                Active explorations and systems in development.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Workflow Structuring",
                desc: "Moving beyond forms into state-driven workflow systems."
              },
              {
                title: "Operational Memory",
                desc: "Persistent context layers that retain business knowledge over time."
              },
              {
                title: "Business Coordination Layers",
                desc: "Reducing noise by intercepting and structuring communication."
              },
              {
                title: "AI-Native Workflow Systems",
                desc: "Using LLMs not as chatbots, but as invisible routing and parsing infrastructure."
              }
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="p-8 h-full border border-border/30 bg-void rounded-xl hover:border-border/60 transition-colors">
                  <h3 className="font-medium text-text-primary text-[15px] mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
