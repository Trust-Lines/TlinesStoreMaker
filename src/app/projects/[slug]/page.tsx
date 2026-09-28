import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetStartedSection } from "@/components/home/GetStartedSection";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectHeroCarousel } from "@/components/projects/ProjectHeroCarousel";
import { cardTone, toneOfCategory } from "@/components/projects/projectTone";
import {
  footer,
  galleryProjects,
  getStarted,
  projectCategories,
  projectDetailHeading,
  projectDetailLorem,
  projectDetailType,
} from "@/lib/content";

// Project detail page (Figma "Projects" frame, node 261:7803). No backend
// yet — the heading/type/date/body below are placeholders (matching the
// Figma mock's own "Lorem ipsum" / "September 2026" placeholders) until a
// real per-project content source replaces `projectDetailHeading` etc. in
// src/lib/content.ts. Every gallery photo already routes here via its `id`.
//
// Until that content exists, only the hero photo carousel is shown; the rest
// of the template below stays in place (flip this to true) so the full page
// is ready the moment real per-project data is wired up.
const SHOW_PLACEHOLDER_CONTENT = false;

export function generateStaticParams() {
  return galleryProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = galleryProjects.find((item) => item.id === slug);
  return project ? { title: `${projectDetailHeading[project.category]} — StoreMaker` } : {};
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = galleryProjects.find((item) => item.id === slug);
  if (!project) notFound();

  const tone = toneOfCategory(project.category, projectCategories);
  const topBarTone = tone === "gold" ? undefined : tone;
  const frame = cardTone[tone];

  // Other photos from the same category fill the carousel and the two
  // detail shots below; falls back to reusing the main photo if a category
  // is short on images.
  const sameCategory = galleryProjects.filter((item) => item.category === project.category && item.id !== project.id);
  const heroPhotos = [project, ...sameCategory.slice(0, 2)].map((item) => ({ id: item.id, image: item.image, alt: item.alt }));
  const [detailPhotoA, detailPhotoB] = [sameCategory[0] ?? project, sameCategory[1] ?? sameCategory[0] ?? project];

  const alsoCheckOut = galleryProjects.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-[3.08%]">
        <ReferenceTopBar tone={topBarTone} />

        <div className="px-6 pt-[104px] sm:px-10 lg:px-[8.73%] lg:pt-[calc(var(--u)*104)]">
          <ProjectHeroCarousel photos={heroPhotos} />

          {SHOW_PLACEHOLDER_CONTENT ? (
            <>
              <h1 className="mt-8 font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-[0.97] tracking-[-0.01em] text-forest lg:mt-[calc(var(--u)*52)]">
                {projectDetailHeading[project.category]}
              </h1>

              {/* Meta bar (Figma node 274:8160): location / type / date, each with an
                  icon above a 16px label and a 22px value, separated by hairlines. */}
              <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-forest/10 bg-white/40 p-5 sm:flex-row sm:items-center sm:gap-0 sm:divide-x sm:divide-forest/15 lg:mt-[calc(var(--u)*36)] lg:rounded-[calc(var(--u)*16)] lg:p-[calc(var(--u)*20)]">
                {[
                  { icon: "/images/figma/project-meta-location.svg", label: "Location:", value: project.location },
                  { icon: "/images/figma/project-meta-type.svg", label: "Type:", value: projectDetailType[project.category] },
                  { icon: "/images/figma/project-meta-date.svg", label: "Date:", value: "2026" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 sm:flex-1 sm:justify-center sm:px-4">
                    <Image src={item.icon} alt="" width={50} height={50} unoptimized className="size-9 shrink-0 lg:size-[calc(var(--u)*50)]" />
                    <div>
                      <p className="text-sm text-forest/70">{item.label}</p>
                      <p className="font-display text-lg font-semibold text-forest lg:text-[calc(var(--u)*22)]">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Three body blocks (Figma nodes 274:8188/8198/8195): text+photo,
                  photo+text, then a full-width text block — placeholder copy until
                  real project write-ups replace `projectDetailLorem`. */}
              <div className="mt-14 flex flex-col items-center gap-8 lg:mt-[calc(var(--u)*90)] lg:flex-row lg:gap-[calc(var(--u)*60)]">
                <div className="flex flex-col gap-4 text-forest lg:w-[52%] lg:gap-[calc(var(--u)*18)]">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.01em] lg:text-[calc(var(--u)*32)]">Lorem ipsum dolorsit</h2>
                  <p className="text-justify leading-relaxed lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*35)]">{projectDetailLorem}</p>
                </div>
                <div className={`relative aspect-[504/538] w-full overflow-hidden rounded-2xl border-2 lg:w-[38%] lg:rounded-[16px] ${frame.frame}`}>
                  <Image src={detailPhotoA.image} alt={detailPhotoA.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                </div>
              </div>

              <div className="mt-14 flex flex-col items-center gap-8 lg:mt-[calc(var(--u)*80)] lg:flex-row-reverse lg:gap-[calc(var(--u)*60)]">
                <div className="flex flex-col gap-4 text-forest lg:w-[52%] lg:gap-[calc(var(--u)*18)]">
                  <h2 className="font-display text-2xl font-bold tracking-[-0.01em] lg:text-[calc(var(--u)*32)]">Lorem ipsum dolorsit</h2>
                  <p className="text-justify leading-relaxed lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*35)]">{projectDetailLorem}</p>
                </div>
                <div className={`relative aspect-[504/538] w-full overflow-hidden rounded-2xl border-2 lg:w-[38%] lg:rounded-[16px] ${frame.frame}`}>
                  <Image src={detailPhotoB.image} alt={detailPhotoB.alt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                </div>
              </div>

              <div className="mt-14 flex flex-col gap-4 text-forest lg:mt-[calc(var(--u)*80)] lg:gap-[calc(var(--u)*18)]">
                <h2 className="font-display text-2xl font-bold tracking-[-0.01em] lg:text-[calc(var(--u)*32)]">Lorem ipsum dolorsit</h2>
                <p className="text-justify leading-relaxed lg:text-[calc(var(--u)*22)] lg:leading-[calc(var(--u)*35)]">{projectDetailLorem}</p>
              </div>

              {/* "Also check out" (Figma node 337:6394): two other gallery cards in
                  their own category colour. */}
              <div className="mt-16 pb-16 lg:mt-[calc(var(--u)*110)] lg:pb-[calc(var(--u)*70)]">
                <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-forest lg:text-[calc(var(--u)*40)]">Also check out:</h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-[calc(var(--u)*44)] lg:gap-[calc(var(--u)*40)]">
                  {alsoCheckOut.map((other) => {
                    const otherTone = cardTone[toneOfCategory(other.category, projectCategories)];
                    return (
                      <li key={other.id} className="@container">
                        <Link
                          href={`/projects/${other.id}`}
                          aria-label={`${other.alt}, ${other.location}: view project`}
                          className="group relative block w-full text-left outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
                        >
                          <span className={`relative block aspect-[637/407] overflow-hidden rounded-[8px] border-4 ${otherTone.frame}`}>
                            <Image
                              src={other.image}
                              alt=""
                              fill
                              sizes="(min-width: 640px) 45vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </span>
                          <span className="absolute -bottom-[5.3cqw] -left-[3.5cqw] isolate flex aspect-[320/64] w-[50.2cqw] items-center pb-[0.6cqw] pl-[6.2cqw]">
                            <Image src={otherTone.label} alt="" fill unoptimized className="-z-10" />
                            <span className={`font-display text-[clamp(11px,2.83cqw,18px)] font-bold uppercase tracking-[0.06em] ${otherTone.text}`}>
                              {other.location}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <div className="pb-16 lg:pb-[calc(var(--u)*70)]" />
          )}
        </div>

        <GetStartedSection {...getStarted} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
