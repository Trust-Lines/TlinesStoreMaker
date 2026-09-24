"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";

export interface ProjectPhoto {
  id: string;
  image: string;
  alt: string;
}

export interface ProjectsGridProps {
  photos: ProjectPhoto[];
}

/**
 * Project mosaic. Each photo opens a full-size lightbox (native <dialog>, so
 * focus trapping, Esc-to-close and the backdrop come from the browser) where
 * visitors can switch photos with the arrows, ← / → keys, or a swipe.
 */
export function ProjectsGrid({ photos }: ProjectsGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

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
      {/* 2 columns on phones, 5 from md: ten photos always fill complete rows. */}
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-5">
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View project photo ${index + 1} of ${count}`}
              aria-haspopup="dialog"
              className="group block w-full cursor-zoom-in outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
            >
              <span
                className="shape-chamfered relative block aspect-[4/3] overflow-hidden"
                style={{ "--chamfer": "clamp(10px,2vw,24px)" } as CSSProperties}
              >
                <Image
                  src={photo.image}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 20vw, 50vw"
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
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === event.currentTarget) setActive(null);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-forest-dark/90"
      >
        {current ? (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-24"
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-full max-h-[80dvh] w-full max-w-6xl">
              <Image
                key={current.id}
                src={current.image}
                alt={current.alt}
                fill
                sizes="(min-width: 1200px) 1152px, 100vw"
                className="object-contain"
              />
            </div>

            <p aria-live="polite" className="text-sm font-semibold text-cream">
              {(active ?? 0) + 1} / {count}
            </p>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-6"
            >
              <Image src="/images/figma/carousel-arrow-prev.svg" alt="" width={61} height={65} unoptimized className="h-12 w-auto sm:h-[65px]" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-6"
            >
              <Image src="/images/figma/carousel-arrow-next.svg" alt="" width={61} height={65} unoptimized className="h-12 w-auto sm:h-[65px]" />
            </button>

            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-cream text-forest transition-colors hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-6 sm:top-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
