"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export interface BrandingShowcaseSectionProps {
  heading: ReactNode;
  verticalLabel: string;
  slides: { id: string; image: string; alt: string }[];
}

function EventBadge({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex aspect-[348/159] w-[21.86%] items-center justify-center">
      <svg aria-hidden viewBox="0 0 348 159" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M347.967 41.2193V114.818C347.967 117.228 346.992 119.539 345.256 121.202L324.743 140.903C323.205 142.382 321.172 143.247 319.04 143.346L36.4484 158.992C34.0681 159.092 31.7374 158.211 30.0183 156.565L2.71088 130.347C0.975238 128.685 0 126.374 0 123.963V34.5692C0 32.1751 0.975272 29.8808 2.69438 28.2183L29.2579 2.46583C30.9605 0.819931 33.2416 -0.0778248 35.6054 0.00530132L322.313 15.9323C324.478 15.9988 326.561 16.8633 328.131 18.3762L345.289 34.8684C347.025 36.5309 348 38.8418 348 41.2525L347.967 41.2193Z" fill="#FFF4E0" />
      </svg>
      <div className="relative z-10 max-w-[74%] text-center font-display text-[clamp(16px,3.02vw,48px)] font-bold leading-none tracking-[-0.02em] text-forest">
        {children}
      </div>
    </div>
  );
}

export function BrandingShowcaseSection({ heading, verticalLabel, slides }: BrandingShowcaseSectionProps) {
  const [active, setActive] = useState(0);
  if (!slides.length) return null;

  const previous = (active - 1 + slides.length) % slides.length;
  const next = (active + 1) % slides.length;

  return (
    <section className="w-full overflow-hidden">
      <div className="relative aspect-[1592/519] bg-forest">
        <div className="absolute left-[6.9%] top-[25.8%] w-full">
          <EventBadge>{heading}</EventBadge>
        </div>
        <div
          aria-hidden
          className="absolute right-[-1%] top-[11%] h-[67%] w-[66%] bg-sage"
          style={{ clipPath: "polygon(7% 0,100% 0,100% 100%,7% 86%,0 69%,0 20%)" }}
        />
      </div>

      <div className="relative aspect-[1592/1170] bg-sage">
        <div className="absolute left-[9.7%] top-[10.8%] flex aspect-[233/883] w-[14.64%] items-center justify-center">
          <svg aria-hidden viewBox="0 0 233 883" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M60.4031 882.951L168.255 882.951C171.787 882.951 175.174 881.512 177.61 878.951L206.48 848.684C208.648 846.415 209.915 843.415 210.061 840.269L232.989 53.7796C233.135 50.2675 231.844 46.8286 229.432 44.292L191.012 3.9999C188.576 1.43896 185.189 0 181.657 0L50.658 0C47.1497 0 43.7876 1.43901 41.3514 3.97556L3.61345 43.17C1.20153 45.6822 -0.114045 49.0481 0.00776923 52.5358L23.3473 845.098C23.4448 848.293 24.7116 851.366 26.9286 853.683L51.0965 879C53.5328 881.561 56.9192 883 60.4518 883L60.4031 882.951Z" fill="#FFF4E0" />
          </svg>
          <span className="relative z-10 rotate-180 whitespace-nowrap font-display text-[clamp(32px,7.41vw,118px)] font-bold leading-[0.49] tracking-[-0.02em] text-forest [writing-mode:vertical-rl]">
            {verticalLabel}
          </span>
        </div>

        <div className="absolute left-[31.8%] top-[10.2%] h-[73.1%] w-[61.5%]">
          <div className="absolute left-0 top-[5%] aspect-[513/700] h-[88%] overflow-hidden rounded-[2.5%] opacity-55">
            <Image src={slides[previous].image} alt="" fill unoptimized sizes="29vw" className="object-cover" />
          </div>
          <div className="absolute right-0 top-[5%] aspect-[513/700] h-[88%] overflow-hidden rounded-[2.5%] opacity-55">
            <Image src={slides[next].image} alt="" fill unoptimized sizes="29vw" className="object-cover" />
          </div>
          <div className="absolute left-1/2 top-0 aspect-[629/855] h-full -translate-x-1/2 overflow-hidden rounded-[2.5%] shadow-[0_18px_35px_rgba(46,68,55,.14)]">
            {slides.map((slide, index) => (
              <Image
                key={slide.id}
                src={slide.image}
                alt={index === active ? slide.alt : ""}
                fill
                unoptimized
                priority={index === 0}
                sizes="40vw"
                className={`object-cover transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="absolute bottom-[-8.5%] left-1/2 z-20 aspect-[136.094/65] w-[13.9%] -translate-x-1/2">
            <svg aria-hidden viewBox="0 0 137 65" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
              <path d="M7.42434 5.25858C8.77182 3.91111 10.556 3.08888 12.4558 2.93992L46.6386 0.259581C48.7579 0.0934002 50.8562 0.777573 52.4703 2.16105L58.253 7.11762C60.0261 8.63748 61.0466 10.8563 61.0466 13.1917V51.8083C61.0466 54.1437 60.0261 56.3625 58.253 57.8824L52.4703 62.839C50.8562 64.2224 48.7579 64.9066 46.6386 64.7404L12.4558 62.0601C10.556 61.9111 8.77182 61.0889 7.42435 59.7414L2.34315 54.6602C0.842856 53.1599 0 51.1251 0 49.0034V15.9966C0 13.8749 0.842854 11.8401 2.34315 10.3398L7.42434 5.25858Z" fill="#2E4437" />
              <path d="M26.2835 41.616L28.4105 39.413L23.017 34.0194H41.4766V30.9808H23.017L28.4105 25.5873L26.2835 23.3843L17.1676 32.5001L26.2835 41.616Z" fill="#FFF4E0" />
              <path d="M81.9522 2.60686C83.6065 0.952558 85.9021 0.105307 88.2344 0.288193L122.395 2.96682C124.085 3.09933 125.689 3.76516 126.976 4.86829L133.3 10.2884C135.073 11.8082 136.093 14.027 136.093 16.3624V48.6376C136.093 50.973 135.073 53.1918 133.3 54.7116L126.976 60.1317C125.689 61.2348 124.085 61.9007 122.395 62.0332L88.2344 64.7118C85.9021 64.8947 83.6065 64.0474 81.9522 62.3931L77.39 57.831C75.8897 56.3307 75.0469 54.2958 75.0469 52.1741V12.8259C75.0469 10.7042 75.8897 8.66934 77.39 7.16905L81.9522 2.60686Z" fill="#2E4437" />
              <path d="M107.42 41.616L105.293 39.413L110.686 34.0194H92.2266V30.9808H110.686L105.293 25.5873L107.42 23.3843L116.536 32.5001L107.42 41.616Z" fill="#FFF4E0" />
            </svg>
            <button type="button" onClick={() => setActive(previous)} aria-label="Previous slide" className="absolute inset-y-0 left-0 w-[44.85%] rounded-[10%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream" />
            <button type="button" onClick={() => setActive(next)} aria-label="Next slide" className="absolute inset-y-0 right-0 w-[44.85%] rounded-[10%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream" />
          </div>
        </div>
      </div>
    </section>
  );
}
