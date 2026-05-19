import { site } from "@/lib/site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#business`,
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.contact.intakeEmail,
    telephone: site.contact.carrierLineLabel,
    foundingDate: String(site.estYear),
    areaServed: site.citiesServed.map((city) => ({
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
        description: "24-hour CAT response line for active losses",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: `IICRC ${site.certifications.iicrc}` },
      { "@type": "EducationalOccupationalCredential", name: `Texas DPS ${site.certifications.texasDps}` },
    ],
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
    areaServed: site.citiesServed.map((city) => ({
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
