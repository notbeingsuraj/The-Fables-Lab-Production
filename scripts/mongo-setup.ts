import "./load-env";
/**
 * Applies the Fables Lab schema to MongoDB.
 *
 * Creates the collections (if absent), installs the $jsonSchema validators from
 * src/lib/db/schema.ts, and creates all indexes. Safe to re-run: existing
 * validators and indexes are replaced, documents are left untouched.
 *
 * Usage:
 *   set -a && source .env.local && set +a
 *   npm run db:setup
 */
import { MongoClient, type Db } from "mongodb";
import {
  CONTACT_INDEXES,
  CONTACT_VALIDATOR,
  PROJECT_INDEXES,
  PROJECT_VALIDATOR,
} from "../src/lib/db/schema";

const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "fables_lab";

if (!URI) {
  console.error("MONGODB_URI is not set. Load .env.local first.");
  process.exit(1);
}

type NamedValidator = Parameters<Db["command"]>[0];

async function ensureCollection(
  db: Db,
  name: string,
  validator: unknown,
  indexes: { name: string; key: Record<string, 1 | -1>; options?: object }[]
) {
  const existing = await db.listCollections({ name }, { nameOnly: true }).toArray();

  if (existing.length === 0) {
    await db.createCollection(name, {
      validator: validator as never,
      validationLevel: "moderate",
      validationAction: "error",
    });
    console.log(`  created collection ${name}`);
  } else {
    await db.command({
      collMod: name,
      validator: validator as never,
      validationLevel: "moderate",
      validationAction: "error",
    } as NamedValidator);
    console.log(`  updated validator on ${name}`);
  }

  for (const idx of indexes) {
    await db.collection(name).createIndex(idx.key, { name: idx.name, ...(idx.options ?? {}) });
    console.log(`  ensured index ${name}.${idx.name}`);
  }
}

async function main() {
  const client = new MongoClient(URI as string, { appName: "fables-lab-setup" });
  await client.connect();

  try {
    const db = client.db(DB_NAME);
    console.log(`\nApplying schema to database "${DB_NAME}"\n`);

    console.log("contacts:");
    await ensureCollection(db, "contacts", CONTACT_VALIDATOR, CONTACT_INDEXES);

    console.log("projects:");
    await ensureCollection(db, "projects", PROJECT_VALIDATOR, PROJECT_INDEXES);

    const all = await db.listCollections({}, { nameOnly: true }).toArray();

    console.log("\nCollections now present:");
    for (const coll of all) {
      const mark = ["contacts", "projects"].includes(coll.name) ? "*" : " ";
      console.log(`  ${mark} ${coll.name} (type: ${coll.type})`);
    }
    console.log("  (* = managed by this script)");

    console.log("\nSchema applied successfully.\n");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Schema setup failed:", error);
  process.exit(1);
});