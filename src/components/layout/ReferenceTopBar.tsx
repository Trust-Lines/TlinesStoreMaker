"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "C-store", href: "/services/c-store", sub: true },
  { label: "Truck stops", href: "/services/truck-stops", sub: true },
  { label: "Grocery", href: "/services/grocery", sub: true },
  { label: "Branding", href: "/#branding", sub: true },
  { label: "Management", href: "/#management", sub: true },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Bar colourways: gold with forest ink (default); coral (Truck Stops frame) and sage (Grocery frame) with cream ink. */
const tones = {
  gold: {
    fill: "#F7C56B",
    ink: "text-forest",
    focus: "focus-visible:outline-forest",
    logo: { src: "/images/figma/topbar-logo.svg", width: 311, height: 85, className: "w-[150px] sm:w-[210px] lg:w-[min(17.68vw,281.6px)]" },
    menuIcon: "/images/figma/menu-icon.svg",
  },
  // Same logo asset/box as the gold (homepage) bar — only the fill colour
  // changes (a cream-recoloured duplicate of topbar-logo.svg), so the logo
  // is the exact same size everywhere.
  coral: {
    fill: "#DB7358",
    ink: "text-cream",
    focus: "focus-visible:outline-cream",
    logo: { src: "/images/figma/topbar-logo-cream-v2.svg", width: 311, height: 85, className: "w-[150px] sm:w-[210px] lg:w-[min(17.68vw,281.6px)]" },
    menuIcon: "/images/figma/menu-icon-cream.svg",
  },
  sage: {
    fill: "#557256",
    ink: "text-cream",
    focus: "focus-visible:outline-cream",
    logo: { src: "/images/figma/topbar-logo-cream-v2.svg", width: 311, height: 85, className: "w-[150px] sm:w-[210px] lg:w-[min(17.68vw,281.6px)]" },
    menuIcon: "/images/figma/menu-icon-cream.svg",
  },
} as const;

export interface ReferenceTopBarProps {
  tone?: keyof typeof tones;
}

export function ReferenceTopBar({ tone = "gold" }: ReferenceTopBarProps) {
  const theme = tones[tone];
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Fixed so it stays visible while scrolling; centered and capped to the same
  // 1592px column as the page. Height matches --header-h in globals.css.
  return (
    <>
    <header className={`fixed left-1/2 top-0 z-50 h-[88px] w-full max-w-[1592px] -translate-x-1/2 ${theme.ink} sm:h-[120px] lg:h-[min(7.76vw,123.6px)]`}>
      {/* Figma node 406:17451 (Property 1=Default): a single flatter chamfered
          bar (cut corner bottom-right), 1484.889 x 115.228, replacing the
          previous zigzag-ended shape. Stretched to the header's own box;
          non-scaling stroke keeps the 3px cream outline crisp. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1493.17 121.228"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M4.85102 1.50001L1489.74 1.50196H1491.46L1491.23 3.20411L1489.74 3.00196L1491.23 3.20509C1491.23 3.20589 1491.23 3.20747 1491.23 3.20899C1491.22 3.21203 1491.22 3.21682 1491.22 3.22266C1491.22 3.23439 1491.22 3.25182 1491.22 3.27442C1491.21 3.32007 1491.2 3.3876 1491.19 3.47559C1491.16 3.65182 1491.13 3.91062 1491.08 4.24122C1490.99 4.90236 1490.85 5.8517 1490.68 7.00684C1490.33 9.3166 1489.84 12.453 1489.27 15.7539C1488.7 19.0516 1488.04 22.53 1487.35 25.5186C1486.67 28.4481 1485.93 31.0831 1485.15 32.5732C1484.57 33.7029 1483.73 34.6861 1482.71 35.4502L1423.3 80.0127C1421.91 81.0499 1420.25 81.6405 1418.52 81.7061L1418.51 81.707H1418.51L74.2817 119.723L74.2807 119.722C72.4861 119.786 70.7169 119.282 69.227 118.279C68.2817 117.643 67.2423 116.618 66.145 115.354C65.0318 114.07 63.7948 112.465 62.4614 110.597C59.794 106.86 56.6892 102.008 53.3315 96.4512C46.6137 85.3345 38.837 71.3165 31.4604 57.5791C24.0819 43.8381 17.0949 30.3614 11.9526 20.3213C9.38124 15.3009 7.27089 11.1387 5.80317 8.23145C5.06933 6.77788 4.49576 5.6381 4.10591 4.86134C3.91098 4.47295 3.76198 4.17522 3.66157 3.97462C3.61137 3.87432 3.57282 3.79811 3.54731 3.74708C3.53464 3.72172 3.52541 3.70232 3.51899 3.68946C3.51578 3.68304 3.51281 3.67807 3.51118 3.67481C3.51044 3.67333 3.50961 3.67167 3.50923 3.67091C3.51044 3.66931 3.55635 3.64642 4.85102 3.00001L3.50923 3.66993L2.42524 1.50001H4.85102Z"
          fill={theme.fill}
          stroke="#FFF4E0"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Phones: side padding clears the bar's chamfered corner, so neither
          the logo nor the menu icon pokes out of the shape.
          lg+: Figma placement (node 406:17451, 1484.889 x 115.228 frame) —
          logo box left 5.85% / top 15.62% / height 62.26% of the bar; the
          "Get in touch" + menu group starts at left 74.14%, ends 5.93% from
          the right edge, top 12.59%, with a 97px gap (6.53% of the bar's
          width) between the text and the 51px menu icon. */}
      <div className="relative mx-auto flex h-[72px] w-full items-center justify-between pl-[calc(6.5%+14px)] pr-[calc(7%+6px)] sm:h-[92px] sm:px-[9.5%] lg:h-auto lg:items-start lg:pl-[min(5.851vw,93.15px)] lg:pr-[min(5.926vw,94.34px)]">
        <Link
          href="/#home"
          className={`flex items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 ${theme.focus} lg:mt-[min(1.212vw,19.31px)]`}
        >
          <Image
            src={theme.logo.src}
            alt="T Lines Store Maker"
            width={theme.logo.width}
            height={theme.logo.height}
            unoptimized
            priority
            className={`h-auto ${theme.logo.className}`}
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-8 lg:mt-[min(0.977vw,15.56px)] lg:gap-[min(6.533vw,104px)]">
          <Link
            href="/contact"
            className={`hidden text-center font-display text-sm font-bold hover:opacity-70 focus-visible:outline focus-visible:outline-2 ${theme.focus} sm:block lg:text-[min(1.445vw,23px)] lg:leading-[1.0435]`}
          >
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="side-nav"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 ${theme.focus} sm:h-[51px] sm:w-[51px] lg:h-[min(3.2vw,51px)] lg:w-[min(3.2vw,51px)]`}
          >
            <span className="sr-only">Open menu</span>
            {/* Exact Figma menu icon (51 x 51). */}
            <Image src={theme.menuIcon} alt="" width={51} height={51} unoptimized className="h-full w-full" />
          </button>
        </div>
      </div>
    </header>

    {/* Side nav drawer: a modal <dialog> (focus trap, Esc, inert page) pinned to
        the right edge, full height, over a dimmed page. Rendered outside the
        header because the header's transform would otherwise become the
        containing block for this fixed-position panel. */}
    <dialog
      ref={dialogRef}
      id="side-nav"
      aria-label="Site navigation"
      onClose={() => setOpen(false)}
      onClick={(event) => {
        // Clicking the dimmed backdrop (outside the panel) closes the drawer.
        if (event.target === event.currentTarget) setOpen(false);
      }}
      className="side-nav m-0 ml-auto h-dvh max-h-none w-[min(420px,max(60vw,240px))] max-w-none bg-forest p-0 text-cream backdrop:bg-forest-dark/60"
    >
      <div className="flex h-full flex-col overflow-y-auto overscroll-contain px-[14%] pb-10 pt-5">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="self-end transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        >
          <span className="sr-only">Close menu</span>
          {/* Same Figma close button as the project lightbox (coral ribbon + ×, 117 x 67). */}
          <Image src="/images/figma/close-button.svg" alt="" width={117} height={67} unoptimized className="h-auto w-[88px] sm:w-[117px]" />
        </button>

        <nav aria-label="Primary navigation" className="mt-4">
          <ul className="flex flex-col">
            {menuItems.map((item) => {
              const sub = "sub" in item;
              return (
                <li key={item.href} className={sub ? "" : "mt-3 first:mt-0"}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream ${
                      sub
                        ? "py-1.5 pl-[1.6em] font-sans text-[clamp(1rem,4.2vw,1.3rem)] font-normal text-cream/90 hover:text-gold"
                        : "py-2 font-display text-[clamp(1.25rem,5.2vw,1.75rem)] font-bold hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </dialog>
    </>
  );
}
