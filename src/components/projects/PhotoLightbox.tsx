"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type TouchEvent } from "react";

export interface LightboxPhoto {
  id: string;
  image: string;
  alt: string;
}

export interface PhotoLightboxProps {
  photos: LightboxPhoto[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onChange: (index: number | null) => void;
}

/**
 * Full-screen photo viewer (native modal <dialog>: focus trap, Esc, inert page).
 * Steps through `photos` with the Figma arrow buttons, ← / →, or a swipe;
 * the close button is the Figma coral ribbon ×.
 */
export function PhotoLightbox({ photos, index, onChange }: PhotoLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = photos.length;

  const go = useCallback(
    (step: number) => {
      if (index !== null && count) onChange((index + step + count) % count);
    },
    [index, count, onChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const current = index === null ? null : photos[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Project photos"
      onClose={() => onChange(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null);
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-forest-dark/90"
    >
      {current ? (
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) onChange(null);
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Viewer box: up to 1592px wide at a 1592 x 1091 ratio, capped to the
              window height; the photo is fitted inside, close top-right, arrows
              on the left/right edges. */}
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
              onClick={() => onChange(null)}
              aria-label="Close"
              className="absolute right-2 top-2 z-10 transition-transform sm:right-4 sm:top-4 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              {/* Exact Figma close button (coral ribbon + ×), 117 x 67. */}
              <Image src="/images/figma/close-button.svg" alt="" width={117} height={67} unoptimized className="h-auto w-[88px] sm:w-[117px]" />
            </button>
          </div>

          <p aria-live="polite" className="text-sm font-semibold text-cream">
            {(index ?? 0) + 1} / {count}
          </p>
        </div>
      ) : null}
    </dialog>
  );
}
