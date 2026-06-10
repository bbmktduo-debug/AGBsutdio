import Link from "next/link";
import Image from "next/image";
import { getFeaturedWorks, getWorks, getSiteSettings } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import HeroVideo from "@/components/video/HeroVideo";
import InstagramFeed from "@/components/layout/InstagramFeed";

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

  const displayWorks =
    featuredWorks.length > 0 ? featuredWorks : allWorks.slice(0, 4);

  const heroVideoSrc = settings?.heroVideoFile || null;

  return (
    <>
      {/* ━━━ 히어로 ━━━ */}
      <section className="pt-24 md:pt-28">
        <div className="relative aspect-[4/3] md:aspect-[16/6] overflow-hidden bg-bg-dark">
          {heroVideoSrc ? (
            <HeroVideo src={heroVideoSrc} />
          ) : (
            <div className="absolute inset-0 bg-bg-dark" />
          )}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="font-display text-on-dark text-[clamp(28px,5vw,64px)] font-semibold tracking-tight leading-[1.1] text-center">
              Stories worth Sharing, from Brands
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ ABOUT 섹션 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink my-16 md:my-24" />
      </div>

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-[clamp(20px,3vw,28px)] font-semibold tracking-tight">
              ABOUT
            </h2>
            <Link
              href="/about"
              className="font-display text-xs tracking-[0.08em] uppercase text-ink/40 hover:text-ink border-b border-ink/20 hover:border-ink pb-0.5 transition-colors duration-200"
            >
              MORE
            </Link>
          </div>

          <div className="max-w-2xl">
            <p className="text-[clamp(20px,2.5vw,28px)] font-semibold leading-snug mb-6">
              브랜드에서 시작되는 이야기
            </p>
            <div className="space-y-4 text-ink/60 leading-relaxed">
              <p>
                스튜디오에그비는 브랜드의 이야기를 다큐멘터리의 방식으로
                접근하고 기록하는 영상 스튜디오입니다.
              </p>
              <p>
                하나의 브랜드가 탄생하고 성장하는 과정엔 켜켜이 쌓인 시간들이
                있습니다. 그 시간을 묵묵히 밟아가는 사람들에겐 많은 이야기들이
                숨어있습니다.
              </p>
              <p>
                우리의 작업은 만나는 이들에게 호기심을 갖고 그들에게
                귀기울이는 것에서부터 출발합니다.
              </p>
            </div>

            {/* 카테고리 — 파스텔 보더 */}
            <div className="mt-10 space-y-4">
              <div className="p-4 border-l-[3px] border-accent-doc">
                <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                  Documentary
                </p>
                <p className="text-sm text-ink/40 mt-0.5">
                  브랜드의 본질을 다큐멘터리로 기록합니다
                </p>
              </div>
              <div className="p-4 border-l-[3px] border-accent-social">
                <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                  Social
                </p>
                <p className="text-sm text-ink/40 mt-0.5">
                  소셜 채널에 맞는 콘텐츠를 만듭니다
                </p>
              </div>
              <div className="p-4 border-l-[3px] border-accent-branded">
                <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                  Branded
                </p>
                <p className="text-sm text-ink/40 mt-0.5">
                  브랜드의 메시지를 영상으로 전달합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ PORTFOLIO 섹션 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="flex items-center justify-between mb-12">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10">
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
                    className={`group bg-bg p-6 md:p-8 transition-colors duration-300 ${accentBg}`}
                  >
                    <div className="aspect-video overflow-hidden bg-ink/5 mb-5">
                      {work.thumbnail ? (
                        <Image
                          src={urlFor(work.thumbnail)
                            .width(800)
                            .height(450)
                            .url()}
                          alt={work.title}
                          width={800}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink/15">
                          No Image
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold">{work.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      {work.client && (
                        <span className="text-sm text-ink/40">
                          {work.client}
                        </span>
                      )}
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full ${
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

      {/* 카테고리 배너 */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-accent-doc/40 p-8 md:p-10">
              <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase mb-2">
                Documentary
              </p>
              <p className="text-sm text-ink/50 leading-relaxed">
                브랜드의 본질을 다큐멘터리로 기록합니다
              </p>
            </div>
            <div className="bg-accent-social/40 p-8 md:p-10">
              <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase mb-2">
                Social
              </p>
              <p className="text-sm text-ink/50 leading-relaxed">
                소셜 채널에 맞는 콘텐츠를 만듭니다
              </p>
            </div>
            <div className="bg-accent-branded/40 p-8 md:p-10">
              <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase mb-2">
                Branded
              </p>
              <p className="text-sm text-ink/50 leading-relaxed">
                브랜드의 메시지를 영상으로 전달합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ INSTAGRAM 섹션 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <InstagramFeed />

      {/* ━━━ CONTACT 섹션 ━━━ */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                CONTACT
              </p>
            </div>
            <div>
              <h2 className="text-[clamp(22px,3vw,32px)] font-semibold leading-snug mb-8">
                프로젝트 문의
              </h2>
              <p className="text-ink/50 leading-relaxed max-w-lg mb-10">
                브랜드 영상, 다큐멘터리, 소셜 콘텐츠 제작 문의 등 편하게
                연락주세요.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="font-display text-[11px] tracking-[0.08em] uppercase text-ink/25 mb-2">
                    EMAIL
                  </p>
                  <a
                    href="mailto:contact@studio-egb.com"
                    className="text-ink hover:underline"
                  >
                    contact@studio-egb.com
                  </a>
                </div>
                <div>
                  <p className="font-display text-[11px] tracking-[0.08em] uppercase text-ink/25 mb-2">
                    PHONE
                  </p>
                  <a
                    href="tel:010-9177-9071"
                    className="text-ink hover:underline"
                  >
                    010-9177-9071
                  </a>
                </div>
                <div>
                  <p className="font-display text-[11px] tracking-[0.08em] uppercase text-ink/25 mb-2">
                    INSTAGRAM
                  </p>
                  <a
                    href="https://instagram.com/studioegb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:underline"
                  >
                    @studioegb
                  </a>
                </div>
                <div>
                  <p className="font-display text-[11px] tracking-[0.08em] uppercase text-ink/25 mb-2">
                    ADDRESS
                  </p>
                  <p>서울특별시 성동구 연무정13길 8</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-block mt-10 font-display text-xs tracking-[0.08em] uppercase px-8 py-3 border border-ink text-ink hover:bg-ink hover:text-bg transition-colors duration-200"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
