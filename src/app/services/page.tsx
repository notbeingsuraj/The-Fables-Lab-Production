import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — The Fables Lab",
  description: "Product engineering, AI solutions, and digital experiences built for business outcomes.",
};

const services = [
  { title: "Product Engineering", desc: "Full-stack web/mobile apps, design systems, APIs, and scalable infrastructure." },
  { title: "AI Solutions", desc: "Intelligent workflows, RAG systems, agentic automations, and data pipelines." },
  { title: "Digital Experiences", desc: "High-converting websites, interactive experiences, and polished UI/UX." },
  { title: "Business Automation", desc: "Streamline operations with custom tools, integrations, and internal platforms." },
];

export default function ServicesPage() {
  return (
    <div className="w-full pt-16 bg-background">
      <section className="w-full bg-canvas-white py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-space-md">
            <span className="font-caption-strong text-caption-strong text-action-blue-base uppercase tracking-wider">Capabilities</span>
            <h1 className="font-display-lg text-display-lg text-ink-primary tracking-tight">Three engines. One outcome.</h1>
            <p className="font-body-large text-body-large text-ink-secondary">
              Strategy, design, and engineering combined to ship products that move businesses forward.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {services.map((service) => (
            <div key={service.title} className="bg-canvas-white rounded-2xl p-space-lg space-y-space-sm">
              <h3 className="font-body-strong text-body-strong text-ink-primary">{service.title}</h3>
              <p className="font-caption text-caption text-ink-secondary">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-tile-dark text-ink-inverse py-space-section px-margin-mobile lg:px-margin">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-space-md">
            <h2 className="font-hero-display text-hero-display text-ink-inverse tracking-tight">Ready to build?</h2>
            <p className="font-lead text-lead text-ink-muted">
              Let&apos;s talk about your goals and how we can help.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-lg">
              <Link href="/contact" className="inline-flex items-center justify-center bg-primary-container hover:bg-action-blue-base text-on-primary font-body-strong text-body-strong px-space-2xl py-space-md rounded-full shadow-lg active:scale-95 transition-all">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
