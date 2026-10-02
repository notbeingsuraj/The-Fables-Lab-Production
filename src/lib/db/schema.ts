/**
 * Canonical schema definition for the Fables Lab MongoDB database.
 *
 * This module is the single source of truth for:
 *   - TypeScript document types            (`ContactDoc`, `ProjectDoc`, ...)
 *   - MongoDB $jsonSchema collection validators (`CONTACT_VALIDATOR`, `PROJECT_VALIDATOR`)
 *   - Index definitions                     (`CONTACT_INDEXES`, `PROJECT_INDEXES`)
 *
 * `scripts/mongo-setup.ts` applies the validators + indexes to the live cluster,
 * so the shape below is enforced by the database itself, not only by app code.
 */

import type { ObjectId } from "mongodb";

export const CONTACT_STATUSES = ["new", "read", "archived"] as const;
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export const PROJECT_COLORS = [
  "neon-cyan",
  "cyber-yellow",
  "hot-pink",
  "neon-green",
  "electric-blue",
  "neon-purple",
  "cobalt",
] as const;
export type ProjectColor = (typeof PROJECT_COLORS)[number];

/** Raw payload accepted from the public contact form. */
export interface ContactInput {
  name: string;
  email: string;
  project_name: string;
  architecture_details: string;
}

/** A `contacts` document as stored in MongoDB. */
export interface ContactDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  project_name: string;
  architecture_details: string;
  status: ContactStatus;
  source: string;
  /** SHA-256 of a salted IP, so we can rate-limit without storing raw IP addresses. */
  ipHash: string | null;
  userAgent: string | null;
  /** SHA-256 of normalized submission content, used to reject accidental double submits. */
  dedupeKey: string;
  createdAt: Date;
  updatedAt: Date;
}

/** A `projects` document as stored in MongoDB. */
export interface ProjectDoc {
  _id?: ObjectId;
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  client: string;
  role: string;
  duration: string;
  color: ProjectColor;
  heroText: string;
  heroImage: string;
  solutionImage: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  thoughtProcess: { id: number; title: string; text: string }[];
  process: {
    dfd: { title: string; description: string; image: string };
    prototyping: { title: string; description: string; image: string };
  };
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndexSpec {
  name: string;
  key: Record<string, 1 | -1>;
  options?: {
    unique?: boolean;
    sparse?: boolean;
    partialFilterExpression?: Record<string, unknown>;
  };
}

const dateField = { bsonType: "date" } as const;
const str = { bsonType: "string" } as const;

/**
 * `contacts` validator.
 * Requires the four public form fields; everything else is admin/system owned
 * and therefore omitted from `required`.
 */
export const CONTACT_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    title: "Contact",
    required: ["name", "email", "project_name", "architecture_details", "createdAt", "updatedAt"],
    properties: {
      name: { ...str, minLength: 1, maxLength: 120, description: "Sender display name" },
      email: {
        ...str,
        minLength: 3,
        maxLength: 254,
        pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
        description: "Lowercased sender email",
      },
      project_name: { ...str, minLength: 1, maxLength: 160 },
      architecture_details: { ...str, minLength: 1, maxLength: 8000 },
      status: { ...str, enum: [...CONTACT_STATUSES], description: "new | read | archived" },
      source: { ...str, description: "Submission origin, e.g. website" },
      ipHash: { bsonType: ["string", "null"], maxLength: 64 },
      userAgent: { bsonType: ["string", "null"], maxLength: 512 },
      dedupeKey: { ...str, maxLength: 64 },
    },
  },
} as const;

export const PROJECT_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    title: "Project",
    required: ["slug", "name", "createdAt", "updatedAt"],
    properties: {
      slug: {
        ...str,
        minLength: 1,
        maxLength: 80,
        pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
        description: "URL segment for /projects/[slug]",
      },
      name: { ...str, minLength: 1, maxLength: 160 },
      description: str,
      thumbnail: str,
      tags: { bsonType: "array", items: str },
      client: str,
      role: str,
      duration: str,
      color: { ...str, enum: [...PROJECT_COLORS] },
      heroText: str,
      heroImage: str,
      solutionImage: str,
      summary: str,
      problem: str,
      solution: str,
      techStack: { bsonType: "array", items: str },
      metrics: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["label", "value"],
          properties: { label: str, value: str },
        },
      },
      thoughtProcess: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["id", "title", "text"],
          properties: {
            id: { bsonType: ["int", "long", "double"] },
            title: str,
            text: str,
          },
        },
      },
      process: {
        bsonType: "object",
        properties: {
          dfd: {
            bsonType: "object",
            properties: { title: str, description: str, image: str },
          },
          prototyping: {
            bsonType: "object",
            properties: { title: str, description: str, image: str },
          },
        },
      },
      published: { bsonType: "bool" },
      createdAt: dateField,
      updatedAt: dateField,
    },
  },
} as const;

export const CONTACT_INDEXES: IndexSpec[] = [
  // Primary admin listing: newest first.
  { name: "contact_created_at_desc", key: { createdAt: -1 } },
  // Filtered inbox views (new / read / archived).
  { name: "contact_status_created_at", key: { status: 1, createdAt: -1 } },
  // "Has this person written to us before?"
  { name: "contact_email", key: { email: 1 } },
  // Duplicate-submission + rate-limit lookups.
  { name: "contact_dedupe_key", key: { dedupeKey: 1 } },
  { name: "contact_ip_hash_created_at", key: { ipHash: 1, createdAt: -1 } },
];

export const PROJECT_INDEXES: IndexSpec[] = [
  // Enforces one project per slug.
  { name: "project_slug_unique", key: { slug: 1 }, options: { unique: true } },
  // Public archive ordering.
  { name: "project_published_created_at", key: { published: 1, createdAt: 1 } },
  { name: "project_created_at", key: { createdAt: 1 } },
  { name: "project_tags", key: { tags: 1 } },
];