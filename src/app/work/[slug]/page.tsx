import { getWork } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

type Work = {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category: string;
  youtubeUrl?: string;
  year?: number;
  description?: unknown[];
  featured?: boolean;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

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
    <section className="pt-28 md:pt-36 pb-24 md:pb-40">
      <div className="container-page max-w-4xl">
        <h1 className="text-[clamp(24px,4vw,40px)] font-semibold leading-tight mb-4">
          {work.title}
        </h1>

        <div className="flex gap-3 text-sm text-ink/50 mb-10">
          {work.client && <span>{work.client}</span>}
          {work.year && <span>{work.year}</span>}
          <span className="capitalize">{work.category}</span>
        </div>

        {videoId && (
          <div className="aspect-video mb-12">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={work.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
