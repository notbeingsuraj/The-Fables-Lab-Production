import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/db/projects";
import { toProjectJSON } from "@/lib/db/serialize";
import CaseStudyView, { type CaseStudyData } from "@/components/projects/CaseStudyView";

/** DB-backed route — render on demand, never at build time. */
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Returns null for malformed/unknown slugs; throws on infrastructure failure. */
async function loadProject(slug: string): Promise<CaseStudyData | null> {
  if (!SLUG_RE.test(slug)) return null;
  const doc = await getProjectBySlug(slug, { publishedOnly: true });
  if (!doc) return null;
  return toProjectJSON(doc) as CaseStudyData;
}

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = decodeURIComponent(params?.slug || "").toLowerCase();

  let project: CaseStudyData | null = null;
  try {
    project = await loadProject(slug);
  } catch (error) {
    // DB unreachable — fall back to base metadata rather than failing the route.
    console.error("[project page] metadata load failed:", error);
  }

  if (!project) {
    return {
      title: "Case File Not Found",
      description: "This case file is not in the archive.",
      robots: { index: false },
    };
  }

  const description =
    project.summary ||
    project.description ||
    `Case file: ${project.name} — engineered by The Fables Lab.`;

  return {
    title: project.name,
    description: description.slice(0, 300),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} // The Fables Lab`,
      description: description.slice(0, 300),
      url: `https://thefableslab.com/projects/${project.slug}`,
      type: "article",
      images: project.heroImage ? [{ url: project.heroImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} // The Fables Lab`,
      description: description.slice(0, 200),
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const slug = decodeURIComponent(params?.slug || "").toLowerCase();

  // Null → malformed or unpublished slug (infra errors bubble to error.tsx).
  const project = await loadProject(slug);
  if (!project) notFound();

  return <CaseStudyView project={project} />;
}
