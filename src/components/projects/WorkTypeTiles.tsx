import Image from "next/image";
import type { WorkType } from "@/lib/content";

/**
 * The kinds of work a project covered (Figma node 650:10316): sage chamfered tiles,
 * three across (149 x 149 in the 465px design, 9px / 11px gaps), each a cream icon
 * above an uppercase caption. Only the types chosen for the project are passed in,
 * so a project with two shows two tiles. Sized in container-query units so the
 * panel scales as one piece.
 */
export function WorkTypeTiles({ types }: { types: WorkType[] }) {
  return (
    <section aria-labelledby="work-types-heading">
      <h2 id="work-types-heading" className="sr-only">
        Work included in this project
      </h2>
      <div className="mx-auto w-full max-w-[465px] [container-type:inline-size] lg:max-w-none">
        <ul className="grid grid-cols-3 gap-x-[1.94cqw] gap-y-[2.37cqw]">
          {types.map((type) => (
            <li key={type.id} className="relative isolate aspect-square text-cream [container-type:inline-size]">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 -scale-x-100 bg-sage-dark [mask-repeat:no-repeat] [mask-size:100%_100%]"
                style={{ maskImage: "url(/images/projects/work-types/tile.svg)", WebkitMaskImage: "url(/images/projects/work-types/tile.svg)" }}
              />
              {type.icon && <Image src={type.icon} alt="" width={77} height={77} unoptimized className="absolute left-1/2 top-[15.5%] h-auto w-[51.4%] -translate-x-1/2" />}
              <span className="absolute left-[14.1%] top-[75.8%] w-[71.8%] text-center font-display text-[max(10px,10.07cqw)] font-semibold uppercase leading-[0.93] tracking-[-0.03em]">
                {type.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
