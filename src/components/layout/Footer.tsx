import Link from "next/link";
import type { ContactInfo } from "@/lib/site";

const NAV = [
  { label: "ABOUT", href: "/about" },
  { label: "WORKS", href: "/work" },
  { label: "NOTES", href: "/notes" },
  { label: "CONTACT", href: "/contact" },
];

export default function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer className="bg-bg-dark text-on-dark">
      <div className="container-page py-14 md:py-20">
        {/* 로고 */}
        <div className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white.png"
            alt="Studio EGB"
            width={150}
            height={32}
            className="block w-[150px]"
          />
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
            href={`mailto:${contact.email}`}
            className="hover:text-on-dark transition-colors"
          >
            {contact.email}
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
            className="hover:text-on-dark transition-colors"
          >
            {contact.phone}
          </a>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-on-dark transition-colors"
          >
            @{contact.instagramHandle}
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
