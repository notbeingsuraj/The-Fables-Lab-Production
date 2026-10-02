import type { ContactDoc, ProjectDoc } from "./schema";

export interface ContactJSON {
  id: string;
  name: string;
  email: string;
  project_name: string;
  architecture_details: string;
  status: ContactDoc["status"];
  source: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Strips internal fields (`_id`, `dedupeKey`, `ipHash`, `userAgent`) before a
 * contact leaves the server. `id` is a string so JSON stays stable across routes.
 */
export function toContactJSON(doc: ContactDoc): ContactJSON {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    project_name: doc.project_name,
    architecture_details: doc.architecture_details,
    status: doc.status,
    source: doc.source,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

export interface ProjectJSON {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  client: string;
  role: string;
  duration: string;
  color: string;
  heroText: string;
  heroImage: string;
  solutionImage: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  thoughtProcess: { id: number; title: string; text: string }[];
  process: ProjectDoc["process"];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export function toProjectJSON(doc: ProjectDoc): ProjectJSON {
  return {
    id: String(doc._id),
    slug: doc.slug,
    name: doc.name,
    description: doc.description ?? "",
    thumbnail: doc.thumbnail ?? "",
    tags: doc.tags ?? [],
    client: doc.client ?? "",
    role: doc.role ?? "",
    duration: doc.duration ?? "",
    color: doc.color ?? "neon-cyan",
    heroText: doc.heroText ?? "",
    heroImage: doc.heroImage ?? "",
    solutionImage: doc.solutionImage ?? "",
    summary: doc.summary ?? "",
    problem: doc.problem ?? "",
    solution: doc.solution ?? "",
    techStack: doc.techStack ?? [],
    metrics: doc.metrics ?? [],
    thoughtProcess: doc.thoughtProcess ?? [],
    process: doc.process ?? { dfd: { title: "", description: "", image: "" }, prototyping: { title: "", description: "", image: "" } },
    published: doc.published ?? true,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}

/** Compact projection used by the archive grid. */
export function toProjectCardJSON(doc: ProjectDoc) {
  return {
    id: doc.slug,
    name: doc.name,
    description: doc.description ?? "",
    image: doc.thumbnail ?? doc.heroImage ?? "",
    tags: doc.tags ?? [],
    color: doc.color ?? "neon-cyan",
  };
}