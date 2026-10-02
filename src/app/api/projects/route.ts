import { NextResponse } from "next/server";
import { listProjects } from "@/lib/db/projects";
import { toProjectCardJSON } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await listProjects({ publishedOnly: true });
    return NextResponse.json(
      { data: projects.map(toProjectCardJSON) },
      { status: 200 }
    );
  } catch (error) {
    console.error("[projects] list failed:", error);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}