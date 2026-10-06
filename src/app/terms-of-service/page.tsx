import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfService } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service — StoreMaker",
  description: termsOfService.metaDescription,
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService} />;
}
