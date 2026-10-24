import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/db/projects";
import { toProjectJSON } from "@/lib/db/serialize";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = decodeURIComponent(params.slug || "").toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const project = await getProjectBySlug(slug, { publishedOnly: true });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    try {
      const data = toProjectJSON(project);
      return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
      console.error("[projects] detail serialization failed:", err);
      return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
    }
  } catch (error) {
    console.error("[projects] detail failed:", error);
    return NextResponse.json({ error: "Failed to load project" }, { status: 500 });
  }
}