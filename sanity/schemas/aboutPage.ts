import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About 페이지",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "하이라이트 문장",
      type: "text",
      rows: 3,
      description:
        '상단에 큰따옴표로 강조 표시되는 한 줄 소개 (예: "스튜디오에그비는 … 영상 스튜디오입니다.")',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "소개 본문",
      type: "blockContent",
      description: "하이라이트 문장 아래의 본문. 볼드, 줄바꿈, 링크 등 자유롭게 편집 가능합니다.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About 페이지" }),
  },
});
