import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/BlogHero";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { footer, galleryProjects, getStarted, projectCategories, projectsPage } from "@/lib/content";

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
        <ProjectGallery projects={galleryProjects} categories={projectCategories} />
        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
