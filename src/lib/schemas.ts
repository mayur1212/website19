// src/lib/schemas.ts

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My Website",
    url: "https://example.com",
    logo: "https://example.com/logo.png",
  };
}

export function NavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Home",
        url: "/",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Movies",
        url: "/movies",
      },
    ],
  };
}
