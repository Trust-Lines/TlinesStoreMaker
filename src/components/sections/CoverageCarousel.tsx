"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";

export interface CoverageSlide {
  id: string;
  image: string;
  alt: string;
  title?: string;
}

export interface CoverageCarouselProps {
  slides: CoverageSlide[];
  initialIndex?: number;
  onSlideChange?: (index: number) => void;
}

function layerStyle(offset: number): CSSProperties {
  const abs = Math.abs(offset);
  const base: CSSProperties = { "--chamfer": "18px" } as CSSProperties;
  if (abs === 0) {
    return { ...base, transform: "translateX(0) scale(1)", opacity: 1, zIndex: 3, filter: "none" };
  }
  if (abs === 1) {
    return {
      ...base,
      transform: `translateX(${offset * 62}%) scale(0.82)`,
      opacity: 0.35,
      zIndex: 2,
      filter: "blur(3px) saturate(0.8)",
    };
  }
  return {
    ...base,
    transform: `translateX(${offset > 0 ? 100 : -100}%) scale(0.7)`,
    opacity: 0,
    zIndex: 1,
    filter: "blur(3px) saturate(0.8)",
  };
}

export function CoverageCarousel({ slides, initialIndex, onSlideChange }: CoverageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(
    initialIndex ?? Math.floor(slides.length / 2)
  );
  const touchStartX = useRef<number | null>(null);

  const goTo = (index: number) => {
    const clamped = (index + slides.length) % slides.length;
    setActiveIndex(clamped);
    onSlideChange?.(clamped);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  };

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Coverage regions"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[20rem] w-full max-w-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral md:h-[26rem]"
      >
        {slides.map((slide, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className="absolute inset-0 shape-chamfered overflow-hidden transition-all duration-500 ease-out"
              style={layerStyle(offset)}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 60vw, 90vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title ?? `slide ${index + 1}`}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
            className={`shape-chamfered h-3 w-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral ${
              index === activeIndex ? "bg-cream" : "bg-cream/40 hover:bg-cream/70"
            }`}
            style={{ "--chamfer": "3px" } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
