import type { Metadata, Viewport } from "next";
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: fitHeroScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-cream text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
