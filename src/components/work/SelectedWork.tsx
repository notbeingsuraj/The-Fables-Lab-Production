"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";

/**
 * Selected Work — case studies drawn from the repository's project database.
 *
 * Falls back to an elegant "What We Build" section when no verified projects
 * are available (e.g. MongoDB unreachable). Never fabricates customer names,
 * screenshots, or metrics.
 */

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

export default function SelectedWork() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (cancelled || !data) return;
        const items: Project[] = (data.data || []).map((p: Record<string, unknown>) => ({
          id: String(p.id),
          name: String(p.name),
          description: String(p.description),
          image: String(p.image),
          tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
          color: String(p.color || "neon-cyan"),
        }));
        setProjects(items);
      })
      .catch(() => {
        // DB unreachable — leave projects as null to show the fallback.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // No verified case studies → show the "What We Build" fallback.
  if (projects === null) {
    return (
      <section
        id="work"
        className="w-full bg-surface py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 lg:mb-20 text-center">
            <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
              Selected Experiments
            </span>
            <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
              What We Build
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              The studio&apos;s work spans full-stack products, AI systems, marketing
              sites, UI/UX design, community platforms, and content management
              systems. Verified case studies appear here once client work clears
              review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Full-Stack Product", tone: "bronze" },
              { title: "AI System", tone: "graphite" },
              { title: "Marketing Site", tone: "warm" },
              { title: "UI/UX Design", tone: "bronze" },
              { title: "Community Platform", tone: "graphite" },
              { title: "CMS Implementation", tone: "warm" },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-outline-variant/20 bg-surface-elevated rounded-xl p-8 flex flex-col h-full"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-lg border border-bronze/20 bg-bronze/5 mb-6"
                  aria-hidden="true"
                >
                  <span className="text-bronze/50 font-mono text-xs">▭</span>
                </div>
                <h3 className="font-display text-lg leading-tight text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">
                  A core capability of The Fables Lab. See our services for
                  details.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="work"
      className="w-full bg-surface py-section lg:py-[8rem] px-4 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20">
          <div>
            <span className="inline-block mb-4 px-3 py-1 border border-bronze/30 bg-bronze/10 text-xs font-mono font-bold uppercase tracking-wider text-bronze">
              Selected Work
            </span>
            <h2 className="mb-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-on-surface">
              Case Studies From the Lab
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze hover:underline"
          >
            View Archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              image={project.image}
              tags={project.tags}
              color={project.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
