import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/site";
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
  cStoreClientLogos,
  cStoreProcessCards,
  cStoreProjectsLayout,
  cStoreProjectTiles,
  cStoreSpecialtyCards,
  featuredProjects,
  footer,
  getStarted,
  homeHero,
  members,
  serviceTypeTiles,
  virtualTours,
} from "@/lib/content";

// Same layout as the homepage (navbar, hero, sections, footer), matching the
// Figma "C Store" frame (node 294:4051): Design/Supply/Build process cards in
// place of the store-type picker, a gold/coral colourway on the branding and
// projects sections, and this page's own photos.

export const metadata: Metadata = pageMetadata({
  title: "C-store — StoreMaker",
  description: "C-store design, supply and build from T Lines Store Maker: layouts, fixtures, branding and project management from vanilla box to open date.",
  path: "/services/c-store",
});

export default function CStorePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <JsonLd data={[serviceJsonLd("C-store design and build", "C-store design, supply and build from T Lines Store Maker: layouts, fixtures, branding and project management from vanilla box to open date.", "/services/c-store"), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "C-store", path: "/services/c-store" }])]} />
        <ReferenceTopBar />
        <HomeHero
          {...homeHero}
          backgroundImage="/images/figma/cstore-hero.webp"
          imageAlt="Teddy’s Market c-store interior with blue ceiling baffles and candy aisles"
          clients={{ ...homeHero.clients, logos: cStoreClientLogos }}
          stripBgClass="bg-gold"
          badge={{ label: "C-Store" }}
        />
        <ServiceCardsSection cards={cStoreProcessCards} />
        <BoothBanner {...boothBanner} />
        <SpecialtyCardsSection cards={cStoreSpecialtyCards} palette="cstore" />
        <ProjectsGallery
          title={featuredProjects.title}
          bgClass="bg-gold"
          labelTextClass="text-gold"
          placeholderClass="bg-coral"
          tourBgClass="bg-coral"
          rotatingItems={serviceTypeTiles}
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
