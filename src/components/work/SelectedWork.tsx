"use client";

import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

const FALLBACK_ITEMS = [
  { title: "Full-Stack Product", tone: "bronze" },
  { title: "AI System", tone: "graphite" },
  { title: "Marketing Site", tone: "warm" },
  { title: "UI/UX Design", tone: "bronze" },
  { title: "Community Platform", tone: "graphite" },
  { title: "CMS Implementation", tone: "warm" },
] as const;

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

  const showFallback = projects === null || projects.length === 0;

  return (
    <section id="work" className="w-full bg-surface py-section lg:py-[10rem] px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-24 lg:mb-32">
          <div>
            <span className="inline-block mb-8 px-3 py-1.5 border border-bronze/30 bg-bronze/10 text-[11px] font-mono font-bold uppercase tracking-wider text-bronze">
              Selected work
            </span>
            <h2
              className="mb-6 font-display text-[clamp(2.5rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-on-surface text-balance"
            >
              Case studies from the lab
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-bronze bg-bronze text-[10px] font-bold uppercase tracking-wider text-surface transition-colors hover:bg-bronze-hover focus-visible:outline-bronze focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            View archive
          </Link>
        </div>

        {showFallback ? (
          <>
            <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-[560px] mb-24 lg:mb-32">
              Verified case studies appear here once client work clears review.
              Below are the types of work we build.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {FALLBACK_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="border border-outline-variant/20 rounded-lg p-8 lg:p-12 bg-background flex flex-col h-full group hover:border-bronze/40 transition-colors"
                >
                  <div className="relative h-48 lg:h-56 rounded-lg overflow-hidden border border-outline-variant/30 bg-surface-elevated mb-8">
                    <div className="absolute inset-0 flex items-center justify-center bg-bronze/5">
                      <div className="w-16 h-16 rounded-lg border border-bronze/20 bg-bronze/10 flex items-center justify-center">
                        <span className="text-bronze font-mono text-[11px]">▭</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-lg lg:text-xl leading-tight tracking-tight text-on-surface mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    A core capability of The Fables Lab. See our services for
                    details.
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
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
        )}
      </div>
    </section>
  );
}
