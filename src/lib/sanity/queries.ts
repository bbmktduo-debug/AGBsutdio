import { client } from "./client";

/* ── Site Settings ── */
export async function getSiteSettings() {
  return client.fetch(
    `*[_id == "siteSettings" || _type == "siteSettings"][0] {
      heroVideoUrl,
      "heroVideoFile": heroVideo.asset->url,
      "heroVideoFiles": heroVideos[].video.asset->url,
      "heroLinkedWorks": heroVideos[]{
        "slug": linkedWork->slug.current
      }
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

/* ── About Page ── */
export async function getAboutPage() {
  return client.fetch(
    `*[_type == "aboutPage"][0] {
      headline,
      body
    }`
  );
}

/* ── Story (레거시, 유지) ── */
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

/* ── Note ── */
export async function getNoteCategories() {
  return client.fetch(
    `*[_type == "noteCategory"] | order(sortOrder asc) {
      _id, name, slug, color
    }`
  );
}

export async function getNotes(categorySlug?: string) {
  const filter = categorySlug
    ? `&& category->slug.current == $categorySlug`
    : "";
  return client.fetch(
    `*[_type == "note" && published == true ${filter}] | order(publishedAt desc) {
      _id, title, slug, thumbnail, publishedAt,
      "categoryName": category->name,
      "categoryColor": category->color,
      "categorySlug": category->slug.current
    }`,
    categorySlug ? { categorySlug } : {}
  );
}

export async function getNote(slug: string) {
  return client.fetch(
    `*[_type == "note" && slug.current == $slug][0] {
      _id, title, slug, thumbnail, publishedAt, body,
      "categoryName": category->name,
      "categoryColor": category->color
    }`,
    { slug }
  );
}
