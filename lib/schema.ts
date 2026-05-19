import { site } from "@/lib/site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#business`,
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "AdministrativeArea", name: "Texas" },
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode || undefined,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    specialOpeningHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      description: "24/7 catastrophe response line for active losses",
    },
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${args.slug}#service`,
    name: args.name,
    description: args.description,
    provider: { "@id": `${site.url}#business` },
    areaServed: site.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    serviceType: args.name,
    url: `${site.url}${args.slug}`,
  };
}

export function jsonLdString(obj: unknown) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
