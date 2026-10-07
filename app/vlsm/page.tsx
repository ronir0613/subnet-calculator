import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VlsmCalculator } from "@/components/vlsm/vlsm-calculator";

export const metadata: Metadata = {
  title: { absolute: "VLSM Calculator — Variable Length Subnet Mask Calculator" },
  description: "Allocate IPv4 subnets for different host requirements with a clear VLSM calculator.",
  alternates: { canonical: "/vlsm" },
  openGraph: {
    type: "website",
    title: "VLSM Calculator — Variable Length Subnet Mask Calculator",
    description: "Allocate IPv4 subnets for different host requirements with a clear VLSM calculator.",
    url: "/vlsm",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VLSM Calculator — Variable Length Subnet Mask Calculator",
    description: "Allocate IPv4 subnets for different host requirements with a clear VLSM calculator.",
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
