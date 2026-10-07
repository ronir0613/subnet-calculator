"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSelector } from "@/components/theme-selector";

const links = [
  { href: "/vlsm", label: "VLSM" },
  { href: "/guide", label: "Guides" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 sm:px-6 lg:px-8 md:min-h-16 md:flex-nowrap md:py-0">
        <Link className="flex min-h-11 shrink-0 items-center text-sm font-semibold text-foreground" href="/">
          Subnet Calculator
        </Link>
        <nav aria-label="Main navigation" className="order-3 flex w-full flex-wrap items-center gap-x-4 text-sm text-muted-foreground md:order-none md:w-auto md:flex-1 md:justify-end md:gap-x-5">
          {links.map(({ href, label }) => (
            <Link
              aria-current={pathname === href ? "page" : undefined}
              className={`flex min-h-11 items-center transition-colors hover:text-foreground ${pathname === href ? "font-medium text-foreground" : ""}`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <ThemeSelector />
      </div>
    </header>
  );
}
