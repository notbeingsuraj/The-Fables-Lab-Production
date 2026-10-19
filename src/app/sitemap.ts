import type { MetadataRoute } from "next";
import { listProjects } from "@/lib/db/projects";

const SITE_URL = "https://thefableslab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/process`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await listProjects({ publishedOnly: true });
    projectRoutes = projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: project.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (error) {
    // DB unreachable at build time — ship the static routes only.
    console.error("[sitemap] project list failed:", error);
  }

  return [...staticRoutes, ...projectRoutes];
}
