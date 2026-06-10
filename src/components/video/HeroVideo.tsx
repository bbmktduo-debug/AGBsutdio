"use client";

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
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
}
