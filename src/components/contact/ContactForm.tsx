"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";

export interface ContactFormProps {
  email: string;
}

const fields = [
  { name: "name", label: "Full Name", type: "text", autoComplete: "name", placeholder: "Your first and last names.." },
  { name: "phone", label: "Phone Number", type: "tel", autoComplete: "tel", placeholder: "example LTD.." },
  { name: "email", label: "Email Address", type: "email", autoComplete: "email", placeholder: "example LTD.." },
  { name: "company", label: "Company Name", type: "text", autoComplete: "organization", placeholder: "example LTD.." },
  { name: "location", label: "Store Location", type: "text", autoComplete: "street-address", placeholder: "Street, district, city, state.." },
] as const;

const labelClass =
  "font-display text-[13px] font-semibold text-forest after:ml-0.5 after:text-coral after:content-['*'] lg:text-[calc(var(--u)*17)]";
const inputClass =
  "mt-1.5 h-8 w-full border-0 border-b border-[#d6d8d4] bg-transparent px-0 text-[13px] text-forest placeholder:text-[#c8ceca] focus:border-forest focus:outline-none focus-visible:ring-0 lg:mt-[calc(var(--u)*5)] lg:h-[calc(var(--u)*42)] lg:text-[calc(var(--u)*15)]";

/** New-project form on the supplied 680x1031 shaped card. */
export function ContactForm({ email }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      `Company: ${value("company")}`,
      `Store location: ${value("location")}`,
      `Store condition: ${value("condition")}`,
      `Store type: ${value("storeType")}`,
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project enquiry from ${value("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Project enquiry form"
      className="relative isolate flex min-h-[760px] flex-col px-[8%] pb-[6%] pt-[8%] drop-shadow-[0_18px_24px_rgba(31,47,38,0.18)] lg:aspect-[680/1031] lg:min-h-0 lg:px-[calc(var(--u)*53)] lg:pb-[calc(var(--u)*44)] lg:pt-[calc(var(--u)*50)]"
    >
      <Image src="/images/contact/project-form-card.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />

      <div className="flex flex-col gap-3 lg:gap-[calc(var(--u)*15)]">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className={labelClass}>{field.label}</span>
            <input name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} required className={inputClass} />
          </label>
        ))}

        <fieldset>
          <legend className={labelClass}>Store Condition</legend>
          <div className="mt-2 flex gap-8 text-[12px] text-forest lg:gap-[calc(var(--u)*34)] lg:text-[calc(var(--u)*14)]">
            <label className="flex items-center gap-2">
              <input type="radio" name="condition" value="New Store" defaultChecked className="accent-forest" />
              New Store
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="condition" value="Remodeling" className="accent-forest" />
              Remodeling
            </label>
          </div>
        </fieldset>

        <label className="block">
          <span className={labelClass}>Store Type</span>
          <select name="storeType" required defaultValue="" className={`${inputClass} cursor-pointer`}>
            <option value="" disabled>Select Type</option>
            <option value="C-store">C-store</option>
            <option value="Truck Stop">Truck Stop</option>
            <option value="Grocery">Grocery</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="mt-1 flex items-start gap-3 text-[11px] leading-snug text-forest lg:mt-[calc(var(--u)*6)] lg:text-[calc(var(--u)*12)]">
          <input type="checkbox" name="privacy" required className="mt-0.5 h-4 w-4 shrink-0 accent-forest" />
          <span>
            I agree to the T Lines <Link href="/contact#privacy-policy" className="font-semibold underline underline-offset-2">Privacy Policy</Link>
          </span>
        </label>
      </div>

      <div className="mt-auto">
        <button
          type="submit"
          className="relative isolate flex aspect-[562/87] w-full items-center justify-center font-display text-[14px] font-bold text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest lg:text-[calc(var(--u)*18)]"
        >
          <Image src="/images/contact/project-submit-button.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
          Send Project Details
        </button>
        <p role="status" className="mt-1 text-center text-[11px] text-forest empty:hidden">
          {sent ? "Your mail app should open with the project details ready to send." : ""}
        </p>
      </div>
    </form>
  );
}
