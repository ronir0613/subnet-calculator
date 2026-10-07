import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <span>Results use the IPv4 values you enter.</span>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link className="hover:text-foreground" href="/guide">CIDR guide</Link>
          {links.map(({ href, label }) => <Link className="hover:text-foreground" href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
