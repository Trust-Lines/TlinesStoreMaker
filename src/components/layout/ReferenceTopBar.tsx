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
    <header className={`fixed left-1/2 top-[env(safe-area-inset-top)] z-50 h-[88px] w-full max-w-[1592px] -translate-x-1/2 ${theme.ink} sm:h-[120px] lg:h-[min(7.76vw,123.6px)]`}>
      {/* Phones: the bar's fill continues above it (Figma node 621:7788 is the same shape,
          drawn taller and tucked behind the top edge). It fills the strip under the iPhone
          status bar / notch so the site has no empty band there, and it sits above the bar's svg and
          overlaps its top edge by 5px so no seam shows between the two. Zero-height strip + 4px on
          phones without a notch. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-5px)] z-[1] h-[calc(env(safe-area-inset-top)+5px)] sm:hidden"
        style={{ backgroundColor: theme.fill }}
      />

      {/* Figma top bar (1485 x 116, gold / coral / sage per page): the chamfered bar
          with a flat top and no outline, so no cream edge shows along the top of the
          page. Stretched to the header's own box. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1485 116"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path d="M65.2136 114.035C66.4442 114.863 67.9062 115.279 69.3886 115.223L1413.61 77.2074C1415.04 77.1534 1416.41 76.6667 1417.55 75.8124L1476.96 31.2503C1477.8 30.6211 1478.49 29.8113 1478.97 28.8808C1481.67 23.6949 1484.89 0.00231934 1484.89 0.00231934L0 0C0 0 52.7452 105.64 65.2136 114.035Z" fill={theme.fill} />
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
      className="side-nav m-0 ml-auto h-[calc(100dvh/var(--zoom))] max-h-none w-[min(420px,max(60vw,240px))] max-w-none bg-forest p-0 text-cream backdrop:bg-forest-dark/60"
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
