import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | Subnet Calculator",
  description: "Terms of service and usage conditions for the Subnet Calculator platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms and Conditions" summary="Legal terms governing your use of our networking tools and content.">
      <p className="italic mb-8">Last updated: October 10, 2026</p>
      
      <section className="mb-8">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Subnet Calculator website and its suite of tools (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Permitted Use</h2>
        <p>
          The Service is provided for educational, network planning, and legitimate IT administrative purposes. You may use our calculators and reference guides to design and manage network infrastructures. You agree not to use the Service in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
        </p>
      </section>

      <section className="mb-8">
        <h2>3. Disclaimer of Warranties and Liability</h2>
        <p className="mb-4">
          <strong>Accuracy Verification:</strong> While we strive for absolute mathematical precision, the tools calculate generic IPv4 ranges based solely on the input provided. Complex network environments, proprietary router configurations, and specific security policies may impose constraints that a pure mathematical calculation cannot account for.
        </p>
        <p>
          <strong>No Warranty:</strong> The Service is provided "as is" without any representations or warranties, express or implied. We strongly advise that you independently verify all calculations and network plans before deploying them to production environments. Subnet Calculator shall not be liable for any network outages, data loss, or indirect damages arising from the use of our calculations.
        </p>
      </section>

      <section className="mb-8">
        <h2>4. Modifications to the Service</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue the Service (or any part or content thereof) at any time with or without notice. We shall not be liable to you or to any third-party for any modification, suspension, or discontinuance of the Service.
        </p>
      </section>

      <section>
        <h2>5. Contact Information</h2>
        <p>
          Questions about the Terms and Conditions should be sent to us via our <Link className="text-primary underline-offset-4 hover:underline font-medium" href="/contact">Contact Page</Link>.
        </p>
      </section>
    </InfoPage>
  );
}
