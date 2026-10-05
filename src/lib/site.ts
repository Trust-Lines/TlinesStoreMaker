import type { Metadata } from "next";
import { headquarters } from "@/lib/content";

/** Public address of the site (canonical URLs, sitemap, structured data). Override with NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sm.tlines.us").replace(/\/$/, "");
export const siteName = "T Lines Store Maker";
export const siteDescription =
  "StoreMaker designs, builds, and installs c-stores, grocery stores, truck stops, and travel plazas from vanilla box to open date.";

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/tlines.storemaker" },
  { label: "YouTube", href: "https://www.youtube.com/@Tlinesusa" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tlines-store-maker/" },
];

/** Only the production deployment may be indexed; Vercel previews are kept out of search results. */
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

interface PageMeta {
  /** Full <title>. */
  title: string;
  description: string;
  /** Path of the page, e.g. "/projects" or "/blog/my-post". */
  path: string;
  /** Share image: absolute URL or a path on this site. Defaults to the site's share card (1200x630). */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

/** Title, description, canonical URL and the Open Graph / Twitter tags for one page. */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, authors }: PageMeta): Metadata {
  // A page that defines openGraph does not inherit the app-level share card, so it is listed here.
  const images = image ? [{ url: image }] : [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: siteName }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors?.length ? { authors } : {}),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/** schema.org Organization built from the offices listed on the Contact page. */
export function organizationJsonLd() {
  const places = headquarters.map((office) => {
    const lines = office.address;
    const [city, region] = (lines[lines.length - 1] ?? "").split(",").map((part) => part.trim());
    return {
      "@type": "Place",
      name: office.label,
      address: {
        "@type": "PostalAddress",
        ...(lines.length > 1 ? { streetAddress: lines[0] } : {}),
        addressLocality: city,
        addressRegion: region,
        addressCountry: "US",
      },
      telephone: office.phone,
    };
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        alternateName: ["StoreMaker", "T Lines"],
        url: siteUrl,
        logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/logo.png"), width: 880, height: 299 },
        image: absoluteUrl("/opengraph-image.jpg"),
        description: siteDescription,
        email: "info@tlines.us",
        telephone: "+1-800-660-3772",
        areaServed: { "@type": "Country", name: "United States" },
        sameAs: socialLinks.map((link) => link.href),
        location: places,
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: "+1-800-660-3772", email: "info@tlines.us", areaServed: "US", availableLanguage: "English" }],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.path) })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: "Store design, supply and build",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };
}
