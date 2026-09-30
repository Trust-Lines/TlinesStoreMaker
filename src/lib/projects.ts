import { projectCategories, type GalleryProject, type ProjectCategoryId } from "@/lib/content";
import { getSupabase } from "@/lib/supabase";

// Every project on the site comes from Supabase (tables web_projects /
// web_project_photos / web_project_sections, written by the ERP). Nothing is
// hard-coded; if Supabase is unreachable the list is simply empty.

export interface ProjectSection {
  heading: string;
  body: string;
  image: string | null;
  imageAlt: string;
}

export interface ProjectDetail extends GalleryProject {
  photos: { id: string; image: string; alt: string }[];
  sections: ProjectSection[];
  projectType: string | null;
  year: number | null;
}

const validCategories = new Set<string>(projectCategories.map((category) => category.id));

interface ProjectRow {
  slug: string;
  title: string;
  category: string;
  location: string;
  project_type: string | null;
  year_built: number | null;
  cover_image_url: string;
  cover_image_alt: string | null;
  web_project_photos: { id: string; image_url: string; alt: string | null; sort_order: number }[];
  web_project_sections: {
    heading: string | null;
    body: string | null;
    image_url: string | null;
    image_alt: string | null;
    sort_order: number;
  }[];
}

function toDetail(row: ProjectRow): ProjectDetail | null {
  if (!validCategories.has(row.category)) return null;
  const alt = row.cover_image_alt || row.title;
  const photos = [...row.web_project_photos]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((photo) => ({ id: photo.id, image: photo.image_url, alt: photo.alt || alt }));
  return {
    id: row.slug,
    title: row.title,
    category: row.category as ProjectCategoryId,
    location: row.location,
    image: row.cover_image_url,
    alt,
    photos: photos.length ? photos : [{ id: `${row.slug}-cover`, image: row.cover_image_url, alt }],
    sections: [...row.web_project_sections]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((section) => ({
        heading: section.heading ?? "",
        body: section.body ?? "",
        image: section.image_url,
        imageAlt: section.image_alt || section.heading || row.title,
      })),
    projectType: row.project_type,
    year: row.year_built,
  };
}

async function fetchErpProjects(): Promise<ProjectDetail[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("web_projects")
      .select("*, web_project_photos(*), web_project_sections(*)")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as ProjectRow[]).map(toDetail).filter((project): project is ProjectDetail => project !== null);
  } catch {
    return [];
  }
}

export async function getGalleryProjects(): Promise<GalleryProject[]> {
  return fetchErpProjects();
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  return (await fetchErpProjects()).find((project) => project.id === slug) ?? null;
}
