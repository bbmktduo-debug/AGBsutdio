import { client } from "./client";

/* ── Site Settings ── */
export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      heroVideoUrl,
      "heroVideoFile": heroVideo.asset->url
    }`
  );
}

/* ── Work ── */
export async function getWorks(category?: string) {
  const filter = category ? `&& category == $category` : "";
  return client.fetch(
    `*[_type == "work" ${filter}] | order(sortOrder asc, _createdAt desc) {
      _id, title, slug, client, category, thumbnail, year, featured
    }`,
    category ? { category } : {}
  );
}

export async function getWork(slug: string) {
  return client.fetch(
    `*[_type == "work" && slug.current == $slug][0] {
      _id, title, slug, client, category, youtubeUrl, thumbnail,
      year, description, stills, featured
    }`,
    { slug }
  );
}

export async function getFeaturedWorks() {
  return client.fetch(
    `*[_type == "work" && featured == true] | order(sortOrder asc) {
      _id, title, slug, client, category, thumbnail, year
    }`
  );
}

/* ── Story ── */
export async function getStories() {
  return client.fetch(
    `*[_type == "story" && published == true] | order(publishedAt desc) {
      _id, title, slug, coverImage, publishedAt
    }`
  );
}

export async function getStory(slug: string) {
  return client.fetch(
    `*[_type == "story" && slug.current == $slug][0] {
      _id, title, slug, coverImage, publishedAt, body
    }`,
    { slug }
  );
}
