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
  cStoreProcessCards,
  cStoreProjectsLayout,
  cStoreProjectTiles,
  cStoreSpecialtyCards,
  featuredProjects,
  footer,
  getStarted,
  homeHero,
  members,
  virtualTours,
} from "@/lib/content";

// Same layout as the homepage (navbar, hero, sections, footer), matching the
// Figma "C Store" frame (node 294:4051): Design/Supply/Build process cards in
// place of the store-type picker, a gold/coral colourway on the branding and
// projects sections, and this page's own photos.

export const metadata: Metadata = {
  title: "C-store — StoreMaker",
};

export default function CStorePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar />
        <HomeHero {...homeHero} stripBgClass="bg-gold" />
        <ServiceCardsSection cards={cStoreProcessCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={cStoreSpecialtyCards} />
        <ProjectsGallery
          title={featuredProjects.title}
          bgClass="bg-gold"
          labelTextClass="text-gold"
          placeholderClass="bg-coral"
          tourBgClass="bg-coral"
          tiles={cStoreProjectTiles}
          layout={cStoreProjectsLayout}
          tours={virtualTours}
        />
        <MembersStrip {...members} />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
