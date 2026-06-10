import { defineType, defineField } from "sanity";

export default defineType({
  name: "work",
  title: "작업물",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "슬러그",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "클라이언트",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "카테고리",
      type: "string",
      options: {
        list: [
          { title: "Documentary", value: "documentary" },
          { title: "Social", value: "social" },
          { title: "Branded", value: "branded" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube 링크",
      type: "url",
    }),
    defineField({
      name: "thumbnail",
      title: "썸네일",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "year",
      title: "제작연도",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "설명",
      type: "blockContent",
    }),
    defineField({
      name: "stills",
      title: "스틸컷",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "featured",
      title: "대표작",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "정렬순서",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "thumbnail" },
  },
});
