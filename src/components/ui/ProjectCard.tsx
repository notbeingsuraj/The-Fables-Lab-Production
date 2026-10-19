"use client";

import Link from "next/link";
import { useSynth } from "@/components/providers/SynthProvider";

/** Project accent tones mapped from the DB `color` enum to design tokens. */
export const PROJECT_TONES: Record<
  string,
  { text: string; border: string; shadow: string; chip: string }
> = {
  "neon-cyan": { text: "text-tertiary-fixed-dim", border: "hover:border-tertiary-fixed-dim", shadow: "hover:shadow-cyan", chip: "bg-tertiary-fixed-dim" },
  "cyber-yellow": { text: "text-primary-fixed", border: "hover:border-primary-fixed", shadow: "hover:shadow-acid", chip: "bg-primary-fixed" },
  "hot-pink": { text: "text-secondary-container", border: "hover:border-secondary-container", shadow: "hover:shadow-magenta", chip: "bg-secondary-container" },
  "neon-green": { text: "text-primary-fixed", border: "hover:border-primary-fixed", shadow: "hover:shadow-acid", chip: "bg-primary-fixed" },
  "electric-blue": { text: "text-tertiary-fixed", border: "hover:border-tertiary-fixed", shadow: "hover:shadow-cyan", chip: "bg-tertiary-fixed" },
  "neon-purple": { text: "text-ultraviolet", border: "hover:border-ultraviolet", shadow: "hover:shadow-[4px_4px_0px_0px_#8b5cff]", chip: "bg-ultraviolet" },
  cobalt: { text: "text-tertiary-fixed-dim", border: "hover:border-tertiary-fixed-dim", shadow: "hover:shadow-cyan", chip: "bg-tertiary-fixed-dim" },
};

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

/** Archive card — faux-hardware window with hard offset displacement. */
export default function ProjectCard({
  id,
  name,
  description,
  image,
  tags,
  color,
}: ProjectCardProps) {
  const tone = PROJECT_TONES[color] ?? PROJECT_TONES["neon-cyan"];
  const { play } = useSynth();

  return (
    <Link href={`/projects/${id}`} className="block h-full" onClick={() => play(540, 0.05)}>
      <div
        className={`group relative flex h-full flex-col border border-outline-variant/40 bg-surface-container-low transition-all duration-300 ${tone.border} ${tone.shadow}`}
      >
        {/* Header rail */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 px-space-sm py-2">
          <span className="flex items-center gap-2 font-mono text-label-mono-sm uppercase tracking-widest text-outline">
            <span className={`inline-block h-1.5 w-1.5 ${tone.chip}`} />
            REF // {id.toUpperCase().slice(0, 18)}
          </span>
          <span className="font-mono text-label-mono-sm uppercase tracking-wider text-primary-fixed opacity-0 transition-opacity group-hover:opacity-100">
            OPEN ↗
          </span>
        </div>

        {/* Visual */}
        <div className="relative h-48 w-full overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote DB assets, host-agnostic
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
          ) : (
            <div
              aria-hidden
              className="h-full w-full bg-[repeating-linear-gradient(45deg,#1a1b20_0_10px,#12141a_10px_20px)]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-space-md">
          <h3 className={`font-display text-headline-sm uppercase tracking-wide text-primary transition-colors ${tone.text}`}>
            {name}
          </h3>
          <p className="mt-space-sm flex-1 text-body-sm leading-relaxed text-on-surface-variant">
            {description.length > 150 ? `${description.slice(0, 147)}…` : description}
          </p>
          <div className="mt-space-md flex flex-wrap gap-space-xs border-t border-outline-variant/40 pt-space-sm">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="border border-outline-variant/40 bg-surface-container px-2 py-0.5 font-mono text-label-mono-sm uppercase tracking-wider text-on-surface-variant"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
