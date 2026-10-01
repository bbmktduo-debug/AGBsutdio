"use client";

import { useRef } from "react";

/**
 * 히어로 배경용 YouTube 임베드 — 음소거 자동재생·반복, 컨트롤 숨김.
 * 컨테이너 비율(4:3 / 16:7)과 관계없이 16:9 영상이 빈틈없이 꽉 차도록(cover) 확대한다.
 */
export default function HeroYouTube({ videoId }: { videoId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: videoId, // loop은 playlist 지정이 있어야 동작
    controls: "0",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    disablekb: "1",
    iv_load_policy: "3",
    enablejsapi: "1",
  });

  // 업로더가 기본 자막을 켜 둔 영상은 URL 파라미터로 끌 수 없어 player API로 자막 모듈을 내린다.
  // 플레이어 준비 시점을 알 수 없으므로 로드 후 몇 차례 반복 전송한다.
  const hideCaptions = () => {
    const send = () =>
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "unloadModule", args: ["captions"] }),
        "https://www.youtube.com"
      );
    [500, 1500, 3000, 6000].forEach((ms) => setTimeout(send, ms));
  };

  return (
    <div className="absolute inset-0 overflow-hidden [container-type:size]">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        title="메인 배경 영상"
        allow="autoplay; encrypted-media; picture-in-picture"
        tabIndex={-1}
        onLoad={hideCaptions}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0 w-[max(100cqw,177.78cqh)] h-[max(100cqh,56.25cqw)]"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
