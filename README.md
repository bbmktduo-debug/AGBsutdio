# 스튜디오에그비 웹사이트 (Studio EGB)

브랜드 영상 스튜디오 **스튜디오에그비**의 공식 웹사이트입니다.

- **사이트:** https://www.studio-egb.com
- **콘텐츠 관리자(어드민):** https://www.studio-egb.com/studio

## 기술 구성

| 역할 | 서비스 |
|---|---|
| 프론트엔드 | Next.js (App Router) + TypeScript + Tailwind CSS |
| 콘텐츠 관리(CMS) | Sanity (프로젝트 `bpxy2drf`, 데이터셋 `production`) |
| 호스팅·배포 | Vercel (`main` 브랜치에 푸시하면 자동 배포) |
| 영상 | YouTube 임베드 (자체 업로드 없음) |

## 콘텐츠 수정 방법 (개발 지식 불필요)

작업물·노트·About 문구·연락처·SEO 설정은 모두 어드민(`/studio`)에서 수정합니다.
저장 후 **Publish** 버튼을 눌러야 사이트에 반영되며, 반영까지 최대 1분 걸립니다.

- **사이트 설정:** 메인 문구, 이메일·전화·주소·인스타그램, 검색 노출(SEO) 설정
  - 전화번호 칸을 비우면 사이트 전체에서 전화번호가 표시되지 않습니다.
- **About 페이지:** 하이라이트 문장(줄바꿈 반영), 본문, HOW WE WORK 단계
- **작업물(Work):** 제목, 클라이언트, 카테고리, 썸네일, YouTube 링크, 메인 히어로 노출 여부
- **노트(Notes):** 에디토리얼 글

## 로컬 개발 환경 실행

```bash
npm install
cp .env.local.example .env.local   # 아래 환경변수 값 입력
npm run dev                        # http://localhost:3000
```

### 환경변수

| 이름 | 값 | 설명 |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `bpxy2drf` | Sanity 프로젝트 ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity 데이터셋 |

Vercel 프로젝트의 Environment Variables에도 같은 값이 설정되어 있어야 합니다.
`.env.local`은 git에 올라가지 않습니다.

### 명령어

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드 (배포 전 확인용)
npm run lint    # 린트
```

## 프로젝트 구조

```
src/app/            페이지 (/, /about, /work, /work/[slug], /notes, /contact, /studio)
src/components/     레이아웃·영상·UI 컴포넌트
src/lib/sanity/     Sanity 클라이언트·쿼리·이미지 헬퍼
src/lib/site.ts     사이트 기본값·설정 병합 로직
sanity/schemas/     Sanity 콘텐츠 스키마 (수정 시 기존 콘텐츠 영향 주의)
scripts/            시드·유틸 스크립트
DESIGN.md           디자인 토큰·컴포넌트 규칙 (UI 수정 시 기준)
AGENTS.md           AI 코딩 도구용 작업 규칙
CLAUDE.md           프로젝트 개요·진행 이력
```

## 계정·권한 체크리스트 (이관 시)

이 저장소 외에 아래 서비스의 소유권도 함께 넘겨받아야 사이트를 완전히 운영할 수 있습니다.

1. **GitHub 저장소** — 이 저장소 (코드)
2. **Vercel 프로젝트** — 호스팅·도메인(`studio-egb.com`)·환경변수. 저장소 이관 후 Vercel의 Git 연결을 새 저장소 주소로 다시 연결해야 자동 배포가 유지됩니다.
3. **Sanity 프로젝트** — 모든 콘텐츠 데이터. Sanity 관리 콘솔(sanity.io/manage)에서 멤버 초대 또는 소유권 이전.
4. **도메인 등록기관** — `studio-egb.com` 도메인 자체
