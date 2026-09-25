import Image from "next/image";
import type { ProjectEntry } from "@/lib/content";
import { formatPostDate } from "@/components/blog/formatPostDate";
import { PostByline, TagRibbon } from "@/components/blog/PostMeta";

export interface ProjectRowProps {
  project: ProjectEntry;
  /** Card on the left, photo on the right (rows alternate in Figma). */
  reversed?: boolean;
  tone: "forest" | "sage";
}

/**
 * One "Blog Post Card" row of the Projects frame: a 928 x 586 photo and a
 * 377-wide card, 9px apart, both with ~13px corners. Content in the card sits
 * at the top. Below lg the card stacks under the photo.
 */
export function ProjectRow({ project, reversed = false, tone }: ProjectRowProps) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={`grid gap-2 lg:gap-[calc(var(--u)*9)] ${reversed ? "lg:grid-cols-[377fr_928fr]" : "lg:grid-cols-[928fr_377fr]"}`}
    >
      <div className={`relative aspect-[928/586] overflow-hidden rounded-[12px] lg:rounded-[calc(var(--u)*13)] ${reversed ? "lg:order-2" : ""}`}>
        <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      </div>

      <div
        className={`flex flex-col rounded-[12px] px-5 py-6 text-cream lg:rounded-[calc(var(--u)*13)] lg:px-[calc(var(--u)*26)] lg:py-[calc(var(--u)*40)] ${
          tone === "forest" ? "bg-forest" : "bg-sage-dark"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <TagRibbon label={project.tag} />
          <time dateTime={project.date} className="whitespace-nowrap text-[12px] text-cream/60 lg:text-[max(12px,calc(var(--u)*13))]">
            {formatPostDate(project.date)}
          </time>
        </div>
        <h2
          id={`${project.slug}-title`}
          className="mt-5 font-accent text-[1.2rem] font-bold leading-[1.2] lg:mt-[calc(var(--u)*34)] lg:text-[max(16px,calc(var(--u)*22))]"
        >
          {project.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-[14px] leading-snug text-cream/70 lg:mt-[calc(var(--u)*14)] lg:text-[max(12px,calc(var(--u)*15))]">
          {project.excerpt}
        </p>
        <div className="mt-6 lg:mt-[calc(var(--u)*44)]">
          <PostByline author={project.author} href="/contact" linkLabel={`Ask us about ${project.title}`} />
        </div>
      </div>
    </article>
  );
}
