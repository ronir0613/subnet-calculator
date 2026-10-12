import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { QuizContent } from "@/components/quiz/quiz-content";
import { getQuizTranslation } from "@/components/quiz/quiz-translations";
import type { Locale } from "@/lib/i18n-shared";

export function QuizPageContent({ locale = "en" }: { locale?: Locale }) {
  const copy = getQuizTranslation(locale);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy?.pageTitle ?? "IPv4 subnetting quiz"}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{copy?.pageIntro ?? "Choose a set, answer at your own pace, and review each explanation."}</p>
          <div className="mt-8">
            <QuizContent />
          </div>
          <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
            {copy?.needRefresher ?? "Need a refresher?"} <Link className="text-primary underline-offset-4 hover:underline" href={locale === "en" ? "/guide" : `/${locale}/guide`}>{copy?.readGuide ?? "Read the subnetting guide"}</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
