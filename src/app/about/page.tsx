import type { Metadata } from "next";
import { AboutHero, AboutMembers, AboutMission, AboutTrustedBy } from "@/components/about/AboutSections";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { aboutPage, footer, getStarted } from "@/lib/content";

export const metadata: Metadata = { title: "About us — StoreMaker" };

export default function AboutPage() {
  const { hero, mission, members, trustedBy } = aboutPage;
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar />
        <AboutHero {...hero} />
        {/* Hidden for now (kept for later): <AboutStory {...story} /> */}
        <AboutMission {...mission} />
        <AboutMembers {...members} />
        {/* Hidden for now (kept for later): <AboutTestimonials {...testimonials} /> */}
        <AboutTrustedBy {...trustedBy} />
        <div className="pt-[3.08%]">
          <GetStartedSection {...getStarted} />
        </div>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
