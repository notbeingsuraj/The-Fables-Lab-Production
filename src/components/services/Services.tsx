"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.12em] text-on-surface-muted">
            Services
          </p>
          <h2 className="text-headline-xl text-on-surface text-balance">
            Six capabilities, one connected approach
          </h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
            Strategy, design, engineering, and growth treated as connected parts of one process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service) => {
            const tintMap: Record<string, string> = {
              "full-stack": "bg-surface-tint-blue",
              ai: "bg-surface-tint-violet",
              marketing: "bg-surface-tint-amber",
              design: "bg-surface-tint-coral",
              community: "bg-surface-tint-teal",
              content: "bg-surface-tint-blue",
            };
            const tint = tintMap[service.id] ?? "bg-surface-tint-blue";
            return (
            <article
              key={service.id}
              className={`group relative flex flex-col rounded-2xl border border-outline-variant p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg lg:p-10 ${tint}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-muted">{service.number}</span>
                <span className="text-sm text-on-surface-muted">{service.title}</span>
              </div>
              <h3 className="mt-6 text-headline-sm text-on-surface text-balance">
                {service.positioning}
              </h3>
              <p className="mt-4 max-w-[560px] text-body-md text-on-surface-variant text-pretty">
                {service.description}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.capabilities.slice(0, 6).map((cap) => (
                  <div key={cap} className="flex items-start gap-2 text-sm text-on-surface-variant">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-on-surface-muted/60" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-on-surface transition-colors hover:text-on-surface-variant"
                >
                  Discuss this service
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
