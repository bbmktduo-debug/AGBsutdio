# CLAUDE.md — 스튜디오에그비(Studio EGB) 공식 웹사이트

@AGENTS.md
@DESIGN.md

## 프로젝트 개요

스튜디오에그비의 공식 웹사이트를 새로 구축하는 프로젝트. 에그비는 **브랜드의 이야기를 다큐멘터리 방식으로 기록하는 영상 스튜디오**다. 작업물(영상)을 중심에 둔 **미니멀·여백 중심** 디자인이 핵심이며, 콘텐츠(포트폴리오·에디토리얼)는 클라이언트가 **CMS로 직접 운영**한다.

- **언어:** 국문 단일 (영문 미지원)
- **슬로건:** EVERYDAY GETTING BETTER
- **브랜드 메시지:** 브랜드에서 시작되는 이야기 / Stories worth Sharing, from Brands
- **레퍼런스:** studiopebs.com(구조), ambienceseoul.com(미니멀 B&W 톤)
- 상세 제품 요구사항은 PRD 문서 참조.

## 기술 스택

- **프레임워크:** Next.js (App Router) + TypeScript
- **스타일링:** Tailwind CSS
- **CMS:** Sanity (콘텐츠 자체 운영, 필드 라벨 한글화)
- **영상:** YouTube 임베드 (lite-youtube-embed로 성능 최적화)
- **폰트:** Clash Display(영문/숫자/디스플레이) + Pretendard(국문 본문) — 사용 규칙은 DESIGN.md
- **이미지:** next/image + Sanity 이미지 CDN
- **모션:** Framer Motion (절제된 인터랙션, 선택)
- **문의 메일:** Resend *(문의 폼 채택 시)*
- **배포:** Vercel

## 아키텍처 원칙

1. **콘텐츠는 Sanity가 단일 소스(SSOT)** — 작업물·에디토리얼은 코드에 하드코딩하지 않고 Sanity에서 가져온다.
2. **렌더링은 SSG/ISR 우선** — SEO·성능을 위해 정적 생성 + 증분 재검증(ISR)을 기본으로 한다.
3. **서버 컴포넌트 우선** — 데이터 패칭은 서버에서. 클라이언트 컴포넌트는 인터랙션이 필요한 곳(필터, 모션)만.
4. **영상은 임베드만** — 자체 호스팅/스트리밍 없음. YouTube 링크 → 반응형 임베드.
5. **시크릿은 환경변수로만** — Sanity 토큰, Resend 키 등은 `.env.local` / Vercel 환경변수. 절대 코드/레포에 노출 금지.
6. **디자인은 DESIGN.md를 단일 기준으로** — 색·폰트·간격을 임의로 만들지 않고 토큰을 따른다.

## 디렉토리 구조 (제안)

```
studio-egb/
├── CLAUDE.md
├── AGENTS.md
├── DESIGN.md
├── .env.local                      # 환경변수 (커밋 금지)
├── public/
│   └── fonts/                      # Clash Display / Pretendard (self-host 시)
├── sanity/                         # Sanity Studio + 스키마
│   ├── schemas/
│   │   ├── work.ts                 # 작업물
│   │   ├── story.ts                # 에디토리얼
│   │   └── index.ts
│   └── sanity.config.ts
└── src/
    ├── app/
    │   ├── layout.tsx              # 공통 레이아웃 (폰트, 헤더/푸터)
    │   ├── page.tsx                # Home
    │   ├── work/
    │   │   ├── page.tsx            # 목록 + 카테고리 필터
    │   │   └── [slug]/page.tsx     # 상세
    │   ├── about/page.tsx
    │   ├── stories/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── contact/page.tsx
    │   └── api/contact/route.ts    # 문의 폼 핸들러 (채택 시)
    ├── components/
    │   ├── layout/                 # Header, Footer, Nav
    │   ├── work/                   # WorkGrid, WorkCard, CategoryFilter
    │   ├── video/                  # YouTubeEmbed
    │   └── ui/                     # Button, Tag 등 공통 요소
    ├── lib/
    │   ├── sanity/                 # client.ts, queries.ts, image.ts
    │   └── utils.ts
    └── styles/
        └── globals.css             # 디자인 토큰(CSS 변수) + base
```

## 코딩 컨벤션

- **TypeScript strict 모드.** `any` 지양.
- **컴포넌트:** PascalCase. 파일명 = 컴포넌트명.
- **함수/변수:** camelCase. 디렉토리/라우트: kebab-case 또는 Next 규칙.
- **스타일:** Tailwind 유틸리티 우선. 반복되는 패턴은 컴포넌트로 추출.
- **색/폰트/간격:** Tailwind 토큰 또는 CSS 변수로만 사용 (DESIGN.md 기준). 매직 넘버·임의 hex 금지.
- **커밋 메시지:** 한국어, 간결하게 (예: `Work 목록 카테고리 필터 추가`).

## URL 구조

| 경로 | 페이지 | 렌더링 |
|---|---|---|
| `/` | Home | SSG/ISR |
| `/work` | 작업물 목록 (카테고리 필터: ALL/Documentary/Social/Branded) | SSG/ISR |
| `/work/[slug]` | 작업물 상세 (YouTube 임베드) | SSG/ISR |
| `/about` | 스튜디오 소개 | SSG |
| `/stories` | 에디토리얼 목록 *(메뉴명 미정)* | SSG/ISR |
| `/stories/[slug]` | 에디토리얼 상세 | SSG/ISR |
| `/contact` | 연락처 + 문의 폼 | SSG |
| `/api/contact` | 문의 폼 처리 *(채택 시)* | Route Handler |

## 콘텐츠 모델 (Sanity 스키마 요약)

- **Work:** 제목 / 슬러그 / 클라이언트 / 카테고리(Documentary·Social·Branded) / YouTube 링크 / 썸네일 / 제작연도 / 설명(rich) / 스틸컷[] / 대표작 여부 / 정렬순서
- **Story:** 제목 / 슬러그 / 대표이미지 / 발행일 / 본문(rich) / 발행여부

> 필드 라벨은 비개발자가 보므로 한글로 정의한다 (예: `title: '제목'`). 전체 스펙은 PRD §7 참조.

## 현재 진행 상황

### 완료
- 기획 자료 정리, PRD 작성, 디자인 토큰 정의(DESIGN.md)

### 다음 작업
1. 레포·Next.js·Tailwind·Sanity 초기 세팅
2. 디자인 토큰을 `globals.css` / `tailwind.config`에 반영
3. 공통 레이아웃(Header/Footer/Nav) → Home → Work 목록·상세
4. About / Stories / Contact
5. SEO·성능·반응형 QA → Vercel 배포 → 클라이언트 CMS 교육

### 미결정 사항 (확인 필요)
- **3번째 메뉴명:** `Stories`(잠정) / Editorial / Journal / Log
- **Contact 문의 폼:** 포함(잠정) vs 정보 노출만
- **Clash Display 라이선스:** 클라이언트 제공 폰트 파일 사용 vs Fontshare에서 다운로드 — 확정 시 폰트 경로 반영
- **분석 도구:** GA4 / Vercel Analytics 추가 여부

## 주의사항

작업 시 반드시 지켜야 할 절대 규칙은 **AGENTS.md** 참조. 핵심만 다시 적으면:
- 시크릿은 환경변수로만, 레포에 노출 금지
- Sanity 스키마 변경은 콘텐츠 손실 위험 → 임의 변경 금지, 변경 전 확인
- 디자인 토큰(색/폰트/간격) 임의 추가 금지 — DESIGN.md 기준
- 자동 배포/푸시 금지
