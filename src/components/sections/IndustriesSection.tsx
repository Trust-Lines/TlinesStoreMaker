import Image from "next/image";
import Link from "next/link";
import { SectionShell } from "@/components/primitives/SectionShell";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShapedMedia } from "@/components/primitives/ShapedMedia";
import { ImageCardFrame } from "@/components/primitives/ImageCardFrame";

export interface IndustryCard {
  id: string;
  title: string;
  image: string;
  imagePosition: "outer" | "inner";
  href?: string;
}

export interface PartnerLogo {
  id: string;
  src: string;
  alt: string;
  href?: string;
}

export interface IndustriesSectionProps {
  cards: IndustryCard[];
  logos: PartnerLogo[];
}

export function IndustriesSection({ cards, logos }: IndustriesSectionProps) {
  return (
    <SectionShell tone="forest" spacing="lg" edgeTop edgeBottom>
      <SectionHeading title="Industries" subtitle="we serve" tone="light" />

      <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {cards.map((card) => (
          <div key={card.id} className={card.imagePosition === "inner" ? "md:mt-10" : ""}>
            <ImageCardFrame
              href={card.href}
              labelPosition="bottom"
              media={
                <ShapedMedia
                  src={card.image}
                  alt=""
                  aspectRatio={card.imagePosition === "outer" ? "3 / 4" : "3 / 3.4"}
                  shape="chamfered"
                  chamfer={20}
                  overlay
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              }
            >
              <span className="font-display text-lg font-semibold text-cream md:text-xl">
                {card.title}
              </span>
            </ImageCardFrame>
          </div>
        ))}
      </div>

      <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => {
          const image = (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={56}
              unoptimized
              className="h-7 w-auto opacity-70 md:h-8"
            />
          );
          return (
            <li key={logo.id}>
              {logo.href ? (
                <Link
                  href={logo.href}
                  className="inline-flex rounded-sm outline-offset-4 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
                >
                  {image}
                </Link>
              ) : (
                image
              )}
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
