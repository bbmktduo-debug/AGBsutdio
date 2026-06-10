import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "사이트 설정",
  type: "document",
  fields: [
    defineField({
      name: "heroVideo",
      title: "히어로 배경 영상 (MP4)",
      type: "file",
      options: { accept: "video/mp4" },
      description: "메인 히어로에 자동재생될 배경 영상 파일 (짧은 쇼릴 권장)",
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
