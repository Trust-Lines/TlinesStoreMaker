import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogHero } from "@/components/blog/BlogHero";
import { formatPostDate } from "@/components/blog/formatPostDate";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { blogCategories, blogPage, blogPosts, footer } from "@/lib/content";

// Article page. No Figma design yet: reuses the journal hero and shows the
// post's summary until full article bodies are written.

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? { title: `${post.title} — StoreMaker`, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  const category = blogCategories.find((item) => item.id === post.category)?.label ?? "";

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-16 lg:pb-[calc(var(--u)*110)]">
        <ReferenceTopBar />
        <BlogHero eyebrow={category} heading={post.title} description={post.excerpt} image={blogPage.heroImage} headingId="post-heading" />

        <article className="mx-auto max-w-[760px] px-6 pt-10 sm:px-10 lg:pt-[calc(var(--u)*72)]">
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-forest/70">
            <span className="font-semibold text-forest">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[20px]">
            <Image src={post.image} alt="" fill sizes="(min-width: 800px) 760px, 100vw" className="object-cover" />
          </div>
          <p className="mt-8 text-lg leading-relaxed text-forest">{post.excerpt}</p>
          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 font-display text-sm font-bold uppercase text-coral hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            <span aria-hidden>←</span> All posts
          </Link>
        </article>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
