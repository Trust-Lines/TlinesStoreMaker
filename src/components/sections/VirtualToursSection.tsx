import Link from "next/link";
import type { CSSProperties } from "react";
import { ShapedMedia } from "@/components/primitives/ShapedMedia";

export interface TourItem {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
}

export interface VirtualToursSectionProps {
  heading: string;
  tours: TourItem[];
}

function Tour360Badge() {
  return (
    <svg width="56" height="56" viewBox="0 0 100 100" fill="none" aria-hidden>
      <circle cx="50" cy="50" r="42" fill="var(--color-cream)" fillOpacity="0.92" />
      <text
        x="50"
        y="59"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="27"
        fontWeight="800"
        fill="var(--color-forest)"
      >
        360
      </text>
    </svg>
  );
}

export function VirtualToursSection({ heading, tours }: VirtualToursSectionProps) {
  return (
    <div className="flex flex-col gap-8">
      <div
        className="shape-chamfered bg-forest px-8 py-6 text-center md:py-8"
        style={{ "--chamfer": "15px" } as CSSProperties}
      >
        <p className="font-display text-xl font-semibold text-cream md:text-2xl">{heading}</p>
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {tours.map((tour) => (
          <li key={tour.id}>
            <Link
              href={tour.href}
              className="group relative block overflow-hidden outline-offset-4 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral hover:-translate-y-1"
            >
              <ShapedMedia
                src={tour.thumbnail}
                alt={tour.title}
                aspectRatio="16 / 9"
                shape="chamfered"
                chamfer={15}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-forest-dark/45 transition-opacity group-hover:bg-forest-dark/15"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-105">
                <Tour360Badge />
              </div>
              <span className="sr-only">{tour.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
