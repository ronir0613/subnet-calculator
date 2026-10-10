import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { InfoPage } from "@/components/info-page";
import { Mail, MessageSquare, LifeBuoy } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Subnet Calculator",
  description: "Get in touch with the Subnet Calculator team for support, feedback, or inquiries.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

function getContactEmail(): string | null {
  const email = process.env.CONTACT_EMAIL?.trim() || "support@subnetcalculator.example.com";
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export default function ContactPage() {
  const email = getContactEmail();
  return (
    <InfoPage title="Contact Support" summary="We're here to help you with any issues or feedback regarding our tools.">
      <section className="mb-10">
        <h2>How can we assist you?</h2>
        <p className="mb-6">
          Whether you have a technical question about our VLSM algorithm, a feature request, or need to report a bug, our team is ready to assist. We strive to provide prompt and accurate responses to all inquiries from our professional community.
        </p>
        
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <div className="p-5 border rounded-xl bg-card/50 shadow-sm">
            <LifeBuoy className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1 m-0">Technical Support</h3>
            <p className="text-sm m-0">Assistance with calculator outputs and tool usage.</p>
          </div>
          <div className="p-5 border rounded-xl bg-card/50 shadow-sm">
            <MessageSquare className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1 m-0">Feedback</h3>
            <p className="text-sm m-0">Share your ideas for new features or improvements.</p>
          </div>
          <div className="p-5 border rounded-xl bg-card/50 shadow-sm">
            <Mail className="w-6 h-6 text-primary mb-3" />
            <h3 className="font-semibold text-foreground mb-1 m-0">Inquiries</h3>
            <p className="text-sm m-0">Partnerships, licensing, and other matters.</p>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 p-6 sm:p-8 rounded-2xl border">
        <h2 className="mt-0">Send a Message</h2>
        {email ? (
          <p className="mb-6">
            Submitting the form below will prepare a draft in your default email client addressed to <a className="text-primary font-medium hover:underline" href={`mailto:${email}`}>{email}</a>.
          </p>
        ) : (
          <p className="mb-6 text-amber-600 dark:text-amber-500">
            The contact system is currently undergoing maintenance. Please check back later.
          </p>
        )}
        <div className="max-w-md">
          <ContactForm recipient={email} />
        </div>
      </section>
    </InfoPage>
  );
}
