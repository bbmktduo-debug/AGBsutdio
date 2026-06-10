"use client";

import Link from "next/link";

const CATEGORIES = [
  { label: "ALL", value: undefined, color: "" },
  { label: "DOCUMENTARY", value: "documentary", color: "bg-accent-doc" },
  { label: "SOCIAL", value: "social", color: "bg-accent-social" },
  { label: "BRANDED", value: "branded", color: "bg-accent-branded" },
];

export default function CategoryFilter({
  current,
}: {
  current?: string;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {CATEGORIES.map(({ label, value, color }) => {
        const isActive = current === value;
        const href = value ? `/work?category=${value}` : "/work";

        return (
          <Link
            key={label}
            href={href}
            className={`font-display text-xs tracking-[0.08em] uppercase px-4 py-2 rounded-full transition-all duration-200 ${
              isActive
                ? `${color || "bg-ink text-on-dark"} ${color ? "text-ink font-semibold" : ""}`
                : "text-ink/40 hover:text-ink border border-ink/15 hover:border-ink/40"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
