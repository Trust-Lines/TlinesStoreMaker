import Image from "next/image";
import Link from "next/link";

const hotspots = [
  { label: "Get in touch", href: "/contact", left: 80.7, top: 0.55, width: 8.2, height: 0.75 },
  { label: "Open menu", href: "#footer-navigation", left: 94.2, top: 0.45, width: 3.6, height: 0.85 },
  { label: "Start your project", href: "/contact", left: 8.5, top: 12.75, width: 14.5, height: 1.2 },
  { label: "C-store services", href: "/services/c-store", left: 4.8, top: 19.05, width: 27.7, height: 13.0 },
  { label: "Truck-stop services", href: "/services/truck-stops", left: 36.1, top: 19.05, width: 27.7, height: 13.0 },
  { label: "Grocery services", href: "/services/grocery", left: 67.4, top: 19.05, width: 27.7, height: 13.0 },
  { label: "Branding services", href: "/services/branding", left: 5.8, top: 42.35, width: 42.0, height: 13.0 },
  { label: "Management services", href: "/services/management", left: 52.2, top: 42.35, width: 42.0, height: 13.0 },
  { label: "View projects", href: "/work", left: 5.1, top: 57.0, width: 89.8, height: 13.5 },
  { label: "Request a consultation", href: "/contact", left: 9.2, top: 86.75, width: 16.5, height: 1.15 },
  { label: "Contact us", href: "/contact", left: 76.4, top: 86.75, width: 12.5, height: 1.15 },
] as const;

export default function StoreMakerPage() {
  return (
    <main className="bg-cream">
      <div className="relative mx-auto w-full max-w-[1592px] overflow-hidden">
        <Image
          src="/images/figma/homepage-reference.png"
          alt="T Lines Store Maker homepage featuring store planning, retail design services, completed projects, memberships, contact information, and locations."
          width={1592}
          height={5716}
          priority
          unoptimized
          className="block h-auto w-full"
        />

        <div
          aria-hidden="true"
          className="brand-marquee absolute left-0 w-full overflow-hidden bg-sage-dark"
          style={{ top: "16.1477%", height: "1.3646%" }}
        >
          <div className="brand-marquee-track flex h-full w-[200%] items-stretch">
            {[0, 1].map((copy) => (
              <Image
                key={copy}
                src="/images/figma/homepage-partner-strip.png"
                alt=""
                width={1592}
                height={78}
                unoptimized
                className="h-full w-1/2 shrink-0 object-fill"
              />
            ))}
          </div>
        </div>

        <nav aria-label="Homepage actions" className="absolute inset-0">
          {hotspots.map((hotspot) => (
            <Link
              key={hotspot.label}
              href={hotspot.href}
              aria-label={hotspot.label}
              className="absolute rounded-sm outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
              style={{
                left: `${hotspot.left}%`,
                top: `${hotspot.top}%`,
                width: `${hotspot.width}%`,
                height: `${hotspot.height}%`,
              }}
            >
              <span className="sr-only">{hotspot.label}</span>
            </Link>
          ))}
        </nav>

        <span id="footer-navigation" className="absolute bottom-0 left-0" />
      </div>
    </main>
  );
}
