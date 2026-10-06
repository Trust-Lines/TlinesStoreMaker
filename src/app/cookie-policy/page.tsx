import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { cookiePolicy } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy — StoreMaker",
  description: cookiePolicy.metaDescription,
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return <LegalPage doc={cookiePolicy} />;
}
