"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "News", href: "/news" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function ReferenceTopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 h-[88px] text-forest sm:h-[120px] lg:h-[160px]">
      <svg
        aria-hidden="true"
        viewBox="0 0 1592 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M0 0H1592V35L1548 105L112 159L62 151L0 82V0Z"
          fill="#F7C56B"
          stroke="#FFF4E0"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative mx-auto flex h-[72px] w-full items-center justify-between px-6 sm:h-[92px] sm:px-[9.5%] lg:h-[112px]">
        <Link href="/" className="flex items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">
          <Image
            src="/images/figma/header-logo-mark.svg"
            alt=""
            width={86}
            height={85}
            unoptimized
            className="h-10 w-auto sm:h-[58px] lg:h-[72px] [filter:brightness(0)_saturate(100%)_invert(23%)_sepia(12%)_saturate(939%)_hue-rotate(99deg)_brightness(91%)]"
          />
          <span className="leading-none">
            <span className="block font-display text-[22px] font-medium tracking-[-0.04em] sm:text-[31px] lg:text-[39px]">T Lines</span>
            <span className="block text-[9px] font-medium tracking-[0.08em] sm:text-[12px] lg:text-[14px]">STORE MAKER</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/contact"
            className="hidden text-sm font-bold hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest sm:block lg:text-base"
          >
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="responsive-menu"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              {open ? (
                <path d="M7 7L23 23M23 7L7 23" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              ) : (
                <path d="M5 8H25M5 15H25M5 22H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="responsive-menu"
          aria-label="Primary navigation"
          className="absolute right-4 top-[68px] w-[min(280px,calc(100vw-32px))] rounded-xl bg-forest p-4 text-cream shadow-2xl sm:right-[7%] sm:top-[88px] lg:top-[104px]"
        >
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 font-semibold hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
