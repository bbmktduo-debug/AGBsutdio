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
          type: "object",
          fields: [
            defineField({
              name: "video",
              title: "영상 파일",
              type: "file",
              options: { accept: "video/mp4" },
            }),
            defineField({
              name: "linkedWork",
              title: "연결된 작업물",
              type: "reference",
              to: [{ type: "work" }],
              description: "클릭 시 이동할 작업물 (선택)",
            }),
          ],
          preview: {
            select: { title: "linkedWork.title", videoFileName: "video.asset.originalFilename" },
            prepare: ({ title, videoFileName }) => ({
              title: title || "연결된 작업물 없음",
              subtitle: videoFileName || "영상 미등록",
            }),
          },
        },
      ],
      description:
        "메인 히어로에 순서대로 자동재생될 배경 영상들 (MP4). 각 영상에 작업물을 연결하면 클릭 시 해당 페이지로 이동합니다.",
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
