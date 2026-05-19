import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/insurance-professionals", priority: 0.9, changeFrequency: "monthly" },
  { path: "/soft-contents-restoration", priority: 0.8, changeFrequency: "monthly" },
  { path: "/fire-smoke-odor-restoration", priority: 0.8, changeFrequency: "monthly" },
  { path: "/water-mold-textile-recovery", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cat-emergency-response", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
