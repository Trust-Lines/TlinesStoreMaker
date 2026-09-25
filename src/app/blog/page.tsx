import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { blogCategories, blogPage, blogPosts, footer } from "@/lib/content";

export const metadata: Metadata = { title: "Blog & News — StoreMaker" };

export default function BlogPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-16 lg:pb-[calc(var(--u)*80)]">
        <ReferenceTopBar />
        <BlogHero
          eyebrow={blogPage.eyebrow}
          heading={blogPage.heading}
          description={blogPage.description}
          image={blogPage.heroImage}
        />
        <BlogIndex posts={blogPosts} categories={blogCategories} pageSize={blogPage.pageSize} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
