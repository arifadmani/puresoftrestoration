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
   * - intakeWindow: the team is available around the clock for rush textile
   *   intake from partner contents companies AND direct-adjuster engagements.
   * - rushTurnaround: an explicit service-level claim ("24-hour turnaround
   *   on rush orders") — confirmed by the owner.
   */
  availability: {
    intakeWindow: "Available 24 hours for rush textile intake",
    rushTurnaround: "24-hour turnaround on rush orders",
  },
  serviceAreaHeadline:
    "Serving North Texas — DFW metroplex and the broader region, typically within a two-hour radius. Recent work spans Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Arlington, Tyler, Waco, Sherman, Wichita Falls, and beyond.",
  /**
   * Round 2 — confirmed credentials.
   * `iicrcCertified`: true in general; specific cert types/numbers still
   * pending owner provision. Until then, JSON-LD hasCredential surfaces
   * only a general entry.
   * `fullyInsured`: confirmed (standard restoration-vendor coverage:
   * general liability + workers' comp + auto liability). Do not enumerate.
   */
  credentials: {
    iicrcCertified: true,
    fullyInsured: true,
  },
  /**
   * Round 2 — eight national / regional carriers whose claim work Pure Soft
   * has processed (directly or in partnership with contents companies).
   * Surfaceable publicly by name; carrier logos are NOT used because we
   * do not have licensing rights to the marks.
   */
  carriersWorked: [
    "State Farm",
    "Allstate",
    "USAA",
    "Farmers",
    "Liberty Mutual",
    "Travelers",
    "Texas Farm Bureau",
    "AAA Texas",
  ],
  /**
   * Round 2 — service model. Two operating modes, both real, both publishable.
   * direct-adjuster is the marketing emphasis; through-contents-company is
   * the current dominant lead channel.
   */
  serviceModes: {
    directAdjuster: {
      label: "Direct adjuster engagement",
      packout: true,
      onSiteCapable: true,
      summary:
        "When public adjusters and carrier adjusters engage Pure Soft directly, we mobilize for on-site packout, then carry the soft contents through inventory, insurance-approved invoicing, cleaning, storage, and home-delivery back to the policyholder.",
    },
    throughContentsCompany: {
      label: "Through-contents-company engagement",
      packout: false,
      onSiteCapable: false,
      summary:
        "When a generic contents company runs the packout, we receive the soft contents from them and handle the textile specialty: per-garment inventory at intake, insurance-approved invoicing back to the contents company, cleaning, storage, and home-delivery.",
    },
  },
  /**
   * Round 2 — the canonical deliverable model.
   * "Insurance-approved invoicing immediately at intake" is the primary
   * differentiator the site should lead with.
   */
  processModel: {
    inventoryGranularity: "per-garment",
    invoicingFormat: "insurance-approved invoice issued immediately at intake",
    paymentModel: "payment-first (cleaning begins after the invoice is paid)",
    storageModel: "poly-bagged storage until the policyholder's home is ready for return",
    returnModel: "hand-delivered to the policyholder's home, presented like fresh dry-cleaning",
    endOfJobDocument:
      "Flexible — the intake inventory + insurance-approved invoice is the baseline; a separate work-completed / release document is provided on request to match the partner's admin process.",
  },
  /**
   * Round 2 — strategic positioning. Drives audience hierarchy in copy.
   */
  marketing: {
    primaryAudience: "insurance adjusters",
    secondaryAudience: "contents companies, restoration contractors",
    currentDominantChannel: "contents companies",
    growthChannel: "direct-adjuster engagements",
  },
} as const;

export type Site = typeof site;
