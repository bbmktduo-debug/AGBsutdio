import { defineType, defineField } from "sanity";

export default defineType({
  name: "noteCategory",
  title: "노트 카테고리",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "카테고리명",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "슬러그",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "color",
      title: "색상 (HEX)",
      type: "string",
      description: "카테고리 표시 색상 (예: #cee7ea)",
      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex color" }),
    }),
    defineField({
      name: "sortOrder",
      title: "정렬순서",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", color: "color" },
    prepare({ title, color }) {
      return { title: `${title}${color ? ` (${color})` : ""}` };
    },
  },
});
