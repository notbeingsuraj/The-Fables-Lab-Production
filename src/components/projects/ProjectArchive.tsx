"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";
import { useSynth } from "@/components/providers/SynthProvider";

/** Client archive — fetches the live project list and filters by tag. */
export default function ProjectArchive() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState("All Work");
  const { play } = useSynth();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const { data } = await res.json();
        if (res.ok && Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => (p.tags || []).forEach((t: string) => set.add(t)));
    return ["All Work", ...Array.from(set).slice(0, 8)];
  }, [projects]);

  const visible =
    activeTag === "All Work"
      ? projects
      : projects.filter((p) => (p.tags || []).includes(activeTag));

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center border border-outline-variant/40 bg-surface-container-lowest">
        <span className="font-mono text-label-mono-md uppercase tracking-widest text-outline animate-pulse">
          {"// LOADING ARCHIVE..."}
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-space-md border border-outline-variant/40 bg-surface-container-lowest p-space-xl text-center">
        <span className="font-mono text-label-mono-md uppercase tracking-widest text-secondary">
          ARCHIVE EMPTY // NO PUBLISHED CASE FILES
        </span>
        <p className="max-w-md text-body-sm text-on-surface-variant">
          The vault is sealed until the first case files clear review. Commission
          one — or check back after the next sprint ships.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Tag filters */}
      <div className="mb-space-xl flex flex-wrap gap-space-sm">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              play(460, 0.04);
              setActiveTag(tag);
            }}
            className={`border px-space-md py-2 font-mono text-label-mono-sm uppercase tracking-widest transition-all ${
              activeTag === tag
                ? "border-primary-fixed bg-primary-fixed text-on-primary-fixed shadow-magenta-sm"
                : "border-outline-variant/40 bg-surface-container-low text-on-surface-variant hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <div
            key={project.id}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(i * 0.08, 0.6)}s`, animationFillMode: "both" }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="flex min-h-[30vh] items-center justify-center border border-outline-variant/40 bg-surface-container-lowest">
          <span className="font-mono text-label-mono-md uppercase tracking-widest text-outline">
            NO CASE FILES MATCHED FILTER :: {activeTag}
          </span>
        </div>
      )}
    </>
  );
}
