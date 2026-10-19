import { type ReactNode } from "react";

const TONE = {
  acid: "text-primary-fixed border-primary-fixed/50",
  magenta: "text-secondary-container border-secondary-container/50",
  cyan: "text-tertiary-fixed-dim border-tertiary-fixed-dim/50",
  signal: "text-signal border-signal/50",
  muted: "text-outline border-outline-variant/50",
  solid: "bg-primary-fixed text-on-primary-fixed border-primary-fixed",
  dark: "text-on-surface border-outline-variant/50 bg-surface-container-lowest",
} as const;

export type ChipTone = keyof typeof TONE;

/**
 * Terminal-style chip — JetBrains Mono, uppercase, ASCII-prefixed,
 * wrapped in a 1px semantic border.
 */
export default function Chip({
  children,
  tone = "muted",
  className = "",
  dot = false,
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-label-mono-sm font-bold uppercase tracking-wider ${TONE[tone]} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />}
      {children}
    </span>
  );
}
