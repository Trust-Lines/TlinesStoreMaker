import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { formatPostDateShort } from "@/components/blog/formatPostDate";
import { ReferenceTopBar } from "@/components/layout/ReferenceTopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectHeroCarousel } from "@/components/projects/ProjectHeroCarousel";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, getPosts } from "@/lib/blog";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, siteName, siteUrl } from "@/lib/site";
import { blogCategories, footer } from "@/lib/content";

// Article page (Figma "Blog subpage", node 300:5802): cover photo, title,
// body sections on the left with the "Blog info" card on the right, then
// three more posts. Everything is written in the ERP.
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title} — StoreMaker`,
    description: post.excerpt || `${post.title} — ${siteName}`,
    path: `/blog/${slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    authors: post.author ? [post.author] : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const labelOf = (id: string) => blogCategories.find((item) => item.id === id)?.label ?? id;
  const alsoCheckOut = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  // A post with no body sections still shows its summary.
  const sections = post.sections.length ? post.sections : [{ heading: "", body: post.excerpt, image: null, imageAlt: "" }];

  const info = [
    { icon: "/images/blog/info-author.svg", label: "Author:", value: post.author },
    { icon: "/images/blog/info-tag.svg", label: "Tag:", value: labelOf(post.category) },
    { icon: "/images/blog/info-date.svg", label: "Publish Date:", value: formatPostDateShort(post.date), spaced: true },
  ].filter((item) => item.value);

  return (
    <div className="mx-auto flex w-full max-w-[1592px] flex-1 flex-col overflow-x-clip bg-cream">
      <main className="relative bg-cream pb-16 lg:pb-[calc(var(--u)*133)]">
        <JsonLd
          data={[
            breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog & News", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]),
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt || undefined,
              image: [post.image.startsWith("http") ? post.image : absoluteUrl(post.image)],
              datePublished: post.date,
              ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
              publisher: { "@id": `${siteUrl}/#organization` },
              mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            },
          ]}
        />
        <ReferenceTopBar />

        <div className="px-6 pt-[104px] sm:px-10 lg:px-[8.73%] lg:pt-[calc(var(--u)*104)]">
          <ProjectHeroCarousel photos={[{ id: post.slug, image: post.image, alt: post.imageAlt }]} />

          <h1 className="mt-8 font-display text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-[0.97] tracking-[-0.01em] text-forest lg:mt-[calc(var(--u)*45)]">
            {post.title}
          </h1>

          <div className="mt-10 flex flex-col gap-12 lg:mt-[calc(var(--u)*51)] lg:flex-row lg:justify-between lg:gap-[calc(var(--u)*40)]">
            {/* Body: Montserrat 32 bold heading, 28 medium justified text, 80px between blocks. */}
            <div className="flex flex-col gap-10 text-forest lg:w-[55.1%] lg:gap-[calc(var(--u)*80)]">
              {sections.map((section, index) => (
                <section key={index} className="flex flex-col gap-4 lg:gap-[calc(var(--u)*18)]">
                  {section.heading && (
                    <h2 className="font-display text-2xl font-bold tracking-[-0.01em] lg:text-[calc(var(--u)*32)] lg:leading-[calc(var(--u)*40)]">
                      {section.heading}
                    </h2>
                  )}
                  {section.image && (
                    <div className="relative aspect-[724/480] overflow-hidden rounded-2xl lg:rounded-[calc(var(--u)*16)]">
                      <Image src={section.image} alt={section.imageAlt} fill sizes="(min-width: 1024px) 724px, 100vw" className="object-cover" />
                    </div>
                  )}
                  {section.body && (
                    <p className="whitespace-pre-line text-justify text-lg font-medium leading-relaxed lg:text-[calc(var(--u)*28)] lg:leading-[calc(var(--u)*40)] lg:tracking-[-0.01em]">
                      {section.body}
                    </p>
                  )}
                </section>
              ))}
            </div>

            {/* Blog info card (Figma 410 x 387, 2px outline at 15%). */}
            <aside className="lg:w-[31.2%] lg:shrink-0">
              <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-forest lg:text-[calc(var(--u)*24)] lg:leading-[calc(var(--u)*40)]">Blog info:</h2>
              <ul className="mt-3 rounded-[10px] border-2 border-forest/15 lg:mt-[calc(var(--u)*17)] lg:rounded-[calc(var(--u)*10)]">
                {info.map((item, index) => (
                  <li key={item.label} className={index > 0 ? "mx-[calc(var(--u)*19)] border-t border-forest/15" : ""}>
                    <div className="flex items-center gap-4 px-5 py-8 lg:gap-[calc(var(--u)*31)] lg:px-[calc(var(--u)*20)] lg:py-[calc(var(--u)*40)]">
                      <Image src={item.icon} alt="" width={50} height={50} unoptimized className="size-10 shrink-0 lg:size-[calc(var(--u)*50)]" />
                      <div className="min-w-0 text-sage-dark">
                        <p className="text-base font-medium lg:text-[calc(var(--u)*16)]">{item.label}</p>
                        <p className={`break-words font-display text-lg font-semibold lg:text-[calc(var(--u)*22)] ${item.spaced ? "tracking-[0.06em]" : ""}`}>{item.value}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {alsoCheckOut.length > 0 && (
            <div className="mt-16 lg:mt-[calc(var(--u)*150)]">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-forest lg:text-[calc(var(--u)*40)] lg:leading-[calc(var(--u)*40)]">Also check out:</h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:mt-[calc(var(--u)*43)] lg:grid-cols-3 lg:gap-x-[calc(var(--u)*48)]">
                {alsoCheckOut.map((other, index) => (
                  <li key={other.slug}>
                    <BlogCard post={other} categoryLabel={labelOf(other.category)} tone={index % 2 === 0 ? "forest" : "sage"} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <SiteFooter {...footer} />
    </div>
  );
}
