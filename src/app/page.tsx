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
  serviceCards,
  specialtyCards,
  virtualTours,
} from "@/lib/content";

export default function StoreMakerPage() {
  return (
    <>
      <main className="relative bg-cream pb-3 md:pb-6">
        <ReferenceTopBar />
        <HomeHero {...homeHero} />
        <ServiceCardsSection cards={serviceCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={specialtyCards} />
        <ProjectsGallery title={featuredProjects.title} photos={featuredProjects.photos} tours={virtualTours} />
        <MembersStrip {...members} />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </>
  );
}
