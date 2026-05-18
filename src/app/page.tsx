"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle,
  Activity,
  Layers,
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

// ─── UI FRAGMENT: Operational Storytelling Hero Flow ──────────────────────────
function HeroSignatureFlowFragment() {
  // WhatsApp → Clarity: 5-step vertical pipeline
  const steps = [
    {
      tag: "Input",
      label: "WhatsApp Message",
      detail: '"bhai 5 red aur 2 blue bhej do"',
      mono: "Ravi Sharma · 10:42 AM",
      color: "emerald",
    },
    {
      tag: "Parse",
      label: "AI Extraction",
      detail: "Intent: Order  ·  Items: 2  ·  Risk: None",
      mono: "Confidence 98%",
      color: "accent",
    },
    {
      tag: "Create",
      label: "Invoice Generated",
      detail: "INV-24-0914 · ₹17,500 · Due Oct 25",
      mono: "Auto-logged",
      color: "text",
    },
    {
      tag: "Track",
      label: "Collections Workflow",
      detail: "Reminder scheduled · Aging counter active",
      mono: "Day 0 of 14",
      color: "yellow",
    },
    {
      tag: "Resolve",
      label: "Payment Received",
      detail: "₹17,500 cleared · Workflow closed",
      mono: "Oct 23, 3:18 PM",
      color: "emerald",
    },
  ];
  return (
    <div className="w-full mt-16 rounded-2xl border border-border/40 bg-surface/20 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-void/60">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-mono text-text-dim uppercase tracking-widest">DistributorOS — Order to Collection Pipeline</span>
        </div>
        <span className="text-[10px] font-mono text-text-dim">Live Trace · INV-24-0914</span>
      </div>
      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/30">
        {steps.map((step, i) => (
          <motion.div
            key={step.tag}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 flex flex-col gap-3 relative"
          >
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono font-medium uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                step.color === 'emerald' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' :
                step.color === 'accent'  ? 'text-accent border-accent/20 bg-accent/10' :
                step.color === 'yellow'  ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' :
                'text-text-muted border-border/50 bg-surface'
              }`}>{step.tag}</span>
              <span className="text-[9px] font-mono text-text-dim">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="text-[13px] font-medium text-text-primary tracking-tight leading-snug">{step.label}</p>
            <p className="text-[11.5px] text-text-muted leading-relaxed">{step.detail}</p>
            <p className="text-[10px] font-mono text-text-dim mt-auto">{step.mono}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── UI FRAGMENT: Chaos → Clarity ───────────────────────────────────────────

function ChaosToClarityFragment() {
  return (
    <div className="w-full flex flex-col gap-5 relative">
      {/* Chaos state */}
      <div className="rounded-xl border border-dashed border-border/50 bg-surface/20 p-5">
        <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-4">Before — Fragmented</p>
        <div className="space-y-3">
          {[
            { src: "WhatsApp", msg: "Ravi: bhaiya 50 peti bhejo, 5k adjust kar dena", time: "10:42" },
            { src: "WhatsApp", msg: "Sharma: invoice nahi mila abhi tak", time: "11:15" },
            { src: "Memory", msg: "[Note to self] Global Traders overdue 2 weeks", time: "—" },
          ].map((row, i) => (
            <div key={i} className="flex items-start gap-3 opacity-60">
              <span className={`text-[10px] font-mono mt-0.5 shrink-0 w-16 ${row.src === 'Memory' ? 'text-yellow-600' : 'text-text-dim'}`}>{row.src}</span>
              <span className="text-[12px] text-text-muted italic leading-snug">{row.msg}</span>
              <span className="text-[10px] font-mono text-text-dim ml-auto shrink-0">{row.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Funnel */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 40, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="w-px bg-gradient-to-b from-border/60 to-accent/60 mx-auto"
      />

      {/* Clarity state */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="rounded-xl border border-border/60 bg-void shadow-xl overflow-hidden"
      >
        <div className="px-5 py-3.5 border-b border-border/40 flex items-center justify-between">
          <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest">After — Structured</p>
          <span className="text-[10px] font-mono text-accent border border-accent/20 bg-accent/10 px-2 py-0.5 rounded">Workflow Active</span>
        </div>
        <div className="p-5 space-y-3 text-[12.5px]">
          {[
            { label: "Retailer", val: "Apex Enterprises" },
            { label: "Order", val: "50× Variant A" },
            { label: "Adjustment", val: "-₹5,000 (prev. balance)" },
            { label: "Net Payable", val: "₹40,000" },
            { label: "Due Date", val: "Oct 19 — 7 days" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center border-b border-border/20 pb-2.5 last:border-0 last:pb-0">
              <span className="text-text-dim">{row.label}</span>
              <span className="text-text-primary font-medium font-mono">{row.val}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}



// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="w-full selection:bg-accent/20 selection:text-text-primary">

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO                                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void pt-32 pb-20"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(74,158,255,0.06),transparent_60%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-mono font-medium text-text-dim uppercase tracking-widest border border-border/40 px-3 py-1.5 rounded-full bg-surface/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
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
            and automate operational coordination for modern businesses.
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

          {/* Signature Product Flow Visual */}
          <FadeUp delay={0.2} className="mt-8">
             <HeroSignatureFlowFragment />
          </FadeUp>

        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 2 — WHY WE EXIST                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="why-we-exist" className="bg-surface/10 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left — Text */}
            <FadeUp>
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                01 / The Problem
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
                  Communication happens in WhatsApp threads. Invoices live in spreadsheets. Critical execution—following up on payments, tracking orders—depends entirely on human memory and manual coordination.
                </p>
                <p>
                  When someone is unavailable, the workflow breaks. The coordination overhead grows faster than the business.
                </p>
                <p className="text-text-primary font-medium">
                  We believe operational software should reduce complexity — not add to it.
                </p>
              </div>
            </FadeUp>

            {/* Right — Visual */}
            <FadeUp delay={0.2} className="h-full">
              <ChaosToClarityFragment />
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 3 — DISTRIBUTOR OS (Anchor Product)                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="distributor-os" className="bg-void py-24 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <FadeUp className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-border/40">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[11px] font-mono text-accent uppercase tracking-widest border border-accent/20 bg-accent/10 px-2.5 py-1 rounded">
                    In Development
                  </span>
                  <span className="text-[11px] font-mono text-text-dim uppercase tracking-widest border border-border/30 px-2.5 py-1 rounded">
                    First System
                  </span>
                </div>
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
                <p className="text-text-secondary text-body-lg leading-relaxed mb-6">
                  The operational backbone for distribution businesses running on credit and relationships. End-to-end workflow from WhatsApp order to cleared payment.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Order Parsing", "Invoice Workflow", "Collections Aging", "Retailer State"].map((t) => (
                    <span key={t} className="text-[11px] font-mono text-text-dim border border-border/40 px-2.5 py-1 rounded bg-surface/30">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Full pipeline table */}
          <FadeUp delay={0.1} className="mb-16">
            <div className="rounded-xl border border-border/50 bg-surface/20 overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between bg-void/60">
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-text-primary" />
                  <span className="text-[13px] font-medium text-text-primary tracking-tight">Invoice Pipeline — Live State</span>
                </div>
                <span className="text-[10px] font-mono text-text-dim">Updated Oct 18, 2024</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-border/40 text-text-dim text-[10.5px] uppercase tracking-wider">
                      <th className="px-5 py-3.5 font-medium">Retailer</th>
                      <th className="px-5 py-3.5 font-medium">Invoice ID</th>
                      <th className="px-5 py-3.5 font-medium text-right">Amount</th>
                      <th className="px-5 py-3.5 font-medium">Stage</th>
                      <th className="px-5 py-3.5 font-medium">Aging</th>
                      <th className="px-5 py-3.5 font-medium">Next Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12.5px]">
                    {[
                      { name: "Global Traders",    id: "INV-24-0871", amt: "₹2,14,000", stage: "Escalated",     aging: "45d", next: "Legal notice",    type: "critical" },
                      { name: "Sharma Provisions", id: "INV-24-0885", amt: "₹45,200",  stage: "Reminder Sent", aging: "14d", next: "2nd reminder",   type: "warning"  },
                      { name: "Apex Enterprises",  id: "INV-24-0892", amt: "₹40,000",  stage: "Generated",     aging: "6d",  next: "Await payment", type: "normal"   },
                      { name: "New India Stores",  id: "INV-24-0896", amt: "₹18,500",  stage: "Paid",          aging: "—",   next: "Archived",      type: "paid"     },
                    ].map((row, i) => (
                      <motion.tr
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        viewport={{ once: true }}
                        key={row.id}
                        className="border-b border-border/20 last:border-0 hover:bg-border/10 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-text-primary">{row.name}</td>
                        <td className="px-5 py-4 font-mono text-text-muted text-[11px]">{row.id}</td>
                        <td className="px-5 py-4 text-right font-mono text-text-primary tabular-nums">{row.amt}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${
                            row.type === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            row.type === 'warning'  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                            row.type === 'paid'     ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            'bg-surface text-text-muted border-border/50'
                          }`}>
                            {row.type === 'critical' ? <AlertCircle className="w-2.5 h-2.5" /> :
                             row.type === 'paid'     ? <CheckCircle2 className="w-2.5 h-2.5" /> :
                             <Clock className="w-2.5 h-2.5" />}
                            {row.stage}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-text-muted text-[11px]">{row.aging}</td>
                        <td className="px-5 py-4 text-text-muted text-[12px]">{row.next}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <FileText className="w-4 h-4" />, title: "Invoice Workflows",      desc: "Order parsing → invoice creation → payment clearing. Full end-to-end visibility." },
              { icon: <Activity className="w-4 h-4" />, title: "Collections Systems",    desc: "Structured follow-ups based on aging, payment priority, and retailer risk history." },
              { icon: <Layers className="w-4 h-4" />,   title: "Retailer Coordination",  desc: "All interactions, claims, and returns logged into a single auditable record." },
            ].map((feat, i) => (
              <FadeUp key={feat.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl border border-border/40 bg-surface/10 hover:bg-surface/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center text-text-primary mb-5 border border-border/50">
                    {feat.icon}
                  </div>
                  <h3 className="text-[14.5px] font-medium text-text-primary mb-2 tracking-tight">{feat.title}</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">{feat.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 4 — CURRENT FOCUS                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="current-focus" className="bg-surface/10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <FadeUp className="lg:col-span-5">
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                03 / Focus Area
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
              <p className="text-text-muted text-[14px] leading-relaxed mb-8">
                We are actively building the infrastructure required to solve the hardest coordination problems in distribution.
              </p>
              
              <div className="space-y-3">
                {[
                  "Distributor & Wholesale Operations",
                  "Automated Collections Workflows",
                  "WhatsApp-based Operational Parsing",
                  "Unified Operational Visibility"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="text-[13px] font-medium text-text-secondary tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="lg:col-span-7">
               {/* UI Fragment: Layered interface composition */}
               <div className="relative w-full h-[360px] bg-void border border-border/40 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-6">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
                 
                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8 }}
                   viewport={{ once: true }}
                   className="absolute top-8 left-8 w-[240px] rounded-lg border border-border/60 bg-elevated p-4 shadow-xl z-10"
                 >
                    <div className="text-[10px] text-text-dim uppercase tracking-wider mb-3 font-medium">WhatsApp Sync</div>
                    <div className="h-1.5 w-full bg-surface rounded-full mb-2" />
                    <div className="h-1.5 w-3/4 bg-surface rounded-full" />
                 </motion.div>

                 <motion.div 
                   initial={{ y: 20, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8, delay: 0.2 }}
                   viewport={{ once: true }}
                   className="absolute top-20 left-24 w-[280px] rounded-lg border border-accent/20 bg-void/90 p-4 shadow-2xl z-20 backdrop-blur-md"
                 >
                    <div className="text-[10px] text-accent uppercase tracking-wider mb-3 font-medium flex justify-between">
                      <span>Workflow Engine</span>
                      <span className="font-mono text-accent/70">Running</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-surface px-2 py-1.5 rounded text-[11px] text-text-secondary border border-border/50">
                        <span>Invoice Creation</span>
                        <CheckCircle2 className="w-3 h-3 text-text-dim" />
                      </div>
                      <div className="flex justify-between items-center bg-accent/10 px-2 py-1.5 rounded text-[11px] text-text-primary border border-accent/20">
                        <span>Aging Evaluation</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      </div>
                    </div>
                 </motion.div>
               </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* SECTION 5 — PRINCIPLES                                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="principles" className="bg-void py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <FadeUp className="lg:col-span-5">
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-6">
                04 / Principles
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
                        className="font-display font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-500 tracking-tight"
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
      {/* SECTION 6 — RESEARCH & INITIATIVES                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="initiatives" className="bg-surface/10 py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

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
                desc: "Moving beyond forms into state-driven workflow systems. Treating operations as a series of inevitable transitions."
              },
              {
                title: "Operational Memory",
                desc: "Persistent context layers that retain business knowledge over time, reducing reliance on individual recall."
              },
              {
                title: "Business Coordination Layers",
                desc: "Reducing noise by intercepting and structuring communication before it reaches the human operator."
              },
              {
                title: "AI-Native Workflow Systems",
                desc: "Using LLMs not as conversational chatbots, but as invisible routing, parsing, and execution infrastructure."
              }
            ].map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.1}>
                <div className="p-8 h-full border border-border/40 bg-void rounded-xl hover:border-border/70 transition-colors shadow-sm">
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

      <Rule />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CLOSING — GET IN TOUCH                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section id="contact-cta" className="bg-void py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="block text-[11px] font-mono text-text-dim uppercase tracking-widest mb-8">
                Get in Touch
              </span>
              <h2
                className="font-display font-medium text-text-primary mb-6 text-balance"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
              >
                If you run a distribution business and this resonates — we&rsquo;d like to hear from you.
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="text-text-muted text-[14px] leading-relaxed mb-10 max-w-lg">
                We are early-stage and selective. We talk to businesses where operational friction is a real, daily problem — not a talking point.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border/60 text-text-secondary font-medium text-[13px] rounded-lg transition-all duration-300 hover:border-border hover:text-text-primary active:scale-[0.98]"
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
