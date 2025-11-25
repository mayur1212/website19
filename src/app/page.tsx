import HomePage from "@/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
  keywords: [
    "cinema",
    "entertainment",
    "movies",
    "Hayya",
    "Next.js",
    "home",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com",
  },
  openGraph: {
    title: "Hayya - Home",
    description: "Hayya - Your cinema and entertainment platform. Home page.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com",
    siteName: "Hayya",
    images: [
      {
        url: (process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com") + "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hayya Home - Cinema and Entertainment Platform",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayya - Home",
    description: "Hayya - Your cinema and entertainment platform. Home page.",
    images: [
      (process.env.NEXT_PUBLIC_SITE_URL || "https://hayya.com") + "/og-image.png",
    ],
    site: "@hayya",
    creator: "@hayya",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function Home() {
  return (<HomePage />);
}
