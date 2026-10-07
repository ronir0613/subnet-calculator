import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for using the Subnet Calculator IPv4 tools and guides.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms and conditions" summary="Terms for using the subnet tools and reference content.">
      <p>Last updated October 7, 2026.</p>
      <section>
        <h2>Using the tools</h2>
        <p>You may use the calculator and guides for lawful networking, learning, and planning. Do not use the site to interfere with its operation or with other networks.</p>
      </section>
      <section>
        <h2>Check results before use</h2>
        <p>The tools calculate IPv4 ranges from the values provided. Network policies and device configurations can add requirements that a general subnet calculation does not cover. Verify results against your network plan before applying changes to a live system.</p>
      </section>
      <section>
        <h2>Availability and updates</h2>
        <p>The site and its content may change as the tools are updated. Features may be unavailable during maintenance or service interruptions.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent through the <Link className="text-primary underline-offset-4 hover:underline" href="/contact">Contact page</Link>.</p>
      </section>
    </InfoPage>
  );
}
