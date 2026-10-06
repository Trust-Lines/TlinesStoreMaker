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

const stateAbbreviations: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA", colorado: "CO", connecticut: "CT",
  delaware: "DE", florida: "FL", georgia: "GA", hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD", massachusetts: "MA", michigan: "MI",
  minnesota: "MN", mississippi: "MS", missouri: "MO", montana: "MT", nebraska: "NE", nevada: "NV", "new hampshire": "NH",
  "new jersey": "NJ", "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", ohio: "OH",
  oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC", "south dakota": "SD",
  tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT", virginia: "VA", washington: "WA", "west virginia": "WV",
  wisconsin: "WI", wyoming: "WY", "district of columbia": "DC",
};

/** State code from an ERP location ("Milford, CT, USA", "California", "Atlanta, Georgia (GA)"); null when none is found. */
export function stateAbbreviation(location: string): string | null {
  const inParens = location.match(/\(([A-Za-z]{2})\)/);
  if (inParens) return inParens[1].toUpperCase();
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter((part) => part && !/^(usa|us|united states( of america)?)$/i.test(part));
  for (let i = parts.length - 1; i >= 0; i -= 1) {
    if (/^[A-Z]{2}$/.test(parts[i])) return parts[i];
    const fromName = stateAbbreviations[parts[i].toLowerCase()];
    if (fromName) return fromName;
  }
  return null;
}

/** Figma card ribbon label: project name plus state, e.g. "Bonfare, (CA)". */
export function projectCardLabel(title: string, location: string): string {
  const state = stateAbbreviation(location);
  return state ? `${title}, (${state})` : title;
}
