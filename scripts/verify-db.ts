/**
 * End-to-end verification of the MongoDB wiring.
 *
 * Checks:
 *   1. Connection + database name
 *   2. Collections exist with validators and the expected indexes
 *   3. Project documents can be read through the same repo the app uses
 *   4. Contact insert -> read-back -> delete round trip
 *
 * Usage: npm run db:verify
 */
import "./load-env";
import { MongoClient } from "mongodb";
import { getDb, getDbName } from "../src/lib/mongodb";
import { listProjects, getProjectBySlug } from "../src/lib/db/projects";
import { insertContact, listContacts, deleteContact } from "../src/lib/db/contacts";
import { CONTACT_INDEXES, PROJECT_INDEXES } from "../src/lib/db/schema";

const EXPECTED_CONTACT_FIELDS = ["name", "email", "project_name", "architecture_details"];
let failures = 0;

function check(label: string, pass: boolean, detail = "") {
  console.log(`  ${pass ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!pass) failures += 1;
}

async function main() {
  console.log(`\nVerifying database "${getDbName()}"\n`);

  // 1. Connection -----------------------------------------------------------
  const client = new MongoClient(process.env.MONGODB_URI as string, {
    appName: "fables-lab-verify",
  });
  await client.connect();
  const ping = await client.db("admin").command({ ping: 1 });
  check("connection + ping", ping.ok === 1);
  await client.close();

  const db = await getDb();

  // 2. Collections / validators / indexes ----------------------------------
  const collections = await db.listCollections({}, { nameOnly: true }).toArray();
  const names = collections.map((c) => c.name);

  for (const name of ["contacts", "projects"]) {
    check(`collection "${name}" exists`, names.includes(name));
  }

  for (const [coll, expectedIndexes] of [
    ["contacts", CONTACT_INDEXES],
    ["projects", PROJECT_INDEXES],
  ] as const) {
    if (!names.includes(coll)) continue;
    const info = await db.command({ listIndexes: coll });
    const existing = new Set<string>(
      ((info.cursor?.firstBatch ?? []) as { name: string }[]).map((i) => i.name)
    );
    for (const idx of expectedIndexes) {
      check(`index ${coll}.${idx.name}`, existing.has(idx.name));
    }
    const validator = await db
      .command({ listCollections: coll, filter: { name: coll } })
      .then((r) => (r.cursor.firstBatch[0] as { options?: { validator?: unknown } }).options?.validator);
    check(`validator installed on ${coll}`, !!validator);
  }

  // 3. Projects read path ---------------------------------------------------
  const projects = await listProjects({ publishedOnly: true });
  check("projects readable via repo", Array.isArray(projects), `${projects.length} published`);
  if (projects.length > 0) {
    const first = projects[0];
    check(
      "project documents have camelCase shape",
      typeof first.heroText === "string" && typeof first.slug === "string" && Array.isArray(first.techStack),
      `sample slug: ${first.slug}`
    );
    const bySlug = await getProjectBySlug(first.slug);
    check("getProjectBySlug returns match", bySlug?.slug === first.slug);
  }

  // 4. Contact round trip ---------------------------------------------------
  const stamp = Date.now();
  const { id } = await insertContact({
    input: {
      name: "Schema Verification Bot",
      email: `verify-${stamp}@example.com`,
      project_name: `Automated check ${stamp}`,
      architecture_details: "Round-trip probe written by scripts/verify-db.ts.",
    },
    ip: "127.0.0.1",
    userAgent: "verify-db-script",
  });
  check("contact inserted", !!id);

  const listed = await listContacts({ search: `verify-${stamp}@example.com`, limit: 5 });
  const found = listed.items.find((d) => String(d._id) === id);

  check("contact readable via repo", !!found);
  if (found) {
    for (const field of EXPECTED_CONTACT_FIELDS) {
      check(`contact field "${field}" persisted`, typeof (found as never)[field] === "string");
    }
    check("contact defaults to status=new", found.status === "new");
  }

  // Internal fields must never leak into API output (covered in serialize.ts).
  const removed = await deleteContact(id);
  check("probe contact cleaned up", removed);

  const afterDelete = await listContacts({ search: `verify-${stamp}@example.com`, limit: 5 });
  check(
    "probe removed from listing",
    !afterDelete.items.some((d) => String(d._id) === id)
  );

  // 5. Validator enforcement ------------------------------------------------
  let rejected = false;
  try {
    await db.collection("contacts").insertOne({
      name: "Bad",
      email: "not-an-email",
      project_name: "",
      architecture_details: "",
      status: "new",
      source: "script",
      ipHash: null,
      userAgent: null,
      dedupeKey: "x",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch {
    rejected = true;
  }
  check("validator rejects malformed contact", rejected);

  // Clean up if the validator was too lax.
  await db.collection("contacts").deleteMany({ email: "not-an-email" });

  console.log(
    failures === 0
      ? "\nAll checks passed.\n"
      : `\n${failures} check(s) failed.\n`
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error("Verification crashed:", error);
  process.exit(1);
});