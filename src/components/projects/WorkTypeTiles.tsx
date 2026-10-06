import Image from "next/image";
import type { WorkType } from "@/lib/content";

/**
 * "Solutions Delivered:" panel (Figma nodes 800:14941 / 650:10316): every kind of work
 * is always shown as a sage chamfered tile, three across (100 x 100 in the 326px
 * design, 13px / 14px gaps), a cream icon above an uppercase caption. The types this
 * project covered are solid; the rest are faded to 30%. Sized in container-query
 * units so the panel scales as one piece.
 */
export function WorkTypeTiles({ types, selected }: { types: WorkType[]; selected: string[] }) {
  return (
    <section aria-labelledby="work-types-heading">
      <h2 id="work-types-heading" className="font-display text-[28px] font-bold leading-none tracking-[-0.01em] text-forest lg:text-[calc(var(--u)*28)]">
        Solutions Delivered:
      </h2>
      <div className="mt-6 w-full max-w-[326px] [container-type:inline-size] lg:mt-[calc(var(--u)*30)] lg:max-w-none">
        <ul className="grid grid-cols-3 gap-x-[3.99cqw] gap-y-[4.29cqw]">
          {types.map((type) => {
            const included = selected.includes(type.id);
            return (
              <li key={type.id} className={`relative isolate aspect-square text-cream [container-type:inline-size] ${included ? "" : "opacity-30"}`}>
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 -scale-x-100 bg-sage-dark [mask-repeat:no-repeat] [mask-size:100%_100%]"
                  style={{ maskImage: "url(/images/projects/work-types/tile.svg)", WebkitMaskImage: "url(/images/projects/work-types/tile.svg)" }}
                />
                {type.icon && <Image src={type.icon} alt="" width={44} height={44} unoptimized className="absolute left-1/2 top-[16.5%] h-auto w-[44%] -translate-x-1/2" />}
                <span className="absolute left-[14%] top-[66.5%] w-[72%] text-center font-display text-[12cqw] font-semibold uppercase leading-[14cqw] tracking-[-0.03em]">
                  {type.label}
                  {!included && <span className="sr-only"> (not part of this project)</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
