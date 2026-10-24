import { NextResponse } from "next/server";
import { listProjects } from "@/lib/db/projects";
import { toProjectCardJSON } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await listProjects({ publishedOnly: true });
    const data = projects
      .filter((p) => p && (p as { slug?: string }).slug)
      .map((p) => {
        try {
          return toProjectCardJSON(p);
        } catch (err) {
          console.error("[projects] card serialization failed:", err);
          return null;
        }
      })
      .filter(Boolean);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[projects] list failed:", error);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}