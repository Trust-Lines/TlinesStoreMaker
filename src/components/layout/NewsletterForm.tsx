"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { submitLead } from "@/lib/leads";

export interface NewsletterFormProps {
  placeholder: string;
}

/** Footer newsletter field: posts the address to the ERP (see src/lib/leads.ts). */
export function NewsletterForm({ placeholder }: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  // State updates are async, so a fast double click or Enter could slip a second request in; the ref blocks it at once.
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const result = await submitLead({ kind: "newsletter", email: String(data.get("email") ?? "").trim() }, String(data.get("website") ?? ""));
    sending.current = false;
    if (result.ok) {
      form.reset();
      setStatus("sent");
      setMessage("Thanks for subscribing!");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative flex h-[46px] w-full max-w-[323px] items-center rounded-[4px] border border-cream focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral lg:h-[calc(var(--u)*48)] lg:w-[calc(var(--u)*323)] lg:max-w-none"
      >
        {/* Bot trap: hidden from visitors, bots fill it. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={placeholder}
            className="w-full bg-transparent pl-4 text-[14px] font-medium text-cream placeholder:text-cream focus:outline-none lg:pl-[calc(var(--u)*16)] lg:text-[calc(var(--u)*15)]"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          aria-label="Subscribe"
          className="px-4 text-[16px] transition-colors hover:text-coral disabled:opacity-60 lg:px-[calc(var(--u)*16)] lg:text-[calc(var(--u)*18)]"
        >
          <span aria-hidden>→</span>
        </button>
      </form>
      <p className="mt-2 max-w-[323px] text-[11px] leading-snug text-cream/60 lg:mt-[calc(var(--u)*10)] lg:max-w-[calc(var(--u)*323)] lg:text-[calc(var(--u)*11)]">
        By subscribing you agree to our{" "}
        <Link href="/contact#privacy-policy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
      <p role="status" className={`mt-1 text-[12px] empty:hidden ${status === "error" ? "text-gold" : "text-cream"}`}>
        {status === "sent" || status === "error" ? message : ""}
      </p>
    </div>
  );
}
