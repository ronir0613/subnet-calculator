import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VlsmCalculator } from "@/components/vlsm/vlsm-calculator";
import { VlsmSeoContent } from "@/components/vlsm/vlsm-seo-content";
import { getPageLanguageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "VLSM Calculator — Variable Length Subnet Mask Calculator" },
  description: "Allocate variable-size IPv4 subnets by host count. See each CIDR block, address range, host capacity, and remaining space.",
  alternates: { canonical: "/vlsm", languages: getPageLanguageAlternates("/vlsm") },
  openGraph: {
    type: "website",
    title: "VLSM Calculator — Variable Length Subnet Mask Calculator",
    description: "Allocate variable-size IPv4 subnets by host count and review address ranges and remaining space.",
    url: "/vlsm",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VLSM Calculator — Variable Length Subnet Mask Calculator",
    description: "Allocate variable-size IPv4 subnets by host count and review address ranges and remaining space.",
    images: ["/opengraph-image"],
  },
};

export default function VlsmPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <VlsmCalculator />
          <VlsmSeoContent locale="en" />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
