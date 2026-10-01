"use client";

import type { ReactNode } from "react";
import { ServiceTypeOverlay, useRotatingPicks, type ServiceTypeTile } from "./RotatingServiceTiles";

export interface MobileRowTile {
  id: string;
  /** Tile w / h; tiles in a row share one height and grow by this ratio. */
  ratio: number;
  /** Chamfer shape for the store-type overlay on this tile. */
  shapeMask?: string;
  /** The photo link, rendered by the server component. */
  node: ReactNode;
}

/**
 * Below-lg Projects rows. Same rotating "C-store" / "Truck Stops" / "Grocery" labels
 * as the desktop mosaic: every 2s three random visible tiles are covered by a
 * store-type colour + label, each clipped to that tile's own shape.
 */
export function MobileProjectRows({ rows, rotatingItems }: { rows: MobileRowTile[][]; rotatingItems?: ServiceTypeTile[] }) {
  const flat = rows.flat();
  const { active, visible } = useRotatingPicks(rotatingItems ? flat.length : 0, rotatingItems ?? []);
  const labelFor = new Map(active.map(({ index, item }) => [flat[index]?.id, item]));

  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-2.5 lg:hidden">
      {rows.map((row) => (
        <ul key={row.map((tile) => tile.id).join("+")} className="flex gap-2.5">
          {row.map((tile) => {
            const item = labelFor.get(tile.id);
            return (
              <li key={tile.id} className="relative min-w-0" style={{ flex: `${tile.ratio} 1 0%`, aspectRatio: tile.ratio }}>
                {tile.node}
                {item ? (
                  <div className="absolute inset-0">
                    <ServiceTypeOverlay item={item} mask={tile.shapeMask} visible={visible} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}
