/**
 * Organization Schema (JSON-LD)
 * Represents the organization/business information
 */
export function OrganizationSchema() {
  // Update these values with your actual organization details
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hayya",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com"}/logo.png`,
    description: "Hayya - Your cinema and entertainment platform",
    sameAs: [
      // Add your social media profiles here
      // "https://www.facebook.com/hayya",
      // "https://www.twitter.com/hayya",
      // "https://www.instagram.com/hayya",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      // email: "support@hayya.com",
      // telephone: "+1234567890",
    },
    address: {
      "@type": "PostalAddress",
      // addressCountry: "QA",
      // addressLocality: "Doha",
      // streetAddress: "Your Street Address",
    },
  };
}

/**
 * Navigation Schema (JSON-LD)
 * Represents the site navigation structure
 */
export function NavigationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com";

  // Update these navigation items with your actual site structure
  const navigationItems = [
    {
      "@type": "SiteNavigationElement",
      name: "Home",
      url: baseUrl,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Movies",
      url: `${baseUrl}/movies`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Cinemas",
      url: `${baseUrl}/cinemas`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "About",
      url: `${baseUrl}/about`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Contact",
      url: `${baseUrl}/contact`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Hayya",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "SiteNavigationElement",
      name: "Main Navigation",
      hasPart: navigationItems,
    },
  };
}

