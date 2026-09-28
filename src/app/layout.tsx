import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";
import { getSiteContentRaw } from "@/lib/sanity/queries";
import { resolveSiteContent, SITE_URL, type ContactInfo } from "@/lib/site";

export const revalidate = 60;

async function loadSite() {
  const raw = await getSiteContentRaw().catch(() => null);
  return resolveSiteContent(raw);
}

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSite();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: site.seoTitle,
      template: `%s | ${site.seoTitle}`,
    },
    description: site.seoDescription,
    keywords: site.seoKeywords,
    applicationName: "Studio EGB",
    authors: [{ name: "Studio EGB", url: SITE_URL }],
    creator: "Studio EGB",
    publisher: "Studio EGB",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: SITE_URL,
      siteName: site.seoTitle,
      title: site.seoTitle,
      description: site.seoDescription,
      images: [{ url: site.ogImageUrl, width: 1200, height: 630, alt: "Studio EGB" }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.seoTitle,
      description: site.seoDescription,
      images: [site.ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: site.googleSiteVerification,
      other: site.naverSiteVerification
        ? { "naver-site-verification": site.naverSiteVerification }
        : undefined,
    },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await loadSite();
  const contact: ContactInfo = {
    email: site.email,
    phone: site.phone,
    address: site.address,
    instagramHandle: site.instagramHandle,
    instagramUrl: site.instagramUrl,
  };

  // 구조화 데이터 (Google 리치 결과 · 네이버 사이트 정보용)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "스튜디오에그비",
        alternateName: ["Studio EGB", "studio egb", "에그비"],
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.png`,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "성동구",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        sameAs: [site.instagramUrl],
        description: site.seoDescription,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.seoTitle,
        inLanguage: "ko-KR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutShell contact={contact}>{children}</LayoutShell>
      </body>
    </html>
  );
}
