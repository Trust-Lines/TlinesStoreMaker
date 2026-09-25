// Content for the homepage, matching the Tlines Figma frame (node 16:605).

export const navItems = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "work", label: "Work", href: "/#projects" },
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

export const homeHero = {
  heading: "Planning your store",
  backgroundImage: "/images/figma/hero-photo.png",
  imageAlt: "T Lines mascot planning a store layout at a drafting table",
  action: startProjectAction,
  clients: {
    src: "/images/figma/clients/clients-strip.svg",
    width: 1705,
    height: 50,
    names: ["TA (TravelCenters of America)", "Prince Market", "Pilot", "Teddy’s Market", "Speedy", "Brew", "Chestnut Market"],
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
      "Efficient layouts",
      "Striking interiors",
      "Inviting store designs",
      "Improved customer traffic",
      "Enhanced visibility",
      "Increased sales",
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
      "Modern truck stops",
      "Easier navigation",
      "Smoother operations",
      "Comfortable customer visits",
      "Practical designs",
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
    points: ["Functional layouts", "Engaging displays", "Thoughtful details", "Modern market design"],
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
    eyebrow: "Project",
    title: "Branding",
    href: "/#contact",
    image: "/images/figma/specialty/branding-photo.webp",
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
    eyebrow: "Project",
    title: "Management",
    href: "/#contact",
    image: "/images/figma/specialty/management-photo.webp",
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
  location: "Las Vegas Convention Center",
  dates: "October 6-9, 2026",
  /** Looping booth animation (Figma video layer), 1200 x 600, plus its first frame for reduced motion. */
  boothAnimation: "/images/nacs/booth.gif",
  boothStill: "/images/nacs/booth-still.webp",
  boothAlt: "Rendering of the T Lines Store Maker booth: orange and green stand with a bar counter, stools and seating",
};

export const virtualTours = {
  heading: "Come take a live 360 tour!",
  tours: Array.from({ length: 5 }, (_, index) => ({
    id: `tour-${index + 1}`,
    title: `360 tour ${index + 1}`,
    image: "/images/figma/project-grid-03.webp",
    href: "/work",
  })),
};

export const members = {
  heading: "Members at",
  strip: "/images/figma/homepage-members-strip-forest.png",
  alt: "NATSO, M-PACT, The NGA Show, and NACS",
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
  tourTab: { x: 533, y: 818, w: 528, h: 58 },
  /** Forest frame holding five tour tiles, 15px padding and gaps. */
  tourFrame: { x: 138, y: 876, w: 1314, h: 179, pad: 15, gap: 15 },
  /**
   * Below lg ("Project Mobile" frame): rows alternating one wide tile and a
   * pair, placeholders left out. Tiles in a row share one height (each grows by
   * its w/h ratio). `mask` + `ratio` reshape a masked tile into a wide one.
   */
  mobileRows: [
    [{ id: "uk-market" }],
    [{ id: "coffee-counter" }, { id: "island-counter" }],
    [{ id: "checkout", mask: `${tileDir}/rectangle-4399-mask.svg`, ratio: 489 / 223 }],
    [{ id: "coffee-bar" }, { id: "cafe-seating" }],
    [{ id: "welcome", mask: `${tileDir}/rectangle-4396-mask.svg`, ratio: 489 / 223 }],
    [{ id: "snack-aisle" }, { id: "checkout-lanes" }, { id: "on-the-go" }],
  ] as { id: string; mask?: string; ratio?: number }[][],
};

// C-store page Projects mosaic (Figma "C Store" frame, node 294:4080): same
// tiles/positions as the homepage, but the three placeholder tiles use this
// page's own coral-toned Figma exports instead of the homepage's photos.
const cStorePlaceholderImages: Record<string, string> = {
  "placeholder-top-left": `${tileV2}/rect-4396-coral.png`,
  "placeholder-top-center": `${tileV2}/rect-4405-coral.png`,
  "placeholder-right": `${tileV2}/rect-4401-coral.png`,
};

export const cStoreProjectTiles = projectTiles.map((tile) => {
  const image = cStorePlaceholderImages[tile.id];
  return image ? { ...tile, image } : tile;
});

export const cStoreProjectsLayout = {
  ...projectsLayout,
  label: { ...projectsLayout.label, src: `${tileV2}/projects-label-coral.svg` },
};

// Truck-stops page Projects mosaic (Figma "Truck stops" frame, node 298:4512):
// same tiles/positions as the homepage, with this page's own photos (11 of the
// 13 slots have a dedicated Figma export; "coffee-counter" and "island-counter"
// keep the homepage photo, same as the c-store page).
const truckStopsTileImages: Record<string, string> = {
  "placeholder-top-left": `${tileV2}/truck-rect-4396.png`,
  "snack-aisle": `${tileV2}/truck-rect-4397.png`,
  checkout: `${tileV2}/truck-rect-4398.png`,
  "uk-market": `${tileV2}/truck-rect-4399.png`,
  "checkout-lanes": `${tileV2}/truck-rect-4400.png`,
  "placeholder-right": `${tileV2}/truck-rect-4401.png`,
  "on-the-go": `${tileV2}/truck-rect-4402.png`,
  "coffee-bar": `${tileV2}/truck-rect-4403.png`,
  welcome: `${tileV2}/truck-rect-4404.png`,
  "placeholder-top-center": `${tileV2}/truck-rect-4405.png`,
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
// tiles/positions as the homepage, with this page's own photos (11 of the 13
// slots have a dedicated Figma export; "coffee-counter" and "island-counter"
// keep the homepage photo, same as the other two service pages).
const groceryTileImages: Record<string, string> = {
  "placeholder-top-left": `${tileV2}/grocery-rect-4396.png`,
  "snack-aisle": `${tileV2}/grocery-rect-4397.png`,
  checkout: `${tileV2}/grocery-rect-4398.png`,
  "uk-market": `${tileV2}/grocery-rect-4399.png`,
  "checkout-lanes": `${tileV2}/grocery-rect-4400.png`,
  "placeholder-right": `${tileV2}/grocery-rect-4401.png`,
  "on-the-go": `${tileV2}/grocery-rect-4402.png`,
  "coffee-bar": `${tileV2}/grocery-rect-4403.png`,
  welcome: `${tileV2}/grocery-rect-4404.png`,
  "placeholder-top-center": `${tileV2}/grocery-rect-4405.png`,
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
  logo,
  tagline: ["Design.", "Production.", "Installation."],
  emailAction: { label: "Send us an email", href: "mailto:hello@tlines.com" },
  followLabel: "Follow us on:",
  columns: [
    {
      id: "menu",
      heading: "Menu",
      links: [
        { id: "home", label: "Home", href: "/#home" },
        { id: "work", label: "Work", href: "/#projects" },
        { id: "news", label: "News", href: "/news" },
        { id: "about", label: "About us", href: "/about" },
      ],
    },
    {
      id: "news",
      heading: "News",
      links: [
        { id: "latest-news", label: "Latest News", href: "/news" },
        { id: "blog", label: "Blog", href: "/blog" },
        { id: "events", label: "Events", href: "/events" },
      ],
    },
    {
      id: "work",
      heading: "Work",
      links: [
        { id: "project", label: "Project", href: "/#projects" },
        { id: "services", label: "Services", href: "/#services" },
        { id: "designs", label: "Designs", href: "/work/designs" },
      ],
    },
    {
      id: "about",
      heading: "About us",
      links: [
        { id: "history", label: "History", href: "/about/history" },
        { id: "creativity-group", label: "Creativity group", href: "/about/creativity-group" },
        { id: "designs", label: "Designs", href: "/about/designs" },
      ],
    },
  ],
  callUsHeading: "Call us",
  phoneNumbers: ["800-660-3772"],
  copyright: "All rights are reserved for TLines 2026",
};

/** Contact page ("Contact us" Figma frame). */
export const contactPage = {
  heading: "Contact us",
  heroImage: "/images/figma/card-grocery.webp",
  phone: "800 660 3772",
  email: "info@tlines.us",
  socials: [
    { label: "Instagram", href: "/contact", icon: "/images/figma/social-icon-1.svg" },
    { label: "YouTube", href: "/contact", icon: "/images/figma/social-icon-2.svg" },
    { label: "LinkedIn", href: "/contact", icon: "/images/figma/social-icon-3.svg" },
  ],
  visitHeading: ["Visit us at", "Our headquarters"],
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
      title: "South East Region (HQ)",
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

/** Blog & News page ("Blog" Figma frame). */
export const blogPage = {
  eyebrow: "Tlines Journal",
  heading: "Blog & News",
  description:
    "Explore our crafted journals detailing raw ingredients, botanical sourcing, sustainable glass design, and modern beverage heritage.",
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
}

// Placeholder posts from the Figma frame (copy and authors as designed; photos
// borrowed from the project gallery) until real articles are written.
const designPosts: BlogPost[] = [
  {
    slug: "art-of-slow-fermentation-in-craft-soda",
    title: "The Art of Slow Fermentation in Craft Soda",
    excerpt:
      "How extending fermentation cycles allows natural botanicals to develop deeper, more complex flavor profiles without artificial additives.",
    category: "tips-and-tricks",
    date: "2026-03-12",
    author: "Elena Rostova",
    image: "/images/figma/projects/rectangle-4400.webp",
  },
  {
    slug: "reviving-ancient-herbal-recipes",
    title: "Reviving Ancient Herbal Recipes for Modern Palates",
    excerpt:
      "Exploring the 19th-century wellness elixirs that are inspiring today’s premium functional beverage revolution.",
    category: "industry-news",
    date: "2026-03-05",
    author: "Marcus Vance",
    image: "/images/figma/projects/rectangle-4403.webp",
  },
  {
    slug: "designing-sustainable-glass-packaging",
    title: "Behind the Label: Designing Sustainable Glass Packaging",
    excerpt:
      "A deep dive into our new lightweight, infinitely recyclable glass bottles and the zero-emission kiln project.",
    category: "company-updates",
    date: "2026-03-01",
    author: "Sara Takahashi",
    image: "/images/figma/projects/rectangle-4397.webp",
  },
  {
    slug: "soil-health-controls-botanical-quality",
    title: "Earthy Notes: Why Soil Health Controls Botanical Quality",
    excerpt:
      "Partnering with regenerative organic farms across the valley to source resilient elderberry and wild ginger.",
    category: "success-stories",
    date: "2026-02-24",
    author: "Elena Rostova",
    image: "/images/figma/projects/rectangle-4406.webp",
  },
  {
    slug: "non-alcoholic-aperitifs-for-spring",
    title: "Perfect Pairing: Non-Alcoholic Aperitifs for Spring",
    excerpt:
      "Deconstruct the bitter-sweet harmony of roots and citrus peels to elevate your seasonal hosting menu.",
    category: "tips-and-tricks",
    date: "2026-02-18",
    author: "Julian Mercer",
    image: "/images/figma/card-grocery.webp",
  },
  {
    slug: "spring-aperitif-hosting-menu",
    title: "Perfect Pairing: Non-Alcoholic Aperitifs for Spring",
    excerpt:
      "Deconstruct the bitter-sweet harmony of roots and citrus peels to elevate your seasonal hosting menu.",
    category: "industry-news",
    date: "2026-02-10",
    author: "Julian Mercer",
    image: "/images/figma/projects/rectangle-4401.webp",
  },
];

// PLACEHOLDER FILL — remove once real articles exist. The Figma Blog frame shows
// three pages (6 cards each), so the six design posts are repeated with other
// photos and earlier weekly dates to fill pages 2 and 3.
const fillerPhotos = [
  "/images/figma/project-grid-08.webp",
  "/images/projects-gallery/cstore-uk-market.webp",
  "/images/figma/home-service/cstore-photo.webp",
  "/images/projects-gallery/truck-pizza-seating.webp",
  "/images/figma/project-grid-01.webp",
  "/images/projects-gallery/cstore-drinks-bar.webp",
  "/images/figma/card-truck-stops.webp",
  "/images/projects-gallery/grocery-fresh-aisles.webp",
  "/images/figma/projects/rectangle-4398.webp",
  "/images/projects-gallery/truck-drink-station.webp",
  "/images/figma/project-grid-02.webp",
  "/images/projects-gallery/cstore-checkout-lanes.webp",
];

const fillerPosts: BlogPost[] = fillerPhotos.map((image, index) => {
  const source = designPosts[index % designPosts.length];
  const date = new Date(Date.UTC(2026, 1, 3) - index * 7 * 24 * 60 * 60 * 1000); // weekly, back from 3 Feb 2026
  return { ...source, slug: `${source.slug}-${index + 2}`, image, date: date.toISOString().slice(0, 10) };
});

export const blogPosts: BlogPost[] = [...designPosts, ...fillerPosts];

/** Projects gallery page ("Projects" Figma frame): journal-style hero, category filter, framed photo cards. */
export const projectsPage = {
  eyebrow: "Tlines Gallery",
  heading: "Projects",
  description: blogPage.description,
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
  /** Location label on the card; the design shows "STATE, USA" as a placeholder. */
  location: string;
  image: string;
  alt: string;
}

const galleryDir = "/images/projects-gallery";

// Photos from the project library, grouped by store type as best judged from
// the images. Locations are the design's placeholder until real ones are supplied.
const galleryPhotos: Omit<GalleryProject, "location">[] = [
  { id: "speedy", category: "c-store", image: "/images/figma/project-grid-08.webp", alt: "Speedy c-store snack aisles" },
  { id: "island-counter", category: "c-store", image: "/images/figma/home-service/cstore-photo.webp", alt: "C-store island counter with wood panelling" },
  { id: "uk-market", category: "c-store", image: `${galleryDir}/cstore-uk-market.webp`, alt: "UK c-store checkout and coolers" },
  { id: "cashier", category: "c-store", image: "/images/figma/projects/rectangle-4398.webp", alt: "C-store cashier counter" },
  { id: "checkout-lanes", category: "c-store", image: `${galleryDir}/cstore-checkout-lanes.webp`, alt: "C-store checkout counter and shelving" },
  { id: "drinks-bar", category: "c-store", image: `${galleryDir}/cstore-drinks-bar.webp`, alt: "C-store fountain drinks bar" },
  { id: "dining-area", category: "truck-stops", image: "/images/figma/card-truck-stops.webp", alt: "Truck stop dining area" },
  { id: "food-court", category: "truck-stops", image: "/images/figma/project-grid-02.webp", alt: "Truck stop food court entrance" },
  { id: "pizza-seating", category: "truck-stops", image: `${galleryDir}/truck-pizza-seating.webp`, alt: "Truck stop pizza counter and seating" },
  { id: "drink-station", category: "truck-stops", image: `${galleryDir}/truck-drink-station.webp`, alt: "Truck stop frozen drink station" },
  { id: "pretzel-counter", category: "truck-stops", image: "/images/figma/projects/rectangle-4400.webp", alt: "Truck stop pretzel counter" },
  { id: "prince-market", category: "grocery", image: "/images/figma/project-grid-01.webp", alt: "Prince Market grocery aisles and checkout" },
  { id: "produce-tree", category: "grocery", image: "/images/figma/card-grocery.webp", alt: "Grocery produce area with a feature tree" },
  { id: "fresh-aisles", category: "grocery", image: `${galleryDir}/grocery-fresh-aisles.webp`, alt: "Grocery store aisles with fresh food signage" },
];

/**
 * Card order on "All" follows the Figma grid's colour rhythm — sage, gold /
 * sage, coral / gold, coral — i.e. the category pattern below, repeated until
 * every photo is placed (a slot is skipped once its category runs out).
 * Filtering by category keeps this order within the category.
 */
const galleryPattern: ProjectCategoryId[] = ["grocery", "c-store", "grocery", "truck-stops", "c-store", "truck-stops"];

function interleaveByPattern(photos: Omit<GalleryProject, "location">[]) {
  const queues = new Map(galleryPattern.map((id) => [id, photos.filter((photo) => photo.category === id)]));
  const ordered: Omit<GalleryProject, "location">[] = [];
  let placed = true;
  while (placed) {
    placed = false;
    for (const id of galleryPattern) {
      const next = queues.get(id)?.shift();
      if (next) {
        ordered.push(next);
        placed = true;
      }
    }
  }
  // Any category missing from the pattern goes at the end rather than being lost.
  return [...ordered, ...photos.filter((photo) => !galleryPattern.includes(photo.category))];
}

export const galleryProjects: GalleryProject[] = interleaveByPattern(galleryPhotos).map((project) => ({
  ...project,
  location: "State, USA",
}));

/** About us page ("About us" Figma frame, 1592 wide). */
const aboutLorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
    image: "/images/about/mission-store.svg",
    imageAlt: "C-store aisles with snack shelving and drinks coolers",
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
