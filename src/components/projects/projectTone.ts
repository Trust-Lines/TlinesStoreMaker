import type { ProjectCategoryId } from "@/lib/content";

export type Tone = "gold" | "coral" | "sage";

/** Figma card frame colour + "STATE, USA" location ribbon (320 x 64 vectors, cream 5px outline baked in). Shared by the projects grid and the project detail page's "Also check out" cards. */
export const cardTone: Record<Tone, { frame: string; label: string; text: string }> = {
  gold: { frame: "border-gold", label: "/images/projects-gallery/label-gold.svg", text: "text-sage-dark" },
  coral: { frame: "border-coral", label: "/images/projects-gallery/label-coral.svg", text: "text-cream" },
  sage: { frame: "border-sage-dark", label: "/images/projects-gallery/label-sage.svg", text: "text-cream" },
};

export function toneOfCategory(
  categoryId: ProjectCategoryId,
  categories: readonly { id: ProjectCategoryId; tone: Tone }[],
): Tone {
  return categories.find((category) => category.id === categoryId)?.tone ?? "sage";
}
