"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeSelector } from "@/components/theme-selector";
import { localeOptions, localizedPath, type Locale } from "@/lib/i18n-shared";
import { useLocale } from "@/components/locale-provider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const localeCodes = new Set<string>(localeOptions.map(({ code }) => code));

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const locale = (localeCodes.has(segments[0] ?? "") ? segments.shift() : "en") as Locale;
  const path = `/${segments.join("/")}`;
  const { copy } = useLocale();
  const links = [
    { href: "/vlsm", label: copy.vlsmNav },
    { href: "/guide", label: copy.guideNav },
    { href: "/quiz", label: copy.quizNav },
  ];

  return (
    <header className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-2 sm:px-6 md:min-h-16 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-x-6 md:py-0 lg:px-8">
        <Link className="flex min-h-11 min-w-0 items-center text-xs font-semibold leading-tight text-foreground sm:text-sm" href={localizedPath(locale, "/")}>
          Subnet Calculator
        </Link>
        <nav aria-label={copy.navigation} className="col-span-2 row-start-2 flex min-w-0 flex-wrap items-center gap-x-3 text-sm text-muted-foreground max-[359px]:row-start-3 md:col-span-1 md:col-start-2 md:row-start-1 md:justify-end md:gap-x-5">
          {links.map(({ href, label }) => (
            <Link
              aria-current={path === href ? "page" : undefined}
              className={`flex min-h-11 items-center transition-colors hover:text-foreground ${path === href ? "font-medium text-foreground" : ""}`}
              href={localizedPath(locale, href)}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="col-start-2 row-start-1 flex min-w-0 items-center justify-end gap-2 max-[359px]:col-span-2 max-[359px]:col-start-1 max-[359px]:row-start-2 max-[359px]:justify-between md:col-start-3">
          <ThemeSelector />
          <label className="sr-only" htmlFor="site-language">{copy.language}</label>
          <Select value={locale} onValueChange={(nextLocale) => {
            const destination = localizedPath(nextLocale as Locale, path);
            router.push(`${destination}${window.location.search}${window.location.hash}`);
          }}>
            <SelectTrigger id="site-language" aria-label={copy.language} className="!h-11 !min-w-0 !w-24 bg-background sm:!w-32">
              <SelectValue className="truncate text-start">
                {localeOptions.find(({ code }) => code === locale)?.name ?? "English"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="en">English</SelectItem>
              {localeOptions.map(({ code, name }) => <SelectItem key={code} value={code}>{name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
