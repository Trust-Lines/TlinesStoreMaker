import { blogCategories, type BlogCategoryId, type BlogPost } from "@/lib/content";
import { getSupabase } from "@/lib/supabase";

// Every post comes from Supabase (web_posts / web_post_sections, written by
// the ERP). Nothing is hard-coded; if Supabase is unreachable the list is empty.

export interface PostSection {
  heading: string;
  body: string;
  image: string | null;
  imageAlt: string;
}

export interface BlogPostDetail extends BlogPost {
  sections: PostSection[];
}

const validCategories = new Set<string>(blogCategories.map((category) => category.id));

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  cover_image_url: string;
  cover_image_alt: string | null;
  published_at: string;
  web_post_sections: {
    heading: string | null;
    body: string | null;
    image_url: string | null;
    image_alt: string | null;
    sort_order: number;
  }[];
}

function toDetail(row: PostRow): BlogPostDetail | null {
  if (!validCategories.has(row.category)) return null;
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category as BlogCategoryId,
    date: row.published_at,
    author: row.author,
    image: row.cover_image_url,
    imageAlt: row.cover_image_alt || row.title,
    sections: [...row.web_post_sections]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((section) => ({
        heading: section.heading ?? "",
        body: section.body ?? "",
        image: section.image_url,
        imageAlt: section.image_alt || section.heading || row.title,
      })),
  };
}

async function fetchPosts(): Promise<BlogPostDetail[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  try {
    // RLS already hides drafts; the date filter keeps scheduled posts hidden too.
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("web_posts")
      .select("*, web_post_sections(*)")
      .eq("is_published", true)
      .lte("published_at", today)
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as PostRow[]).map(toDetail).filter((post): post is BlogPostDetail => post !== null);
  } catch {
    return [];
  }
}

/** List view: cards only, without the article bodies. */
export async function getPosts(): Promise<BlogPost[]> {
  const posts = await fetchPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    author: post.author,
    image: post.image,
    imageAlt: post.imageAlt,
  }));
}

export async function getPost(slug: string): Promise<BlogPostDetail | null> {
  return (await fetchPosts()).find((post) => post.slug === slug) ?? null;
}
