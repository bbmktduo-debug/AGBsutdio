import Link from "next/link";
import Image from "next/image";
import { getFeaturedWorks, getWorks, getSiteSettings } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import HeroVideo, { HeroCarousel } from "@/components/video/HeroVideo";

type Work = {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category: string;
  thumbnail?: { asset: { _ref: string } };
  year?: number;
};

export const revalidate = 60;

export default async function Home() {
  const [featuredWorks, allWorks, settings] = await Promise.all([
    getFeaturedWorks() as Promise<Work[]>,
    getWorks() as Promise<Work[]>,
    getSiteSettings(),
  ]);

  // featured가 있으면 featured, 없으면 최신 3개
  const displayWorks =
    featuredWorks.length > 0 ? featuredWorks.slice(0, 3) : allWorks.slice(0, 3);

  const heroVideoFiles: string[] = settings?.heroVideoFiles?.filter(Boolean) || [];
  const heroVideoSrc = heroVideoFiles.length > 0 ? null : (settings?.heroVideoFile || null);

  return (
    <>
      {/* ━━━ 슬로건 + 소개문구 ━━━ */}
      <section className="pt-28 md:pt-44 pb-8 md:pb-10">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="font-display text-[clamp(32px,5vw,52px)] font-semibold tracking-tight leading-[1.15]">
              Stories worth Sharing,
              <br />
              from Brands
            </h1>
            <p className="mt-4 text-[clamp(14px,1.5vw,16px)] text-ink/50 leading-relaxed">
              브랜드의 이야기를 다큐멘터리의 방식으로 접근하고 기록합니다
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ 히어로 ━━━ */}
      <section>
        <div className="container-page">
          <div className="relative aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-bg-dark">
            {heroVideoFiles.length > 1 ? (
              <HeroCarousel sources={heroVideoFiles} />
            ) : heroVideoFiles.length === 1 ? (
              <HeroVideo src={heroVideoFiles[0]} />
            ) : heroVideoSrc ? (
              <HeroVideo src={heroVideoSrc} />
            ) : (
              <div className="absolute inset-0 bg-bg-dark" />
            )}
          </div>
        </div>
      </section>

      {/* ━━━ WORKS 최신 3개 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink my-12 md:my-16" />
      </div>

      <section className="pb-12 md:pb-16">
        <div className="container-page">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-[clamp(20px,3vw,28px)] font-semibold tracking-tight">
              WORKS
            </h2>
            <Link
              href="/work"
              className="font-display text-xs tracking-[0.08em] uppercase text-ink/40 hover:text-ink border-b border-ink/20 hover:border-ink pb-0.5 transition-colors duration-200"
            >
              VIEW ALL
            </Link>
          </div>

          {displayWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {displayWorks.map((work) => {
                const accentBg =
                  work.category === "documentary"
                    ? "hover:bg-accent-doc/20"
                    : work.category === "social"
                      ? "hover:bg-accent-social/20"
                      : "hover:bg-accent-branded/20";
                return (
                  <Link
                    key={work._id}
                    href={`/work/${work.slug.current}`}
                    className={`group transition-colors duration-300 ${accentBg}`}
                  >
                    <div className="aspect-video overflow-hidden bg-ink/5 mb-4">
                      {work.thumbnail ? (
                        <Image
                          src={urlFor(work.thumbnail)
                            .width(600)
                            .height(338)
                            .url()}
                          alt={work.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink/15">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm">{work.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {work.client && (
                        <span className="text-xs text-ink/40">
                          {work.client}
                        </span>
                      )}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
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
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border border-ink/10 p-12 text-center">
              <p className="text-ink/30">작업물이 등록되면 표시됩니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ Contact 버튼 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <section className="py-12 md:py-16">
        <div className="container-page flex flex-col items-center text-center">
          <p className="text-ink/50 mb-6">프로젝트 문의는 편하게 연락주세요</p>
          <a
            href="mailto:contact@studio-egb.com"
            className="inline-block font-display text-xs tracking-[0.08em] uppercase px-10 py-3.5 border border-ink text-ink hover:bg-ink hover:text-bg transition-colors duration-200"
          >
            CONTACT US
          </a>
        </div>
      </section>
    </>
  );
}
