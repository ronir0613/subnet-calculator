import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function InfoPage({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{summary}</p>
          <div className="mt-9 space-y-8 text-sm leading-6 text-muted-foreground [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
