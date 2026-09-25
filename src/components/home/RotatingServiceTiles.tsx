"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { ProjectTile } from "./ProjectsGrid";

export interface ServiceTypeTile {
  id: string;
  label: string;
  href: string;
  /** Tailwind bg class for this store type's own identity colour (the scrim behind its label). */
  tintClass: string;
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`;
const maskStyle = (mask?: string): CSSProperties | undefined =>
  mask ? { maskImage: `url(${mask})`, WebkitMaskImage: `url(${mask})` } : undefined;

/** Picks `count` distinct random indices out of `length`. */
function pickRandomIndices(length: number, count: number): number[] {
  const pool = Array.from({ length }, (_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Every 2s, three random tiles anywhere in the mosaic (never a fixed spot) get
 * a label — "C-store" / "Truck Stops" / "Grocery" — each in its own identity
 * colour (gold / coral / sage-dark). While a tile is showing its label, the
 * photo underneath is fully hidden behind that flat colour — no translucent
 * filter, the colour is opaque — and it reappears once the tile is no longer
 * picked. Starts empty (matches the server-rendered markup) and only starts
 * picking tiles client-side after mount, so there's no hydration mismatch.
 */
export function RotatingServiceTiles({
  tiles,
  items,
  frame,
  shapeMasks,
}: {
  tiles: ProjectTile[];
  items: ServiceTypeTile[];
  frame: { w: number; h: number };
  /** Exact chamfer shape per tile id — see ProjectsGrid's TILE_SHAPE_MASKS. */
  shapeMasks: Record<string, string>;
}) {
  const [active, setActive] = useState<{ index: number; item: ServiceTypeTile }[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pick = () => {
      const indices = pickRandomIndices(tiles.length, Math.min(items.length, tiles.length));
      const order = shuffle(items);
      setActive(indices.map((index, i) => ({ index, item: order[i] })));
    };
    pick();
    const tick = setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        pick();
        setVisible(true);
      }, 250);
    }, 2000);
    return () => clearInterval(tick);
  }, [tiles, items]);

  return (
    <>
      {active.map(({ index, item }) => {
        const tile = tiles[index];
        if (!tile) return null;
        return (
          <li
            key={tile.id}
            className="absolute left-[var(--x)] top-[var(--y)] h-[var(--h)] w-[var(--w)]"
            style={{
              "--x": pct(tile.x, frame.w),
              "--y": pct(tile.y, frame.h),
              "--w": pct(tile.w, frame.w),
              "--h": pct(tile.h, frame.h),
            } as CSSProperties}
          >
            <Link
              href={item.href}
              className={`group relative block h-full w-full overflow-hidden outline-offset-2 [mask-repeat:no-repeat] [mask-size:100%_100%] transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={maskStyle(shapeMasks[tile.id])}
            >
              {/* Fully opaque — hides the photo underneath entirely, just this store type's identity colour behind the label. */}
              <span aria-hidden className={`absolute inset-0 ${item.tintClass}`} />
              <span className="absolute inset-0 flex items-center justify-center px-3 text-center font-accent text-[clamp(1rem,2.4vw,1.75rem)] font-bold uppercase tracking-[0.06em] text-cream [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );
}
