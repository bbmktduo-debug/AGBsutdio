import { defineType, defineField } from "sanity";
import { getYouTubeId } from "../../src/lib/youtube";

export default defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  groups: [
    { name: "hero", title: "메인 화면", default: true },
    { name: "contact", title: "연락처" },
    { name: "seo", title: "검색 노출(SEO)" },
  ],
  fields: [
    /* ── 메인 화면: 상단 문구 ── */
    defineField({
      name: "heroTitleKo",
      title: "메인 상단 문구 (국문)",
      type: "string",
      group: "hero",
      description: "메인 페이지 영상 위에 표시되는 국문 한 줄 (예: 브랜드에서 시작되는 이야기)",
    }),
    defineField({
      name: "heroTitleEn",
      title: "메인 상단 문구 (영문)",
      type: "string",
      group: "hero",
      description: "국문 문구 아래에 크게 표시되는 영문 한 줄 (예: Stories worth Sharing, from Brands)",
    }),

    /* ── 메인 화면: 히어로 영상 ── */
    defineField({
      name: "heroVideos",
      title: "히어로 배경 영상 (복수)",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "video",
              title: "영상 파일",
              type: "file",
              options: { accept: "video/mp4,.mp4" },
              description: "MP4 파일만 올릴 수 있어요. MOV 등 다른 형식은 MP4로 변환해서 올려 주세요.",
            }),
            defineField({
              name: "linkedWork",
              title: "연결된 작업물",
              type: "reference",
              to: [{ type: "work" }],
              description: "클릭 시 이동할 작업물 (선택)",
            }),
          ],
          preview: {
            select: { title: "linkedWork.title", videoFileName: "video.asset.originalFilename" },
            prepare: ({ title, videoFileName }) => ({
              title: title || "연결된 작업물 없음",
              subtitle: videoFileName || "영상 미등록",
            }),
          },
        },
      ],
      description:
        "메인 히어로에 순서대로 자동재생될 배경 영상들. MP4 파일만 올릴 수 있어요 (MOV 불가). 각 영상에 작업물을 연결하면 클릭 시 해당 페이지로 이동합니다. 영상을 올리면 아래 YouTube 링크보다 우선 표시돼요.",
    }),
    defineField({
      name: "heroVideo",
      title: "히어로 배경 영상 (레거시, 단일)",
      type: "file",
      group: "hero",
      options: { accept: "video/mp4" },
      description: "기존 단일 영상 필드 — 위 복수 필드를 우선 사용합니다",
      hidden: true,
    }),
    defineField({
      name: "heroVideoUrl",
      title: "히어로 영상 (YouTube 링크)",
      type: "url",
      group: "hero",
      description:
        "위에 올린 MP4 영상이 없을 때 메인에 배경으로 표시돼요 (소리 없이 자동재생·반복). 예: https://youtu.be/영상ID",
      validation: (r) =>
        r.custom((url?: string) =>
          !url || getYouTubeId(url) ? true : "YouTube 영상 링크만 입력할 수 있어요 (youtu.be / youtube.com)"
        ),
    }),

    /* ── 연락처 (Contact 페이지 · 헤더 · 푸터에 공통 사용) ── */
    defineField({
      name: "email",
      title: "이메일",
      type: "string",
      group: "contact",
      description: "Contact 페이지, 헤더 CONTACT 버튼, 푸터에 표시됩니다.",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "phone",
      title: "전화번호",
      type: "string",
      group: "contact",
      description: "예: 010-9177-9071",
    }),
    defineField({
      name: "address",
      title: "주소",
      type: "string",
      group: "contact",
      description: "예: 서울특별시 성동구 연무장13길 8",
    }),
    defineField({
      name: "instagramHandle",
      title: "인스타그램 아이디",
      type: "string",
      group: "contact",
      description: "@ 없이 아이디만 입력 (예: studioegb)",
    }),
    defineField({
      name: "instagramUrl",
      title: "인스타그램 링크",
      type: "url",
      group: "contact",
      description: "비워두면 아이디로 자동 생성됩니다 (https://instagram.com/아이디)",
    }),
    defineField({
      name: "contactMessage",
      title: "Contact 안내 문구",
      type: "text",
      rows: 2,
      group: "contact",
      description: "Contact 페이지 하단 안내 문구 (예: 프로젝트 문의, 협업 제안 등 편하게 연락주세요.)",
    }),

    /* ── SEO ── */
    defineField({
      name: "seoTitle",
      title: "사이트 제목",
      type: "string",
      group: "seo",
      description: "브라우저 탭·검색 결과에 표시되는 사이트 이름 (예: 스튜디오에그비 — Studio EGB)",
    }),
    defineField({
      name: "seoDescription",
      title: "사이트 설명",
      type: "text",
      rows: 3,
      group: "seo",
      description: "검색 결과에 표시되는 요약 문장. 80~160자 권장.",
      validation: (r) => r.max(200).warning("160자 이내를 권장합니다."),
    }),
    defineField({
      name: "seoKeywords",
      title: "검색 키워드",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "seo",
      description: "검색에 걸리길 원하는 단어들 (예: 브랜드 영상, 다큐멘터리 영상 제작, 영상 스튜디오)",
    }),
    defineField({
      name: "ogImage",
      title: "공유 썸네일 (OG 이미지)",
      type: "image",
      group: "seo",
      description: "카카오톡·SNS·메신저에 링크를 공유할 때 보이는 이미지. 1200×630 권장. 비워두면 기본 로고 이미지가 사용됩니다.",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google Search Console 인증 코드",
      type: "string",
      group: "seo",
      description: "구글 서치 콘솔 → HTML 태그 방식의 content 값만 입력",
    }),
    defineField({
      name: "naverSiteVerification",
      title: "네이버 서치어드바이저 인증 코드",
      type: "string",
      group: "seo",
      description: "네이버 서치어드바이저 → HTML 태그 방식의 content 값만 입력",
    }),
  ],
  preview: {
    prepare: () => ({ title: "사이트 설정" }),
  },
});
