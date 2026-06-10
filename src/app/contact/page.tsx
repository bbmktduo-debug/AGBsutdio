export default function ContactPage() {
  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-40">
      <div className="container-page">
        <h1 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight mb-16">
          CONTACT
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl">
          <div className="space-y-8">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                EMAIL
              </p>
              <a
                href="mailto:contact@studio-egb.com"
                className="text-lg hover:underline"
              >
                contact@studio-egb.com
              </a>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                PHONE
              </p>
              <a href="tel:010-9177-9071" className="text-lg hover:underline">
                010-9177-9071
              </a>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                ADDRESS
              </p>
              <p className="text-lg">서울특별시 성동구 연무정13길 8</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30 mb-2">
                INSTAGRAM
              </p>
              <a
                href="https://instagram.com/studioegb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:underline"
              >
                @studioegb
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-16 border-t border-ink/10 max-w-3xl">
          <p className="text-ink/40 leading-relaxed">
            프로젝트 문의, 협업 제안 등 편하게 연락주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
