"use client";

import Image from "next/image";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { SectionLabel } from "./SectionLabel";

export interface AboutTestimonialsProps {
  title: string;
  items: { id: string; quote: string; author: string }[];
}

/**
 * Testimonials (sage-dark band, 1592 x 1045): sage flush-left label 115px
 * down, then a row of cards 40px apart. From lg up the active card is the
 * Figma 508 x 557 card (cream 40% + outline) at x=345, the others 352 x 389 and
 * dimmed; the row slides to keep the active card in place. Click a card, or use
 * ← / → while the row has focus, to change it. Below lg it is a swipeable row.
 */
export function AboutTestimonials({ title, items }: AboutTestimonialsProps) {
  const [active, setActive] = useState(Math.min(1, items.length - 1));

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") setActive((index) => Math.min(items.length - 1, index + 1));
    if (event.key === "ArrowLeft") setActive((index) => Math.max(0, index - 1));
  };

  return (
    <section aria-labelledby="testimonials" className="overflow-hidden bg-sage-dark pb-16 pt-12 text-cream lg:pb-[calc(var(--u)*170)] lg:pt-[calc(var(--u)*115)]">
      <SectionLabel id="testimonials" text={title} variant="flush" fill="bg-sage" textColor="text-cream" />

      <ul
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 pt-8 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-cream sm:px-10 lg:mt-[calc(var(--u)*70)] lg:h-[calc(var(--u)*600)] lg:translate-x-[calc(var(--u)*var(--shift))] lg:items-center lg:gap-[calc(var(--u)*40)] lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0 lg:transition-transform lg:duration-500"
        style={{ "--shift": 345 - active * 392 } as CSSProperties}
      >
        {items.map((item, index) => {
          const current = index === active;
          return (
            <li
              key={item.id}
              className={`relative w-[80%] max-w-[340px] shrink-0 snap-center transition-[width,height,opacity] duration-500 lg:max-w-none ${
                current ? "lg:h-[calc(var(--u)*557)] lg:w-[calc(var(--u)*508)]" : "lg:h-[calc(var(--u)*389)] lg:w-[calc(var(--u)*352)] lg:opacity-45"
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={current ? "true" : undefined}
                aria-label={`Testimonial ${index + 1} of ${items.length}${current ? " (showing)" : ""}`}
                className="relative isolate block h-full w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              >
                {/* Card: cream 40% fill with a 2px cream outline, both baked into the Figma vector. */}
                <Image src="/images/about/testimonial-card.svg" alt="" fill unoptimized className="pointer-events-none -z-10" />
                <span className="flex h-full min-h-[300px] flex-col px-6 pb-7 pt-16 lg:min-h-0 lg:px-[9%] lg:pb-[9%] lg:pt-[26%]">
                  <span className={`block leading-relaxed ${current ? "text-[15px] lg:text-[max(14px,calc(var(--u)*19))]" : "text-[15px] lg:text-[max(12px,calc(var(--u)*14))]"}`}>
                    {item.quote}
                  </span>
                  <span className={`mt-auto block pt-6 font-bold ${current ? "lg:text-[max(14px,calc(var(--u)*18))]" : "lg:text-[max(12px,calc(var(--u)*14))]"}`}>
                    {item.author}
                  </span>
                </span>
              </button>
              {/* Quote badge (Group 440, 218 x 125) overhanging the card's top-left corner. */}
              <Image
                src="/images/about/quote-badge.svg"
                alt=""
                width={218}
                height={125}
                unoptimized
                className={`pointer-events-none absolute -left-3 -top-7 w-[110px] lg:-left-[10%] lg:-top-[3%] ${current ? "lg:w-[43%]" : "lg:w-[40%] lg:opacity-80"}`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
