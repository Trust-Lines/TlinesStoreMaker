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
  { label: "Work", href: "/#projects" },
  { label: "News", href: "/news" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export function ReferenceTopBar() {
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
    <header className="fixed left-1/2 top-0 z-50 h-[88px] w-full max-w-[1592px] -translate-x-1/2 text-forest sm:h-[120px] lg:h-[min(9.58vw,153px)]">
      {/* Exact Figma top-bar vector (1534 x 147). Rotation/flip from the
          layer transform are already baked into the path. Stretched to the
          viewport width; non-scaling stroke keeps the 3px cream outline crisp. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1534 147"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M1.54345 -90.6031L2.28351 -65.5838L2.51575 -65.2302C11.0037 -52.2672 22.7184 -28.1483 30.4417 -13.6818L30.4408 -13.6808C56.8835 36.0513 82.7224 85.6616 112.662 133.378C117.276 140.732 125.496 144.976 134.149 144.635L1426.5 93.7102L1426.59 93.7065L1426.68 93.6911C1433.02 92.6547 1440.76 89.2658 1448.27 85.5962C1455.88 81.8736 1463.24 77.8734 1469.14 75.3546C1481.26 70.1797 1493.21 63.7491 1504.73 57.7408C1505.92 57.1197 1507.18 56.1892 1508.26 55.1225C1509.33 54.0662 1510.32 52.7851 1510.84 51.4314L1510.84 51.4195L1510.85 51.4077C1514.91 40.3217 1516.88 27.4941 1519.11 16.1986L1519.11 16.1976L1528.95 -32.9984L1528.95 -32.9993C1529.21 -34.2885 1530.19 -38.94 1531.04 -43.5024C1531.47 -45.7861 1531.87 -48.072 1532.13 -49.9269C1532.25 -50.8525 1532.35 -51.6917 1532.4 -52.3794C1532.44 -52.995 1532.46 -53.6978 1532.33 -54.2201C1530.5 -61.5677 1525.83 -69.8616 1520.76 -77.8238C1515.62 -85.9111 1510.14 -93.5534 1506.3 -100.033L1506.3 -100.034C1502.41 -106.583 1495.92 -110.531 1488.07 -110.647C1453.4 -111.16 1418.04 -109.236 1383.52 -109.02L1383.52 -109.02C1288.43 -108.357 1193.34 -107.116 1098.27 -105.296L289.342 -95.1066L289.338 -95.1065L117.794 -92.5509L117.79 -92.5508L70.5609 -91.6931L70.5609 -91.6941C67.7001 -91.6508 63.1523 -91.4998 58.6473 -91.4677C54.1127 -91.4353 49.8932 -91.5295 47.7508 -91.9348L47.5907 -91.9652L1.54345 -90.6031Z"
          fill="#F7C56B"
          stroke="#FFF4E0"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* lg+: Figma placement on the 1592 frame — logo 143px in / 24px down,
          "Get in touch" 97px from the menu icon, icon 94px from the right edge. */}
      <div className="relative mx-auto flex h-[72px] w-full items-center justify-between px-6 sm:h-[92px] sm:px-[9.5%] lg:h-auto lg:items-start lg:pl-[9%] lg:pr-[5.15%] lg:pt-[22px]">
        <Link href="/#home" className="flex items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">
          <Image
            src="/images/figma/topbar-logo.svg"
            alt="T Lines Store Maker"
            width={311}
            height={85}
            unoptimized
            priority
            className="h-auto w-[150px] sm:w-[210px] lg:mt-0.5 lg:w-[min(19.5vw,311px)]"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-8 lg:gap-[min(5.28vw,84px)]">
          <Link
            href="/#contact"
            className="hidden text-center font-display text-sm font-bold text-forest hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest sm:block lg:text-[min(1.445vw,23px)] lg:leading-[1.0435]"
          >
            Get in touch
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="side-nav"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          >
            <span className="sr-only">Open menu</span>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
              <path d="M5 8H25M5 15H25M5 22H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
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
