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
  partnerStrip: "/images/figma/homepage-partner-strip.png",
};

const serviceBullets = ["Bring your project,", "Start with a complimentary initial store design."];

export const serviceCards = [
  {
    id: "c-store",
    title: "C-store",
    href: "/#contact",
    image: "/images/figma/project-grid-08.webp",
    bullets: serviceBullets,
    bgClass: "bg-gold",
    textClass: "text-sage-dark",
    ribbonClass: "bg-coral text-gold",
  },
  {
    id: "truck-stops",
    title: "Truck stops",
    href: "/#contact",
    image: "/images/figma/project-grid-03.webp",
    bullets: serviceBullets,
    bgClass: "bg-coral",
    textClass: "text-cream",
    ribbonClass: "bg-sage-dark text-cream",
  },
  {
    id: "grocery",
    title: "Grocery",
    href: "/#contact",
    image: "/images/figma/card-grocery.webp",
    bullets: serviceBullets,
    bgClass: "bg-sage-dark",
    textClass: "text-cream",
    ribbonClass: "bg-sage text-cream",
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
  strip: "/images/figma/homepage-members-strip.png",
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
