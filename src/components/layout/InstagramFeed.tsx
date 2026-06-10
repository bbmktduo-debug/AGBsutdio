"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type InstaPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
};

const INSTAGRAM_HANDLE = "studioegb";

export default function InstagramFeed({
  beholdFeedId,
}: {
  beholdFeedId?: string;
}) {
  const [posts, setPosts] = useState<InstaPost[]>([]);

  useEffect(() => {
    if (!beholdFeedId) return;

    fetch(`https://feeds.behold.so/${beholdFeedId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(
            data.slice(0, 6).map((post: Record<string, string>) => ({
              id: post.id,
              mediaUrl: post.mediaUrl,
              permalink: post.permalink,
            }))
          );
        }
      })
      .catch(() => {});
  }, [beholdFeedId]);

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="font-display text-xs tracking-[0.08em] uppercase text-ink/30">
              INSTAGRAM
            </p>
          </div>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs tracking-[0.08em] uppercase text-ink/40 hover:text-ink border-b border-ink/20 hover:border-ink pb-0.5 transition-colors duration-200"
          >
            @{INSTAGRAM_HANDLE}
          </a>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-ink/10">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-bg overflow-hidden"
              >
                <Image
                  src={post.mediaUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </a>
            ))}
          </div>
        ) : (
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-ink/10 py-16 text-center hover:border-ink/30 transition-colors duration-200">
              <p className="font-display text-[clamp(20px,3vw,32px)] font-semibold tracking-tight">
                @{INSTAGRAM_HANDLE}
              </p>
              <p className="text-sm text-ink/40 mt-3">
                Instagram에서 더 많은 이야기를 만나보세요
              </p>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
