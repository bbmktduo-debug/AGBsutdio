const CLIENTS = [
  { name: "LG사이언스파크", work: "연구의 꿈, 꿈의 연구" },
  { name: "LG전자", work: "BOLD MOVE" },
  { name: "LG", work: "TIMELESS : 시간을 잇는 건축" },
  { name: "넥슨", work: "서로가 팬이 된다는 것" },
  { name: "토스애즈", work: "광고, 파트너와 함께 문제를 해결하는 여정" },
  { name: "현대건설", work: "부림동 41번지를 기록하다" },
  { name: "LG화학", work: "How to Live Green with Invisible Sustainability" },
  { name: "LG Green Tech Innovation Center", work: "Stacking Future" },
];

export default function AboutPage() {
  return (
    <>
      {/* 헤드라인 */}
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container-page">
          <h1 className="font-display text-[clamp(32px,5vw,56px)] font-semibold tracking-tight">
            ABOUT
          </h1>
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      {/* 소개 카피 */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                WHO WE ARE
              </p>
            </div>
            <div className="space-y-6 text-lg leading-relaxed max-w-2xl">
              <p>
                스튜디오에그비는 브랜드의 이야기를 다큐멘터리의 방식으로 접근하고
                기록하는 영상 스튜디오입니다.
              </p>
              <p className="text-ink/60">
                하나의 브랜드가 탄생하고 성장하는 과정엔 켜켜이 쌓인 시간들이
                있습니다. 그 시간을 묵묵히 밟아가는 사람들에겐 많은 이야기들이
                숨어있습니다.
              </p>
              <p className="text-ink/60">
                우리의 작업은 만나는 이들에게 호기심을 갖고 그들에게 귀기울이는
                것에서부터 출발합니다.
              </p>
              <p className="text-ink/60">
                브랜드에 녹아있는 이야기를 모두가 듣고싶어하는 콘텐츠로
                만들어갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 슬로건 — 파스텔 etc 배경 */}
      <section className="bg-accent-etc/30 py-20 md:py-32">
        <div className="container-page text-center">
          <p className="font-display text-[clamp(20px,3vw,32px)] font-semibold tracking-tight text-ink/80">
            <span className="text-ink/20">&ldquo;</span>
            {" "}Stories worth Sharing, from Brands{" "}
            <span className="text-ink/20">&rdquo;</span>
          </p>
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      {/* 카테고리 소개 */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                WHAT WE DO
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 border-l-[3px] border-accent-doc">
                <div>
                  <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                    Documentary
                  </p>
                  <p className="text-sm text-ink/50 mt-1">
                    브랜드의 본질을 다큐멘터리로 기록합니다
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 border-l-[3px] border-accent-social">
                <div>
                  <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                    Social
                  </p>
                  <p className="text-sm text-ink/50 mt-1">
                    소셜 채널에 맞는 콘텐츠를 만듭니다
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 border-l-[3px] border-accent-branded">
                <div>
                  <p className="font-display text-sm font-semibold tracking-[0.04em] uppercase">
                    Branded
                  </p>
                  <p className="text-sm text-ink/50 mt-1">
                    브랜드의 메시지를 영상으로 전달합니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink" />
      </div>

      {/* 주요 클라이언트 */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                SELECTED CLIENTS
              </p>
            </div>
            <div>
              {CLIENTS.map(({ name, work }, i) => (
                <div
                  key={name}
                  className={`flex flex-col md:flex-row md:items-center md:justify-between py-5 ${
                    i < CLIENTS.length - 1 ? "border-b border-ink/10" : ""
                  }`}
                >
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-ink/40 mt-1 md:mt-0">{work}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
