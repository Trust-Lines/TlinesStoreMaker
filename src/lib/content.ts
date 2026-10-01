// Content for the homepage, matching the Tlines Figma frame (node 16:605).

export const navItems = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "news", label: "News", href: "/news" },
  { id: "about", label: "About us", href: "/about" },
];

export const contactAction = { label: "Get in touch", href: "/#contact" };
export const startProjectAction = { label: "Start Your Project", href: "/#contact" };

export const logo = { src: "/images/figma/header-logo-mark.svg", alt: "Tlines", href: "/#home" };

export const hero = {
  eyebrow: "STEP 01",
  heading: "Designing Layout",
  backgroundImage: "/images/figma/hero-photo.png",
  primaryAction: startProjectAction,
};

/**
 * Homepage headline, timed to public/videos/hero.mp4 (20.3 s): design desk 0-2.5 s,
 * workshop 2.6-6.3 s, delivery and install 6.4-15 s, finished store from 15 s.
 * The switches sit on the video's whip-pan cuts so the text change is masked by the motion.
 */
export const homeHeroPhrases = [
  { at: 0, text: "Design around your vision" },
  { at: 2.55, text: "Produce everything your store needs." },
  { at: 6.35, text: "Bring it all together." },
  { at: 15, text: "One team. One complete solution." },
];

export const homeHero = {
  heading: "Planning your store",
  backgroundImage: "/images/figma/hero-photo.png",
  imageAlt: "T Lines mascot planning a store layout at a drafting table",
  action: startProjectAction,
  clients: {
    src: "/images/figma/clients/clients-strip-long.svg",
    width: 4097,
    height: 102,
    names: ["TA (TravelCenters of America)", "Prince Market", "Pilot", "Teddy’s Market", "Brew", "Chestnut Market"],
  },
};

// Homepage store-type cards (Figma "Vector" 381.593 x 743.425): short bullet
// lists, Montserrat 22/36 medium.
export const serviceCards = [
  {
    id: "c-store",
    title: "C-store",
    href: "/services/c-store",
    image: "/images/figma/home-service/cstore-photo.webp",
    points: [
      "Layouts that work hard",
      "Every square foot earns",
      "Stores people stop for",
      "Better flow, more profit",
      "Interiors worth noticing",
    ],
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-gold",
  },
  {
    id: "truck-stops",
    title: "Truck stops",
    href: "/services/truck-stops",
    image: "/images/figma/project-grid-03.webp",
    points: [
      "Built for today's driver",
      "Operations that flow",
      "Built for a long stop",
      "Easy to find your way",
      "Designed to be used",
    ],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
  {
    id: "grocery",
    title: "Grocery",
    href: "/services/grocery",
    image: "/images/figma/project-grid-01.webp",
    points: ["Aisles with logic", "Shelves that draw the eye", "Details you notice later", "More in every cart", "Markets built for tomorrow"],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
  },
];

// C-store page process cards (Figma "C Store" frame, node 294:4055): same card
// shape as the homepage store-type cards, but Design/Supply/Build steps.
export const cStoreProcessCards = [
  {
    id: "design",
    title: "Design",
    href: "/services/c-store",
    image: "/images/figma/home-service/design-photo.png",
    points: ["Site survey", "Planning", "Layout", "Realistic Renders", "Estimate & Finalization"],
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-gold",
  },
  {
    id: "supply",
    title: "Supply",
    href: "/services/c-store",
    image: "/images/figma/home-service/supply-photo.png",
    points: ["Supply planning", "In-house fabrication", "Global Sourcing", "Quality control", "Delivery"],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-gold text-sage-dark",
  },
  {
    id: "build",
    title: "Build",
    href: "/services/c-store",
    image: "/images/figma/home-service/build-photo.png",
    points: ["Pre-build Planning", "Coordination", "Installation", "Finishing and inspection", "After build services"],
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-gold",
  },
];

// Truck-stops page process cards (Figma "Truck stops" frame, node 298:4487):
// same card shape, coral/sage-dark colourway, cream text throughout.
export const truckStopsProcessCards = [
  {
    id: "design",
    title: "Design",
    href: "/services/truck-stops",
    image: "/images/figma/home-service/truck-design-photo.png",
    points: ["Site survey", "Planning", "Layout", "Realistic Renders", "Estimate & Finalization"],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
  {
    id: "supply",
    title: "Supply",
    href: "/services/truck-stops",
    image: "/images/figma/home-service/truck-supply-photo.png",
    points: ["Supply planning", "In-house fabrication", "Global Sourcing", "Quality control", "Delivery"],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-coral text-cream",
  },
  {
    id: "build",
    title: "Build",
    href: "/services/truck-stops",
    image: "/images/figma/home-service/truck-build-photo.png",
    points: ["Pre-build Planning", "Coordination", "Installation", "Finishing and inspection", "After build services"],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
];

// Grocery page process cards (Figma "Grocery" frame, node 298:4919): same card
// shape, sage / sage-dark colourway, cream text throughout.
export const groceryProcessCards = [
  {
    id: "design",
    title: "Design",
    href: "/services/grocery",
    image: "/images/figma/home-service/grocery-design-photo.png",
    points: ["Site survey", "Planning", "Layout", "Realistic Renders", "Estimate & Finalization"],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
  },
  {
    id: "supply",
    title: "Supply",
    href: "/services/grocery",
    image: "/images/figma/home-service/grocery-supply-photo.png",
    points: ["Supply planning", "In-house fabrication", "Global Sourcing", "Quality control", "Delivery"],
    bgClass: "bg-sage",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
  {
    id: "build",
    title: "Build",
    href: "/services/grocery",
    image: "/images/figma/home-service/grocery-build-photo.png",
    points: ["Pre-build Planning", "Coordination", "Installation", "Finishing and inspection", "After build services"],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
  },
];

// Branding / Management cards (Figma "Vector" 628.455 x 782.425).
export const specialtyCards = [
  {
    id: "branding",
    showcase: true,
    eyebrow: "",
    title: "Branding",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/#contact",
    image: "/images/figma/specialty/branding-photo.webp",
    images: [
      { src: "/images/figma/specialty/branding-photo-board.png" },
      { src: "/images/figma/specialty/branding-photo-checkout.png" },
      { src: "/images/figma/specialty/branding-photo-interior.png", position: "center 75%" },
    ],
    imagePosition: "center top",
    points: [
      "Brand identity",
      "Store concept",
      "Custom signage and graphics",
      "Colors, materials and finishes",
      "Consistent brand executions",

    ],
    bgClass: "bg-forest",
  },
  {
    id: "management",
    showcase: true,
    eyebrow: "",
    title: "Project Management",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/#contact",
    image: "/images/figma/specialty/management-photo.webp",
    images: [
      { src: "/images/figma/specialty/management-photo.webp" },
      { src: "/images/figma/specialty/branding-photo-blueprint.png" },
      { src: "/images/figma/specialty/branding-photo-team.png" },
    ],
    points: [
      "Dedicated project manager",
      "Planning and scheduling",
      "Team coordination",
      "Logistics and installation",
      "Communication and progress updates",
    ],
    bgClass: "bg-sage-dark",
  },
];

// C-store page branding / management cards (Figma "C Store" frame, node
// 294:4322): same card shape as the homepage version, but gold/coral colourway
// and the Prince Market branding board + jobsite blueprint photos.
export const cStoreSpecialtyCards = [
  {
    id: "branding",
    eyebrow: "Project",
    title: "Branding",
    href: "/#contact",
    image: "/images/figma/specialty/cstore-branding-photo.png",
    points: [
      "Brand identity",
      "Store concept",
      "Custom signage and graphics",
      "Colors, materials and finishes",
      "Consistent brand executions",
    ],
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-cream",
  },
  {
    id: "management",
    eyebrow: "Project",
    title: "Management",
    href: "/#contact",
    image: "/images/figma/specialty/cstore-management-photo.png",
    points: [
      "Dedicated project manager",
      "Planning and scheduling",
      "Team coordination",
      "Logistics and installation",
      "Communication and progress updates",
    ],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-gold text-sage-dark",
  },
];

// Truck-stops page branding / management cards (Figma "Truck stops" frame,
// node 298:4754): coral/sage-dark colourway, cream text throughout.
export const truckStopsSpecialtyCards = [
  {
    id: "branding",
    eyebrow: "Project",
    title: "Branding",
    href: "/#contact",
    image: "/images/figma/specialty/truck-branding-photo.png",
    points: [
      "Brand identity",
      "Store concept",
      "Custom signage and graphics",
      "Colors, materials and finishes",
      "Consistent brand executions",
    ],
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
  {
    id: "management",
    eyebrow: "Project",
    title: "Management",
    href: "/#contact",
    image: "/images/figma/specialty/truck-management-photo.png",
    points: [
      "Dedicated project manager",
      "Planning and scheduling",
      "Team coordination",
      "Logistics and installation",
      "Communication and progress updates",
    ],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-coral text-cream",
  },
];

// Grocery page branding / management cards (Figma "Grocery" frame, node
// 298:5186): sage/sage-dark colourway, cream text throughout.
export const grocerySpecialtyCards = [
  {
    id: "branding",
    eyebrow: "Project",
    title: "Branding",
    href: "/#contact",
    image: "/images/figma/specialty/grocery-branding-photo.png",
    points: [
      "Brand identity",
      "Store concept",
      "Custom signage and graphics",
      "Colors, materials and finishes",
      "Consistent brand executions",
    ],
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
  },
  {
    id: "management",
    eyebrow: "Project",
    title: "Management",
    href: "/#contact",
    image: "/images/figma/specialty/grocery-management-photo.png",
    points: [
      "Dedicated project manager",
      "Planning and scheduling",
      "Team coordination",
      "Logistics and installation",
      "Communication and progress updates",
    ],
    bgClass: "bg-sage",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
];

/** NACS 2026 banner (Figma "Tlines-NACS-Web-Ad-Fo-store-maker", 1592 x 411). */
export const boothBanner = {
  exhibitorLine: "Official Exhibitor at",
  showName: "NACS 2026",
  /** Exact Figma lettering for the two title lines (coral "C"), 395 x 103. */
  titleArt: "/images/nacs/title.svg",
  boothLabel: "Booth no.",
  boothNumber: "N3276",
  /** Opens this booth on the NACS 2026 floor plan when the banner is clicked. */
  boothUrl: "https://nacs26.mapyourshow.com/8_0/floorplan/?selectedBooth=booth%7EN3276",
  location: "Las Vegas Convention Center",
  dates: "October 6-9, 2026",
  /** Looping booth animation (Figma video layer), 1200 x 600, plus its first frame for reduced motion. */
  boothAnimation: "/images/nacs/booth.gif",
  boothStill: "/images/nacs/booth-still.webp",
  boothAlt: "Rendering of the T Lines Store Maker booth: orange and green stand with a bar counter, stools and seating",
};

export const virtualTours = {
  heading: "Come take a live 360 tour!",
  /** `matterportId` is the `m=` value of the Matterport show URL; opened in an on-site modal. */
  /** Titles come from each Matterport page; images are their thumbnails, saved in /images/tours. */
  tours: [
    { matterportId: "h2hLiZUABXB", title: "P 7 - 2228 SR-155" },
    { matterportId: "38rg3wpJVge", title: "Prince Market" },
    { matterportId: "nGJobHHLxJK", title: "UK Truck Stop" },
    { matterportId: "iMa2bmKavzR", title: "6264 Melton Rd" },
    { matterportId: "BUWrenRLLHk", title: "3010 Ball Ground Hwy" },
  ].map(({ matterportId, title }) => ({
    id: matterportId,
    title,
    image: `/images/tours/${matterportId}.jpg`,
    matterportId,
  })),
};

export const members = {
  heading: "Members at",
  strip: "/images/figma/homepage-members-strip-forest.png",
  alt: "NACS, NATSO, The NGA Show, M-PACT, HRA, NYACS, AASOA, and VAASOA",
  logos: [
    { src: "/images/figma/members/member-01-nacs.svg", width: 1807, height: 786 },
    { src: "/images/figma/members/member-02-natso.svg", width: 1900, height: 505 },
    { src: "/images/figma/members/member-03-nga.svg", width: 1919, height: 692 },
    { src: "/images/figma/members/member-04-mpact.svg", width: 1054, height: 992 },
    { src: "/images/figma/members/member-05-hra.svg", width: 1074, height: 1019 },
    { src: "/images/figma/members/member-06-nyacs.svg", width: 2080, height: 717 },
    { src: "/images/figma/members/member-07-aasoa.svg", width: 1760, height: 786 },
    { src: "/images/figma/members/member-08-vaasoa.svg", width: 2012, height: 505 },
  ],
};

/** "Let's Get Started" band (Figma 298:5425, 1592 x 301). */
export const getStarted = {
  title: "Let’s Get Started",
  // "\n" = the Figma line break (shown from lg up; phones wrap freely).
  description: "Start by sending us your business information\nand let’s get started with your projects.",
  action: { label: "Request a Consultation", href: "/contact" },
};

export const promoCards = [
  {
    id: "c-store",
    title: "C-store",
    description: "Get 5% off all your projects discussed with our team at the booth.",
    href: "/services/c-store",
    image: "/images/figma/card-cstore.webp",
    leafShape: "/images/figma/leaf-shape-gold.svg",
    buttonShape: "/images/figma/see-more-arrow-bg-1.svg",
    textTone: "dark" as const,
  },
  {
    id: "truck-stops",
    title: "Truck stops",
    description: "Bring your project, Start with a complimentary initial store design.",
    href: "/services/truck-stops",
    image: "/images/figma/card-truck-stops.webp",
    leafShape: "/images/figma/leaf-shape-coral.svg",
    buttonShape: "/images/figma/see-more-arrow-bg-3.svg",
    textTone: "light" as const,
  },
  {
    id: "grocery",
    title: "Grocery",
    description: "Pick up your special gift at our booth while the supply lasts.",
    href: "/services/grocery",
    image: "/images/figma/card-grocery.webp",
    leafShape: "/images/figma/leaf-shape-coral.svg",
    buttonShape: "/images/figma/see-more-arrow-bg-2.svg",
    textTone: "light" as const,
  },
];

export const brandingShowcase = {
  heading: "Upcoming Events",
  verticalLabel: "Branding",
  slides: [
    { id: "branding-1", image: "/images/figma/branding-card-1.png", alt: "Branding and marketing collateral mockup" },
    { id: "branding-2", image: "/images/figma/branding-card-2.png", alt: "Branding and marketing collateral mockup" },
    { id: "branding-3", image: "/images/figma/branding-card-3.png", alt: "Branding and marketing collateral mockup" },
  ],
};

export const featuredProjects = {
  title: "Projects",
  tourHeading: "Come take a live 360 tour!",
  photos: [
    ...Array.from({ length: 10 }, (_, index) => ({
      id: `project-${index + 1}`,
      image: `/images/figma/project-grid-${String(index + 1).padStart(2, "0")}.webp`,
      alt: "Completed retail interior project",
    })),
  ],
};

const tileDir = "/images/figma/projects";
const tileV2 = `${tileDir}/v2`;

/**
 * Projects mosaic from the Figma "Projects" frame (1592 x 1091, node 183:8802),
 * laid out on a 30px outer margin with ~11px gutters. x / y / w / h are design
 * px in that frame. Every tile below is a direct Figma export (nodes
 * 183:87xx/88xx): pre-rendered in its exact chamfered outline with real alpha
 * transparency baked in, so none of them need a CSS `mask` — the shape comes
 * from the PNG itself.
 */
export const projectTiles: {
  id: string;
  image?: string;
  mask?: string;
  placeholder?: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  alt: string;
}[] = [
  { id: "placeholder-top-left", image: `${tileV2}/home-rect-4396.png`, placeholder: true, x: 30, y: 30, w: 490, h: 223 },
  { id: "coffee-bar", image: `${tileV2}/home-rect-4403.png`, x: 532, y: 30, w: 260, h: 275 },
  { id: "placeholder-top-center", image: `${tileV2}/home-rect-4405.png`, placeholder: true, x: 803, y: 30, w: 253, h: 278 },
  { id: "snack-aisle", image: `${tileV2}/home-rect-4397.png`, x: 1066, y: 30, w: 264, h: 223 },
  { id: "checkout-lanes", image: `${tileV2}/home-rect-4400.png`, x: 1342, y: 30, w: 217, h: 223 },
  { id: "coffee-counter", image: `${tileV2}/vector-1-3.webp`, x: 30, y: 263, w: 243, h: 241 },
  { id: "island-counter", image: `${tileV2}/vector-3.webp`, x: 285, y: 263, w: 236, h: 241 },
  { id: "placeholder-right", image: `${tileV2}/home-rect-4401.png`, placeholder: true, x: 1066, y: 263, w: 491, h: 241 },
  { id: "uk-market", image: `${tileV2}/home-rect-4399.png`, x: 30, y: 516, w: 489, h: 223 },
  { id: "welcome", image: `${tileV2}/home-rect-4404.png`, x: 532, y: 449, w: 260, h: 300 },
  { id: "cafe-seating", image: `${tileV2}/home-rect-4406.png`, x: 803, y: 449, w: 250, h: 303 },
  { id: "checkout", image: `${tileV2}/home-rect-4398.png`, x: 1066, y: 516, w: 265, h: 223 },
  { id: "on-the-go", image: `${tileV2}/home-rect-4402.png`, x: 1342, y: 516, w: 218, h: 223 },
].map((tile) => ({ ...tile, alt: "Completed T Lines retail project" }));

/**
 * Every 2s, three random Projects-mosaic tiles get one of these labels laid
 * over their existing photo (never swapped) — see RotatingServiceTiles. Each
 * store type keeps its own identity colour as the scrim behind its label,
 * regardless of which page the mosaic is on.
 */
export const serviceTypeTiles = [
  { id: "c-store", label: "C-Store", href: "/services/c-store", tintClass: "bg-gold" },
  { id: "truck-stops", label: "Truck Stops", href: "/services/truck-stops", tintClass: "bg-coral" },
  { id: "grocery", label: "Grocery", href: "/services/grocery", tintClass: "bg-sage-dark" },
];

export const projectsLayout = {
  frame: { w: 1592, h: 1091 },
  /** Forest label (Figma vector 523 x 134) over the middle of the mosaic. */
  label: { src: `${tileV2}/projects-label.svg`, x: 533, y: 310, w: 523, h: 134 },
  /** "Come take a live 360 tour!" tab sitting on the tour frame. */
  tourTab: { x: 533, y: 821, w: 528, h: 55 },
  /** Forest frame holding five tour tiles, 15px padding and gaps. */
  tourFrame: { x: 143, y: 876, w: 1278, h: 179, pad: 15, gap: 15 },
};

// C-store page Projects mosaic (Figma "C Store" frame, node 294:4080): same
// tiles/positions as the homepage, but the three placeholder tiles use this
// page's own coral-toned Figma exports instead of the homepage's photos.
// The three placeholder slots reuse the homepage's own photos directly (no
// per-page override) — only the other tiles below get this page's own export.
export const cStoreProjectTiles = projectTiles;

export const cStoreProjectsLayout = {
  ...projectsLayout,
  label: { ...projectsLayout.label, src: `${tileV2}/projects-label-coral.svg` },
};

// Truck-stops page Projects mosaic (Figma "Truck stops" frame, node 298:4512):
// same tiles/positions as the homepage, with this page's own photos. The three
// placeholder slots reuse the homepage's own photos directly (not overridden
// here) so they always match the homepage instead of sitting empty.
const truckStopsTileImages: Record<string, string> = {
  "snack-aisle": `${tileV2}/truck-rect-4397.png`,
  checkout: `${tileV2}/truck-rect-4398.png`,
  "uk-market": `${tileV2}/truck-rect-4399.png`,
  "checkout-lanes": `${tileV2}/truck-rect-4400.png`,
  "on-the-go": `${tileV2}/truck-rect-4402.png`,
  "coffee-bar": `${tileV2}/truck-rect-4403.png`,
  welcome: `${tileV2}/truck-rect-4404.png`,
  "cafe-seating": `${tileV2}/truck-rect-4406.png`,
};

export const truckStopsProjectTiles = projectTiles.map((tile) => {
  const image = truckStopsTileImages[tile.id];
  if (!image) return tile;
  const { mask: _mask, ...rest } = tile;
  return { ...rest, image };
});

export const truckStopsProjectsLayout = {
  ...projectsLayout,
  label: { ...projectsLayout.label, src: `${tileV2}/projects-label-sage-dark.svg` },
};

// Grocery page Projects mosaic (Figma "Grocery" frame, node 298:4944): same
// tiles/positions as the homepage, with this page's own photos. The three
// placeholder slots reuse the homepage's own photos directly (not overridden
// here) so they always match the homepage instead of sitting empty.
const groceryTileImages: Record<string, string> = {
  "snack-aisle": `${tileV2}/grocery-rect-4397.png`,
  checkout: `${tileV2}/grocery-rect-4398.png`,
  "uk-market": `${tileV2}/grocery-rect-4399.png`,
  "checkout-lanes": `${tileV2}/grocery-rect-4400.png`,
  "on-the-go": `${tileV2}/grocery-rect-4402.png`,
  "coffee-bar": `${tileV2}/grocery-rect-4403.png`,
  welcome: `${tileV2}/grocery-rect-4404.png`,
  "cafe-seating": `${tileV2}/grocery-rect-4406.png`,
};

export const groceryProjectTiles = projectTiles.map((tile) => {
  const image = groceryTileImages[tile.id];
  if (!image) return tile;
  const { mask: _mask, ...rest } = tile;
  return { ...rest, image };
});

export const groceryProjectsLayout = {
  ...projectsLayout,
  label: { ...projectsLayout.label, src: `${tileV2}/projects-label-sage.svg` },
};

export const contactCTAs = [
  {
    id: "get-started",
    title: "Let's Get Started",
    description: "Start by sending us your business information and let's get started with your projects.",
    action: startProjectAction,
    buttonShape: "/images/figma/contact-cta-button-bg-1.svg",
  },
  {
    id: "not-sure",
    title: "Still not sure?",
    description: "Feel free to contact us if you have any questions.",
    action: contactAction,
    buttonShape: "/images/figma/contact-cta-button-bg-2.svg",
  },
];

export const footer = {
  logo: { src: "/images/figma/footer-logo-lockup.png", alt: "T Lines Creativity Group", href: "/#home" },
  brandPills: [
    {
      id: "store-maker",
      href: "/",
      bgClass: "bg-forest",
      logo: { src: "/images/figma/topbar-logo-cream.svg", alt: "T Lines Store Maker", width: 388, height: 95 },
    },
    {
      id: "premium-fitouts",
      href: "/contact",
      bgClass: "bg-[#482e4f]",
      logo: { src: "/images/figma/footer-brand-fitouts.png", alt: "T Lines Premium Store fitouts", width: 157, height: 49 },
    },
    {
      id: "design-build",
      href: "/contact",
      bgClass: "bg-[#334a64]",
      logo: { src: "/images/figma/footer-brand-designbuild.svg", alt: "T Lines Design & Build", width: 146, height: 41 },
    },
  ],
  newsletter: { heading: ["Subscribe to", "our Newsletter."], placeholder: "Submit your email" },
  followLabel: "Follow us on",
  columns: [
    {
      id: "stores",
      heading: "Stores",
      links: [
        { id: "c-store", label: "C-store", href: "/services/c-store" },
        { id: "truck-stops", label: "Truck Stops", href: "/services/truck-stops" },
        { id: "grocery", label: "Grocery", href: "/services/grocery" },
      ],
    },
    {
      id: "works",
      heading: "Works",
      links: [
        { id: "projects", label: "Projects", href: "/projects" },
        { id: "branding", label: "Branding", href: "/#contact" },
        { id: "management", label: "Management", href: "/#contact" },
      ],
    },
    {
      id: "news",
      heading: "News",
      links: [
        { id: "news", label: "News", href: "/news" },
        { id: "blog", label: "Blog", href: "/blog" },
        { id: "events", label: "Events", href: "/events" },
      ],
    },
    {
      id: "about",
      heading: "About us",
      links: [
        { id: "our-mission", label: "Our Mission", href: "/about#our-mission" },
        { id: "our-goal", label: "Our Goal", href: "/about#our-mission" },
      ],
    },
  ],
  locations: [{ label: "Atalanta, Georgia (GA)", href: "/contact" }],
  callUsHeading: "Call us",
  phoneNumbers: ["800-660-3772"],
  copyright: "All rights are reserved for TLines 2026",
};

/** Contact page ("Contact us" Figma frame). */
export const contactPage = {
  heading: ["Your Project", "Starts Here"],
  heroImage: "/images/figma/card-grocery.webp",
  mascot: "/images/contact/project-mascot.svg",
  intro:
    "",
  email: "info@tlines.us",
  visitHeading: ["Building", "C-stores", "Nationwide"],
};

export type HeadquarterId = "southeast" | "southwest" | "northeast";

/**
 * Regional offices shown on the contact-page map, in carousel order.
 * Only South East has full details in the Figma file; South West and North East
 * use the footer cities with the main line until their details are supplied.
 */
export const headquarters: {
  id: HeadquarterId;
  title: string;
  label: string;
  address: string[];
  hours: string[];
  phone: string;
  email: string;
}[] = [
    {
      id: "southeast",
      title: "Main Head\nQuarter (HQ)",
      label: "South East HQ",
      address: ["1422 Woodmont Lane #4", "Atlanta, GA"],
      hours: ["Monday–Friday", "9am–5pm"],
      phone: "+1 (201) 800-4317",
      email: "al@tlines.us",
    },
    {
      id: "southwest",
      title: "South West Region",
      label: "South West HQ",
      address: ["Phoenix, AZ"],
      hours: ["Monday–Friday", "9am–5pm"],
      phone: "800-660-3772",
      email: "info@tlines.us",
    },
    {
      id: "northeast",
      title: "North East Region",
      label: "North East HQ",
      address: ["Milford, CT"],
      hours: ["Monday–Friday", "9am–5pm"],
      phone: "800-660-3772",
      email: "info@tlines.us",
    },
  ];

/**
 * Blog & News page header. Edited from the ERP (web_settings key "blog_page");
 * these values only show until a row is saved there.
 */
export const blogPage = {
  eyebrow: "Tlines Journal",
  heading: "Blog & News",
  description: "",
  heroImage: "/images/figma/card-grocery.webp",
  pageSize: 6,
};

export const blogCategories = [
  { id: "industry-news", label: "Industry News" },
  { id: "tips-and-tricks", label: "Tips & Tricks" },
  { id: "success-stories", label: "Success Stories" },
  { id: "company-updates", label: "Company Updates" },
] as const;

export type BlogCategoryId = (typeof blogCategories)[number]["id"];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  date: string; // ISO yyyy-mm-dd
  author: string;
  image: string;
  imageAlt: string;
}

/** Projects gallery page ("Projects" Figma frame): journal-style hero, category filter, framed photo cards. */
/**
 * Projects page header. Edited from the ERP (web_settings key "projects_page");
 * these values only show until a row is saved there.
 */
export const projectsPage = {
  eyebrow: "Tlines Gallery",
  heading: "Projects",
  description: "",
  heroImage: "/images/figma/card-grocery.webp",
};

/** Gallery categories; `tone` colours the filter pill, card frame and location label. */
export const projectCategories = [
  { id: "c-store", label: "C-store", tone: "gold" },
  { id: "truck-stops", label: "Truck Stops", tone: "coral" },
  { id: "grocery", label: "Grocery", tone: "sage" },
] as const;

export type ProjectCategoryId = (typeof projectCategories)[number]["id"];

export interface GalleryProject {
  id: string;
  category: ProjectCategoryId;
  /** Location label on the card, e.g. "Milford, CT, USA". */
  location: string;
  image: string;
  alt: string;
  title: string;
  /** Ids of the kinds of work done on the project (see `WorkType`). */
  workTypes: string[];
}

/**
 * Kinds of work a project can include (Figma node 650:10316): the tile panel on the
 * Projects page filters by these, and each project lists the ones it covered.
 * The ERP owns the real list (table web_work_types, see supabase/ERP-BRIDGE.md);
 * these six are the defaults shown until it supplies its own.
 */
export interface WorkType {
  id: string;
  label: string;
  /** Cream icon on a transparent background (SVG or PNG). */
  icon: string;
}

const workTypeIcons = "/images/projects/work-types";
export const projectWorkTypes: WorkType[] = [
  { id: "ceiling-fixtures", label: "Ceiling fixtures", icon: `${workTypeIcons}/ceiling-fixtures.svg` },
  { id: "shelving", label: "Shelving", icon: `${workTypeIcons}/shelving.svg` },
  { id: "mill-work", label: "Mill-work", icon: `${workTypeIcons}/mill-work.svg` },
  { id: "branding", label: "Branding", icon: `${workTypeIcons}/branding.svg` },
  { id: "signage", label: "Signage", icon: `${workTypeIcons}/signage.svg` },
  { id: "furniture", label: "Furniture", icon: `${workTypeIcons}/furniture.svg` },
];

/** Fallback for the project page "Type" when the ERP leaves it empty. */
export const projectDetailType: Record<ProjectCategoryId, string> = {
  "c-store": "C Store Remodel",
  "truck-stops": "Truck Stop Remodel",
  grocery: "Grocery Remodel",
};

/** About us page ("About us" Figma frame, 1592 wide). */
const aboutLorem =
  "";

export const aboutPage = {
  hero: {
    image: "/images/about/hero-beverages.webp",
    imageAlt: "Store signage installation: large BEVERAGES letters on a wood-slat wall",
    // Rendered as: QUALITY / IS THE KEY ("IS THE" in the lighter 50px style).
    headingLines: ["Quality", "is the", "key"],
  },
  story: {
    title: "Our Story",
    // Placeholder still until the story video and its poster frame are supplied.
    poster: "/images/figma/hero-photo.png",
    posterAlt: "T Lines mascot planning a store layout at a drafting table",
    /** MP4/WebM of the story video; the play button only appears once this is set. */
    video: null as string | null,
  },
  mission: {
    title: "Our Mission",
    // Placeholder copy from the Figma frame until the real mission text is written.
    paragraphs: [
      "",
      "",
    ],
    image: "/images/about/mission-store.svg",
    imageAlt: "C-store aisles with snack shelving and drinks coolers",
  },
  exhibitors: {
    title: "Official Exhibitors",
    // Figma "Frame 427319140" (1285 x 267): two rows of four coral logos, exported as one SVG.
    logos: { src: "/images/about/exhibitors/exhibitors-logos.svg", width: 1285, height: 267, alt: "Official exhibitors: NACS, NATSO, M-PACT, The NGA Show 2026, HRA, NYACS, AASOA, VAASOA" },
  },
  vision: {
    title: "Our Vision",
    // Copy still to be written; mirrors the Our Mission layout.
    paragraphs: ["", ""],
    image: "/images/about/vision-store.svg",
    imageAlt: "C-store aisles with snack shelving and drinks coolers",
  },
  partners: {
    title: "Our Partners",
    // Figma "Frame 427319141" (1252 x 734): 5-column grid of sage partner logos, exported as one SVG.
    logos: { src: "/images/about/partners/partners-logos.svg", width: 1252, height: 734, alt: "Our partners: Grand’s, Max’s, Adam’s, Rams, LiveOak, Mogos, Your Choice, Travel Center, SNK, Prince Market, On the Go Market, V-Go, United Market, Eagle Nest, University Korner, Bonfare, Refresh Travel Plaza, TA, Pilot, Chestnut Market, Teddy’s Market, Brew" },
  },
  members: {
    title: "Members at",
    logos: [
      { name: "NACS", src: "/images/about/members/nacs.svg", width: 207, height: 56 },
      { name: "NATSO", src: "/images/about/members/natso.svg", width: 219, height: 56 },
      { name: "M-PACT", src: "/images/about/members/mpact.svg", width: 193, height: 84 },
      { name: "The NGA Show 2026", src: "/images/about/members/nga.svg", width: 201, height: 84 },
    ],
  },
  testimonials: {
    title: "Testimonials",
    // Placeholder quotes from the Figma frame until real client testimonials are supplied.
    items: Array.from({ length: 5 }, (_, index) => ({
      id: `testimonial-${index + 1}`,
      quote: aboutLorem,
      author: "Lorem ipsum do.",
    })),
  },
  trustedBy: {
    title: "Trusted by",
    /**
     * Figma "Trusted by" band (1592 x 707): two rows of #547255 logos at their
     * native Figma sizes. Prince Market has no standalone export yet, so it is cut
     * from the cream client strip and tinted (`tint: true`).
     */
    rows: [
      [
        { name: "Prince Market", src: "/images/about/clients/prince-market.svg", width: 142, height: 65, tint: true },
        { name: "Teddy’s Market", src: "/images/about/clients/teddys-market.svg", width: 306, height: 62 },
        { name: "Speedy", src: "/images/about/clients/speedy.svg", width: 304, height: 61 },
      ],
      [
        { name: "TA (TravelCenters of America)", src: "/images/about/clients/ta.svg", width: 107, height: 76 },
        { name: "Pilot", src: "/images/about/clients/pilot.svg", width: 157, height: 67 },
        { name: "Gauge", src: "/images/about/clients/gauge.svg", width: 101, height: 101 },
        { name: "Brew", src: "/images/about/clients/brew.svg", width: 150, height: 76 },
        { name: "Chestnut Market", src: "/images/about/clients/chestnut-market.svg", width: 130, height: 100 },
      ],
    ] as { name: string; src: string; width: number; height: number; tint?: boolean }[][],
  },
};
