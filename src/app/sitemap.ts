import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { getGalleryProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

// Projects and blog posts come from the ERP, so the list is rebuilt at most once an hour.
export const revalidate = 3600;

const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services/c-store", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/truck-stops", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/grocery", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getGalleryProjects(), getPosts()]);
  return [
    ...staticPages.map((page) => ({ url: `${siteUrl}${page.path}`, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`],
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
