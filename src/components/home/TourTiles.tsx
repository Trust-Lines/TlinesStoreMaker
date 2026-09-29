"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface TourTile {
  id: string;
  title: string;
  image: string;
  matterportId: string;
}

/**
 * Row of 360 tour tiles. Clicking a tile opens the Matterport tour in a large
 * on-site window (modal) so visitors never leave the page.
 */
export function TourTiles({ tours }: { tours: TourTile[] }) {
  const [active, setActive] = useState<TourTile | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] lg:h-full lg:gap-[calc(var(--u)*15)] lg:overflow-visible">
        {tours.map((tour) => (
          <li key={tour.id} className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:h-full lg:w-auto lg:flex-1">
            <button
              type="button"
              onClick={() => setActive(tour)}
              aria-haspopup="dialog"
              className="group block h-full w-full cursor-pointer rounded-[8px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
            >
              <span className="relative block aspect-[245/149] overflow-hidden rounded-[8px] bg-cream lg:aspect-auto lg:h-full lg:rounded-[calc(var(--u)*10)]">
                <Image
                  src={tour.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, 62vw"
                  className="object-cover"
                />
                <Image
                  src="/images/figma/project-badge-icon-b.svg"
                  alt=""
                  width={72}
                  height={72}
                  unoptimized
                  className="absolute left-1/2 top-1/2 w-[22%] max-w-[44px] -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 truncate bg-gradient-to-b from-forest-dark/85 to-transparent px-2 pb-4 pt-1.5 text-left font-display text-[clamp(11px,0.9vw,14px)] font-bold leading-tight text-cream"
                >
                  {tour.title}
                </span>
              </span>
              <span className="sr-only">Open {tour.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark/85 p-3 sm:p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex h-[min(88vh,900px)] w-full max-w-[1400px] flex-col overflow-hidden rounded-[14px] bg-forest shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3 text-cream">
              <p className="font-display text-base font-bold sm:text-lg">{active.title}</p>
              <button
                type="button"
                onClick={() => setActive(null)}
                autoFocus
                className="cursor-pointer rounded-full bg-cream px-4 py-1.5 text-sm font-bold text-forest outline-offset-2 hover:bg-cream-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
              >
                Close ✕
              </button>
            </div>
            <iframe
              title={active.title}
              src={`https://my.matterport.com/show/?m=${active.matterportId}`}
              allowFullScreen
              allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
              className="h-full w-full flex-1 border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
