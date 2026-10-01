import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RotatingServiceTiles, type ServiceTypeTile } from "./RotatingServiceTiles";

/**
 * Shape for the rotating overlay, keyed by tile id — the exact per-tile
 * chamfer exported from Figma (node 336:637x/638x), not the earlier
 * approximated/reused masks.
 */
const tileDir = "/images/figma/projects";
const TILE_SHAPE_MASKS: Record<string, string> = {
  "placeholder-top-left": `${tileDir}/rectangle-4396-mask-v2.svg`,
  "coffee-bar": `${tileDir}/rectangle-4403-mask-v2.svg`,
  "placeholder-top-center": `${tileDir}/rectangle-4405-mask-v2.svg`,
  "snack-aisle": `${tileDir}/rectangle-4397-mask-v2.svg`,
  "checkout-lanes": `${tileDir}/rectangle-4400-mask-v2.svg`,
  "coffee-counter": `${tileDir}/vector-2-mask-v2.svg`,
  "island-counter": `${tileDir}/vector-1-mask-v2.svg`,
  "placeholder-right": `${tileDir}/rectangle-4401-mask-v2.svg`,
  "uk-market": `${tileDir}/rectangle-4399-mask-v2.svg`,
  welcome: `${tileDir}/rectangle-4404-mask-v2.svg`,
  "cafe-seating": `${tileDir}/rectangle-4406-mask-v2.svg`,
  checkout: `${tileDir}/rectangle-4398-mask-v2.svg`,
  "on-the-go": `${tileDir}/rectangle-4402-mask-v2.svg`,
};

export interface ProjectTile {
  id: string;
  /** Photo; Figma-exported tiles are pre-rendered in their outline (transparent corners). */
  image?: string;
  /** Outline applied as a CSS mask (tiles not in the Figma export). */
  mask?: string;
  /** Plain forest shape from the design: shown from lg up, not clickable. */
  placeholder?: boolean;
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
  /** Tailwind text class for the label text. Defaults to cream. */
  labelTextClass?: string;
  /** Tailwind bg class for a placeholder tile with no image. Defaults to forest. */
  placeholderClass?: string;
  /** Store-type labels three random tiles rotate through every 2s. Omit to disable the effect. */
  rotatingItems?: ServiceTypeTile[];
  /** Where every photo tile (and the label) leads: the full Projects gallery. */
  href: string;
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;
const maskStyle = (mask?: string): CSSProperties | undefined =>
  mask ? { maskImage: `url(${mask})`, WebkitMaskImage: `url(${mask})` } : undefined;

/**
 * Homepage Projects mosaic, a teaser for the Projects gallery: every photo tile
 * links to `href`. From lg up each tile sits at its exact Figma position
 * (percentages of the 1592 x 1091 frame, so it scales with the page). Below lg
 * it is the "Projects" mobile card (Figma node 621:7790, 402 x 581): one
 * pre-shaped photo, the label band, another photo, all one link to `href`.
 */
export function ProjectsGrid({
  title,
  tiles,
  frame,
  label,
  labelTextClass = "text-cream",
  placeholderClass = "bg-forest",
  rotatingItems,
  href,
}: ProjectsGridProps) {
  const tileLink = (tile: ProjectTile, mask: string | undefined, sizes: string) => (
    <Link
      href={href}
      aria-label={`${tile.alt}: see all projects`}
      className="group block h-full w-full outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
    >
      <span className="relative block h-full w-full overflow-hidden [mask-repeat:no-repeat] [mask-size:100%_100%]" style={maskStyle(mask)}>
        <Image
          src={tile.image ?? ""}
          alt=""
          fill
          sizes={sizes}
          className={mask ? "object-cover" : "object-fill"}
        />
      </span>
    </Link>
  );

  return (
    <>
      {/* Label: Figma 523 x 134 at its frame position (lg+ only; the mobile card has its own). */}
      <Link
        href={href}
        className="relative z-10 hidden aspect-[523/134] w-full outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream lg:absolute lg:left-[var(--lx)] lg:top-[var(--ly)] lg:block lg:w-[var(--lw)]"
        style={{
          "--lx": pct(label.x, frame.w),
          "--ly": pct(label.y, frame.h),
          "--lw": pct(label.w, frame.w),
        } as CSSProperties}
      >
        <Image src={label.src} alt="" fill unoptimized />
        <h2
          id="projects-heading"
          className={`relative flex h-full items-center justify-center font-accent text-[clamp(2rem,11vw,60px)] font-bold leading-[0.8] tracking-[0.2em] lg:text-[clamp(1.75rem,3.769vw,60px)] lg:tracking-[0.3em] ${labelTextClass}`}
        >
          {title}
        </h2>
      </Link>

      {/* Below lg: Figma "Projects" mobile frame (node 621:7790), 402 x 581. Photos are exported with
          their chamfered outline baked in; the band takes the page's tile colour (placeholderClass)
          through a mask. */}
      <Link
        href={href}
        aria-label={`${title}: see all projects`}
        className="-mx-4 block outline-offset-[-4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream sm:-mx-6 lg:hidden"
      >
        <span className="relative mx-auto block aspect-[402/581] w-full max-w-[402px] [container-type:inline-size]">
          <span className="absolute inset-[5.68%_3.98%_57.51%_4.73%]">
            <Image src="/images/projects-mobile/photo-top.webp" alt="" fill sizes="402px" />
          </span>
          <span className="absolute inset-[56.65%_3.98%_5.72%_4.73%]">
            <Image src="/images/projects-mobile/photo-bottom.webp" alt="" fill sizes="402px" />
          </span>
          <span className="absolute inset-[41.82%_4.01%_42%_4.7%] z-10 flex items-center justify-center">
            <span aria-hidden className={`absolute inset-0 [mask-repeat:no-repeat] [mask-size:100%_100%] ${placeholderClass}`} style={maskStyle("/images/projects-mobile/band.svg")} />
            <h2 className={`relative font-accent text-[9.7cqw] font-bold uppercase leading-none tracking-[0.2em] ${labelTextClass}`}>{title}</h2>
          </span>
        </span>
      </Link>

      {/* lg+: every tile at its Figma position. */}
      <ul className="absolute inset-0 hidden lg:block">
        {tiles.map((tile) => (
          <li
            key={tile.id}
            aria-hidden={tile.placeholder || undefined}
            className="absolute left-[var(--x)] top-[var(--y)] h-[var(--h)] w-[var(--w)]"
            style={{
              "--x": pct(tile.x, frame.w),
              "--y": pct(tile.y, frame.h),
              "--w": pct(tile.w, frame.w),
              "--h": pct(tile.h, frame.h),
            } as CSSProperties}
          >
            {tile.placeholder ? (
              tile.image ? (
                <Image src={tile.image} alt="" fill sizes="32vw" className="object-fill" />
              ) : (
                <span className={`block h-full w-full [mask-repeat:no-repeat] [mask-size:100%_100%] ${placeholderClass}`} style={maskStyle(tile.mask)} />
              )
            ) : (
              tileLink(tile, tile.mask, "32vw")
            )}
          </li>
        ))}
        {rotatingItems ? (
          <RotatingServiceTiles tiles={tiles} items={rotatingItems} frame={frame} shapeMasks={TILE_SHAPE_MASKS} />
        ) : null}
      </ul>
    </>
  );
}
