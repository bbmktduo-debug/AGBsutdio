/**
 * 현재 코드에 하드코딩되어 있던 문구·연락처·SEO·HOW WE WORK 단계를
 * 어드민(Sanity)의 "사이트 설정" / "About 페이지" 문서에 등록합니다.
 *
 * - 이미 값이 들어 있는 필드는 건드리지 않습니다 (setIfMissing).
 * - 여러 번 실행해도 안전합니다.
 *
 * 실행:
 *   npx sanity login            # 최초 1회 (브라우저 로그인)
 *   npx sanity exec scripts/seed-site-content.ts --with-user-token
 */
import { getCliClient } from "sanity/cli";
import { DEFAULT_SITE, DEFAULT_PROCESS_STEPS } from "../src/lib/site";

const client = getCliClient({ apiVersion: "2024-01-01" });

function key(i: number) {
  return `step-${i + 1}`;
}

async function main() {
  /* ── 사이트 설정 ── */
  const settings = await client.fetch<{ _id: string } | null>(
    `*[_type == "siteSettings"][0]{ _id }`
  );

  const siteFields = {
    heroTitleKo: DEFAULT_SITE.heroTitleKo,
    heroTitleEn: DEFAULT_SITE.heroTitleEn,
    email: DEFAULT_SITE.email,
    phone: DEFAULT_SITE.phone,
    address: DEFAULT_SITE.address,
    instagramHandle: DEFAULT_SITE.instagramHandle,
    instagramUrl: DEFAULT_SITE.instagramUrl,
    contactMessage: DEFAULT_SITE.contactMessage,
    seoTitle: DEFAULT_SITE.seoTitle,
    seoDescription: DEFAULT_SITE.seoDescription,
    seoKeywords: DEFAULT_SITE.seoKeywords,
  };

  if (settings?._id) {
    await client.patch(settings._id).setIfMissing(siteFields).commit();
    console.log(`✔ 사이트 설정 업데이트 (${settings._id})`);
  } else {
    await client.create({ _id: "siteSettings", _type: "siteSettings", ...siteFields });
    console.log("✔ 사이트 설정 문서 생성");
  }

  /* ── About 페이지: HOW WE WORK 단계 ── */
  const about = await client.fetch<{ _id: string } | null>(
    `*[_type == "aboutPage"][0]{ _id }`
  );
  const processSteps = DEFAULT_PROCESS_STEPS.map((s, i) => ({
    _key: key(i),
    _type: "processStep",
    step: s.step,
    desc: s.desc,
  }));

  if (about?._id) {
    await client.patch(about._id).setIfMissing({ processSteps }).commit();
    console.log(`✔ About 페이지 HOW WE WORK 단계 업데이트 (${about._id})`);
  } else {
    await client.create({
      _type: "aboutPage",
      headline:
        "스튜디오에그비는 브랜드의 이야기를 다큐멘터리의 방식으로 접근하고 기록하는 영상 스튜디오입니다.",
      processSteps,
    });
    console.log("✔ About 페이지 문서 생성");
  }

  console.log("완료. 어드민(/studio)에서 '사이트 설정'과 'About 페이지'를 확인하세요.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
