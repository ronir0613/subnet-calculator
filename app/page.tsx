import type { Metadata } from "next";
import { SubnetPageContent } from "@/components/calculator/subnet-page-content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage({ searchParams }: { searchParams: import("@/components/calculator/subnet-page-content").SubnetSearchParams }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Subnet Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: "Calculate IPv4 networks, CIDR ranges, subnet masks, and usable hosts.",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SubnetPageContent searchParams={searchParams} />
    </>
  );
}
