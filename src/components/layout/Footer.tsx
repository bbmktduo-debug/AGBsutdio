import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-on-dark">
      {/* 본문: 2컬럼 압축 */}
      <div className="container-page py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* 좌: 로고 + 메뉴 */}
          <div className="flex flex-col gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="Studio EGB"
              width={384}
              height={83}
              className="h-8 w-auto"
              style={{ aspectRatio: '384 / 83' }}
            />
            <div className="flex gap-6">
              <Link href="/about" className="text-xs text-on-dark/40 hover:text-on-dark transition-colors font-display tracking-[0.06em] uppercase">
                About
              </Link>
              <Link href="/work" className="text-xs text-on-dark/40 hover:text-on-dark transition-colors font-display tracking-[0.06em] uppercase">
                Works
              </Link>
              <Link href="/notes" className="text-xs text-on-dark/40 hover:text-on-dark transition-colors font-display tracking-[0.06em] uppercase">
                Notes
              </Link>
              <Link href="/contact" className="text-xs text-on-dark/40 hover:text-on-dark transition-colors font-display tracking-[0.06em] uppercase">
                Contact
              </Link>
            </div>
          </div>

          {/* 우: 연락처 (아이콘 + 텍스트) */}
          <div className="flex flex-col gap-2.5 text-sm text-on-dark/40">
            <a href="mailto:contact@studio-egb.com" className="flex items-center gap-2 hover:text-on-dark transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              contact@studio-egb.com
            </a>
            <a href="tel:010-9177-9071" className="flex items-center gap-2 hover:text-on-dark transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              010-9177-9071
            </a>
            <a href="https://instagram.com/studioegb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-on-dark transition-colors">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              @studioegb
            </a>
          </div>
        </div>
      </div>

      {/* 카피라이트 */}
      <div className="border-t border-on-dark/10">
        <div className="container-page py-5 text-xs text-on-dark/20">
          &copy; {new Date().getFullYear()} Studio EGB
        </div>
      </div>
    </footer>
  );
}
