"use client";

import Link from "next/link";
import { SERVICES, type Service } from "@/lib/services";

interface ServiceBandProps {
  service: Service;
  isOdd: boolean;
}

function ServiceVisual({ service }: { service: Service }) {
  // CSS-drawn geometric visuals that relate to each service
  return (
    <div className="relative w-full h-[240px] lg:h-[320px] flex items-center justify-center">
      {service.id === "full-stack" && (
        <>
          <div className="absolute inset-0 border border-outline-variant/30 rounded-lg" />
          <div className="absolute inset-[15%] border border-outline-variant/40 rounded-lg" />
          <div className="absolute inset-[30%] border border-bronze/40 rounded-lg" />
          <div className="absolute bottom-[20%] left-[20%] w-[60%] h-[1px] bg-bronze/30" />
          <div className="absolute top-[20%] right-[20%] w-[1px] h-[60%] bg-bronze/30" />
        </>
      )}
      {service.id === "ai" && (
        <>
          <div className="absolute inset-0 border border-outline-variant/30 rounded-full" />
          <div className="absolute inset-[25%] border border-outline-variant/40 rounded-full" />
          <div className="absolute inset-[50%] border border-bronze/40 rounded-full w-8 h-8" />
          <div
            className="absolute top-[30%] left-[30%] w-[2px] h-[40%] bg-bronze/30 rotate-[45deg]"
          />
          <div
            className="absolute top-[30%] right-[30%] w-[2px] h-[40%] bg-bronze/30 rotate-[-45deg]"
          />
          <div
            className="absolute bottom-[30%] left-[30%] w-[2px] h-[40%] bg-bronze/30 rotate-[-45deg]"
          />
          <div
            className="absolute bottom-[30%] right-[30%] w-[2px] h-[40%] bg-bronze/30 rotate-[45deg]"
          />
        </>
      )}
      {service.id === "marketing" && (
        <>
          <div className="absolute inset-0 border border-outline-variant/30 rounded-full" />
          <div className="absolute inset-[20%] border border-outline-variant/40 rounded-full" />
          <div className="absolute inset-[40%] border border-bronze/40 rounded-full" />
          <div className="absolute inset-[60%] border border-outline-variant/40 rounded-full" />
          <div className="absolute inset-[80%] border border-outline-variant/30 rounded-full" />
        </>
      )}
      {service.id === "design" && (
        <>
          <div className="absolute inset-0 border border-outline-variant/30 rounded-lg" />
          <div className="absolute inset-[10%] border-b border-outline-variant/40" />
          <div className="absolute inset-[10%] border-r border-outline-variant/40" />
          <div className="absolute inset-[25%] border border-bronze/40 rounded-lg" />
          <div className="absolute inset-[40%] border border-outline-variant/30 rounded-lg" />
          <div className="absolute inset-[55%] border-b border-outline-variant/40" />
        </>
      )}
      {service.id === "community" && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute rounded-full bg-bronze/10"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 12}%`,
                width: `${12 - i * 1.5}%`,
                height: `${12 - i * 1.5}%`,
              }}
            />
          ))}
          <div className="absolute inset-0 border border-outline-variant/30 rounded-full" />
          <div className="absolute inset-[50%] w-1 h-1 bg-bronze/30 rounded-full" />
        </>
      )}
      {service.id === "content" && (
        <>
          <div className="absolute inset-0 border border-outline-variant/30 rounded-lg" />
          <div className="absolute top-[10%] left-[10%] w-[80%] h-[1px] bg-outline-variant/40" />
          <div className="absolute top-[30%] left-[10%] w-[70%] h-[1px] bg-outline-variant/40" />
          <div className="absolute top-[50%] left-[10%] w-[60%] h-[1px] bg-outline-variant/40" />
          <div className="absolute top-[70%] left-[10%] w-[50%] h-[1px] bg-outline-variant/40" />
          <div className="absolute top-[85%] left-[10%] w-[40%] h-[1px] bg-bronze/40" />
          <div className="absolute bottom-[5%] right-[5%] w-[1px] h-[30%] bg-bronze/30" />
        </>
      )}
    </div>
  );
}

function ServiceBand({ service, isOdd }: ServiceBandProps) {
  return (
    <div
      key={service.id}
      className="group relative border-t border-outline-variant/20 bg-background py-16 lg:py-24 first:border-t-0"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 items-start">
          {/* Visual side */}
          <div
            className={`${
              isOdd ? "lg:col-start-1 lg:col-span-5" : "lg:col-start-8 lg:col-span-5"
            }`}
          >
            <div className="relative h-[260px] lg:h-[340px]">
              <ServiceVisual service={service} />
            </div>
          </div>

          {/* Content side */}
          <div
            className={`${
              isOdd ? "lg:col-start-7 lg:col-span-6" : "lg:col-start-1 lg:col-span-6"
            } flex flex-col justify-center`}
          >
            <span className="inline-block mb-6 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
              {service.number}
            </span>
            <h3
              className="mb-6 font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.05] tracking-tight text-on-surface text-balance"
            >
              {service.positioning}
            </h3>
            <p className="mb-10 text-sm lg:text-base text-on-surface-variant leading-relaxed max-w-[560px]">
              {service.description}
            </p>

            <div className="mb-10">
              <span className="mb-3 block text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-muted">
                Capabilities
              </span>
              <ul className="space-y-2">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-1 h-1 rounded-full bg-bronze/40" />
                    <span className="text-xs text-on-surface-variant leading-relaxed">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-bronze bg-bronze text-[10px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="w-full bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="text-center lg:text-left lg:max-w-[640px] lg:mx-auto mb-24 lg:mb-32">
          <span className="inline-block mb-8 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
            Core Offerings
          </span>
          <h2
            className="mb-10 font-display text-[clamp(2.5rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-on-surface text-balance"
          >
            Six ways we can build with you
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-[560px]">
            Every service is a complete offering with its own deliverables,
            not a menu line item. Select one, or combine several into a
            connected program.
          </p>
        </div>

        <div className="space-y-0">
          {SERVICES.map((service, idx) => (
            <ServiceBand key={service.id} service={service} isOdd={idx % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
