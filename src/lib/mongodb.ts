import { MongoClient, type Db } from "mongodb";

/**
 * Connection helper for the Fables Lab MongoDB database.
 *
 * The URI is read lazily so that importing this module during `next build`
 * (module graph evaluation) never throws when the variable is absent; the error
 * surfaces only when a query actually runs.
 */

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (see .env.example) or your host's environment."
    );
  }
  return uri;
}

export function getDbName(): string {
  return process.env.MONGODB_DB || "fables_lab";
}

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(getUri(), {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 10_000,
    connectTimeoutMS: 10_000,
    socketTimeoutMS: 45_000,
    retryWrites: true,
    appName: "fables-lab",
  });
  return client.connect();
}

export function getClient(): Promise<MongoClient> {
  // Reconnect if a previous connection was closed or failed.
  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = createClientPromise().catch((error) => {
      global.__mongoClientPromise = undefined;
      throw error;
    });
  }
  return global.__mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(getDbName());
}