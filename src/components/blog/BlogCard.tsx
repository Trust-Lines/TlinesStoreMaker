import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/content";
import { formatPostDate } from "./formatPostDate";
import { PostByline, TagRibbon } from "./PostMeta";

export interface BlogCardProps {
  post: BlogPost;
  categoryLabel: string;
  /** Cards alternate forest / sage-dark across the grid, as in Figma. */
  tone: "forest" | "sage";
}

/**
 * Blog card (Figma 403 x 570 on the 1592 frame): photo inset 24px, gold
 * category ribbon (169 x 33) + date, title, excerpt, then author and
 * "Read more" pinned to the bottom.
 */
export function BlogCard({ post, categoryLabel, tone }: BlogCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-[16px] p-4 text-cream lg:rounded-[calc(var(--u)*22)] lg:p-[calc(var(--u)*24)] ${
        tone === "forest" ? "bg-forest" : "bg-sage-dark"
      }`}
    >
      <div className="relative aspect-[355/258] overflow-hidden rounded-[12px] lg:rounded-[calc(var(--u)*16)]">
        <Image src={post.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 lg:mt-[calc(var(--u)*22)]">
        <TagRibbon label={categoryLabel} />
        <time dateTime={post.date} className="whitespace-nowrap text-[12px] text-cream/60 lg:text-[max(12px,calc(var(--u)*13))]">
          {formatPostDate(post.date)}
        </time>
      </div>

      <h2 className="mt-4 font-accent text-[1.15rem] font-bold leading-[1.2] lg:mt-[calc(var(--u)*18)] lg:text-[max(15px,calc(var(--u)*21))]">
        <Link
          href={`/blog/${post.slug}`}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 line-clamp-3 text-[14px] leading-snug text-cream/70 lg:mt-[calc(var(--u)*12)] lg:text-[max(12px,calc(var(--u)*14.5))]">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-6 lg:pt-[calc(var(--u)*26)]">
        <PostByline author={post.author} href={`/blog/${post.slug}`} linkLabel={`Read more: ${post.title}`} />
      </div>
    </article>
  );
}
