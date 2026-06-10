import Link from "next/link";
import Image from "next/image";
import { getWorks } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import CategoryFilter from "@/components/work/CategoryFilter";

type Work = {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  category: string;
  thumbnail?: { asset: { _ref: string } };
  year?: number;
  featured?: boolean;
};

export const revalidate = 60;

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const works: Work[] = await getWorks(category);

  return (
    <>
      {/* 헤드라인 */}
      <section className="pt-32 md:pt-40 pb-8">
        <div className="container-page">
          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight">
            WORKS
          </h1>
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      {/* 필터 */}
      <section className="py-6">
        <div className="container-page">
          <CategoryFilter current={category} />
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink/10" />
      </div>

      {/* 그리드 */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          {works.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-ink/30">등록된 작업물이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
              {works.map((work) => (
                <Link
                  key={work._id}
                  href={`/work/${work.slug.current}`}
                  className="group bg-bg p-5 md:p-6"
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
                  <h3 className="font-semibold text-[15px]">{work.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    {work.client && (
                      <span className="text-sm text-ink/40">{work.client}</span>
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
