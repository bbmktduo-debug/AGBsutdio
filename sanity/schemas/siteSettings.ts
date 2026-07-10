import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({
      name: "heroVideos",
      title: "히어로 배경 영상 (복수)",
      type: "array",
      of: [
        {
          type: "file",
          options: { accept: "video/mp4" },
        },
      ],
      description: "메인 히어로에 순서대로 자동재생될 배경 영상들 (MP4)",
    }),
    defineField({
      name: "heroVideo",
      title: "히어로 배경 영상 (레거시, 단일)",
      type: "file",
      options: { accept: "video/mp4" },
      description: "기존 단일 영상 필드 — 위 복수 필드를 우선 사용합니다",
      hidden: true,
    }),
    defineField({
      name: "heroVideoUrl",
      title: "히어로 영상 (YouTube 링크)",
      type: "url",
      description: "MP4가 없을 경우 대체용 YouTube 링크",
    }),
  ],
  preview: {
    prepare: () => ({ title: "사이트 설정" }),
  },
});
