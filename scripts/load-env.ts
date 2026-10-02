import * as dotenv from "dotenv";
import * as path from "node:path";
import * as fs from "node:fs";

/**
 * Loads .env.local into process.env for the standalone db:* scripts.
 * Real environment variables always win over file values.
 */
const localEnv = path.resolve(process.cwd(), ".env.local");

if (fs.existsSync(localEnv)) {
  dotenv.config({ path: localEnv, override: false });
} else {
  dotenv.config({ override: false });
}