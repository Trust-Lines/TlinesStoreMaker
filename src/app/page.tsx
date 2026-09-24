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
  projectTiles,
  projectsLayout,
  serviceCards,
  specialtyCards,
  virtualTours,
} from "@/lib/content";

export default function StoreMakerPage() {
  return (
    // Boxed layout: the whole site is a centered column capped at the Figma
    // frame width (1592px). Wider screens / zoomed-out views get cream margins
    // instead of stretching every section edge to edge.
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      {/* Cream gap above the footer: ~48px at the 1592 frame (3.08%). */}
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar />
        <HomeHero {...homeHero} />
        <ServiceCardsSection cards={serviceCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={specialtyCards} />
        <ProjectsGallery title={featuredProjects.title} tiles={projectTiles} layout={projectsLayout} tours={virtualTours} />
        <MembersStrip {...members} />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
