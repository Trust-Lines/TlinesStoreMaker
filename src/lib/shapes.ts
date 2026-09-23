export type MediaShape = "hero" | "chamfered" | "leanLeft" | "leanRight" | "cta";

export const shapeClass: Record<MediaShape, string> = {
  hero: "shape-hero",
  chamfered: "shape-chamfered",
  leanLeft: "shape-lean-left",
  leanRight: "shape-lean-right",
  cta: "shape-cta",
};
