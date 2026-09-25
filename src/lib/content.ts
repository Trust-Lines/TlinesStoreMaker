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

// Placeholder copy from the "CStore" Figma frame until final text is supplied.
const featureCopy = [
  "Lorem ipsum dolor sit amet consectetur adipiscing elit Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "sum dolor sit amet consectetur adipiscing elit Lorem.",
];

const featureSections = (images: [string, string, string]) => [
  { id: "services", title: "Services", paragraphs: featureCopy, image: images[0] },
  { id: "capabilities", title: "Capabilities", paragraphs: featureCopy, image: images[1] },
  { id: "business-process", title: "Business Process", paragraphs: featureCopy, image: images[2] },
];

/** Shape fill (bg-* class) and the ink (text-* class) drawn on it. */
export interface ShapeTone {
  fill: string;
  text: string;
}

/** Colourway of a service page: top bar tone plus the ribbon / text box tones. */
export interface ServiceTheme {
  topBar: "gold" | "coral" | "sage";
  heroRibbon: ShapeTone;
  titleRibbon: ShapeTone;
  textBox: ShapeTone;
}

const goldTheme: ServiceTheme = {
  topBar: "gold",
  heroRibbon: { fill: "bg-coral", text: "text-gold" },
  titleRibbon: { fill: "bg-coral", text: "text-gold" },
  textBox: { fill: "bg-gold", text: "text-forest" },
};

const coralTheme: ServiceTheme = {
  topBar: "coral",
  heroRibbon: { fill: "bg-sage-dark", text: "text-cream" },
  titleRibbon: { fill: "bg-sage-dark", text: "text-cream" },
  textBox: { fill: "bg-coral", text: "text-cream" },
};

const sageTheme: ServiceTheme = {
  topBar: "sage",
  heroRibbon: { fill: "bg-sage", text: "text-cream" },
  titleRibbon: { fill: "bg-sage", text: "text-cream" },
  textBox: { fill: "bg-sage-dark", text: "text-cream" },
};

/**
 * Service detail pages (/services/[slug]), keyed by serviceCards id. Layout from
 * the "CStore", "Truck Stops" and "Grocery" Figma frames (same layout, different colourway).
 */
export const serviceDetails: Record<
  string,
  { heroImage: string; theme: ServiceTheme; sections: ReturnType<typeof featureSections> }
> = {
  "c-store": {
    theme: goldTheme,
    heroImage: "/images/figma/card-cstore.webp",
    sections: featureSections([
      "/images/figma/projects/vector-1.webp",
      "/images/figma/projects/rectangle-4397.webp",
      "/images/figma/projects/rectangle-4398.webp",
    ]),
  },
  "truck-stops": {
    theme: coralTheme,
    heroImage: "/images/figma/card-truck-stops.webp",
    sections: featureSections([
      "/images/figma/project-grid-03.webp",
      "/images/figma/project-grid-05.webp",
      "/images/figma/project-grid-06.webp",
    ]),
  },
  grocery: {
    theme: sageTheme,
    heroImage: "/images/figma/project-grid-01.webp",
    sections: featureSections([
      "/images/figma/card-grocery.webp",
      "/images/figma/project-grid-04.webp",
      "/images/figma/project-grid-07.webp",
    ]),
  },
};

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

export const boothBanner = {
  boothLabel: "Booth No.",
  boothNumber: "N3276",
  exhibitorLine: "Official Exhibitor at",
  showName: "NACS SHOW 2026",
  illustration: "/images/figma/booth-room.webp",
  animatedAd: "/images/upcoming-events-banner.gif",
  stillAd: "/images/figma/nacs-banner-still.png",
  adAlt:
    "T Lines Store Maker, booth N3276, official exhibitor at NACS Show 2026. C-store solutions: claim your free design proposal.",
  action: { label: "Explore More", href: "/#contact" },
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
  description: "Start by sending us your business information and let’s get started with your projects.",
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
 * Projects mosaic from the Figma "Projects" frame (1592 x 1091), laid out on a
 * 30px outer margin with ~11px gutters. x / y / w / h are design px in that frame.
 * - Tiles from the Figma export (nodes 183:87xx/88xx) are pre-rendered in their
 *   exact outline (transparent corners), so they need no `mask`.
 * - `placeholder` tiles are the plain forest shapes in the design (not clickable).
 * - Tiles with a `mask` weren't in the export: an older photo in a borrowed
 *   outline until the real tile is supplied.
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
  { id: "placeholder-top-left", image: `${tileV2}/rect-4396.webp`, placeholder: true, x: 30, y: 30, w: 490, h: 223 },
  { id: "coffee-bar", image: `${tileV2}/rect-4403.webp`, x: 532, y: 30, w: 260, h: 275 },
  { id: "placeholder-top-center", mask: `${tileDir}/rectangle-4406-mask.svg`, placeholder: true, x: 803, y: 30, w: 253, h: 278 },
  { id: "snack-aisle", image: `${tileV2}/rect-4397.webp`, x: 1066, y: 30, w: 264, h: 223 },
  { id: "checkout-lanes", image: `${tileV2}/rect-4400.webp`, x: 1342, y: 30, w: 217, h: 223 },
  { id: "coffee-counter", image: `${tileV2}/vector-1-3.webp`, x: 30, y: 263, w: 243, h: 241 },
  { id: "island-counter", image: `${tileV2}/vector-3.webp`, x: 285, y: 263, w: 236, h: 241 },
  { id: "placeholder-right", image: `${tileV2}/rect-4401.webp`, placeholder: true, x: 1066, y: 263, w: 491, h: 241 },
  { id: "uk-market", image: `${tileV2}/rect-4399.webp`, x: 30, y: 516, w: 489, h: 223 },
  { id: "welcome", image: "/images/figma/project-grid-02.webp", mask: `${tileDir}/rectangle-4403-mask.svg`, x: 532, y: 449, w: 260, h: 300 },
  { id: "cafe-seating", image: `${tileV2}/rect-4406.webp`, x: 803, y: 449, w: 250, h: 303 },
  { id: "checkout", image: `${tileDir}/rectangle-4398.webp`, mask: `${tileDir}/rectangle-4398-mask.svg`, x: 1066, y: 516, w: 265, h: 223 },
  { id: "on-the-go", image: `${tileV2}/rect-4402.webp`, x: 1342, y: 516, w: 218, h: 223 },
].map((tile) => ({ ...tile, alt: "Completed T Lines retail project" }));

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
export const blogPosts: BlogPost[] = [
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

export const galleryProjects: GalleryProject[] = galleryPhotos.map((project) => ({ ...project, location: "State, USA" }));
