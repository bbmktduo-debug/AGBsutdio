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
    defineField({
      name: "processSteps",
      title: "HOW WE WORK 단계",
      type: "array",
      description:
        "About 페이지 하단 'HOW WE WORK'에 번호 순서대로 표시됩니다. 드래그해서 순서를 바꿀 수 있습니다.",
      of: [
        {
          type: "object",
          name: "processStep",
          title: "단계",
          fields: [
            defineField({
              name: "step",
              title: "단계 이름",
              type: "string",
              description: "예: Listen, Discover, Shape, Make, Review",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "desc",
              title: "설명",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "step", subtitle: "desc" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About 페이지" }),
  },
});
