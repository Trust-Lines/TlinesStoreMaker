import type { Metadata } from "next";
import "./globals.css";

// Montserrat and Orbitron load from Google Fonts (imported in globals.css). Every
// font stack there falls back to system fonts, so pages still render if Google
// Fonts is blocked.

export const metadata: Metadata = {
  title: "StoreMaker — From vanilla box to open date",
  description:
    "StoreMaker designs, builds, and installs c-stores, grocery stores, truck stops, and travel plazas from vanilla box to open date.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Warm up the Google Fonts hosts used by the Montserrat / Orbitron import in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
