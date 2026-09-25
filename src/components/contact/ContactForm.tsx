"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export interface ContactFormProps {
  /** Inbox the message is addressed to. */
  email: string;
}

const fields = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name", placeholder: "Your first and last names.." },
  { name: "company", label: "Company Name", type: "text", autoComplete: "organization", placeholder: "example LTD.." },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", placeholder: "+1 (000) 000-0000" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@company.com" },
] as const;

const labelClass =
  "font-display text-[15px] font-semibold text-forest lg:text-[max(13px,calc(var(--u)*18))] after:ml-0.5 after:text-coral after:content-['*']";
const inputClass =
  "mt-2 w-full border-0 border-b border-[#cfcac0] bg-transparent px-0 py-2 font-sans text-[15px] text-forest placeholder:text-[#c4c0b8] focus:border-forest focus:outline-none focus-visible:ring-0 lg:mt-[calc(var(--u)*10)] lg:text-[max(12px,calc(var(--u)*16))]";

/**
 * "Contact us" form card: white Figma card vector (626 x 930, soft-cut corners)
 * behind Frame 427318975 (52px side
 * padding, 50px between fields, coral 518 x 87 send button). There is no
 * backend yet, so a valid submission opens the visitor's mail app with the
 * message pre-filled.
 */
export function ContactForm({ email }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${value("name")}`,
      `Company: ${value("company")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      "",
      value("message"),
    ].join("\n");
    const subject = `Website enquiry from ${value("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Contact form"
      className="relative isolate flex flex-col gap-7 px-6 pb-7 pt-8 drop-shadow-[0_18px_24px_rgba(31,47,38,0.22)] sm:px-10 lg:gap-[calc(var(--u)*50)] lg:px-[calc(var(--u)*52)] lg:pb-[calc(var(--u)*35)] lg:pt-[calc(var(--u)*50)]"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-white [mask-repeat:no-repeat] [mask-size:100%_100%]"
        style={{ maskImage: "url(/images/contact/form-card.svg)", WebkitMaskImage: "url(/images/contact/form-card.svg)" }}
      />
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className={labelClass}>{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            required
            className={inputClass}
          />
        </label>
      ))}

      <label className="block">
        <span className={labelClass}>Your Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Type your message.."
          required
          className={`${inputClass} resize-y lg:h-[calc(var(--u)*136)]`}
        />
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="relative isolate flex aspect-[518/87] w-full items-center justify-center font-display text-[17px] font-bold text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest lg:text-[max(16px,calc(var(--u)*22))]"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-coral [mask-repeat:no-repeat] [mask-size:100%_100%]"
            style={{ maskImage: "url(/images/contact/send-button.svg)", WebkitMaskImage: "url(/images/contact/send-button.svg)" }}
          />
          Send Message
        </button>
        <p role="status" className="text-center text-sm text-forest empty:hidden">
          {sent ? "Your mail app should open with the message ready to send." : ""}
        </p>
      </div>
    </form>
  );
}
