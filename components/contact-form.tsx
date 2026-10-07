"use client";

import { type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ recipient }: { recipient: string | null }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!recipient) return;

    const fields = new FormData(event.currentTarget);
    const subject = String(fields.get("subject") ?? "");
    const message = [
      `From: ${String(fields.get("name") ?? "")}`,
      `Reply email: ${String(fields.get("email") ?? "")}`,
      "",
      String(fields.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  if (!recipient) {
    return (
      <p className="rounded-md border border-border bg-muted p-4 text-sm leading-6 text-muted-foreground">
        The site owner has not set a destination address yet.
      </p>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input autoComplete="name" id="contact-name" maxLength={120} name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input autoComplete="email" id="contact-email" maxLength={254} name="email" required type="email" />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" maxLength={160} name="subject" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea className="min-h-36" id="contact-message" maxLength={4000} name="message" required />
      </div>
      <div>
        <Button className="min-h-11" type="submit">Open email app</Button>
        <p className="mt-2 text-xs text-muted-foreground">Your email app opens with the message ready to send.</p>
      </div>
    </form>
  );
}
