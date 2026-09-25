import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/BlogHero";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { footer, getStarted, projectEntries, projectsPage } from "@/lib/content";

export const metadata: Metadata = { title: "Projects — StoreMaker" };

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar />
        <BlogHero
          eyebrow={projectsPage.eyebrow}
          heading={projectsPage.heading}
          description={projectsPage.description}
          image={projectsPage.heroImage}
          headingId="projects-heading"
        />

        {/* Rows start 140px under the hero, 139px in from each side, 106px apart. */}
        <div className="flex flex-col gap-10 px-5 pb-16 pt-10 sm:px-10 lg:gap-[calc(var(--u)*106)] lg:px-[8.73%] lg:pb-[calc(var(--u)*200)] lg:pt-[calc(var(--u)*140)]">
          {projectEntries.map((project, index) => (
            <ProjectRow key={project.slug} project={project} reversed={index % 2 === 1} tone={index % 2 === 0 ? "forest" : "sage"} />
          ))}
        </div>

        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
