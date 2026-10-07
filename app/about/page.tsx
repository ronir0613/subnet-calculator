import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "About the IPv4 Subnet Calculator",
  description: "About the IPv4 subnet, CIDR, and VLSM tools and guides.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage title="About" summary="A practical set of tools for working with IPv4 subnets.">
      <section>
        <h2>What this site does</h2>
        <p>Subnet Calculator turns an IPv4 address and prefix into its network range, host counts, subnet mask, and related details. The VLSM tool allocates subnet ranges from a list of host requirements, and the guide explains common CIDR values.</p>
      </section>
      <section>
        <h2>How to use it</h2>
        <p>Enter an address or CIDR prefix on the <Link className="text-primary underline-offset-4 hover:underline" href="/">calculator</Link>, or open the <Link className="text-primary underline-offset-4 hover:underline" href="/vlsm">VLSM calculator</Link> to plan multiple networks.</p>
      </section>
    </InfoPage>
  );
}
