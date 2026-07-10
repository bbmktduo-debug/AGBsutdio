"use client";

import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  slug: { current: string };
  color?: string;
};

export default function NoteCategoryFilter({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/notes"
        className={`font-display text-xs tracking-[0.06em] uppercase px-4 py-1.5 rounded-full border transition-colors duration-200 ${
          !activeCategory
            ? "bg-ink text-bg border-ink"
            : "border-ink/20 text-ink/50 hover:text-ink hover:border-ink/40"
        }`}
      >
        ALL
      </Link>
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug.current;
        return (
          <Link
            key={cat._id}
            href={`/notes?category=${cat.slug.current}`}
            className="font-display text-xs tracking-[0.06em] uppercase px-4 py-1.5 rounded-full border transition-colors duration-200"
            style={
              isActive
                ? {
                    backgroundColor: cat.color || "#000",
                    borderColor: cat.color || "#000",
                    color: "#000",
                  }
                : {
                    borderColor: cat.color
                      ? `${cat.color}`
                      : "rgba(0,0,0,0.2)",
                    color: "rgba(0,0,0,0.5)",
                  }
            }
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
