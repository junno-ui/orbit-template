import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { destinations } from "@/assets/data/destinations";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  const paths = [
    "/",
    "/destinations",
    "/experience",
    "/about",
    "/contact",
    ...destinations.items.map(({ slug }) => `/destinations/${slug}`),
  ];
  return paths.map((path) => ({
    url: new URL(path, origin).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
