import { defineType, defineField } from "sanity";

export default defineType({
  name: "story",
  title: "에디토리얼",
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
      name: "coverImage",
      title: "대표이미지",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "발행일",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "본문",
      type: "blockContent",
    }),
    defineField({
      name: "published",
      title: "발행여부",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
