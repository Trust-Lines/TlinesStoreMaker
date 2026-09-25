import type { Metadata } from "next";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BoothBanner } from "@/components/home/BoothBanner";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { HomeHero } from "@/components/home/HomeHero";
import { MembersStrip } from "@/components/home/MembersStrip";
import { ProjectsGallery } from "@/components/home/ProjectsGallery";
import { ServiceCardsSection } from "@/components/home/ServiceCardsSection";
import { SpecialtyCardsSection } from "@/components/home/SpecialtyCardsSection";
import {
  boothBanner,
  featuredProjects,
  footer,
  getStarted,
  homeHero,
  members,
  serviceTypeTiles,
  truckStopsProcessCards,
  truckStopsProjectsLayout,
  truckStopsProjectTiles,
  truckStopsSpecialtyCards,
  virtualTours,
} from "@/lib/content";

// Same layout as the homepage (navbar, hero, sections, footer), matching the
// Figma "Truck stops" frame (node 298:4483): Design/Supply/Build process cards
// in place of the store-type picker, a coral/sage-dark colourway with cream
// text throughout the branding and projects sections, and this page's own
// photos.

export const metadata: Metadata = {
  title: "Truck stops — StoreMaker",
};

export default function TruckStopsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar tone="coral" />
        <HomeHero
          {...homeHero}
          stripBgClass="bg-coral"
          badge={{
            label: "Truck Stops",
            ribbonSrc: "/images/figma/hero-badge-ribbon-sage-dark.svg",
            buttonSrc: "/images/figma/ribbon-service-sage-dark.svg",
            textClass: "text-cream",
          }}
        />
        <ServiceCardsSection cards={truckStopsProcessCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={truckStopsSpecialtyCards} />
        <ProjectsGallery
          title={featuredProjects.title}
          bgClass="bg-coral"
          labelTextClass="text-cream"
          placeholderClass="bg-sage-dark"
          tourBgClass="bg-sage-dark"
          rotatingItems={serviceTypeTiles}
          tiles={truckStopsProjectTiles}
          layout={truckStopsProjectsLayout}
          tours={virtualTours}
        />
        <MembersStrip {...members} bgClass="bg-coral" />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
