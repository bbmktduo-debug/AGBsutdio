import { getAboutPage } from "@/lib/sanity/queries";
import { PortableText } from "next-sanity";

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

// 하드코딩 폴백 (Sanity에 아직 등록 전)
const FALLBACK_HEADLINE =
  "스튜디오에그비는 브랜드의 이야기를 다큐멘터리의 방식으로 접근하고 기록하는 영상 스튜디오입니다.";

const FALLBACK_BODY = [
  "하나의 브랜드가 탄생하고 성장하는 과정에는 켜켜이 쌓인 시간과 사람들의 이야기가 있습니다.",
  "우리의 작업은 호기심을 갖고 사람들에게 귀기울이는 것에서부터 출발합니다.",
  "브랜드에 녹아있는 이야기를 모두가 듣고 싶어하는 콘텐츠로 만들어갑니다.",
];

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutPage();

  const headline = about?.headline || FALLBACK_HEADLINE;
  const hasBody = about?.body && about.body.length > 0;

  return (
    <>
      {/* 헤드라인 */}
      <section className="pt-28 md:pt-32 pb-6">
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
      <section className="py-8 md:py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12">
            <div>
              <h2 className="font-display text-[clamp(18px,2.5vw,24px)] font-semibold tracking-tight">
                WHO WE ARE
              </h2>
            </div>
            <div className="max-w-2xl">
              {/* 하이라이트 문장 */}
              <p className="text-[clamp(18px,2.2vw,24px)] font-bold leading-snug tracking-tight mb-6">
                &ldquo;{headline}&rdquo;
              </p>

              {/* 본문 — Sanity에서 가져오거나 폴백 */}
              {hasBody ? (
                <div className="about-body space-y-4 text-ink/70 text-[clamp(15px,1.6vw,17px)] leading-[1.8] tracking-tight">
                  <PortableText value={about.body} />
                </div>
              ) : (
                <div className="space-y-4 text-ink/70 text-[clamp(15px,1.6vw,17px)] leading-[1.8] tracking-tight">
                  {FALLBACK_BODY.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 라인 */}
      <div className="container-page">
        <div className="border-b border-ink/10" />
      </div>

      {/* HOW WE WORK — 도식화 */}
      <section className="py-8 md:py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12">
            <div>
              <h2 className="font-display text-[clamp(18px,2.5vw,24px)] font-semibold tracking-tight">
                HOW WE WORK
              </h2>
            </div>
            <div>
              {/* 흐름도: 1→2→3→4→5 */}
              <div className="flex flex-col gap-0">
                {PROCESS_STEPS.map(({ step, desc }, i) => (
                  <div key={step} className="flex items-start gap-4 md:gap-6">
                    {/* 좌측: 번호 원 + 연결선 */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-ink flex items-center justify-center">
                        <span className="font-display text-sm md:text-base font-semibold">
                          {i + 1}
                        </span>
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="w-[2px] h-8 md:h-10 bg-ink/15" />
                      )}
                    </div>

                    {/* 우측: 제목 + 설명 */}
                    <div className={`pt-1.5 ${i < PROCESS_STEPS.length - 1 ? "pb-2" : ""}`}>
                      <h3 className="font-display text-[clamp(16px,2vw,20px)] font-semibold tracking-[0.02em] mb-1">
                        {step}
                      </h3>
                      <p className="text-[clamp(14px,1.4vw,16px)] text-ink/60 leading-[1.7] tracking-tight">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
