import { site } from "@/lib/site";

/**
 * LocalBusiness JSON-LD for the site. Every field traces to a confirmed entry
 * in `docs/CANONICAL_FACTS.md`. Fields whose canonical truth is "undisclosed"
 * (street address, phone, certifications) are intentionally absent from the
 * emitted schema rather than carrying placeholder values.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#business`,
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.contact.responseEmail,
    /** Per Round 1 #8 — DBA began operating in 2025. */
    foundingDate: String(site.foundedYear),
    areaServed: site.serviceArea.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county} County`,
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    })),
    /**
     * Per Round 1 #4 — service-area business with no public street address.
     * Only region/country are emitted; consumers (Google, Bing) treat the
     * presence of `areaServed` as the operational footprint.
     */
    address: {
      "@type": "PostalAddress",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    /**
     * Per Round 1 #6 — confirmed availability for rush textile intake. Not
     * an "open 24 hours" claim about an office; this describes the team's
     * availability to accept rush soft-contents work from partners.
     */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        description: site.availability.intakeWindow,
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
    /**
     * Round 2 — credentials confirmed in principle.
     * - IICRC certification confirmed (specific cert numbers/types still
     *   pending owner provision; a general entry is appropriate now).
     * - Fully insured for restoration work — published as a separate
     *   `EducationalOccupationalCredential` style entry rather than a
     *   schema.org/credential subtype because no widely-supported "insured
     *   for X work" schema exists.
     */
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "IICRC-certified",
        recognizedBy: {
          "@type": "Organization",
          name: "Institute of Inspection, Cleaning and Restoration Certification (IICRC)",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Fully insured for soft-contents restoration work",
      },
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
    areaServed: site.serviceArea.map((county) => ({
      "@type": "AdministrativeArea",
      name: `${county} County`,
    })),
    serviceType: args.name,
    url: `${site.url}${args.slug}`,
  };
}

export function jsonLdString(obj: unknown) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}
