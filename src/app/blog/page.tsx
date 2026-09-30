import type { Metadata } from "next";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getPosts } from "@/lib/blog";
import { blogCategories, blogPage, footer } from "@/lib/content";
import { getSetting } from "@/lib/settings";

export const metadata: Metadata = { title: "Blog & News — StoreMaker" };

// Posts and the page header are managed from the ERP; refresh at most once a
// minute (the ERP can also hit /api/revalidate for an instant update).
export const revalidate = 60;

export default async function BlogPage() {
  const [posts, header] = await Promise.all([
    getPosts(),
    getSetting<{ eyebrow: string; heading: string; description: string; hero_image_url: string }>("blog_page"),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-16 lg:pb-[calc(var(--u)*80)]">
        <ReferenceTopBar />
        <BlogHero
          eyebrow={header?.eyebrow || blogPage.eyebrow}
          heading={header?.heading || blogPage.heading}
          description={header?.description ?? blogPage.description}
          image={header?.hero_image_url || blogPage.heroImage}
        />
        <BlogIndex posts={posts} categories={blogCategories} pageSize={blogPage.pageSize} />
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
