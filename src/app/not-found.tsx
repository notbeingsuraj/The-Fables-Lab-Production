import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 // Signal Lost",
  description: "The requested page is not in the archive.",
  robots: { index: false },
};

const SUGGESTIONS = [
  { label: "WORK ARCHIVE", href: "/projects", tag: "CASE FILES" },
  { label: "CAPABILITIES", href: "/services", tag: "THREE ENGINES" },
  { label: "CONTACT", href: "/contact", tag: "DISPATCH" },
] as const;

/** 404 — terminal-style signal loss. */
export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-space-md py-space-2xl text-center">
      <div className="w-full max-w-3xl border border-outline-variant/40 bg-surface-container-low p-space-xl text-left shadow-magenta corner-ticks text-secondary-container">
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm font-mono text-label-mono-sm font-bold uppercase tracking-widest">
          <span className="text-secondary">&gt; KERNEL_ROUTE :: EXCEPTION</span>
          <span className="text-outline-variant">ERR_CODE: 0x404_NOT_FOUND</span>
        </div>

        <p className="font-display text-[96px] leading-none tracking-tighter text-primary sm:text-[160px]">
          404
        </p>
        <h1 className="mt-space-md font-display text-headline-lg uppercase tracking-tight text-primary-fixed">
          SIGNAL LOST // ENTITY NOT FOUND
        </h1>
        <p className="mt-space-md max-w-xl text-body-md leading-relaxed text-on-surface-variant">
          The route you requested does not exist in this timeline. The archive
          may have been declassified, the codename mistyped, or the node simply
          never built it.
        </p>

        <div className="mt-space-lg space-y-space-xs font-mono text-label-mono-sm uppercase text-outline">
          <p>&gt; TRACE: requested path → no matching route handler</p>
          <p>&gt; RECOVERY: select a known channel below</p>
          <p className="animate-blink text-primary-fixed">&gt; READY_</p>
        </div>
      </div>

      <div className="mt-space-xl grid w-full max-w-3xl grid-cols-1 gap-space-sm sm:grid-cols-3">
        {SUGGESTIONS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group border border-outline-variant/40 bg-surface-container p-space-md text-left transition-all hover:border-primary-fixed hover:shadow-acid-sm"
          >
            <span className="block font-mono text-label-mono-sm uppercase tracking-widest text-outline">
              &gt;&gt; {item.tag}
            </span>
            <span className="mt-1 block text-headline-sm uppercase tracking-wide text-primary transition-colors group-hover:text-primary-fixed">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-space-md font-mono text-label-mono-sm uppercase tracking-widest text-tertiary-fixed-dim hover:underline"
      >
        {"<- RETURN TO GATEWAY"}
      </Link>
    </div>
  );
}
