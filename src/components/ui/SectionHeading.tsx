import { type ReactNode } from "react";

/**
 * Asymmetric section header — index tag, Anton display title, and an optional
 * right-aligned telemetry readout.
 */
export default function SectionHeading({
  index,
  title,
  eyebrow,
  right,
  tone = "acid",
  className = "",
}: {
  /** e.g. "03 / 06" — rendered inside the index chip. */
  index?: string;
  title: ReactNode;
  /** Small mono line above the index chip. */
  eyebrow?: string;
  right?: ReactNode;
  tone?: "acid" | "magenta" | "cyan";
  className?: string;
}) {
  const chip =
    tone === "magenta"
      ? "bg-secondary-container text-on-secondary"
      : tone === "cyan"
        ? "bg-tertiary-fixed-dim text-on-tertiary-fixed"
        : "bg-primary-fixed text-on-primary-fixed";

  return (
    <div
      className={`mb-space-xl flex flex-wrap items-end justify-between gap-space-md ${className}`}
    >
      <div>
        {eyebrow && (
          <span className="mb-space-xs block font-mono text-label-mono-sm font-bold uppercase tracking-widest text-primary-fixed">
            {eyebrow}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-space-sm">
          {index && (
            <span
              className={`px-space-sm py-1 font-mono text-label-mono-sm font-bold uppercase tracking-widest shadow-cyan-sm ${chip}`}
            >
              {index}
            </span>
          )}
          <h2 className="font-display text-headline-lg uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>
      </div>
      {right && (
        <div className="flex items-center gap-space-sm font-mono text-label-mono-sm uppercase tracking-wider text-on-surface-variant">
          {right}
        </div>
      )}
    </div>
  );
}
