import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectsGrid, type MobileTileRef, type ProjectTile } from "./ProjectsGrid";

type Box = { x: number; y: number; w: number; h: number };

export interface ProjectsGalleryProps {
  title: string;
  tiles: ProjectTile[];
  layout: {
    frame: { w: number; h: number };
    label: Box & { src: string };
    tourTab: Box;
    tourFrame: Box & { pad: number; gap: number };
    mobileRows: MobileTileRef[][];
  };
  tours: {
    heading: string;
    tours: { id: string; title: string; image: string; href: string }[];
  };
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Figma "Projects" frame (1592 x 1091, sage). From lg up the whole frame is a
 * fixed-ratio canvas: the mosaic, its label, and below it the forest
 * "Come take a live 360 tour!" tab resting on a forest frame of five tour
 * tiles (15px padding / gaps), all at their Figma positions in %. Below lg it
 * stacks, and the tours become a swipeable row.
 */
export function ProjectsGallery({ title, tiles, layout, tours }: ProjectsGalleryProps) {
  const { frame, tourTab: tab, tourFrame: box } = layout;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="bg-sage py-10 lg:py-0">
      <div
        className="relative px-4 sm:px-6 lg:aspect-[var(--frame-ratio)] lg:px-0"
        style={{ "--frame-ratio": `${frame.w} / ${frame.h}` } as CSSProperties}
      >
        <ProjectsGrid title={title} tiles={tiles} frame={frame} label={layout.label} mobileRows={layout.mobileRows} href="/projects" />

        <div
          className="mt-8 lg:absolute lg:left-[var(--bx)] lg:top-[var(--ty)] lg:mt-0 lg:w-[var(--bw)]"
          style={{
            "--bx": pct(box.x, frame.w),
            "--bw": pct(box.w, frame.w),
            "--ty": pct(tab.y, frame.h),
          } as CSSProperties}
        >
          {/* Tab: centred on the frame, chamfered top corners. */}
          <p
            className="mx-auto flex w-fit items-center justify-center bg-forest px-8 pb-2 pt-3 text-center font-display text-[clamp(1rem,1.63vw,26px)] font-bold leading-none text-cream [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_100%,0_100%,0_14px)] lg:h-[calc(var(--u)*58)] lg:w-[calc(var(--u)*528)] lg:px-0 lg:py-0 lg:pt-[calc(var(--u)*4)]"
          >
            {tours.heading}
          </p>

          <div className="-mx-4 rounded-[10px] bg-forest p-3 sm:-mx-6 lg:mx-0 lg:h-[calc(var(--u)*179)] lg:rounded-[calc(var(--u)*14)] lg:p-[calc(var(--u)*15)]">
            <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] lg:h-full lg:gap-[calc(var(--u)*15)] lg:overflow-visible">
              {tours.tours.map((tour) => (
                <li key={tour.id} className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:h-full lg:w-auto lg:flex-1">
                  <Link
                    href={tour.href}
                    className="group block h-full rounded-[8px] outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
                  >
                    <span className="relative block aspect-[245/149] overflow-hidden rounded-[8px] bg-cream lg:aspect-auto lg:h-full lg:rounded-[calc(var(--u)*10)]">
                      <Image
                        src={tour.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 16vw, 62vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <Image
                        src="/images/figma/project-badge-icon-b.svg"
                        alt=""
                        width={72}
                        height={72}
                        unoptimized
                        className="absolute left-1/2 top-1/2 w-[22%] max-w-[44px] -translate-x-1/2 -translate-y-1/2"
                      />
                    </span>
                    <span className="sr-only">{tour.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
