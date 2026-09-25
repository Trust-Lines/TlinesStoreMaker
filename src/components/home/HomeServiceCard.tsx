import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { withBold } from "./withBold";

export interface HomeServiceCardData {
  id: string;
  title: string;
  href: string;
  image: string;
  /** Bullet copy; wrap a word in **double asterisks** to bold it. */
  points: string[];
  /** Tailwind classes for the card body color and its text color. */
  bgClass: string;
  textClass: string;
  /** Tailwind bg + text classes for the title ribbon. */
  ribbonClass: string;
}

const shapes = {
  card: "url(/images/figma/home-service/card.svg)",
  photo: "url(/images/figma/home-service/photo-mask.svg)",
  ribbon: "url(/images/figma/home-service/ribbon.svg)",
};

const maskClass = "[mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]";

/**
 * Homepage store-type card (Figma "Vector", 381.593 x 743.425): photo 361.6 x
 * 399.5 inset 10px with soft-cut corners; ribbon 356 x 62 starting ~67px in
 * (overhanging the right edge) and overlapping the photo by 35px, Orbitron
 * 32/48; 338 x 236 bullet box ~17px in and 26px under the ribbon, Montserrat
 * 22/36 medium (bullet dot 34px and text 53px from the card edge). Every size
 * is in cqw (% of card width) so the card scales
 * as one; the Figma height is a minimum so longer copy grows the card.
 */
export function HomeServiceCard({ card }: { card: HomeServiceCardData }) {
  return (
    <Link
      href={card.href}
      className={`group relative isolate flex h-full min-h-[194.82cqw] flex-col pb-[8.76cqw] outline-offset-4 transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${card.textClass}`}
    >
      <span aria-hidden className={`absolute inset-0 -z-10 ${card.bgClass} ${maskClass}`} style={{ maskImage: shapes.card, WebkitMaskImage: shapes.card } as CSSProperties} />

      <span
        className={`relative mx-[2.62cqw] mt-[2.62cqw] block aspect-[361.6/399.5] shrink-0 overflow-hidden ${maskClass}`}
        style={{ maskImage: shapes.photo, WebkitMaskImage: shapes.photo } as CSSProperties}
      >
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </span>

      <h3
        className={`relative z-10 -mt-[9.17cqw] ml-[12cqw] sm:ml-[17.5cqw] flex aspect-[356/62] w-[93.29cqw] max-w-none shrink-0 items-center justify-center font-accent text-[8.386cqw] font-bold uppercase leading-[12.58cqw] ${card.ribbonClass} ${maskClass}`}
        style={{ maskImage: shapes.ribbon, WebkitMaskImage: shapes.ribbon } as CSSProperties}
      >
        {card.title}
      </h3>

      <ul className="mt-[6.8cqw] flex w-[93cqw] list-none flex-col pl-[4.45cqw] font-display text-[clamp(14px,5.765cqw,22px)] font-medium leading-[1.636]">
        {card.points.map((point) => (
          <li key={point} className="relative pl-[1.64em] before:absolute before:left-[0.77em] before:content-['•']">
            {withBold(point)}
          </li>
        ))}
      </ul>
    </Link>
  );
}
