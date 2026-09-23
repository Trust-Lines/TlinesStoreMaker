import Image from "next/image";
import { SectionShell } from "@/components/primitives/SectionShell";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShapedMedia } from "@/components/primitives/ShapedMedia";
import { ImageCardFrame } from "@/components/primitives/ImageCardFrame";

export interface ProjectNeedCard {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface ProjectNeedsSectionProps {
  cards: ProjectNeedCard[];
  mascot: { src: string; size?: number };
}

export function ProjectNeedsSection({ cards, mascot }: ProjectNeedsSectionProps) {
  return (
    <SectionShell tone="cream" spacing="lg" className="pb-32 md:pb-48">
      <SectionHeading title="How can we help you?" />

      <div className="relative mt-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {cards.map((card) => (
            <ImageCardFrame
              key={card.id}
              href={card.href}
              labelPosition="bottom"
              media={
                <ShapedMedia
                  src={card.image}
                  alt=""
                  aspectRatio="7 / 6"
                  shape="chamfered"
                  chamfer={20}
                  overlay
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              }
            >
              <span className="font-display text-xl font-semibold text-cream md:text-2xl">
                {card.title}
              </span>
            </ImageCardFrame>
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ width: mascot.size ?? 220 }}
        >
          <Image
            src={mascot.src}
            alt=""
            width={460}
            height={560}
            unoptimized
            className="h-auto w-full"
          />
        </div>
      </div>
    </SectionShell>
  );
}
