import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ServiceFeatureRow } from "@/components/services/ServiceFeatureRow";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceToursStrip } from "@/components/services/ServiceToursStrip";
import { footer, getStarted, serviceCards, serviceDetails, virtualTours } from "@/lib/content";

// Service detail pages for the three homepage store-type cards
// (/services/c-store, /services/truck-stops, /services/grocery), laid out
// after the "CStore" Figma frame: photo hero with a title ribbon, then
// alternating title + text box / photo rows, closing on the 360 tour strip
// and the "Let's Get Started" band.

// The strip bleeds past both edges at ~7 tiles per row, so cycle the tours to 8.
const stripTours = Array.from({ length: 8 }, (_, index) => {
  const tour = virtualTours.tours[index % virtualTours.tours.length];
  return { ...tour, id: `${tour.id}-${index}` };
});

export function generateStaticParams() {
  return serviceCards.map((card) => ({ slug: card.id }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const card = serviceCards.find((item) => item.id === slug);
  return card ? { title: `${card.title} — StoreMaker` } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const card = serviceCards.find((item) => item.id === slug);
  const detail = serviceDetails[slug];
  if (!card || !detail) notFound();

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar tone={detail.theme.topBar} />
        <ServiceHero title={card.title} image={detail.heroImage} ribbon={detail.theme.heroRibbon} />

        <div className="flex flex-col gap-14 pt-12 sm:gap-16 lg:gap-[clamp(64px,10.2vw,163px)] lg:pt-[6.3%]">
          {detail.sections.map((section, index) => (
            <ServiceFeatureRow
              key={section.id}
              {...section}
              reversed={index % 2 === 1}
              titleTone={detail.theme.titleRibbon}
              boxTone={detail.theme.textBox}
            />
          ))}
        </div>

        <div className="mt-[clamp(56px,4.2vw,68px)] lg:mt-[clamp(64px,6.3vw,100px)]">
          <ServiceToursStrip heading={virtualTours.heading} tours={stripTours} />
        </div>
        <div className="pt-[1.9%]">
          <GetStartedSection {...getStarted} />
        </div>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
