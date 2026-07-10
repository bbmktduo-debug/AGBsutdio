import { defineType, defineField } from "sanity";

export default defineType({
  name: "note",
  title: "노트",
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
      name: "category",
      title: "카테고리",
      type: "reference",
      to: [{ type: "noteCategory" }],
    }),
    defineField({
      name: "thumbnail",
      title: "썸네일",
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
    select: { title: "title", media: "thumbnail", category: "category.name" },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category || "",
        media,
      };
    },
  },
});
