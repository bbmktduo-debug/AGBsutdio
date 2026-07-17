"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function HeroVideo({
  src,
  linkedWork,
}: {
  src: string;
  linkedWork?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={linkedWork ? "cursor-pointer" : ""}
      onClick={() => linkedWork && router.push(`/work/${linkedWork}`)}
    >
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
    </div>
  );
}

export function HeroCarousel({
  sources,
  linkedWorks = [],
}: {
  sources: string[];
  linkedWorks?: Array<{ slug: string }>;
}) {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const router = useRouter();

  // 스와이프 관련
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = ((index % sources.length) + sources.length) % sources.length;
      setCurrent(clamped);
      const video = videoRefs.current[clamped];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    },
    [sources.length]
  );

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const handleEnded = useCallback(() => {
    goNext();
  }, [goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleClick = () => {
    const linked = linkedWorks[current];
    if (linked?.slug) {
      router.push(`/work/${linked.slug}`);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className={linkedWorks[current]?.slug ? "cursor-pointer" : ""}
    >
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

      {/* 좌우 화살표 */}
      {sources.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="이전 영상"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-colors rounded-full"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="다음 영상"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[5] w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-colors rounded-full"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* 인디케이터 dots */}
      {sources.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[5] flex gap-3">
          {sources.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
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
    </div>
  );
}
