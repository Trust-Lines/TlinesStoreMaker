import type { Metadata } from "next";
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
    >
      <body
        className="min-h-full flex flex-col bg-cream text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
