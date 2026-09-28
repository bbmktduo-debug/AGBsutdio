import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSitemapEntries } from "@/lib/sanity/queries";

export const revalidate = 3600;

type Entry = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = (await getSitemapEntries().catch(() => null)) as {
    works: Entry[];
    notes: Entry[];
  } | null;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/notes`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const works: MetadataRoute.Sitemap = (data?.works ?? []).map((w) => ({
    url: `${SITE_URL}/work/${w.slug}`,
    lastModified: w._updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const notes: MetadataRoute.Sitemap = (data?.notes ?? []).map((n) => ({
    url: `${SITE_URL}/notes/${n.slug}`,
    lastModified: n._updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...works, ...notes];
}
