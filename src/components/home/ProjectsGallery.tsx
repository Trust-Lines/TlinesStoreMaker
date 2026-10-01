import type { CSSProperties } from "react";
import { ProjectsGrid, type ProjectTile } from "./ProjectsGrid";
import type { ServiceTypeTile } from "./RotatingServiceTiles";
import { TourTiles, type TourTile } from "./TourTiles";

type Box = { x: number; y: number; w: number; h: number };

export interface ProjectsGalleryProps {
  title: string;
  /** Tailwind bg class for the section. Defaults to sage. */
  bgClass?: string;
  /** Tailwind text class for the "Projects" label. Defaults to cream. */
  labelTextClass?: string;
  /** Tailwind bg class for a placeholder tile with no image. Defaults to forest. */
  placeholderClass?: string;
  /** Tailwind bg class for the tour tab + frame. Defaults to forest. */
  tourBgClass?: string;
  /** Store-type labels three random mosaic tiles rotate through every 2s. */
  rotatingItems?: ServiceTypeTile[];
  tiles: ProjectTile[];
  layout: {
    frame: { w: number; h: number };
    label: Box & { src: string };
    tourTab: Box;
    tourFrame: Box & { pad: number; gap: number };
  };
  tours: {
    heading: string;
    tours: TourTile[];
  };
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/**
 * Figma "Projects" frame (1592 x 1091, sage). From lg up the whole frame is a
 * fixed-ratio canvas: the mosaic, its label, and below it the forest
 * "Come take a live 360 tour!" tab resting on a forest frame of five tour
 * tiles (15px padding / gaps), all at their Figma positions in %. Below lg the
 * mosaic becomes the compact 402 x 581 "Projects" card (photo / label / photo)
 * and the tours become a swipeable row.
 */
export function ProjectsGallery({
  title,
  bgClass = "bg-sage",
  labelTextClass,
  placeholderClass,
  tourBgClass = "bg-forest",
  rotatingItems,
  tiles,
  layout,
  tours,
}: ProjectsGalleryProps) {
  const { frame, tourTab: tab, tourFrame: box } = layout;

  return (
    <section id="projects" aria-labelledby="projects-heading" className={`${bgClass} pb-10 lg:py-0`}>
      <div
        className="relative px-4 sm:px-6 lg:aspect-[var(--frame-ratio)] lg:px-0"
        style={{ "--frame-ratio": `${frame.w} / ${frame.h}` } as CSSProperties}
      >
        <ProjectsGrid
          title={title}
          tiles={tiles}
          frame={frame}
          label={layout.label}
          labelTextClass={labelTextClass}
          placeholderClass={placeholderClass}
          rotatingItems={rotatingItems}
          href="/projects"
        />

        <div
          className="mt-8 lg:absolute lg:left-[var(--bx)] lg:top-[var(--ty)] lg:mt-0 lg:w-[var(--bw)]"
          style={{
            "--bx": pct(box.x, frame.w),
            "--bw": pct(box.w, frame.w),
            "--ty": pct(tab.y, frame.h),
          } as CSSProperties}
        >
          {/* Tab: centred on the frame, shaped by the Figma tab vector (528 x 55) as a mask. */}
          <p
            className={`mx-auto flex w-fit items-center justify-center px-8 pb-2 pt-3 text-center font-display text-[clamp(1rem,1.63vw,26px)] font-bold leading-none text-cream [mask:url(/images/figma/tour-tab.svg)_center/100%_100%_no-repeat] lg:h-[calc(var(--u)*55)] lg:w-[calc(var(--u)*528)] lg:px-0 lg:py-0 lg:pt-[calc(var(--u)*4)] ${tourBgClass}`}
          >
            {tours.heading}
          </p>

          <div className={`-mx-4 rounded-[10px] p-3 sm:-mx-6 lg:mx-0 lg:h-[calc(var(--u)*179)] lg:rounded-[calc(var(--u)*14)] lg:p-[calc(var(--u)*15)] ${tourBgClass}`}>
            <TourTiles tours={tours.tours} />
          </div>
        </div>
      </div>
    </section>
  );
}
