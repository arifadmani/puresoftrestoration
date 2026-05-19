import type { Metadata } from "next";
import { site } from "@/lib/site";

type BuildArgs = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
}: BuildArgs = {}): Metadata {
  const pageTitle = title ? `${title} | ${site.name}` : site.name;
  const desc = description ?? site.description;
  const url = `${site.url}${path}`;

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: desc,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
