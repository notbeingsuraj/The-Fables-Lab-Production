import "./load-env";
/**
 * Seeds the `projects` collection from scripts/data/projects-seed.ts.
 *
 * Upserts by slug, so re-running refreshes content without creating duplicates.
 * Existing `createdAt` values are preserved on re-run.
 *
 * Usage:
 *   set -a && source .env.local && set +a
 *   npm run db:seed
 */
import { MongoClient } from "mongodb";
import { buildSeedProjects } from "./data/projects-seed";
import { toProjectDoc, type ProjectInput } from "../src/lib/db/projects";

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "fables_lab";

if (!URI) {
  console.error("MONGODB_URI is not set. Load .env.local first.");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(URI as string, { appName: "fables-lab-seed" });
  await client.connect();

  try {
    const db = client.db(DB_NAME);
    const col = db.collection("projects");
    const seeds = buildSeedProjects();

    console.log(`\nSeeding ${seeds.length} projects into "${DB_NAME}".projects\n`);

    let created = 0;
    let updated = 0;

    for (const seed of seeds) {
      const existing = await col.findOne(
        { slug: seed.slug },
        { projection: { _id: 1, createdAt: 1 } }
      );

      // Reuse the stored createdAt so archive ordering stays stable across re-seeds.
      const doc = toProjectDoc(seed as unknown as ProjectInput, existing as never);
      if (existing?.createdAt) {
        doc.createdAt = existing.createdAt as Date;
      }

      await col.replaceOne({ slug: doc.slug }, doc, { upsert: true });

      if (existing) {
        updated += 1;
        console.log(`  updated  ${doc.slug}`);
      } else {
        created += 1;
        console.log(`  created  ${doc.slug}`);
      }
    }

    const total = await col.countDocuments();
    console.log(`\nDone. ${created} created, ${updated} updated, ${total} total.\n`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});