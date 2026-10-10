import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";
import { Network, Server } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | IPv4 Subnet Calculator",
  description: "Learn about the mission and technology behind our professional IPv4 subnet, CIDR, and VLSM tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage title="About Us" summary="Empowering network professionals with precision-engineered IP tooling.">
      <section className="mb-10">
        <h2>Our Mission</h2>
        <p className="mb-4">
          At Subnet Calculator, we recognize that network architecture requires absolute precision. A single miscalculated subnet can lead to cascading routing failures, IP address conflicts, and significant downtime. Our mission is to provide network engineers, system administrators, and IT students with the most reliable, fast, and intuitive IP calculation tools on the web.
        </p>
        <p>
          We aim to demystify complex networking mathematics, offering an elegant interface that performs instant, client-side calculations for IPv4 addressing, Classless Inter-Domain Routing (CIDR), and Variable Length Subnet Masking (VLSM).
        </p>
      </section>

      <section className="mb-10">
        <h2>Core Capabilities</h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <div className="flex gap-3">
            <Network className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="block text-foreground mb-1">Advanced IPv4 Subnetting</strong>
              <span>Instantly derive network ranges, broadcast addresses, and host capacities from any IP and CIDR prefix.</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Server className="w-5 h-5 text-primary shrink-0 mt-1" />
            <div>
              <strong className="block text-foreground mb-1">VLSM Planning</strong>
              <span>Dynamically allocate subnets of varying sizes from a single major network block to maximize address efficiency.</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Built for Professionals, by Professionals</h2>
        <p className="mb-4">
          Our calculator processes all logic locally in your browser. This means your network layouts remain strictly confidential, and calculations occur with zero latency. No data is transmitted to external servers.
        </p>
        <p>
          Whether you are designing a scalable data center infrastructure, configuring a local branch office, or preparing for Cisco CCNA and CompTIA Network+ certifications, our tools are built to support your workflow.
        </p>
        <p className="mt-8">
          <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2" href="/">
            Go to Calculator
          </Link>
        </p>
      </section>
    </InfoPage>
  );
}
