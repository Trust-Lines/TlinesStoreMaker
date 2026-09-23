import type { Metadata } from "next";
import "./globals.css";

// No external fonts are loaded. The site uses the system font stacks defined in
// globals.css, so it makes zero requests to the internet and loads instantly —
// even on locked-down corporate networks that block or hang on Google Fonts.

export const metadata: Metadata = {
  title: "StoreMaker — From vanilla box to open date",
  description:
    "StoreMaker designs, builds, and installs c-stores, grocery stores, truck stops, and travel plazas from vanilla box to open date.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
