"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "WORKS", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg">
      {/* 로고 영역 */}
      <div className="container-page flex justify-center py-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Studio EGB"
            width={180}
            height={40}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden absolute right-5 top-5 w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="메뉴 열기"
        >
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-ink transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`}
          />
        </button>
      </div>

      {/* 라인 구분 */}
      <div className="border-b border-ink" />

      {/* 데스크톱 네비 */}
      <nav className="hidden md:block border-b border-ink/10">
        <div className="container-page flex justify-center gap-12 py-3">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`font-display text-[14px] font-medium tracking-[0.1em] uppercase py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-ink font-bold border-b-2 border-ink"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="md:hidden border-b border-ink">
          <div className="container-page py-8 flex flex-col items-center gap-6">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-sm tracking-[0.08em] uppercase text-ink/60 hover:text-ink transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
