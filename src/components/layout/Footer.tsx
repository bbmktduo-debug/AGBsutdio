import Link from "next/link";

const NAV = [
  { label: "ABOUT", href: "/about" },
  { label: "WORKS", href: "/work" },
  { label: "NOTES", href: "/notes" },
  { label: "CONTACT", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-on-dark">
      <div className="container-page py-14 md:py-20">
        {/* 로고 */}
        <div className="mb-10">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
            studio egb
          </span>
        </div>

        {/* 네비게이션 */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
          {NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-xs tracking-[0.08em] text-on-dark/40 hover:text-on-dark transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 연락처 */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-on-dark/40 mb-10">
          <a
            href="mailto:contact@studio-egb.com"
            className="hover:text-on-dark transition-colors"
          >
            contact@studio-egb.com
          </a>
          <a
            href="tel:010-9177-9071"
            className="hover:text-on-dark transition-colors"
          >
            010-9177-9071
          </a>
          <a
            href="https://instagram.com/studioegb"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-dark transition-colors"
          >
            @studioegb
          </a>
        </div>

        {/* 카피라이트 */}
        <div className="pt-8 border-t border-on-dark/10">
          <p className="text-xs text-on-dark/20">
            &copy; {new Date().getFullYear()} Studio EGB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
