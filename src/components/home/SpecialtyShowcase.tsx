"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { SpecialtyCardData } from "./SpecialtyCard";

const assetRoot = "/images/figma/specialty/showcase";
const brandingSlides = [
  `${assetRoot}/branding-deck-3.svg`,
  `${assetRoot}/branding-deck-1.svg`,
  `${assetRoot}/branding-deck-2.svg`,
];
const managementSlides = [
  `${assetRoot}/management-deck-3.svg`,
  `${assetRoot}/management-deck-1.svg`,
  `${assetRoot}/management-deck-2.svg`,
];

/**
 * Asymmetrical Branding / Project Management composition (Figma frame, 1592 wide):
 * Branding card 485 x 833 at x=101, Project Management card 885.5 x 833 20px to its
 * right (100.5px right margin). In both, the photo stack starts 194px below the
 * card top and ends 28px above its bottom; the Branding stack is inset 20px left /
 * 18px right (447 wide), the Project Management stack is 847 wide, centred.
 */
export function SpecialtyShowcase({ cards }: { cards: SpecialtyCardData[] }) {
  const branding = cards.find((card) => card.id === "branding") ?? cards[0];
  const management = cards.find((card) => card.id === "management") ?? cards[1];
  const [slide, setSlide] = useState(0);
  const [managementSlide, setManagementSlide] = useState(0);

  return (
    <section aria-label="Branding and project management services" className="bg-cream px-5 py-12 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*80)] lg:pt-[calc(var(--u)*95)]">
      <div className="mx-auto flex max-w-[1391px] snap-x snap-mandatory items-start gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:w-[calc(var(--u)*1390.5)] lg:grid-cols-[calc(var(--u)*485)_calc(var(--u)*885.5)] lg:gap-[calc(var(--u)*20)] lg:overflow-visible lg:pb-0">
        <article id={branding.id} className="relative aspect-[485/833] w-[88vw] max-w-[485px] shrink-0 snap-center overflow-hidden rounded-[10px] bg-forest text-cream lg:w-[calc(var(--u)*485)]">
          <Image src={`${assetRoot}/branding-ribbon.svg`} alt="" width={362} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[74.64%] -translate-x-1/2" />
          <h2 className="absolute left-1/2 top-[1.45%] z-10 flex h-[6.67%] w-[66.39%] -translate-x-1/2 items-center justify-center text-center font-accent text-[clamp(16px,4.5vw,36px)] font-bold uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={branding.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{branding.title}</Link>
          </h2>
          <p className="absolute left-1/2 top-[12.1%] z-10 w-[83.51%] -translate-x-1/2 text-center font-display text-[clamp(13px,2.7vw,22px)] font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {branding.description}
          </p>

          {/* Photo stack: 194 from the top, 28 from the bottom, 20 left, 18 right (447 x 611). */}
          <div className="absolute bottom-[3.36%] left-[4.12%] h-[73.35%] w-[92.16%]">
            {brandingSlides.map((src, index) => {
              const depth = (index - slide + brandingSlides.length) % brandingSlides.length;
              const lift = depth * 38;

              return (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={445}
                  height={535}
                  unoptimized
                  aria-hidden={depth !== 0}
                  className="absolute bottom-0 left-1/2 h-auto w-[99.55%] rounded-[8px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{
                    zIndex: brandingSlides.length - depth,
                    transform: `translateX(-50%) translateY(-${lift}px)`,
                    transformOrigin: "center bottom",
                  }}
                />
              );
            })}
            <Image src={`${assetRoot}/branding-frame.svg`} alt="" fill unoptimized className="pointer-events-none z-10" />
            <button type="button" onClick={() => setSlide((current) => (current - 1 + brandingSlides.length) % brandingSlides.length)} aria-label="Previous branding project" className="absolute left-[2.7%] top-1/2 z-20 aspect-[68/73] w-[15.21%] -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              <Image src={`${assetRoot}/branding-arrow-prev.svg`} alt="" fill unoptimized />
            </button>
            <button type="button" onClick={() => setSlide((current) => (current + 1) % brandingSlides.length)} aria-label="Next branding project" className="absolute right-[2.7%] top-1/2 z-20 aspect-[68/73] w-[15.21%] -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              <Image src={`${assetRoot}/branding-arrow-next.svg`} alt="" fill unoptimized />
            </button>
          </div>
        </article>

        <article id={management.id} className="relative isolate aspect-[886/833] w-[88vw] max-w-[886px] shrink-0 snap-center overflow-hidden text-cream lg:w-[calc(var(--u)*886)]">
          <Image src={`${assetRoot}/management-card.svg`} alt="" fill unoptimized className="-z-10" />
          <Image src={`${assetRoot}/management-ribbon.svg`} alt="" width={602} height={77} unoptimized className="absolute left-1/2 top-0 h-auto w-[67.95%] -translate-x-1/2" />
          <h2 className="absolute left-1/2 top-[1.45%] z-10 flex h-[6.72%] w-[79.46%] -translate-x-1/2 items-center justify-center text-center font-accent text-[clamp(16px,4.1vw,36px)] font-bold uppercase leading-[1.333] lg:text-[calc(var(--u)*36)]">
            <Link href={management.href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">{management.title}</Link>
          </h2>
          <p className="absolute left-1/2 top-[12.1%] z-10 w-[79.46%] -translate-x-1/2 text-center font-display text-[clamp(13px,2.5vw,22px)] font-medium leading-[1.318] lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*29)]">
            {management.description}
          </p>
          <div className="absolute bottom-[3.36%] left-1/2 aspect-[847/611] w-[95.6%] -translate-x-1/2">
            {managementSlides.map((src, index) => {
              const depth = (index - managementSlide + managementSlides.length) % managementSlides.length;
              const lift = depth * 38;

              return (
                <div
                  key={src}
                  aria-hidden={depth !== 0}
                  className="absolute inset-0 overflow-hidden rounded-[8px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{
                    zIndex: managementSlides.length - depth,
                    transform: `translateY(-${lift}px)`,
                    transformOrigin: "center bottom",
                  }}
                >
                  <Image src={src} alt="" fill unoptimized className="object-cover object-bottom pt-[9.09%]" />
                </div>
              );
            })}
            <Image src={`${assetRoot}/management-frame.svg`} alt="" fill unoptimized className="pointer-events-none z-10" />
            <button type="button" onClick={() => setManagementSlide((current) => (current - 1 + managementSlides.length) % managementSlides.length)} aria-label="Previous project management image" className="absolute left-[1.5%] top-1/2 z-20 aspect-[68/73] w-[8.03%] -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              <Image src={`${assetRoot}/arrow-prev.svg`} alt="" fill unoptimized />
            </button>
            <button type="button" onClick={() => setManagementSlide((current) => (current + 1) % managementSlides.length)} aria-label="Next project management image" className="absolute right-[1.5%] top-1/2 z-20 aspect-[68/73] w-[8.03%] -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream">
              <Image src={`${assetRoot}/arrow-next.svg`} alt="" fill unoptimized />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
