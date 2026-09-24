import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectsGrid, type ProjectTile } from "./ProjectsGrid";

export interface ProjectsGalleryProps {
  title: string;
  tiles: ProjectTile[];
  layout: {
    frame: { w: number; h: number };
    label: { src: string; x: number; y: number; w: number; h: number };
    tourBar: { y: number; h: number };
    tours: { y: number; h: number; tileW: number; gap: number; offsetX: number };
  };
  tours: {
    heading: string;
    tours: { id: string; title: string; image: string; href: string }[];
  };
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Figma "Projects" frame (1592 x 1091, sage). From lg up the whole frame is a
 * fixed-ratio canvas and every piece (mosaic tiles, label, tour bar, tour
 * strip) sits at its Figma position in %; below lg it stacks.
 */
export function ProjectsGallery({ title, tiles, layout, tours }: ProjectsGalleryProps) {
  const { frame, tourBar, tours: strip } = layout;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-sage py-10 lg:py-0">
      <div
        className="relative px-4 sm:px-6 lg:aspect-[var(--frame-ratio)] lg:px-0"
        style={{
          "--frame-ratio": `${frame.w} / ${frame.h}`,
          "--bar-y": pct(tourBar.y, frame.h),
          "--bar-h": pct(tourBar.h, frame.h),
          "--strip-y": pct(strip.y, frame.h),
          "--strip-h": pct(strip.h, frame.h),
        } as CSSProperties}
      >
        <ProjectsGrid title={title} tiles={tiles} frame={frame} label={layout.label} />

        <p className="-mx-4 mt-8 flex items-center justify-center bg-forest px-6 py-4 text-center font-display text-[clamp(1.1rem,1.63vw,26px)] font-bold text-cream sm:-mx-6 lg:absolute lg:inset-x-0 lg:top-[var(--bar-y)] lg:mx-0 lg:mt-0 lg:h-[var(--bar-h)] lg:py-0">
          {tours.heading}
        </p>

        {/* Tours: swipeable row below lg; from lg the Figma strip — 362px tiles,
            13px apart, starting 127px off the left edge so both ends bleed. */}
        <div className="-mx-4 mt-4 overflow-hidden sm:-mx-6 lg:absolute lg:inset-x-0 lg:top-[var(--strip-y)] lg:mx-0 lg:mt-0 lg:h-[var(--strip-h)]">
          <ul
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-6 lg:translate-x-[var(--strip-x)] lg:h-full lg:gap-[var(--strip-gap)] lg:overflow-visible lg:px-0 lg:pb-0"
            style={{
              "--strip-x": pct(strip.offsetX, frame.w),
              "--strip-gap": pct(strip.gap, frame.w),
            } as CSSProperties}
          >
            {tours.tours.map((tour) => (
              <li
                key={tour.id}
                className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:h-full lg:w-[var(--tile-w)]"
                style={{ "--tile-w": pct(strip.tileW, frame.w) } as CSSProperties}
              >
                <Link
                  href={tour.href}
                  className="group block h-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
                >
                  <span
                    className="shape-chamfered relative block aspect-[362/203] overflow-hidden lg:aspect-auto lg:h-full"
                    style={{ "--chamfer": "18px" } as CSSProperties}
                  >
                    <Image src={tour.image} alt="" fill sizes="(min-width: 1024px) 23vw, 72vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <Image
                      src="/images/figma/project-badge-icon-b.svg"
                      alt=""
                      width={72}
                      height={72}
                      unoptimized
                      className="absolute left-1/2 top-1/2 w-[20%] -translate-x-1/2 -translate-y-1/2"
                    />
                  </span>
                  <span className="sr-only">{tour.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
