import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "studio-egb",
  title: "스튜디오에그비",
  projectId: "bpxy2drf",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("콘텐츠")
          .items([
            // 사이트 설정 — 싱글톤 (1개만 표시)
            S.listItem()
              .title("사이트 설정")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("사이트 설정")
              ),
            S.divider(),
            // 나머지 문서 타입 (siteSettings 제외)
            ...S.documentTypeListItems().filter(
              (item) => {
                const id = item.getId();
                return id && id !== "siteSettings";
              }
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
