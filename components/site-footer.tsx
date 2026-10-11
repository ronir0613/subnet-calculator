import Link from "next/link";
import { getMessages, localizedPath, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = getMessages(locale);
  const links = [
    { href: "/about", label: copy.about },
    { href: "/contact", label: copy.contact },
    { href: "/privacy", label: copy.privacy },
    { href: "/terms", label: copy.terms },
  ];
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-8">
        <span className="leading-5">{copy.footerResult}</span>
        <nav aria-label={copy.navigation} className="flex flex-wrap gap-x-4 gap-y-1">
          <Link className="flex min-h-11 items-center hover:text-foreground" href={localizedPath(locale, "/guide")}>{copy.cidrGuide}</Link>
          {links.map(({ href, label }) => <Link className="flex min-h-11 items-center hover:text-foreground" href={localizedPath(locale, href)} key={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
