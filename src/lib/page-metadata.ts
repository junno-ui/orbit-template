import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/og-image.png",
): Metadata {
  const pageTitle = `${title} | Orbit`;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      type: "website",
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] },
  };
}
