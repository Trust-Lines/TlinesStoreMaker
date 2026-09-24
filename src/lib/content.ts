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

const serviceBullets = ["Bring your project,", "Start with a complimentary initial store design."];

export const serviceCards = [
  {
    id: "c-store",
    title: "C-store",
    href: "/services/c-store",
    image: "/images/figma/project-grid-08.webp",
    bullets: serviceBullets,
    description:
      "From efficient layouts to striking interiors, we create inviting stores designed to improve traffic, visibility, and sales in your store.",
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-gold",
    ribbonShape: "/images/figma/ribbon-card-coral.svg",
    cardShape: "/images/figma/card-service.svg",
    ribbonInset: 2.094, // 8px of 382

  },
  {
    id: "truck-stops",
    title: "Truck stops",
    href: "/services/truck-stops",
    image: "/images/figma/project-grid-03.webp",
    bullets: serviceBullets,
    description:
      "We design modern truck stops that make navigation easier, operations smoother, and every customer visit more comfortable.",
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
    ribbonShape: "/images/figma/ribbon-card-green.svg",
    cardShape: "/images/figma/card-service.svg",
    ribbonInset: 1.772, // 6.77px of 382 (keeps the 50.01px gap to the C-store ribbon)

  },
  {
    id: "grocery",
    title: "Grocery",
    href: "/services/grocery",
    image: "/images/figma/card-grocery.webp",
    bullets: serviceBullets,
    description:
      "Functional layouts, engaging displays, and thoughtful details come together to create a better shopping experience.",
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
    ribbonShape: "/images/figma/ribbon-card-green.svg",
    cardShape: "/images/figma/card-service.svg",
    ribbonInset: 3.22, // 12.3px of 382 (519.97px from the C-store ribbon)

  },
];

export const specialtyCards = [
  {
    id: "branding",
    title: "Branding",
    href: "/#contact",
    image: "/images/figma/card-grocery.webp",
    bullets: serviceBullets,
    bgClass: "bg-forest",
    textClass: "text-cream",
    ribbonClass: "bg-coral text-cream",
    ribbonShape: "/images/figma/ribbon-specialty-coral.svg",
    cardShape: "/images/figma/card-branding.svg",
    mobileCardShape: "/images/figma/card-service.svg", // service-card outline on phones (tinted by bgClass)
  },
  {
    id: "management",
    title: "Management",
    href: "/#contact",
    image: "/images/figma/card-grocery.webp",
    bullets: serviceBullets,
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-coral text-cream",
    ribbonShape: "/images/figma/ribbon-specialty-coral.svg",
    cardShape: "/images/figma/card-management.svg",
    mobileCardShape: "/images/figma/card-service.svg", // service-card outline on phones (tinted by bgClass)
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

export const getStarted = {
  primary: {
    title: "Let’s Get Started",
    description: "Start by sending us your business information and let’s get started with your projects.",
    action: { label: "Request a Consultation", href: "/contact" },
  },
  secondary: {
    title: "Still not sure?",
    description: "Feel free to contact us if you have any questions.",
    action: { label: "Contact us", href: "/contact" },
  },
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

/**
 * Projects mosaic tiles from the Figma "Projects" frame (1592 x 1091).
 * x / y / w / h are design px inside that frame; `mask` is the tile's exact
 * outline, `image` its photo (cover-cropped, as in Figma).
 * Tiles marked `placeholderShape` weren't in the Figma export: they borrow the
 * nearest tile outline until the real vectors are provided.
 */
export const projectTiles = [
  { id: "cstore-soda", image: `${tileDir}/rectangle-4396.webp`, mask: `${tileDir}/rectangle-4396-mask.svg`, x: 0, y: 21, w: 510, h: 232 },
  { id: "relax", image: `${tileDir}/rectangle-4403.webp`, mask: `${tileDir}/rectangle-4403-mask.svg`, x: 525, y: 21, w: 271, h: 286 },
  { id: "seating", image: "/images/figma/card-truck-stops.webp", mask: `${tileDir}/rectangle-4406-mask.svg`, x: 808, y: 21, w: 258, h: 288, placeholderShape: true },
  { id: "shelving", image: `${tileDir}/rectangle-4397.webp`, mask: `${tileDir}/rectangle-4397-mask.svg`, x: 1080, y: 21, w: 274, h: 232 },
  { id: "pretzel-1", image: `${tileDir}/rectangle-4400.webp`, mask: `${tileDir}/rectangle-4400-mask.svg`, x: 1367, y: 21, w: 225, h: 232 },
  { id: "speedy", image: `${tileDir}/vector-1.webp`, mask: `${tileDir}/vector-1-mask.svg`, x: 0, y: 266, w: 251, h: 250 },
  { id: "pretzel-2", image: `${tileDir}/rectangle-4400.webp`, mask: `${tileDir}/vector-mask.svg`, x: 264, y: 266, w: 245, h: 250 },
  { id: "slushie", image: `${tileDir}/rectangle-4401.webp`, mask: `${tileDir}/rectangle-4401-mask.svg`, x: 1082, y: 266, w: 510, h: 251 },
  { id: "tikka", image: `${tileDir}/rectangle-4399.webp`, mask: `${tileDir}/rectangle-4399-mask.svg`, x: 0, y: 531, w: 509, h: 232 },
  { id: "welcome", image: "/images/figma/project-grid-02.webp", mask: `${tileDir}/rectangle-4403-mask.svg`, x: 525, y: 464, w: 271, h: 300, placeholderShape: true },
  { id: "prince-market", image: `${tileDir}/rectangle-4406.webp`, mask: `${tileDir}/rectangle-4406-mask.svg`, x: 808, y: 449, w: 260, h: 315 },
  { id: "checkout", image: `${tileDir}/rectangle-4398.webp`, mask: `${tileDir}/rectangle-4398-mask.svg`, x: 1080, y: 531, w: 274, h: 232 },
  { id: "pretzel-3", image: `${tileDir}/rectangle-4400.webp`, mask: `${tileDir}/rectangle-4402-mask.svg`, x: 1367, y: 531, w: 225, h: 232 },
].map((tile) => ({ ...tile, alt: "Completed T Lines retail project" }));

export const projectsLayout = {
  frame: { w: 1592, h: 1091 },
  label: { src: `${tileDir}/projects-label.svg`, x: 525, y: 314, w: 544, h: 139 },
  tourBar: { y: 781, h: 68 },
  tours: { y: 867, h: 203, tileW: 362, gap: 13, offsetX: -127 },
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
