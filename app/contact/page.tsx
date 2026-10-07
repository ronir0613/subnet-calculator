import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Subnet Calculator site maintainer.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

function getContactEmail(): string | null {
  const email = process.env.CONTACT_EMAIL?.trim() || "curatedclass13@gmail.com";
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export default function ContactPage() {
  const email = getContactEmail();
  return (
    <InfoPage title="Contact" summary="Send a question or report an issue with the calculator.">
      <section>
        <h2>Get in touch</h2>
        {email ? <p className="mb-5">The form opens a draft addressed to <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${email}`}>{email}</a>.</p> : <p className="mb-5">The message form will be available when the site owner adds a contact email.</p>}
        <ContactForm recipient={email} />
      </section>
    </InfoPage>
  );
}
