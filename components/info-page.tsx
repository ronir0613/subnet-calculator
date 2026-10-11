"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/components/locale-provider";

export function InfoPage({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  const pathname = usePathname();
  const { locale, copy } = useLocale();
  const route = pathname.split("/").filter(Boolean).at(-1);
  const localizedTitle = locale === "en" ? title : ({
    about: copy.aboutTitle,
    contact: copy.contactTitle,
    privacy: copy.privacyTitle,
    terms: copy.termsTitle,
  } as Record<string, string>)[route ?? ""] ?? title;
  const localizedSummary = locale !== "en" && route === "contact" ? copy.contactSummary : summary;
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{localizedTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{localizedSummary}</p>
          <div className="mt-9 space-y-8 text-sm leading-6 text-muted-foreground [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
