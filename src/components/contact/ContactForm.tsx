"use client";

import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { submitLead } from "@/lib/leads";

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
  "mt-1.5 h-8 w-full border-0 border-b border-[#d6d8d4] bg-transparent px-0 text-[13px] text-forest placeholder:text-[#c8ceca] focus:border-forest focus:outline-none focus-visible:ring-0 lg:mt-[calc(var(--u)*5)] lg:h-[calc(var(--u)*46)] lg:text-[calc(var(--u)*15)]";

/** New-project form on the supplied 680x1031 shaped card. Posts to the ERP (see src/lib/leads.ts). */
export function ContactForm() {
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
    const value = (key: string) => String(data.get(key) ?? "").trim();
    setStatus("sending");
    const result = await submitLead(
      {
        kind: "contact",
        name: value("name"),
        phone: value("phone"),
        email: value("email"),
        company: value("company"),
        storeLocation: value("location"),
        storeCondition: value("condition"),
        storeType: value("storeType"),
      },
      value("website"),
    );
    sending.current = false;
    if (result.ok) {
      form.reset();
      setStatus("sent");
      setMessage("Thank you! We received your project details and will be in touch soon.");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  return (
    <form
      id="project-form"
      onSubmit={handleSubmit}
      aria-label="Project enquiry form"
      className="relative isolate flex min-h-[760px] scroll-mt-24 flex-col px-[8%] pb-[6%] pt-[8%] drop-shadow-[0_18px_24px_rgba(31,47,38,0.18)] lg:aspect-[680/1031] lg:min-h-0 lg:pb-[calc(var(--u)*44)] lg:pl-[calc(var(--u)*60)] lg:pr-[calc(var(--u)*56)] lg:pt-[calc(var(--u)*53)]"
    >
      <Image src="/images/contact/project-form-card.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />

      <div className="flex flex-col gap-4 lg:gap-[calc(var(--u)*37)]">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className={labelClass}>{field.label}</span>
            <input name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} required className={inputClass} />
          </label>
        ))}

        <fieldset>
          <legend className={labelClass}>Store Condition</legend>
          <div className="mt-2 flex gap-8 text-[12px] text-forest lg:mt-[calc(var(--u)*14)] lg:gap-[calc(var(--u)*80)] lg:text-[calc(var(--u)*14)]">
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

        <label className="mt-2 flex items-center gap-2.5 text-[11px] leading-snug text-forest lg:mt-[calc(var(--u)*12)] lg:gap-[calc(var(--u)*14)] lg:text-[calc(var(--u)*13)]">
          <input type="checkbox" name="privacy" required className="h-4 w-4 shrink-0 accent-forest lg:h-[calc(var(--u)*24)] lg:w-[calc(var(--u)*24)]" />
          <span>
            I agree to the T Lines <Link href="/contact#privacy-policy" className="font-semibold underline underline-offset-2">Privacy Policy</Link>
          </span>
        </label>
      </div>

      <div className="mt-auto pt-6 lg:pt-[calc(var(--u)*24)]">
        <button
          type="submit"
          className="relative isolate flex aspect-[562/87] w-full items-center justify-center font-display text-[14px] font-bold text-cream transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest lg:text-[calc(var(--u)*18)]"
        >
          <Image src="/images/contact/project-submit-button.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
          Send Project Details
        </button>
        <p role="status" className={`mt-1 text-center text-[11px] empty:hidden ${status === "error" ? "text-coral-dark" : "text-forest"}`}>
          {status === "sent" || status === "error" ? message : ""}
        </p>
      </div>
    </form>
  );
}
