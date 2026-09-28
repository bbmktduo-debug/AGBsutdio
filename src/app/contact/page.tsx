import type { Metadata } from "next";
import { getSiteContentRaw } from "@/lib/sanity/queries";
import { resolveSiteContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "스튜디오에그비에 프로젝트 문의, 협업 제안을 남겨주세요. 브랜드 영상·다큐멘터리·소셜 콘텐츠 제작 상담.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const site = resolveSiteContent(await getSiteContentRaw().catch(() => null));
  const telHref = `tel:${site.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="pt-28 md:pt-32 pb-10 md:pb-16">
      <div className="container-page">
        <h1 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight mb-10">
          CONTACT
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
          <div className="space-y-6">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                EMAIL
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 text-lg hover:underline"
              >
                <svg className="w-5 h-5 text-ink/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {site.email}
              </a>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                PHONE
              </p>
              <a
                href={telHref}
                className="inline-flex items-center gap-2.5 text-lg hover:underline"
              >
                <svg className="w-5 h-5 text-ink/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                {site.phone}
              </a>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                ADDRESS
              </p>
              <p className="inline-flex items-center gap-2.5 text-lg">
                <svg className="w-5 h-5 text-ink/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {site.address}
              </p>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                INSTAGRAM
              </p>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-lg hover:underline"
              >
                <svg className="w-5 h-5 text-ink/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                @{site.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ink/10 max-w-3xl">
          <p className="text-ink/40 leading-relaxed">
            {site.contactMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
