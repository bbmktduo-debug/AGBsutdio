/**
 * 사이트 공통 콘텐츠 (문구·연락처·SEO)
 * - 어드민(Sanity)의 "사이트 설정"에서 수정하면 이 값이 덮어씌워집니다.
 * - 아래 DEFAULTS는 어드민에 값이 비어 있을 때의 기본값(폴백)입니다.
 */

export const SITE_URL = "https://www.studio-egb.com";

export type ProcessStep = { step: string; desc?: string };

export type SiteContent = {
  heroTitleKo: string;
  heroTitleEn: string;
  email: string;
  phone: string;
  address: string;
  instagramHandle: string;
  instagramUrl: string;
  contactMessage: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  ogImageUrl: string;
  googleSiteVerification?: string;
  naverSiteVerification?: string;
};

export type ContactInfo = Pick<
  SiteContent,
  "email" | "phone" | "address" | "instagramHandle" | "instagramUrl"
>;

export const DEFAULT_SITE: SiteContent = {
  heroTitleKo: "브랜드에서 시작되는 이야기",
  heroTitleEn: "Stories worth Sharing, from Brands",
  email: "contact@studio-egb.com",
  phone: "010-9177-9071",
  address: "서울특별시 성동구 연무장13길 8",
  instagramHandle: "studioegb",
  instagramUrl: "https://instagram.com/studioegb",
  contactMessage: "프로젝트 문의, 협업 제안 등 편하게 연락주세요.",
  seoTitle: "스튜디오에그비 — Studio EGB",
  seoDescription:
    "브랜드에서 시작되는 이야기. 스튜디오에그비는 브랜드의 이야기를 다큐멘터리 방식으로 기록하는 영상 스튜디오입니다. 브랜드 다큐멘터리, 소셜 콘텐츠, 브랜디드 영상 제작.",
  seoKeywords: [
    "스튜디오에그비",
    "Studio EGB",
    "브랜드 영상 제작",
    "브랜드 다큐멘터리",
    "영상 스튜디오",
    "브랜디드 콘텐츠",
    "소셜 콘텐츠 제작",
    "유튜브 채널 운영",
    "성수동 영상 제작",
  ],
  ogImageUrl: `${SITE_URL}/og-image.png`,
};

export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
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

type RawSettings = Partial<{
  heroTitleKo: string | null;
  heroTitleEn: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  instagramHandle: string | null;
  instagramUrl: string | null;
  contactMessage: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
  ogImageUrl: string | null;
  googleSiteVerification: string | null;
  naverSiteVerification: string | null;
}> | null;

const pick = (v: string | null | undefined, fallback: string) =>
  v && v.trim() ? v.trim() : fallback;

/** Sanity 값 + 기본값 병합 */
export function resolveSiteContent(raw: RawSettings): SiteContent {
  const d = DEFAULT_SITE;
  const handle = pick(raw?.instagramHandle, d.instagramHandle).replace(/^@/, "");
  return {
    heroTitleKo: pick(raw?.heroTitleKo, d.heroTitleKo),
    heroTitleEn: pick(raw?.heroTitleEn, d.heroTitleEn),
    email: pick(raw?.email, d.email),
    phone: pick(raw?.phone, d.phone),
    address: pick(raw?.address, d.address),
    instagramHandle: handle,
    instagramUrl: pick(raw?.instagramUrl, `https://instagram.com/${handle}`),
    contactMessage: pick(raw?.contactMessage, d.contactMessage),
    seoTitle: pick(raw?.seoTitle, d.seoTitle),
    seoDescription: pick(raw?.seoDescription, d.seoDescription),
    seoKeywords:
      raw?.seoKeywords && raw.seoKeywords.length > 0 ? raw.seoKeywords : d.seoKeywords,
    ogImageUrl: pick(raw?.ogImageUrl, d.ogImageUrl),
    googleSiteVerification: raw?.googleSiteVerification || undefined,
    naverSiteVerification: raw?.naverSiteVerification || undefined,
  };
}
