"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import type { ContactInfo } from "@/lib/site";

export default function LayoutShell({
  children,
  contact,
}: {
  children: React.ReactNode;
  contact: ContactInfo;
}) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Header email={contact.email} />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} />
    </>
  );
}
