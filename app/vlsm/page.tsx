import type { Metadata } from "next";
import Link from "next/link";
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
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <VlsmCalculator />
        </div>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <Link className="hover:text-foreground" href="/">Subnet Calculator</Link>
        </div>
      </footer>
    </>
  );
}
