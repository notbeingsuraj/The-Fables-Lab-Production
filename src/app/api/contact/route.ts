import { NextResponse } from "next/server";
import {
  ContactValidationError,
  dedupeKeyFor,
  hashIp,
  insertContact,
  isRateLimited,
  isRecentDuplicate,
  validateContact,
} from "@/lib/db/contacts";
import { getClientIp } from "@/lib/request";

export const dynamic = "force-dynamic";
/** Must stay on the Node runtime: the MongoDB driver and node:crypto are not Edge-compatible. */
export const runtime = "nodejs";

const RATE_LIMIT = 5; // submissions per IP per hour
const MAX_BODY_BYTES = 64 * 1024;

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Malformed JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const payload = {
      name: input.name as string,
      email: input.email as string,
      project_name: input.project_name as string,
      architecture_details: input.architecture_details as string,
    };

    const fields: Record<string, string> = {};
    let normalized;
    try {
      normalized = validateContact(payload);
    } catch (err) {
      if (err instanceof ContactValidationError) {
        fields.name = err.fields.name ?? "";
        fields.email = err.fields.email ?? "";
        fields.project_name = err.fields.project_name ?? "";
        fields.architecture_details = err.fields.architecture_details ?? "";
      }
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fields },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const ipHash = hashIp(ip, process.env.CONTACT_HASH_SALT || "fables-lab-default-salt");

    if (await isRateLimited(ipHash, RATE_LIMIT)) {
      return NextResponse.json(
        { error: "Too many submissions from this connection. Please try again later." },
        { status: 429 }
      );
    }

    if (await isRecentDuplicate(dedupeKeyFor(normalized))) {
      return NextResponse.json(
        { error: "This inquiry was already received." },
        { status: 409 }
      );
    }

    const { id } = await insertContact({
      input: payload,
      ip,
      userAgent: req.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("[contact] submission failed:", error);

    const raw = error instanceof Error ? error.message : String(error);

    // Surface the actual cause in development so misconfiguration is obvious.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: `Could not record your inquiry: ${raw}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Could not record your inquiry right now. Please try again." },
      { status: 500 }
    );
  }
}