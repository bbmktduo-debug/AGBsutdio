const PROCESS_STEPS = [
  {
    step: "Listen",
    desc: "브랜드가 하고 싶은 이야기와 현재의 고민을 함께 듣습니다. 스튜디오에그비가 가장 중요하게 생각하는 기획과 관점의 출발점이며, 콘텐츠의 컬러와 메시지를 정의하는 토대가 됩니다.",
  },
  {
    step: "Discover",
    desc: "브랜드 내부의 사람, 제품, 서비스 혹은 브랜드 주변으로 연결된 다양한 주체들 사이에 숨어있는 이야기를 함께 발굴합니다. 좋은 이야기는 멀지 않은 곳에 있습니다.",
  },
  {
    step: "Shape",
    desc: "목적과 타겟에 맞게 콘텐츠의 포맷과 메시지를 구체화합니다. 콘텐츠에 자연스럽게 몰입할 수 있도록 이야기의 구조와 전달 방식을 함께 설계합니다.",
  },
  {
    step: "Make",
    desc: "촬영, 그래픽, 생성형 AI 툴 등을 활용해 콘텐츠를 완성합니다. 필요에 따라 유튜브 및 SNS 채널 운영, 시리즈 기획, 콘텐츠 광고 및 확산 전략까지 함께 고민합니다.",
  },
  {
    step: "Review",
    desc: "결과물에 대한 피드백을 함께 나누고, 이를 바탕으로 다음 콘텐츠를 더 나은 방향으로 발전시켜 나갑니다.",
  },
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

      {/* WHO WE ARE */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                WHO WE ARE
              </p>
            </div>
            <div className="max-w-2xl">
              {/* 첫 문장 — 하이라이트 (Clash Display, 큰 사이즈) */}
              <p className="font-display text-[clamp(20px,2.5vw,28px)] font-semibold leading-snug tracking-tight mb-8">
                스튜디오에그비는 브랜드의 이야기를
                <br className="hidden md:block" />
                다큐멘터리의 방식으로 접근하고 기록하는
                <br className="hidden md:block" />
                영상 스튜디오입니다.
              </p>

              {/* 나머지 소개글 */}
              <div className="space-y-5 text-ink/60 leading-relaxed">
                <p>
                  하나의 브랜드가 탄생하고 성장하는 과정에는 켜켜이 쌓인 시간과
                  사람들의 이야기가 있습니다.
                </p>
                <p>
                  우리의 작업은 호기심을 갖고 사람들에게 귀기울이는 것에서부터
                  출발합니다.
                </p>
                <p>
                  브랜드에 녹아있는 이야기를 모두가 듣고 싶어하는 콘텐츠로
                  만들어갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 슬로건 */}
      <section className="bg-accent-etc/30 py-20 md:py-28">
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

      {/* HOW WE WORK */}
      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
                HOW WE WORK
              </p>
            </div>
            <div className="space-y-0">
              {PROCESS_STEPS.map(({ step, desc }, i) => (
                <div
                  key={step}
                  className={`py-6 md:py-8 ${
                    i < PROCESS_STEPS.length - 1
                      ? "border-b border-ink/10"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-display text-[11px] tracking-[0.08em] text-ink/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-[0.02em]">
                      {step}
                    </h3>
                  </div>
                  <p className="text-sm text-ink/50 leading-relaxed md:pl-10">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
