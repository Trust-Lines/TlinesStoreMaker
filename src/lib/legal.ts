export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: { label?: string; text: string }[];
}

export interface LegalDocument {
  slug: "privacy-policy" | "terms-of-service" | "cookie-policy";
  title: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
}

export const legalContactEmail = "al@tlines.us";

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaDescription: "How T Lines collects, uses, shares and protects your personal information.",
  intro: "Welcome to T Lines. We are committed to protecting and respecting your privacy.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: ["When you use our website or contact us, we may collect the following:"],
      items: [
        { label: "Personal identification details", text: "such as your name, email address, phone number and company when you fill in a form or write to us." },
        { label: "Usage data", text: "such as the pages you visit, the time spent on them and the device and browser you use." },
        { label: "Cookie and tracking information", text: "described in our Cookie Policy." },
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["We process your information to:"],
      items: [
        { text: "Provide and maintain our services." },
        { text: "Improve and personalise your browsing experience." },
        { text: "Communicate with you about your enquiry, projects and updates." },
        { text: "Fulfil our legal obligations." },
      ],
    },
    {
      heading: "Data Sharing",
      paragraphs: [
        "T Lines does not share, sell, rent or trade your personal data with third parties without your consent, except where we are legally required to do so or where it is necessary to protect safety.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "We apply appropriate measures to protect your personal data. However, no data transmission over the internet can be guaranteed as fully secure, so we cannot promise absolute security.",
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: ["You may at any time:"],
      items: [
        { text: "Access the personal data we hold about you." },
        { text: "Ask us to correct inaccurate data." },
        { text: "Request deletion of your data." },
        { text: "Withdraw your consent to how we process your data." },
      ],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: ["We may update this Privacy Policy from time to time. Any changes will be posted on this page."],
    },
    {
      heading: "Contact Us",
      paragraphs: [`For questions or requests about your privacy, email us at ${legalContactEmail}.`],
    },
  ],
};

export const termsOfService: LegalDocument = {
  slug: "terms-of-service",
  title: "Terms of Service",
  metaDescription: "The terms that apply when you use the T Lines Store Maker website and request our services.",
  intro: "By accessing or using this website you agree to the terms below. If you do not agree, please do not use the site.",
  sections: [
    {
      heading: "About Our Website",
      paragraphs: [
        "This website is operated by T Lines. It presents our store design, supply and build services for c-stores, truck stops and grocery stores, and lets you contact us about your project.",
      ],
    },
    {
      heading: "Use of the Website",
      paragraphs: ["You agree to use the website only for lawful purposes. You must not:"],
      items: [
        { text: "Attempt to gain unauthorised access to the site, its servers or related systems." },
        { text: "Introduce malware or interfere with how the site works." },
        { text: "Submit false, misleading or unlawful information through our forms." },
        { text: "Copy or scrape the site at scale without our written permission." },
      ],
    },
    {
      heading: "Intellectual Property",
      paragraphs: [
        "The content on this site, including text, photos, project images, logos, graphics and layout, belongs to T Lines or its licensors and is protected by intellectual property laws. You may not reproduce or distribute it without our prior written permission.",
      ],
    },
    {
      heading: "Quotes and Services",
      paragraphs: [
        "Information on this website is for general guidance and is not an offer. Any project, price or timeline is only binding once agreed in a written contract or proposal signed by T Lines.",
      ],
    },
    {
      heading: "Third-Party Links",
      paragraphs: [
        "The site may link to other websites, including other T Lines sites. We are not responsible for the content or privacy practices of websites we do not operate.",
      ],
    },
    {
      heading: "Disclaimer and Limitation of Liability",
      paragraphs: [
        "The website is provided “as is” and “as available”. We work to keep it accurate and available but do not guarantee it is error-free or uninterrupted. To the fullest extent permitted by law, T Lines is not liable for any indirect or consequential loss arising from your use of the site.",
      ],
    },
    {
      heading: "Privacy and Cookies",
      paragraphs: ["Your use of the site is also governed by our Privacy Policy and Cookie Policy."],
    },
    {
      heading: "Changes to These Terms",
      paragraphs: ["We may update these terms from time to time. The updated version will be posted on this page and applies from the moment it is published."],
    },
    {
      heading: "Contact Us",
      paragraphs: [`For questions about these terms, email us at ${legalContactEmail}.`],
    },
  ],
};

export const cookiePolicy: LegalDocument = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  metaDescription: "What cookies are, how T Lines uses them and how you can control them.",
  intro: "We use cookies to enhance your experience on our website. This policy explains what cookies are, how we use them and the choices you have.",
  sections: [
    {
      heading: "What Are Cookies?",
      paragraphs: [
        "Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences and understand how you interact with our site.",
      ],
    },
    {
      heading: "How We Use Cookies",
      paragraphs: ["We use cookies for the following purposes:"],
      items: [
        { label: "Essential cookies", text: "are necessary for the website to function properly and cannot be switched off." },
        { label: "Performance cookies", text: "allow us to understand how visitors use our website, helping us improve the experience." },
        { label: "Functionality cookies", text: "personalise your experience by remembering your preferences and settings." },
        { label: "Targeting / advertising cookies", text: "may be set through our site by our advertising partners to show you relevant ads on other sites." },
      ],
    },
    {
      heading: "Your Choices Regarding Cookies",
      paragraphs: [
        "You can accept or reject cookies by adjusting your browser settings. Disabling cookies may affect the functionality of our website.",
        "Most web browsers accept cookies automatically. You can change your browser settings to decline them if you prefer. To learn more about managing cookies, visit your browser's help section.",
      ],
    },
    {
      heading: "Third-Party Cookies",
      paragraphs: [
        "We may allow third-party service providers to set cookies on our website to help analyse performance and target advertising. These third-party cookies are subject to their own privacy policies.",
      ],
    },
    {
      heading: "Updates to This Cookie Policy",
      paragraphs: [
        "We may update this Cookie Policy from time to time to reflect changes in our practices. Any changes will be posted on this page, and we encourage you to review it periodically.",
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [`For questions or concerns, email us at ${legalContactEmail}.`],
    },
  ],
};
