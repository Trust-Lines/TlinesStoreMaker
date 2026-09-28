"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoLightbox, type LightboxPhoto } from "./PhotoLightbox";

export interface ProjectHeroCarouselProps {
  photos: LightboxPhoto[];
}

/**
 * Project detail hero (Figma node 261:8100, 1314 x 812): a rounded photo
 * frame that steps through the project's photos with the same Figma arrow
 * buttons as the gallery lightbox, plus dots. Clicking the photo opens the
 * full-screen viewer over the same set.
 */
export function ProjectHeroCarousel({ photos }: ProjectHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const count = photos.length;
  const go = (step: number) => setIndex((current) => (current + step + count) % count);
  const current = photos[index];

  return (
    <>
      <div className="relative mx-auto aspect-[1314/812] w-full overflow-hidden rounded-[20px] lg:rounded-[calc(var(--u)*20)]">
        <button
          type="button"
          onClick={() => setLightboxIndex(index)}
          aria-label={`View ${current.alt} full size`}
          className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
        >
          <Image
            key={current.id}
            src={current.image}
            alt={current.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1314px, 100vw"
            className="object-cover"
          />
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-5"
            >
              <Image src="/images/figma/carousel-arrow-prev.svg" alt="" width={61} height={65} unoptimized className="h-9 w-auto opacity-80 sm:h-12" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-5"
            >
              <Image src="/images/figma/carousel-arrow-next.svg" alt="" width={61} height={65} unoptimized className="h-9 w-auto opacity-80 sm:h-12" />
            </button>

            <div aria-hidden className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {photos.map((photo, i) => (
                <span key={photo.id} className={`size-[9px] rounded-full transition-opacity ${i === index ? "bg-cream" : "bg-cream/40"}`} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <PhotoLightbox photos={photos} index={lightboxIndex} onChange={setLightboxIndex} />
    </>
  );
}
