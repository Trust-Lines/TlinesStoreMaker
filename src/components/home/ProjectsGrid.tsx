import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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

/** One tile in a mobile row; `mask` + `ratio` reshape it (e.g. into a wide tile). */
export interface MobileTileRef {
  id: string;
  mask?: string;
  ratio?: number;
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
  /** Below-lg layout: rows of tile ids ("Project Mobile" frame). */
  mobileRows: MobileTileRef[][];
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
 * it follows the "Project Mobile" frame: full-width label, then rows that
 * alternate one wide tile and a pair; tiles in a row share one height (each
 * grows by its w/h ratio) so the pre-shaped photos never distort.
 */
export function ProjectsGrid({
  title,
  tiles,
  frame,
  label,
  labelTextClass = "text-cream",
  placeholderClass = "bg-forest",
  mobileRows,
  href,
}: ProjectsGridProps) {
  const byId = new Map(tiles.map((tile) => [tile.id, tile]));

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
          className={`transition-transform duration-500 group-hover:scale-105 ${mask ? "object-cover" : "object-fill"}`}
        />
      </span>
    </Link>
  );

  return (
    <>
      {/* Label: Figma 523 x 134 at its frame position from lg; full width on top below lg. */}
      <Link
        href={href}
        className="relative z-10 mx-auto mb-3 block aspect-[523/134] w-full max-w-[640px] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream lg:absolute lg:left-[var(--lx)] lg:top-[var(--ly)] lg:mx-0 lg:mb-0 lg:w-[var(--lw)] lg:max-w-none"
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

      {/* Below lg: wide / pair rows. */}
      <div className="mx-auto flex max-w-[640px] flex-col gap-2.5 lg:hidden">
        {mobileRows.map((row) => (
          <ul key={row.map((ref) => ref.id).join("+")} className="flex gap-2.5">
            {row.map((ref) => {
              const tile = byId.get(ref.id);
              if (!tile || tile.placeholder) return null;
              const ratio = ref.ratio ?? tile.w / tile.h;
              return (
                <li key={ref.id} className="relative min-w-0" style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}>
                  {tileLink(tile, ref.mask ?? tile.mask, row.length > 1 ? "50vw" : "100vw")}
                </li>
              );
            })}
          </ul>
        ))}
      </div>

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
      </ul>
    </>
  );
}
