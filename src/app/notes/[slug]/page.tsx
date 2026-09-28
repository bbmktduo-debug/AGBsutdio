import { notFound } from "next/navigation";
import Image from "next/image";
import { getNote } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

function summarize(text: string | undefined, max = 155) {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (!t) return "";
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return { title: "노트를 찾을 수 없습니다" };

  const description =
    summarize(note.plainBody) || `${note.title} — 스튜디오에그비 노트`;
  const ogImage = note.thumbnail
    ? urlFor(note.thumbnail).width(1200).height(630).url()
    : undefined;

  return {
    title: note.title,
    description,
    alternates: { canonical: `/notes/${slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description,
      url: `${SITE_URL}/notes/${slug}`,
      publishedTime: note.publishedAt || undefined,
      modifiedTime: note._updatedAt || undefined,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export const revalidate = 60;

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNote(slug);

  if (!note) return notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: summarize(note.plainBody, 300) || undefined,
    image: note.thumbnail ? [urlFor(note.thumbnail).width(1200).url()] : undefined,
    datePublished: note.publishedAt || undefined,
    dateModified: note._updatedAt || undefined,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${SITE_URL}/notes/${slug}`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <article className="pt-32 md:pt-40 pb-24 md:pb-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="container-page">
        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-[clamp(24px,4vw,40px)] font-semibold leading-snug mb-4">
            {note.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-ink/40">
            {note.categoryName && (
              <span
                className="text-[11px] px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: note.categoryColor
                    ? `${note.categoryColor}66`
                    : "rgba(0,0,0,0.06)",
                }}
              >
                {note.categoryName}
              </span>
            )}
            {note.publishedAt && (
              <time>
                {new Date(note.publishedAt).toLocaleDateString("ko-KR")}
              </time>
            )}
          </div>
        </div>

        {/* 라인 */}
        <div className="border-b border-ink mb-10" />

        {/* 대표 이미지 */}
        {note.thumbnail && (
          <div className="mb-10">
            <Image
              src={urlFor(note.thumbnail).width(1200).url()}
              alt={note.title}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* 본문 */}
        {note.body && (
          <div className="prose-egb max-w-3xl">
            <PortableText
              value={note.body}
              components={{
                types: {
                  image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => (
                    <div className="my-8">
                      <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || ""}
                        width={1200}
                        height={675}
                        className="w-full h-auto"
                      />
                    </div>
                  ),
                },
              }}
            />
          </div>
        )}
      </div>
    </article>
  );
}
