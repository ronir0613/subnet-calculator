import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CidrReference } from "@/components/guide/cidr-reference";
import { GuideSeoContent } from "@/components/guide/guide-seo-content";
import { SubnetPageContent } from "@/components/calculator/subnet-page-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VlsmCalculator } from "@/components/vlsm/vlsm-calculator";
import { VlsmSeoContent } from "@/components/vlsm/vlsm-seo-content";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import { getMessages, isLocale, localizedSlugs, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { getPageLanguageAlternates } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedSlugs.map((route) => ({ slug: route ? [route] : [] }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[[...slug]]">): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) return {};
  const copy = getMessages(locale);
  const route = slug.join("/");
  const titles: Record<string, string> = {
    "": copy.title,
    subnet: copy.title,
    guide: copy.guideTitle,
    vlsm: copy.vlsmTitle,
    about: copy.aboutTitle,
    contact: copy.contactTitle,
    privacy: copy.privacyTitle,
    terms: copy.termsTitle,
  };
  const canonicalRoute = route === "subnet" ? "" : route;
  const path = `/${locale}${canonicalRoute ? `/${canonicalRoute}` : ""}`;
  const descriptions: Record<string, string> = {
    "": copy.intro,
    subnet: copy.intro,
    guide: copy.guideIntro,
    vlsm: copy.vlsmIntro,
  };
  const title = titles[route] ?? copy.title;
  const description = descriptions[route] ?? copy.title;
  const languageAlternates = getPageLanguageAlternates(canonicalRoute ? `/${canonicalRoute}` : "/");
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: languageAlternates },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Subnet Calculator",
      images: ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

function GuidePage({ locale }: { locale: Locale }) {
  const copy = getMessages(locale);
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.guideTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{copy.guideIntro}</p>
          <section className="mt-9 border-t border-border pt-5"><h2 className="text-xl font-semibold tracking-tight">{copy.whatSubnet}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.subnetDefinition}</p></section>
          <section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-semibold tracking-tight">{copy.what24}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.meaning24}</p></section>
          <section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-semibold tracking-tight">{copy.howMany24}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy.hosts24}</p></section>
          <section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-semibold tracking-tight">{copy.cidrReference}</h2><CidrReference locale={locale} /></section>
          <GuideSeoContent locale={locale} />
          <section className="mt-8 border-t border-border pt-5"><h2 className="text-xl font-semibold tracking-tight">{copy.nextSteps}</h2><p className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="text-primary underline-offset-4 hover:underline" href={`/${locale}`}>{copy.calculateSubnet}</Link><Link className="text-primary underline-offset-4 hover:underline" href={`/${locale}/vlsm`}>{copy.allocateVlsm}</Link></p></section>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

export default async function LocalizedPage({
  params,
  searchParams,
}: PageProps<"/[locale]/[[...slug]]">) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const route = slug.join("/");
  if (route === "" || route === "subnet") return <SubnetPageContent searchParams={searchParams} locale={locale} />;
  if (route === "guide") return <GuidePage locale={locale} />;
  if (route === "vlsm") return <><SiteHeader /><main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><VlsmCalculator locale={locale} /><VlsmSeoContent locale={locale} /></div></main><SiteFooter locale={locale} /></>;
  if (route === "about") return <AboutPage />;
  if (route === "contact") return <ContactPage />;
  if (route === "privacy") return <PrivacyPage />;
  if (route === "terms") return <TermsPage />;
  notFound();
}
