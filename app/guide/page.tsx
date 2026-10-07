import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CidrReference } from "@/components/guide/cidr-reference";

export const metadata: Metadata = {
  title: "IPv4 Subnetting Guide and CIDR Reference",
  description: "Learn what subnets, CIDR prefixes, subnet masks, and usable host counts mean with a practical IPv4 reference.",
  alternates: { canonical: "/guide" },
  openGraph: {
    type: "website",
    title: "IPv4 Subnetting Guide and CIDR Reference",
    description: "Learn what subnets, CIDR prefixes, subnet masks, and usable host counts mean with a practical IPv4 reference.",
    url: "/guide",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPv4 Subnetting Guide and CIDR Reference",
    description: "Learn what subnets, CIDR prefixes, subnet masks, and usable host counts mean with a practical IPv4 reference.",
    images: ["/opengraph-image"],
  },
};

export default function GuidePage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl pt-10 sm:pt-14">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">IPv4 subnetting guide</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            A concise guide to subnet addresses, CIDR prefixes, and host counts.
          </p>

          <section className="mt-9 border-t border-border pt-5">
            <h2 className="text-xl font-semibold tracking-tight">What is a subnet?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A subnet is a defined range of IP addresses. Its mask separates the bits that identify the network from the bits available for addresses inside it.
            </p>
          </section>

          <section className="mt-8 border-t border-border pt-5">
            <h2 className="text-xl font-semibold tracking-tight">What does /24 mean?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The number after the slash is the network prefix length. A /24 has 24 network bits and 8 host bits, which is a subnet mask of 255.255.255.0.
            </p>
          </section>

          <section className="mt-8 border-t border-border pt-5">
            <h2 className="text-xl font-semibold tracking-tight">How many hosts are in a /24?</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Eight host bits provide 2<sup>8</sup>, or 256, total addresses. A typical subnet reserves one for the network and one for broadcast, leaving 254 usable host addresses. /31 links and /32 host routes use different rules.
            </p>
          </section>

          <section className="mt-8 border-t border-border pt-5">
            <h2 className="text-xl font-semibold tracking-tight">CIDR reference</h2>
            <CidrReference />
          </section>

          <section className="mt-8 border-t border-border pt-5">
            <h2 className="text-xl font-semibold tracking-tight">Next steps</h2>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link className="text-primary underline-offset-4 hover:underline" href="/">Calculate a subnet</Link>
              <Link className="text-primary underline-offset-4 hover:underline" href="/vlsm">Allocate with VLSM</Link>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
