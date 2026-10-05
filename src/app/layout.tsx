import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import "./globals.css";
const url = process.env.NEXT_PUBLIC_SITE_URL || site.url;
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url,
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og-image.png"],
  },
  icons: { icon: "/favicon/favicon.ico", apple: "/favicon/apple-touch-icon.png" },
  manifest: "/manifest.json",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body id="top" suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
