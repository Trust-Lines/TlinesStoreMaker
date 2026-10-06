import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/lib/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — StoreMaker",
  description: privacyPolicy.metaDescription,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
