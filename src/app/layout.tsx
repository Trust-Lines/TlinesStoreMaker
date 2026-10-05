import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Montserrat, Orbitron } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font/google: Next.js downloads these at build time and
// serves them from our own domain, so they render reliably on Vercel with no
// runtime request to Google Fonts (a plain CSS @import can silently fail to
// load in production depending on network/CSP conditions).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

// viewport-fit=cover lets the page run under the iPhone notch / status bar (the top bar
// fills that strip, see ReferenceTopBar); theme-color tints the browser chrome to match.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#F7C56B",
};

/**
 * On short desktop windows (a laptop, a browser with toolbars) the first screen would cut
 * off the bottom of the home hero and its logo strip. This runs before the first paint and
 * zooms the whole page out, exactly like Ctrl-minus, until the hero (1592 x 1003 Figma
 * frame: 923px hero + 80px logo strip) fits the window height. The site is a boxed 1592px
 * column, so zoomed-out views just get cream side margins. Phones and tablets (< 1024px
 * wide) are never zoomed. --zoom feeds --u in globals.css so design-px sizes stay true.
 */
const fitHeroScript = `(function(){var d=document.documentElement;function f(){var w=innerWidth,h=innerHeight,z=1;if(w>=1024&&1003*Math.min(w,1592)/1592>h)z=Math.max(.5,h/1003);z=Math.round(z*1000)/1000;if(z===1){d.style.removeProperty('zoom')}else{d.style.zoom=z}d.style.setProperty('--zoom',z)}f();addEventListener('resize',f)})()`;

// Google Tag Manager container (Google Analytics and any other tags are configured inside GTM).
// Loaded only in production builds so local development never counts as traffic; set
// NEXT_PUBLIC_GTM_ID to use a different container.
const gtmId = process.env.NODE_ENV === "production" ? (process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-KPBPCJ99") : undefined;
const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;

export const metadata: Metadata = {
  title: "StoreMaker — From vanilla box to open date",
  description:
    "StoreMaker designs, builds, and installs c-stores, grocery stores, truck stops, and travel plazas from vanilla box to open date.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${montserrat.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-cream text-ink"
        suppressHydrationWarning
      >
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        {gtmId && <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmScript }} />}
        {/* beforeInteractive: runs before the first paint, so the page never flashes at full size. */}
        <Script id="fit-hero-zoom" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: fitHeroScript }} />
        {children}
      </body>
    </html>
  );
}
