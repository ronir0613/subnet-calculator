import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex min-h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link className="flex min-h-11 items-center text-sm font-semibold text-foreground" href="/">
          Subnet Calculator
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm text-muted-foreground sm:gap-5">
          <Link className="flex min-h-11 items-center px-1 transition-colors hover:text-foreground" href="/vlsm">VLSM</Link>
          <Link className="flex min-h-11 items-center px-1 transition-colors hover:text-foreground" href="/guide">Guides</Link>
        </nav>
      </div>
    </header>
  );
}
