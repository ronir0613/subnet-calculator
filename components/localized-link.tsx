"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { localeOptions, localizedPath, type Locale } from "@/lib/i18n-shared";

const localeCodes = new Set<string>(localeOptions.map(({ code }) => code));

export function LocalizedLink({ href, children, ...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; children: ReactNode } & Omit<LinkProps, "href">) {
  const pathname = usePathname();
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = (localeCodes.has(firstSegment) ? firstSegment : "en") as Locale;
  return <Link href={localizedPath(locale, href)} {...props}>{children}</Link>;
}
