import type { Metadata } from "next";
import { getPageLanguageAlternates } from "@/lib/seo";
import { SubnetPageContent } from "@/components/calculator/subnet-page-content";

export const metadata: Metadata = {
  title: { absolute: "Subnet Calculator — IPv4 CIDR & IP Subnet Calculator" },
  description: "Calculate an IPv4 network address, broadcast, host range, subnet mask, wildcard mask, and CIDR details.",
  alternates: { canonical: "/", languages: getPageLanguageAlternates("/") },
};

export default function SubnetPage({ searchParams }: { searchParams: import("@/components/calculator/subnet-page-content").SubnetSearchParams }) {
  return <SubnetPageContent searchParams={searchParams} />;
}
