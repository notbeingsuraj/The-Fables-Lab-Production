"use client";

import Link from "next/link";

export default function ProjectInquiry() {
  return (
    <section id="inquiry" className="section-padding">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-outline-variant p-10 lg:flex-row lg:items-center lg:p-12">
          <div>
            <p className="text-sm text-on-surface-muted">Have something worth building?</p>
            <h3 className="mt-2 text-headline-sm text-on-surface text-balance">
              Let&apos;s turn the idea into a thoughtful, well-executed digital product.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-on-surface px-7 py-2.5 text-sm text-background transition-opacity duration-300 hover:opacity-90"
            >
              Start a conversation
            </Link>
            <a
              href="mailto:hello@thefableslab.com"
              className="inline-flex items-center justify-center rounded-full px-2 py-2.5 text-sm text-on-surface-variant transition-colors duration-300 hover:text-on-surface"
            >
              hello@thefableslab.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
