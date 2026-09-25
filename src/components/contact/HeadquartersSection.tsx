"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { HeadquarterId } from "@/lib/content";
import { hqStates, usMapViewBox } from "@/lib/usMap";

export interface HeadquartersSectionProps {
  heading: string[];
  offices: {
    id: HeadquarterId;
    title: string;
    label: string;
    address: string[];
    hours: string[];
    phone: string;
    email: string;
  }[];
}

const vb = usMapViewBox;
const pct = (value: number, origin: number, size: number) => `${((value - origin) / size) * 100}%`;

/** Map pin (Material "location_on"), tip at the bottom centre of its 24 x 24 box. */
function Pin({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full overflow-visible">
      <path
        d="M12 1.5c-4.1 0-7.5 3.3-7.5 7.4 0 5.6 7.5 13.6 7.5 13.6s7.5-8 7.5-13.6c0-4.1-3.4-7.4-7.5-7.4Z"
        className={active ? "fill-cream stroke-forest" : "fill-forest stroke-cream"}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.8" className={active ? "fill-forest" : "fill-cream"} />
    </svg>
  );
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`h-3.5 w-3.5 ${direction === "prev" ? "rotate-180" : ""}`}>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const detailIcons = {
  address: "/images/contact/icon-address.svg",
  hours: "/images/contact/icon-hours.svg",
  phone: "/images/contact/icon-phone.svg",
  email: "/images/contact/icon-email.svg",
};

/**
 * "Visit us at our headquarters" (Figma, 1592 frame): heading 54/58 at x=157;
 * the office details column (387 wide, 42px between items) with a divider,
 * then the US map (~728 wide) with a pin + label per office. The arrows below
 * the map, or a click on a label, switch the office shown on the left.
 */
export function HeadquartersSection({ heading, offices }: HeadquartersSectionProps) {
  const [index, setIndex] = useState(0);
  const office = offices[index];

  const details = [
    { key: "address", label: "Address:", lines: office.address },
    { key: "hours", label: "Hours:", lines: office.hours },
    { key: "phone", label: "Phone Number", lines: [office.phone], href: `tel:${office.phone.replace(/[^\d+]/g, "")}` },
    { key: "email", label: "Email Address", lines: [office.email], href: `mailto:${office.email}` },
  ] as const;

  return (
    <section
      aria-labelledby="hq-heading"
      className="px-6 pb-16 pt-16 sm:px-10 lg:px-0 lg:pb-[calc(var(--u)*90)] lg:pl-[9.86%] lg:pt-[calc(var(--u)*109)]"
    >
      <h2
        id="hq-heading"
        className="font-accent text-[2rem] font-bold leading-[1.07] text-forest lg:w-[calc(var(--u)*780)] lg:text-[max(30px,calc(var(--u)*54))] lg:leading-[calc(var(--u)*58)]"
      >
        {heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <div className="mt-10 flex flex-col gap-12 lg:mt-[calc(var(--u)*69)] lg:flex-row lg:items-start lg:gap-0">
        {/* Office details + divider */}
        <div aria-live="polite" className="lg:w-[calc(var(--u)*403)] lg:shrink-0 lg:border-r-2 lg:border-sage/45">
          <h3 className="font-accent text-[1.75rem] font-bold leading-[0.95] text-forest lg:w-[calc(var(--u)*387)] lg:text-[max(23px,calc(var(--u)*42))] lg:leading-[calc(var(--u)*40)]">
            {office.title}
          </h3>
          <dl className="mt-6 flex flex-col gap-7 lg:mt-[calc(var(--u)*38)] lg:gap-[calc(var(--u)*42)]">
            {details.map((item) => (
              <div key={item.key} className="flex items-center gap-4 lg:gap-[calc(var(--u)*18)]">
                <Image
                  src={detailIcons[item.key]}
                  alt=""
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 shrink-0 lg:h-[calc(var(--u)*32)] lg:w-[calc(var(--u)*32)]"
                />
                <div className="text-forest">
                  <dt className="font-display text-[14px] font-medium lg:text-[max(12px,calc(var(--u)*16))]">{item.label}</dt>
                  <dd className="font-display text-[18px] font-semibold leading-snug lg:text-[max(16px,calc(var(--u)*22))]">
                    {"href" in item ? (
                      <a href={item.href} className="hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">
                        {item.lines[0]}
                      </a>
                    ) : (
                      item.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Map + carousel controls */}
        <div className="lg:ml-[calc(var(--u)*68)] lg:mt-[calc(var(--u)*22)] lg:w-[calc(var(--u)*728)]">
          <div className="relative" style={{ aspectRatio: `${vb.w} / ${vb.h}` } as CSSProperties}>
            <Image src="/images/contact/us-map.svg" alt="" fill unoptimized className="select-none" />
            <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} aria-hidden className="absolute inset-0 h-full w-full">
              {offices.map((item, itemIndex) => (
                <path
                  key={item.id}
                  d={hqStates[item.id].d}
                  className={`transition-colors ${itemIndex === index ? "fill-cream stroke-forest" : "fill-forest stroke-cream"}`}
                  strokeWidth={itemIndex === index ? 2.5 : 1.2}
                  strokeLinejoin="round"
                />
              ))}
            </svg>

            {offices.map((item, itemIndex) => {
              const { center } = hqStates[item.id];
              const active = itemIndex === index;
              return (
                <div
                  key={item.id}
                  className={`absolute flex -translate-y-full flex-col items-center ${
                    item.id === "northeast" ? "-translate-x-[80%] lg:-translate-x-1/2" : "-translate-x-1/2"
                  } ${active ? "z-10" : ""}`}
                  style={{ left: pct(center.x, vb.x, vb.w), top: pct(center.y, vb.y, vb.h) }}
                >
                  <button
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-pressed={active}
                    className={`whitespace-nowrap rounded-[5px] border px-2.5 py-1 font-display text-[11px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:text-[13px] lg:rounded-[calc(var(--u)*6)] lg:px-[calc(var(--u)*22)] lg:py-[calc(var(--u)*12)] lg:text-[max(12px,calc(var(--u)*16))] ${
                      active ? "border-forest bg-cream text-forest" : "border-forest bg-forest text-cream hover:bg-sage-dark"
                    }`}
                  >
                    {item.label}
                  </button>
                  <span
                    className={`mt-1 block h-6 w-6 lg:mt-[calc(var(--u)*10)] lg:h-[calc(var(--u)*36)] lg:w-[calc(var(--u)*36)] ${
                      item.id === "northeast" ? "self-end lg:self-center" : ""
                    }`}
                  >
                    <Pin active={active} />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 lg:mt-[calc(var(--u)*34)] lg:gap-[calc(var(--u)*30)]">
            <button
              type="button"
              onClick={() => setIndex((current) => Math.max(0, current - 1))}
              disabled={index === 0}
              aria-label="Previous office"
              className="grid h-9 w-9 place-items-center rounded-[6px] bg-forest text-cream transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:bg-[#c9c3ae] disabled:text-forest/50 lg:h-[calc(var(--u)*38)] lg:w-[calc(var(--u)*38)]"
            >
              <Arrow direction="prev" />
            </button>
            <p className="min-w-[9ch] text-center font-display text-[14px] font-bold text-forest lg:text-[max(12px,calc(var(--u)*17))]">
              {office.label}
            </p>
            <button
              type="button"
              onClick={() => setIndex((current) => Math.min(offices.length - 1, current + 1))}
              disabled={index === offices.length - 1}
              aria-label="Next office"
              className="grid h-9 w-9 place-items-center rounded-[6px] bg-forest text-cream transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:bg-[#c9c3ae] disabled:text-forest/50 lg:h-[calc(var(--u)*38)] lg:w-[calc(var(--u)*38)]"
            >
              <Arrow direction="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
