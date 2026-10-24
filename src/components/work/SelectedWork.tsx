"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/ui/ProjectCard";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

const FALLBACK_ITEMS = [
  { title: "Full-Stack Solutions", desc: "Custom web applications, scalable backends, and digital platforms." },
  { title: "AI Solutions", desc: "Practical AI integrations, automation, and intelligent workflows." },
  { title: "UI/UX Design", desc: "Product strategy, user journeys, and refined interfaces." },
];

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
          color: String(p.color || "neutral"),
        }));
        setProjects(items);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const showFallback = projects === null || projects.length === 0;

  return (
    <section id="work" className="section-padding">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.12em] text-on-surface-muted">
            Selected Work
          </p>
          <h2 className="text-headline-xl text-on-surface text-balance">
            Work that speaks for itself
          </h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
            Each project is built with restraint, clarity, and intent.
          </p>
        </div>

        {showFallback ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FALLBACK_ITEMS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-outline-variant p-8"
              >
                <div className="aspect-[4/3] w-full rounded-xl bg-background-secondary" />
                <h3 className="mt-6 text-lg text-on-surface">{item.title}</h3>
                <p className="mt-3 text-sm text-on-surface-variant">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

        <div className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-on-surface transition-colors hover:text-on-surface-variant"
          >
            View all projects
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
