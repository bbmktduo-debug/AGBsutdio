import { defineType } from "sanity";

export default defineType({
  name: "blockContent",
  title: "본문 콘텐츠",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "본문", value: "normal" },
        { title: "제목 2", value: "h2" },
        { title: "제목 3", value: "h3" },
        { title: "인용", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "링크",
            fields: [{ name: "href", type: "url", title: "URL" }],
          },
        ],
      },
    },
    {
      type: "image",
      options: { hotspot: true },
    },
  ],
});
