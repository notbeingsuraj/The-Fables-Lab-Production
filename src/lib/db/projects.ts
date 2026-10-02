import { getDb } from "../mongodb";
import type { ProjectColor, ProjectDoc } from "./schema";
import { PROJECT_COLORS } from "./schema";

export const PROJECTS_COLLECTION = "projects";

/** Shape produced by the admin "new project" form. */
export interface ProjectInput {
  slug: string;
  name: string;
  client?: string;
  role?: string;
  duration?: string;
  color?: string;
  heroText?: string;
  heroImage?: string;
  solutionImage?: string;
  thumbnail?: string;
  summary?: string;
  problem?: string;
  solution?: string;
  techStack?: string[] | string;
  metrics?: { label: string; value: string }[];
  thoughtProcess?: { id: number; title: string; text: string }[];
  process?: ProjectDoc["process"];
  description?: string;
  tags?: string[];
}

export class ProjectValidationError extends Error {
  readonly fields: Record<string, string>;
  constructor(message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = "ProjectValidationError";
    this.fields = fields;
  }
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toArray(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((t) => t.trim()).filter(Boolean);
  return [];
}

function coerceColor(value: string | undefined): ProjectColor {
  const v = String(value ?? "").trim();
  return (PROJECT_COLORS as readonly string[]).includes(v) ? (v as ProjectColor) : "neon-cyan";
}

function coerceMetrics(input: ProjectInput) {
  return (input.metrics ?? [])
    .filter((m) => m && String(m.label ?? "").trim() && String(m.value ?? "").trim())
    .map((m) => ({ label: String(m.label).trim(), value: String(m.value).trim() }));
}

function coerceThought(input: ProjectInput) {
  return (input.thoughtProcess ?? [])
    .filter((t) => t && String(t.title ?? "").trim() && String(t.text ?? "").trim())
    .map((t, i) => ({
      id: Number.isFinite(Number(t.id)) ? Number(t.id) : i + 1,
      title: String(t.title).trim(),
      text: String(t.text).trim(),
    }));
}

function coerceProcess(input: ProjectInput): ProjectDoc["process"] {
  const p = input.process;
  const blank = { title: "", description: "", image: "" };
  return {
    dfd: p?.dfd ? { ...blank, ...p.dfd } : blank,
    prototyping: p?.prototyping ? { ...blank, ...p.prototyping } : blank,
  };
}

/** Normalizes + validates admin form input into a storable ProjectDoc. */
export function toProjectDoc(input: ProjectInput, existing?: ProjectDoc | null): ProjectDoc {
  const now = new Date();
  const fields: Record<string, string> = {};

  const slug = String(input.slug ?? "").trim().toLowerCase();
  if (!slug) fields.slug = "Slug is required.";
  else if (!SLUG_RE.test(slug))
    fields.slug = "Use lowercase letters, numbers and single hyphens (e.g. carefree-mobility).";

  const name = String(input.name ?? "").trim();
  if (!name) fields.name = "Project name is required.";

  if (Object.keys(fields).length > 0) {
    throw new ProjectValidationError("Some fields need attention.", fields);
  }

  const techStack = toArray(input.techStack);
  const summary = String(input.summary ?? "").trim();
  const description = String(input.description ?? "").trim() || summary;
  const tags = toArray(input.tags).length > 0 ? toArray(input.tags) : techStack;
  const heroImage = String(input.heroImage ?? "").trim();

  return {
    slug,
    name,
    description,
    thumbnail: String(input.thumbnail ?? "").trim() || heroImage,
    tags,
    client: String(input.client ?? "").trim(),
    role: String(input.role ?? "").trim(),
    duration: String(input.duration ?? "").trim(),
    color: coerceColor(input.color),
    heroText: String(input.heroText ?? "").trim(),
    heroImage,
    solutionImage: String(input.solutionImage ?? "").trim(),
    summary,
    problem: String(input.problem ?? "").trim(),
    solution: String(input.solution ?? "").trim(),
    techStack,
    metrics: coerceMetrics(input),
    thoughtProcess: coerceThought(input),
    process: coerceProcess(input),
    published: existing?.published ?? true,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

/** Public archive listing, oldest first (matches the legacy site ordering). */
export async function listProjects(options: { publishedOnly?: boolean } = {}) {
  const { publishedOnly = true } = options;
  const db = await getDb();
  const filter = publishedOnly ? { published: true } : {};
  return db
    .collection<ProjectDoc>(PROJECTS_COLLECTION)
    .find(filter)
    .sort({ createdAt: 1 })
    .toArray();
}

export async function getProjectBySlug(slug: string, options: { publishedOnly?: boolean } = {}) {
  const { publishedOnly = true } = options;
  const db = await getDb();
  return db
    .collection<ProjectDoc>(PROJECTS_COLLECTION)
    .findOne(
      publishedOnly ? { slug, published: true } : { slug },
      { projection: { _id: 0 } }
    );
}

/** Insert-or-replace by slug. Returns false when the slug is already taken. */
export async function createProject(input: ProjectInput): Promise<ProjectDoc> {
  const doc = toProjectDoc(input);
  const db = await getDb();
  const col = db.collection<ProjectDoc>(PROJECTS_COLLECTION);
  const existing = await col.findOne({ slug: doc.slug }, { projection: { _id: 1 } });
  if (existing) {
    throw new ProjectValidationError("That slug is already in use.", {
      slug: "A project with this slug already exists.",
    });
  }
  await col.insertOne(doc);
  return doc;
}

/** Upsert used by the seed script and for fixes. */
export async function upsertProject(input: ProjectInput): Promise<ProjectDoc> {
  const db = await getDb();
  const col = db.collection<ProjectDoc>(PROJECTS_COLLECTION);
  const existing = await col.findOne({ slug: String(input.slug ?? "").trim().toLowerCase() });
  const doc = toProjectDoc(input, existing);
  await col.replaceOne({ slug: doc.slug }, doc, { upsert: true });
  return doc;
}

export async function countProjects(): Promise<number> {
  const db = await getDb();
  return db.collection<ProjectDoc>(PROJECTS_COLLECTION).countDocuments();
}