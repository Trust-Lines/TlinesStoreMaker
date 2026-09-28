"use client";

import type { FormEvent } from "react";

export interface NewsletterFormProps {
  placeholder: string;
  /** Inbox that receives sign-ups until a mailing-list service is wired up. */
  email: string;
}

/** Footer newsletter field: opens the visitor's mail app with a sign-up request. */
export function NewsletterForm({ placeholder, email }: NewsletterFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subscriber = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Newsletter sign-up")}&body=${encodeURIComponent(`Please add ${subscriber} to the T Lines newsletter.`)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[46px] w-full max-w-[323px] items-center rounded-[4px] border border-cream focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coral lg:h-[calc(var(--u)*48)] lg:w-[calc(var(--u)*323)] lg:max-w-none"
    >
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
      <button type="submit" aria-label="Subscribe" className="px-4 text-[16px] transition-colors hover:text-coral lg:px-[calc(var(--u)*16)] lg:text-[calc(var(--u)*18)]">
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}
