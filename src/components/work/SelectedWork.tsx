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

const VERIFIED_FALLBACK = [
  {
    id: "webloom",
    name: "Webloom",
    description: "AI-powered business intelligence and website-planning pipeline that extracts, validates, and structures business data to produce personalized website specifications.",
    image: "",
    tags: ["Next.js", "AI", "Data Pipelines"],
    color: "neon-cyan",
  },
  {
    id: "astrovetro",
    name: "AstroVetro.com",
    description: "Full-stack e-commerce experience for crystals and spiritual products with product discovery, responsive UX, and MongoDB-backed catalog.",
    image: "",
    tags: ["Next.js", "E-commerce", "MongoDB"],
    color: "electric-blue",
  },
  {
    id: "monetra",
    name: "Monetra",
    description: "Peer-to-peer lending record and trust-scoring platform (no fund transfers). Mobile app (React Native/TypeScript) with Node.js/Express + MongoDB backend.",
    image: "",
    tags: ["React Native", "TypeScript", "Node.js"],
    color: "neon-green",
  },
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

  const hasProjects = projects !== null && projects.length > 0;
  const displayProjects = hasProjects
    ? projects
    : (projects === null
        ? VERIFIED_FALLBACK
        : []);

  return (
    <section id="work" className="section-padding relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-violet-subtle/30 via-background to-background" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="mb-16 lg:mb-24">
          <p className="mb-6 text-label-sm uppercase tracking-[0.14em] text-on-surface-muted">
            Selected Work
          </p>
          <h2 className="text-headline-xl text-on-surface text-balance">
            Real projects, real engineering
          </h2>
          <p className="mt-6 max-w-[720px] text-body-xl text-on-surface-variant text-pretty">
            Only verified work from public repositories — built with restraint, clarity, and intent.
          </p>
        </div>

        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
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
        ) : (
          <div className="rounded-2xl border border-outline-variant p-10 text-center">
            <p className="text-on-surface">No verified projects available yet.</p>
            <p className="mt-2 text-sm text-on-surface-variant">
              Check back soon — this portfolio will showcase only verifiable work.
            </p>
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
