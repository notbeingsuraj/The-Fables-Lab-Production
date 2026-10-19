"use client";

import { useEffect } from "react";

/**
 * Route error boundary — rendered when a page segment throws during render or
 * data fetch (e.g. the database is unreachable).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[fables-lab] route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-space-md pb-space-2xl pt-28 text-center">
      <div className="w-full max-w-3xl border border-error/40 bg-surface-container-low p-space-xl text-left shadow-[4px_4px_0px_0px_#ffb4ab]">
        <div className="mb-space-lg flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/40 pb-space-sm font-mono text-label-mono-sm font-bold uppercase tracking-widest">
          <span className="text-error">&gt; RUNTIME_FAULT :: UNHANDLED</span>
          <span className="text-outline-variant">
            ERR_CODE: 0x5XX_SYS{error.digest ? `_${error.digest.slice(0, 6)}` : ""}
          </span>
        </div>

        <p className="font-display text-[72px] leading-none tracking-tighter text-primary sm:text-[120px]">
          500
        </p>
        <h1 className="mt-space-md font-display text-headline-lg uppercase tracking-tight text-error">
          KERNEL PANIC // PIPELINE INTERRUPTED
        </h1>
        <p className="mt-space-md max-w-xl text-body-md leading-relaxed text-on-surface-variant">
          A subsystem stopped responding mid-render. The lab has logged the
          fault — retry the request, and if it persists the incident will need a
          human operator.
        </p>

        <div className="mt-space-lg space-y-space-xs font-mono text-label-mono-sm uppercase text-outline">
          <p>&gt; FAULT: {error.message?.slice(0, 120) || "unknown exception"}</p>
          <p>&gt; CONTAINMENT: isolated to this route segment</p>
          <p className="animate-blink text-error">&gt; AWAITING_OPERATOR_</p>
        </div>

        <div className="mt-space-lg flex flex-wrap gap-space-sm">
          <button
            type="button"
            onClick={reset}
            className="bg-primary-container px-space-lg py-space-md text-headline-sm uppercase font-bold tracking-widest text-on-primary-container shadow-cyan transition-all hover:bg-secondary-container hover:text-on-secondary"
          >
            [ RETRY REQUEST ↻ ]
          </button>
          <a
            href="/"
            className="border border-outline-variant/50 px-space-lg py-space-md font-mono text-label-mono-md uppercase tracking-wider text-on-surface transition-colors hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
          >
            [ RETURN TO GATEWAY ]
          </a>
        </div>
      </div>
    </div>
  );
}
