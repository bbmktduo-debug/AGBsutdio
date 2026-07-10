"use client";

import { useState, useRef, useCallback } from "react";

export default function HeroVideo({ src }: { src: string }) {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
}

export function HeroCarousel({ sources }: { sources: string[] }) {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      // 새 영상 처음부터 재생
      const video = videoRefs.current[index];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    },
    []
  );

  const handleEnded = useCallback(() => {
    const next = (current + 1) % sources.length;
    goTo(next);
  }, [current, sources.length, goTo]);

  return (
    <>
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          autoPlay={i === 0}
          muted
          playsInline
          onEnded={i === current ? handleEnded : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      <div className="absolute inset-0 bg-black/40 z-[2] pointer-events-none" />

      {/* 인디케이터 dots */}
      {sources.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex gap-3">
          {sources.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`영상 ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
