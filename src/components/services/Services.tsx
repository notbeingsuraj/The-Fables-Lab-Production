"use client";

import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";

const TONE_ACCENT: Record<Service["visualTone"], string> = {
  bronze: "text-bronze",
  graphite: "text-on-surface-variant",
  warm: "text-on-surface-variant",
};

export default function Services() {
  return (
    <section
      id="services"
      className="w-full bg-background py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
            Core Offerings
          </span>
          <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
            Six ways we can build with you
          </h2>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Every service is a complete offering with its own deliverables,
            not a menu line item. Select one, or combine several into a
            connected program.
          </p>
        </div>

        <div className="space-y-16 lg:space-y-24">
          {SERVICES.map((service, idx) => {
            const isOdd = idx % 2 === 0;
            return (
              <div
                key={service.id}
                className="group relative border border-outline-variant/20 bg-surface rounded-xl overflow-hidden"
              >
                <div
                  className={`absolute inset-0 z-0 flex items-center justify-center ${
                    isOdd ? "left-[60%] top-0 w-[40%] h-full" : "right-[60%] top-0 w-[40%] h-full"
                  } lg:relative lg:static lg:w-full lg:h-auto lg:grid lg:place-items-center lg:px-8`}
                >
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      service.visualTone === "bronze"
                        ? "bg-bronze/5"
                        : service.visualTone === "graphite"
                          ? "bg-surface-bright/40"
                          : "bg-outline-variant/10"
                    }`}
                  >
                    <div
                      className="relative w-32 h-32 lg:w-48 lg:h-48"
                      aria-hidden="true"
                    >
                      <div
                        className={`absolute inset-0 border-2 ${
                          service.visualTone === "bronze"
                            ? "border-bronze"
                            : "border-outline-variant/40"
                        } rounded-lg rotate-[12deg] group-hover:rotate-[16deg] transition-transform duration-700`}
                      />
                      <div
                        className={`absolute inset-1 border border-${
                          service.visualTone === "bronze"
                            ? "bronze/25"
                            : "outline-variant/30"
                        } rounded-sm -rotate-[8deg] group-hover:-rotate-[4deg] transition-transform duration-700`}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`relative z-10 ${
                    isOdd
                      ? "lg:pl-12 lg:pr-[40%] lg:col-start-1"
                      : "lg:pr-12 lg:pl-[40%] lg:col-start-2"
                  } px-6 py-10 lg:px-10 lg:py-14`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className={`flex shrink-0 h-9 w-9 items-center justify-center rounded-sm border border-bronze bg-bronze text-[11px] font-mono font-bold uppercase text-surface ${TONE_ACCENT[service.visualTone]}`}
                    >
                      {service.number}
                    </span>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${TONE_ACCENT[service.visualTone]}`}>
                      {service.title}
                    </span>
                  </div>

                  <h3 className="mb-4 font-display text-xl lg:text-2xl leading-[1.15] tracking-tight text-on-surface">
                    {service.positioning}
                  </h3>

                  <p className="mb-6 text-sm lg:text-base text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <span className="mb-2 block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
                      Deliverables
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.deliverables.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-xs text-on-surface-variant"
                        >
                          <span className="w-1 h-1 rounded-full bg-bronze/50" />
                          {d.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze hover:underline transition-colors"
                  >
                    Inquire about {service.inquiryLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
