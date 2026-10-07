import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How the Subnet Calculator website handles calculator values, theme preferences, and contact messages.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Privacy" summary="What this site uses and stores while you use its tools.">
      <p>Last updated October 7, 2026.</p>
      <section>
        <h2>Calculator values</h2>
        <p>The address and prefix you enter are used to calculate subnet results. The app has no account system or application database for saving calculator inputs. If you create a share link, its address and prefix appear in the URL. Your hosting provider may process request URLs and operational logs as part of running the site.</p>
      </section>
      <section>
        <h2>Theme preference</h2>
        <p>Your light or dark theme choice is saved in local storage in this browser. The site does not need an account to remember it.</p>
      </section>
      <section>
        <h2>Contact messages</h2>
        <p>If the contact form is enabled, it opens your email application with the message you entered. This site does not submit or store that message. Your email provider handles it after you send it.</p>
      </section>
      <section>
        <h2>Analytics and cookies</h2>
        <p>No analytics integration or advertising cookies are configured in this application.</p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>Use the <Link className="text-primary underline-offset-4 hover:underline" href="/contact">Contact page</Link> for privacy questions.</p>
      </section>
    </InfoPage>
  );
}
