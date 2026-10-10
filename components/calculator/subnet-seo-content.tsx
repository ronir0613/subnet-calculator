import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Network, Calculator, ShieldCheck, Cpu } from "lucide-react";

export function SubnetSeoContent() {
  const faqs = [
    {
      question: "What is a subnet calculator and why do I need one?",
      answer: "A subnet calculator is a specialized tool that automates the complex mathematical process of IP subnetting. It helps network administrators, engineers, and IT students calculate IP address ranges, subnet masks, and broadcast addresses instantaneously. This eliminates manual calculation errors and prevents overlapping subnets during network architecture design."
    },
    {
      question: "What is subnetting in computer networking?",
      answer: "Subnetting is the practice of dividing a single, large physical network into multiple smaller, logically independent network segments (subnets). This process improves overall network performance by reducing broadcast domain size, enhances network security through compartmentalization, and allows for vastly more efficient IP address management."
    },
    {
      question: "How do I calculate subnets using CIDR notation?",
      answer: "To use CIDR (Classless Inter-Domain Routing) notation, enter your base IPv4 address and select the appropriate routing prefix (e.g., /24, /26). The calculator uses this prefix length to instantly determine the network ID, subnet mask, usable host IP range, and broadcast address without requiring manual binary conversion."
    },
    {
      question: "How do you calculate the number of usable hosts in a subnet?",
      answer: "The number of usable hosts is mathematically calculated using the formula: 2^(32 - prefix length) - 2. The subtraction of 2 is necessary because the very first IP address is reserved for the network identifier, and the very last IP address is reserved as the broadcast address."
    },
    {
      question: "What is the difference between a Network Address and a Broadcast Address?",
      answer: "The Network Address is the first IP in a subnet range and acts as the identifier for the network segment itself—it cannot be assigned to a host. The Broadcast Address is the last IP in the subnet range and is used exclusively by protocols to transmit data packets simultaneously to all devices within that specific subnet."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="mt-20 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border shadow-sm mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
              <Network className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">The Ultimate IPv4 Subnet Calculator</h2>
          </div>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Welcome to the most efficient, accurate, and user-friendly <strong>IP subnet calculator</strong> available. 
              Whether you are a seasoned network engineer managing complex enterprise infrastructure or an IT student preparing for industry certifications like Cisco CCNA, CompTIA Network+, or Juniper JNCIA, 
              our tool is designed to simplify the intricate process of IPv4 subnetting.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              By inputting a standard IPv4 address and selecting either a CIDR routing prefix or a traditional subnet mask, you can instantly determine crucial network parameters. Our engine rapidly calculates the <strong>network address, broadcast address, first usable host, last usable host, wildcard mask, and the total capacity of usable IPs</strong>.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <Calculator className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">CIDR Support</h3>
              <p className="text-sm text-muted-foreground">Seamlessly convert between standard subnet masks and Classless Inter-Domain Routing (CIDR) notation.</p>
            </div>
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">100% Accurate</h3>
              <p className="text-sm text-muted-foreground">Rely on precise binary calculations to ensure your network segments never overlap in production.</p>
            </div>
            <div className="bg-background rounded-xl p-6 border shadow-sm">
              <Cpu className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Fast & Local</h3>
              <p className="text-sm text-muted-foreground">All subnetting math is performed instantly in your browser. No server delays, fully private.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about IP addressing and subnetting.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-0 mb-4 bg-card/50 rounded-lg px-2 border">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-4 px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-4 pb-4 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
