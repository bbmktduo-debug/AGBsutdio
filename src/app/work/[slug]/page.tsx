import { getWork } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";

type Work = {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category: string;
  youtubeUrl?: string;
  year?: number;
  description?: PortableTextBlock[];
  stills?: { asset: { _ref: string } }[];
  featured?: boolean;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string } } }) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt=""
          width={1200}
          height={675}
          className="w-full h-auto"
        />
      </div>
    ),
  },
};

export const revalidate = 60;

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work: Work | null = await getWork(slug);

  if (!work) notFound();

  const videoId = work.youtubeUrl ? getYouTubeId(work.youtubeUrl) : null;

  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-40">
      <div className="container-page max-w-4xl">
        {/* 제목 */}
        <h1 className="font-display text-[clamp(24px,4vw,40px)] font-semibold tracking-tight leading-tight">
          {work.title}
        </h1>

        <div className="flex gap-3 text-sm text-ink/50 mt-3 mb-10">
          {work.client && <span>{work.client}</span>}
          {work.year && <span>{work.year}</span>}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] ${
              work.category === "documentary"
                ? "bg-accent-doc"
                : work.category === "social"
                  ? "bg-accent-social"
                  : "bg-accent-branded"
            }`}
          >
            {work.category}
          </span>
        </div>

        {/* 라인 */}
        <div className="border-b border-ink mb-10" />

        {/* YouTube 영상 */}
        {videoId && (
          <div className="aspect-video mb-12">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>
        )}

        {/* 설명 (리치 텍스트) */}
        {work.description && work.description.length > 0 && (
          <div className="prose prose-lg max-w-none mb-16 leading-relaxed text-ink/70 [&_strong]:text-ink [&_h2]:font-display [&_h2]:text-ink [&_h2]:tracking-tight [&_h3]:text-ink [&_blockquote]:border-l-accent-etc [&_blockquote]:text-ink/50">
            <PortableText
              value={work.description}
              components={ptComponents}
            />
          </div>
        )}

        {/* 스틸컷 */}
        {work.stills && work.stills.length > 0 && (
          <>
            <div className="border-b border-ink mb-10" />
            <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-6">
              STILLS
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {work.stills.map((still, i) => (
                <Image
                  key={i}
                  src={urlFor(still).width(800).height(450).url()}
                  alt={`${work.title} 스틸컷 ${i + 1}`}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
