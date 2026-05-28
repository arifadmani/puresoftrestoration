/**
 * Single source of truth for public-facing facts about Pure Soft Restoration.
 *
 * Every field here is bound to an entry in `docs/CANONICAL_FACTS.md`. Do not
 * add facts to this file without a corresponding confirmed entry in the
 * canonical-facts doc. Fields whose canonical truth is "undisclosed" or
 * "not yet provisioned" are typed as `null` so consuming components can
 * gate rendering off their presence (no placeholder strings).
 */

type ContactBlock = {
  /** Public phone number — currently null pending Twilio provisioning. */
  responseLineLabel: string | null;
  responseLineTel: string | null;
  /** Only public email; backs mailto: links, JSON-LD email, intake notifications. */
  responseEmail: string;
  /** Aliases for backward references; same address as responseEmail. */
  intakeEmail: string;
  adminEmail: string;
};

type AddressBlock = {
  /** Per Round 1 #4: no street address published. */
  street: null;
  /** Per Round 1 #4: no city anchor; service-area framing only. */
  locality: null;
  region: "TX";
  postalCode: null;
  country: "US";
};

export const site = {
  name: "Pure Soft Restoration",
  shortName: "Pure Soft Restoration",
  /** Per Round 1 #1: no LLC tag, no separate legal entity surfaced publicly. */
  legalName: "Pure Soft Restoration",
  tagline: "When a loss touches textiles, the claim comes to us.",
  description:
    "Pure Soft Restoration is a North Texas textile and soft-contents restoration practice serving insurance adjusters, carriers, contractors and contents companies. The team behind the brand brings 20+ years of textile and soft-contents expertise — including operations work for high-end retail and commercial programs — to recovery work on soft goods that conventional restoration writes off.",
  positioningLine: "North Texas textile and soft-contents restoration.",
  url: "https://puresoftrestoration.com",
  /** Per Round 1 #8: DBA began operating in 2025. */
  foundedYear: 2025,
  /** Allowable shorthand for the experience claim. */
  experienceYears: "20+",
  contact: {
    responseLineLabel: null,
    responseLineTel: null,
    responseEmail: "admin@puresoftrestoration.com",
    intakeEmail: "admin@puresoftrestoration.com",
    adminEmail: "admin@puresoftrestoration.com",
  } satisfies ContactBlock,
  address: {
    street: null,
    locality: null,
    region: "TX",
    postalCode: null,
    country: "US",
  } satisfies AddressBlock,
  /**
   * Per Round 1 #9: confirmed counties where Pure Soft has completed work.
   * Drives JSON-LD areaServed and any "counties served" UI. Sixteen entries,
   * alphabetical. Fort Worth (a city) lives in Tarrant County and is counted
   * once.
   */
  serviceArea: [
    "Collin",
    "Cooke",
    "Dallas",
    "Denton",
    "Fannin",
    "Grayson",
    "Hopkins",
    "Hunt",
    "Johnson",
    "Kaufman",
    "Palo Pinto",
    "Parker",
    "Rockwall",
    "Tarrant",
    "Van Zandt",
    "Wise",
  ],
  /**
   * Notable cities within (or near) the confirmed service area. Used in the
   * service-area headline copy and helps Google understand the cities the
   * business serves. Not certifications of an office in those cities.
   */
  citiesServed: [
    "Dallas",
    "Fort Worth",
    "Plano",
    "Frisco",
    "McKinney",
    "Denton",
    "Arlington",
    "Tyler",
    "Waco",
    "Sherman",
    "Wichita Falls",
  ],
  /**
   * Per Round 1 #6: confirmed publishable.
   * - office hours: not separately published; the team is available around
   *   the clock for rush textile intake from partner contents companies.
   * - rushTurnaround: an explicit service-level claim ("24-hour turnaround
   *   on rush orders") — confirmed by the owner.
   * Forbidden until Round 2 confirms otherwise: any framing implying ON-SITE
   * response (60-min radius, dispatched crews, mobilization, etc).
   */
  availability: {
    intakeWindow: "Available 24 hours for rush textile intake",
    rushTurnaround: "24-hour turnaround on rush orders",
  },
  /**
   * The Round-1 standard service-area headline. Surfaced verbatim in copy
   * that needs to summarize geographic reach.
   */
  serviceAreaHeadline:
    "Serving North Texas — DFW metroplex and the broader region, typically within a two-hour radius. Recent work spans Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Arlington, Tyler, Waco, Sherman, Wichita Falls, and beyond.",
} as const;

export type Site = typeof site;
