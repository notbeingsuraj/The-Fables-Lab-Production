import { createHash, randomUUID } from "node:crypto";
import { getDb } from "../mongodb";
import type { ContactDoc, ContactInput, ContactStatus } from "./schema";

export const CONTACTS_COLLECTION = "contacts";

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  project_name: 160,
  architecture_details: 8000,
} as const;

/** A repeat submission within this window is treated as a double-click, not a lead. */
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000;

export class ContactValidationError extends Error {
  readonly fields: Record<string, string>;
  constructor(message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = "ContactValidationError";
    this.fields = fields;
  }
}

function normalize(input: ContactInput) {
  return {
    name: String(input.name ?? "").trim().replace(/\s+/g, " "),
    email: String(input.email ?? "").trim().toLowerCase(),
    project_name: String(input.project_name ?? "").trim().replace(/\s+/g, " "),
    architecture_details: String(input.architecture_details ?? "").trim(),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ReturnType<typeof normalize> {
  const v = normalize(input);
  const fields: Record<string, string> = {};

  if (!v.name) fields.name = "Name is required.";
  else if (v.name.length > CONTACT_LIMITS.name) fields.name = `Max ${CONTACT_LIMITS.name} characters.`;

  if (!v.email) fields.email = "Email is required.";
  else if (v.email.length > CONTACT_LIMITS.email) fields.email = "Email is too long.";
  else if (!EMAIL_RE.test(v.email)) fields.email = "Enter a valid email address.";

  if (!v.project_name) fields.project_name = "Project name is required.";
  else if (v.project_name.length > CONTACT_LIMITS.project_name)
    fields.project_name = `Max ${CONTACT_LIMITS.project_name} characters.`;

  if (!v.architecture_details) fields.architecture_details = "Tell us about the project.";
  else if (v.architecture_details.length > CONTACT_LIMITS.architecture_details)
    fields.architecture_details = `Max ${CONTACT_LIMITS.architecture_details} characters.`;

  if (Object.keys(fields).length > 0) {
    throw new ContactValidationError("Some fields need attention.", fields);
  }
  return v;
}

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function dedupeKeyFor(v: {
  email: string;
  project_name: string;
  architecture_details: string;
}): string {
  return sha256(
    [v.email, v.project_name, v.architecture_details].join(" | ").toLowerCase()
  );
}

/** Salted so a DB dump cannot be brute-forced back into IP addresses. */
export function hashIp(ip: string | null, salt: string): string | null {
  if (!ip) return null;
  return sha256(`${salt}:${ip}`);
}

export interface InsertContactResult {
  id: string;
  duplicate: boolean;
}

export async function insertContact(params: {
  input: ContactInput;
  ip?: string | null;
  userAgent?: string | null;
}): Promise<InsertContactResult> {
  const v = validateContact(params.input);
  const db = await getDb();
  const now = new Date();
  const dedupeKey = dedupeKeyFor(v);

  const doc: ContactDoc = {
    name: v.name,
    email: v.email,
    project_name: v.project_name,
    architecture_details: v.architecture_details,
    status: "new",
    source: "website",
    ipHash: hashIp(params.ip ?? null, process.env.CONTACT_HASH_SALT || randomUUID()),
    userAgent: params.userAgent ? String(params.userAgent).slice(0, 512) : null,
    dedupeKey,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection<ContactDoc>(CONTACTS_COLLECTION).insertOne(doc);

  return { id: String(result.insertedId), duplicate: false };
}

/**
 * Returns true when an identical submission already landed inside
 * DUPLICATE_WINDOW_MS, meaning this request is a double submit.
 */
export async function isRecentDuplicate(dedupeKey: string): Promise<boolean> {
  const db = await getDb();
  const found = await db
    .collection<ContactDoc>(CONTACTS_COLLECTION)
    .findOne(
      { dedupeKey, createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) } },
      { projection: { _id: 1 } }
    );
  return found !== null;
}

/** Simple sliding-window rate limit keyed on the hashed IP. */
export async function isRateLimited(ipHash: string | null, limit = 5, windowMs = 60 * 60 * 1000) {
  if (!ipHash) return false;
  const db = await getDb();
  const count = await db
    .collection<ContactDoc>(CONTACTS_COLLECTION)
    .countDocuments({ ipHash, createdAt: { $gte: new Date(Date.now() - windowMs) } });
  return count >= limit;
}

export interface ListContactsOptions {
  status?: ContactStatus | "all";
  search?: string;
  limit?: number;
  skip?: number;
}

export async function listContacts(opts: ListContactsOptions = {}) {
  const { status = "all", search = "", limit = 50, skip = 0 } = opts;
  const db = await getDb();
  const col = db.collection<ContactDoc>(CONTACTS_COLLECTION);

  const filter: Record<string, unknown> = {};
  if (status !== "all") filter.status = status;

  const term = search.trim();
  if (term) {
    const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { email: rx }, { project_name: rx }];
  }

  const [items, total] = await Promise.all([
    col
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Math.min(limit, 200))
      .toArray(),
    col.countDocuments(filter),
  ]);

  return { items, total };
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  const res = await db
    .collection<ContactDoc>(CONTACTS_COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } });
  return res.matchedCount > 0;
}

export async function deleteContact(id: string) {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  const res = await db.collection<ContactDoc>(CONTACTS_COLLECTION).deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}

export async function countByStatus(): Promise<Record<ContactStatus, number>> {
  const db = await getDb();
  const col = db.collection<ContactDoc>(CONTACTS_COLLECTION);
  const [newCount, readCount, archivedCount] = await Promise.all([
    col.countDocuments({ status: "new" }),
    col.countDocuments({ status: "read" }),
    col.countDocuments({ status: "archived" }),
  ]);
  return { new: newCount, read: readCount, archived: archivedCount };
}