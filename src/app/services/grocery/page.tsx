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
  groceryProcessCards,
  groceryProjectsLayout,
  groceryProjectTiles,
  grocerySpecialtyCards,
  homeHero,
  members,
  serviceTypeTiles,
  virtualTours,
} from "@/lib/content";

// Same layout as the homepage (navbar, hero, sections, footer), matching the
// Figma "Grocery" frame (node 298:4915): Design/Supply/Build process cards in
// place of the store-type picker, a sage/sage-dark colourway with cream text
// throughout the branding and projects sections, and this page's own photos.

export const metadata: Metadata = {
  title: "Grocery — StoreMaker",
};

export default function GroceryPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar tone="sage" />
        <HomeHero {...homeHero} stripBgClass="bg-sage-dark" />
        <ServiceCardsSection cards={groceryProcessCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={grocerySpecialtyCards} />
        <ProjectsGallery
          title={featuredProjects.title}
          bgClass="bg-sage-dark"
          labelTextClass="text-cream"
          placeholderClass="bg-sage"
          tourBgClass="bg-sage"
          rotatingItems={serviceTypeTiles}
          tiles={groceryProjectTiles}
          layout={groceryProjectsLayout}
          tours={virtualTours}
        />
        <MembersStrip {...members} bgClass="bg-sage-dark" />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
