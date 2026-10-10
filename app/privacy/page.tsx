import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Subnet Calculator",
  description: "How the Subnet Calculator platform handles your data, calculator inputs, and privacy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy Policy" summary="Understanding how we protect your data and privacy while using our tools.">
      <p className="italic mb-8">Last updated: October 10, 2026</p>
      
      <section className="mb-8">
        <h2>1. Client-Side Processing</h2>
        <p>
          Subnet Calculator is designed with privacy as a foundational principle. All subnet, VLSM, and CIDR calculations are performed entirely on your device (client-side) using JavaScript. <strong>We do not transmit, log, or store your IP inputs or network configurations on any external servers.</strong> Your network architecture remains completely private to you.
        </p>
      </section>

      <section className="mb-8">
        <h2>2. Data Collection & Analytics</h2>
        <p>
          We believe in a bloat-free experience. This application does not use invasive tracking pixels, advertising cookies, or third-party analytics platforms. 
        </p>
        <p className="mt-4">
          The only data processed by our hosting provider includes standard operational metrics (such as access logs, IP addresses, and user-agent strings) required strictly for security, rate-limiting, and basic site delivery.
        </p>
      </section>

      <section className="mb-8">
        <h2>3. Local Storage</h2>
        <p>
          We use your browser's local storage (localStorage) exclusively to remember your UI preferences, such as your chosen light or dark theme. This data never leaves your browser and is not associated with any personal account, as we do not require user registration.
        </p>
      </section>

      <section className="mb-8">
        <h2>4. Contact Forms and Communication</h2>
        <p>
          If you use our contact form, it acts as a mailto link generator that opens your default email client. We do not intercept or store the contents of your drafted messages on our servers. Any emails you send to our support team are handled in accordance with standard email privacy protocols.
        </p>
      </section>

      <section>
        <h2>5. Inquiries</h2>
        <p>
          If you have any questions or concerns regarding this privacy policy, please reach out via our <Link className="text-primary underline-offset-4 hover:underline font-medium" href="/contact">Contact Page</Link>.
        </p>
      </section>
    </InfoPage>
  );
}
