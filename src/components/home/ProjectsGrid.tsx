"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent } from "react";

export interface ProjectTile {
  id: string;
  image: string;
  /** Exact Figma tile outline, applied as a CSS mask. */
  mask: string;
  alt: string;
  /** Design px inside the Figma frame. */
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ProjectsGridProps {
  title: string;
  tiles: ProjectTile[];
  frame: { w: number; h: number };
  label: { src: string; x: number; y: number; w: number; h: number };
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Projects mosaic. From lg up every tile sits at its exact Figma position
 * (percentages of the 1592 x 1091 frame, so it scales with the page); below
 * lg it falls back to a grid: 2 columns on phones, 3 on tablets, with the wide
 * first tile spanning the row so every row is full. Each tile opens a lightbox (native
 * <dialog>) that steps through the unique photos with arrows, ← / →, or swipe.
 */
export function ProjectsGrid({ title, tiles, frame, label }: ProjectsGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  // Several tiles reuse the same photo; the lightbox shows each photo once.
  const photos = useMemo(() => [...new Map(tiles.map((tile) => [tile.image, tile])).values()], [tiles]);
  const photoIndex = (tile: ProjectTile) => photos.findIndex((photo) => photo.image === tile.image);

  const count = photos.length;
  const go = useCallback(
    (step: number) => setActive((index) => (index === null ? index : (index + step + count) % count)),
    [count],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const current = active === null ? null : photos[active];

  return (
    <>
      <div
        className="relative z-10 mx-auto mb-4 aspect-[544/139] w-[min(80%,360px)] lg:absolute lg:left-[var(--lx)] lg:top-[var(--ly)] lg:mb-0 lg:w-[var(--lw)]"
        style={{
          "--lx": pct(label.x, frame.w),
          "--ly": pct(label.y, frame.h),
          "--lw": pct(label.w, frame.w),
        } as CSSProperties}
      >
        <Image src={label.src} alt="" fill unoptimized />
        <h2
          id="projects-heading"
          className="relative flex h-full items-center justify-center font-accent text-[clamp(1.75rem,3.769vw,60px)] font-bold leading-[0.8] tracking-[0.3em] text-cream"
        >
          {title}
        </h2>
      </div>

      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:absolute lg:inset-0 lg:block">
        {tiles.map((tile, index) => (
          <li
            key={tile.id}
            className={`relative lg:absolute lg:left-[var(--x)] lg:top-[var(--y)] lg:h-[var(--h)] lg:w-[var(--w)] lg:aspect-auto ${index === 0 ? "col-span-2 aspect-[510/232] sm:col-span-3" : "aspect-[4/3]"}`}
            style={{
              "--x": pct(tile.x, frame.w),
              "--y": pct(tile.y, frame.h),
              "--w": pct(tile.w, frame.w),
              "--h": pct(tile.h, frame.h),
            } as CSSProperties}
          >
            <button
              type="button"
              onClick={() => setActive(photoIndex(tile))}
              aria-label={`View project photo ${photoIndex(tile) + 1} of ${count}`}
              aria-haspopup="dialog"
              className="group block h-full w-full cursor-zoom-in outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
            >
              <span
                className="relative block h-full w-full overflow-hidden [mask-repeat:no-repeat] [mask-size:100%_100%]"
                style={{ maskImage: `url(${tile.mask})`, WebkitMaskImage: `url(${tile.mask})` }}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Project photos"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-forest-dark/90"
      >
        {current ? (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Viewer box matches the page column / Projects frame: up to 1592px
                wide at the frame's 1592 x 1091 ratio, capped to the window height.
                The photo is fitted inside; close sits in the box's top-right
                corner and the arrows on its left/right edges. */}
            <div className="relative aspect-[1592/1091] w-[min(calc(100vw-2rem),1592px,calc((100dvh-8rem)*1592/1091))]">
              <Image
                key={current.id}
                src={current.image}
                alt={current.alt}
                fill
                loading="eager"
                sizes="(min-width: 1592px) 1592px, 100vw"
                className="object-contain"
              />

              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-4"
              >
                <Image src="/images/figma/carousel-arrow-prev.svg" alt="" width={61} height={65} unoptimized className="h-12 w-auto sm:h-[65px]" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-4"
              >
                <Image src="/images/figma/carousel-arrow-next.svg" alt="" width={61} height={65} unoptimized className="h-12 w-auto sm:h-[65px]" />
              </button>

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-2 top-2 z-10 transition-transform sm:right-4 sm:top-4 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                {/* Exact Figma close button (coral ribbon + ×), 117 x 67. */}
                <Image src="/images/figma/close-button.svg" alt="" width={117} height={67} unoptimized className="h-auto w-[88px] sm:w-[117px]" />
              </button>
            </div>

            <p aria-live="polite" className="text-sm font-semibold text-cream">
              {(active ?? 0) + 1} / {count}
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
