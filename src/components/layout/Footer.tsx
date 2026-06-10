import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-on-dark">
      {/* 상단 라인 */}
      <div className="border-b border-on-dark/10">
        <div className="container-page py-16 md:py-20">
          <Image
            src="/logo.png"
            alt="Studio EGB"
            width={160}
            height={36}
            className="h-8 w-auto invert"
          />
        </div>
      </div>

      {/* 본문 */}
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <p className="font-display text-xs tracking-[0.08em] uppercase text-on-dark/25 mb-4">
              SLOGAN
            </p>
            <p className="font-display text-sm tracking-[0.04em] text-on-dark/50">
              EVERYDAY GETTING BETTER
            </p>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.08em] uppercase text-on-dark/25 mb-4">
              MENU
            </p>
            <div className="space-y-2.5">
              <Link href="/about" className="block text-sm text-on-dark/40 hover:text-on-dark transition-colors">
                About
              </Link>
              <Link href="/work" className="block text-sm text-on-dark/40 hover:text-on-dark transition-colors">
                Works
              </Link>
              <Link href="/contact" className="block text-sm text-on-dark/40 hover:text-on-dark transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <p className="font-display text-xs tracking-[0.08em] uppercase text-on-dark/25 mb-4">
              CONTACT
            </p>
            <div className="space-y-2.5 text-sm text-on-dark/40">
              <a href="mailto:contact@studio-egb.com" className="block hover:text-on-dark transition-colors">
                contact@studio-egb.com
              </a>
              <a href="tel:010-9177-9071" className="block hover:text-on-dark transition-colors">
                010-9177-9071
              </a>
              <a href="https://instagram.com/studioegb" target="_blank" rel="noopener noreferrer" className="block hover:text-on-dark transition-colors">
                @studioegb
              </a>
              <p className="text-on-dark/20 pt-1">서울특별시 성동구 연무정13길 8</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 라인 + 카피라이트 */}
      <div className="border-t border-on-dark/10">
        <div className="container-page py-6 text-xs text-on-dark/20">
          &copy; {new Date().getFullYear()} Studio EGB
        </div>
      </div>
    </footer>
  );
}
