"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logo: { src: string; alt: string; href: string };
  contactAction: { label: string; href: string };
  primaryAction: { label: string; href: string };
  activePath?: string;
}

/**
 * Header matching the Figma frame: a shaped green (#2E4437) bar with a cream
 * (#FFF4E0) outline and an angled bottom edge, overlaid on top of the hero
 * photo. The parent that renders it together with <HeroSection /> must be
 * `relative` so this `absolute` header lays over the image correctly.
 */
export function SiteHeader({
  navItems,
  logo,
  contactAction,
  primaryAction,
  activePath = "/",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      {/* Shaped green top-bar (exact Figma shape) sitting behind the header
          content. preserveAspectRatio="none" stretches it to any viewport
          width; the non-scaling stroke keeps the cream outline a crisp 3px. */}
      <svg
        aria-hidden
        viewBox="0 0 1592 164"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[96px] w-full md:h-[164px]"
      >
        <path
          d="M-8.85718 92.7013C11.3809 114.797 54.2857 159.59 64 162L1546.93 110.779L1595.5 50.5195V-98.6234L1546.93 -146.831L64 -186L-8.85718 -115.195V92.7013Z"
          fill="#2E4437"
          stroke="#FFF4E0"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="mx-auto flex h-[84px] w-full max-w-[1592px] items-center justify-between gap-4 px-6 md:h-[112px] md:px-[7.6%]">
        <Link href={logo.href} className="flex items-center gap-3 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
          <Image src={logo.src} alt="" width={86} height={85} unoptimized className="h-11 w-auto md:h-[85px]" />
          <span className="flex flex-col leading-none text-cream">
            <Image src="/images/figma/header-logo-word1.svg" alt="" width={213} height={17} unoptimized className="hidden h-auto w-[213px] md:block" />
            <Image src="/images/figma/header-logo-word2.svg" alt={logo.alt} width={213} height={40} unoptimized className="hidden h-auto w-[213px] md:block" />
            <span className="sr-only md:hidden">{logo.alt}</span>
          </span>
        </Link>

        {/* Nav-actions cluster: Figma specs a uniform 29.62px gap between
            "Get in touch", "Start Your Project", and the menu icon, with the
            large logo<->cluster gap (~1001.68px at the 1592px frame width)
            just being whatever space is left over — exactly what the outer
            row's `justify-between` already produces, so that part needs no
            hardcoded value. */}
        <div className="flex items-center gap-[29.62px]">
          <div className="hidden items-center gap-[29.62px] md:flex">
          {/* "Get in touch": exact chamfered-pill outline from Figma (stroke
              only, no fill). The path's own coordinates already fit its
              173x56 viewBox exactly, so it's used as-is. */}
          <Link
            href={primaryAction.href}
            className="relative isolate inline-flex h-[54px] w-[212px] items-center justify-center text-sm font-bold text-cream transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            <svg
              aria-hidden
              viewBox="0 0 212 54"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            >
              <path
                d="M212 43.2468C208.845 46.6753 202.157 53.626 200.643 54L7.57143 46.0519L0 36.7013V13.5584L7.57143 6.07792L200.643 0L212 10.987V43.2468Z"
                fill="#DB7358"
              />
            </svg>
            {primaryAction.label}
          </Link>

          {/* "Start Your Project": exact chamfered-pill fill from Figma,
              mirrored per the layer's own scaleX(-1) transform. */}
          <Link
            href={contactAction.href}
            className="relative isolate inline-flex h-[54px] w-[173px] items-center justify-center text-sm font-bold text-cream transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            <svg
              aria-hidden
              viewBox="0 0 173 56"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            >
              <path
                d="M0.5 43.7548C3.65476 47.1834 10.3429 54.134 11.8571 54.5081L164.929 46.56L172.5 37.2094V14.0665L164.929 6.58598L11.8571 0.508057L0.5 11.4951V43.7548Z"
                stroke="#FFF4E0"
              />
            </svg>
            {contactAction.label}
          </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-nav-drawer"
            className="inline-flex aspect-square h-[35px] w-[35px] items-center justify-center text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="primary-nav-drawer"
          aria-label="Primary"
          className="mx-4 rounded-2xl bg-forest px-6 py-6 text-cream shadow-xl md:mx-10"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === activePath;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-sm py-2 text-base font-semibold transition-colors hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${
                      isActive ? "text-coral" : "text-cream"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-cream/15 pt-4 md:hidden">
            <Link
              href={contactAction.href}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-cream px-6 py-3 text-sm font-bold text-cream"
            >
              {contactAction.label}
            </Link>
            <Link
              href={primaryAction.href}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-coral px-6 py-3 text-sm font-bold text-cream"
            >
              {primaryAction.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
