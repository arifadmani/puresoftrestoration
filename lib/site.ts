export const site = {
  name: "Pure Soft Restoration",
  shortName: "Pure Soft",
  legalName: "Pure Soft Restoration LLC",
  tagline:
    "The textile recovery operation insurance carriers call first.",
  description:
    "Pure Soft Restoration is North Texas's specialized soft-goods recovery operation — engineered for the scale, speed, and documentation rigor that insurance carriers require on smoke, water, fire, and biohazard losses. 24-hour CAT mobilization, chain-of-custody on every item, carrier-audited reporting.",
  positioningLine:
    "North Texas's operational authority on insurance-grade soft-goods recovery.",
  url: "https://puresoftrestoration.com",
  estYear: 2009,
  /*
   * Contact details below carry the design-spec placeholder values from
   * the Pure Soft — Design Direction handoff. Replace before launch.
   */
  contact: {
    carrierLineLabel: "(817) 555-PURE",
    carrierLineTel: "+18175557873",
    catLineLabel: "(817) 555-PURE",
    catLineTel: "+18175557873",
    intakeEmail: "intake@puresoftrestoration.com",
    adminEmail: "admin@puresoftrestoration.com",
  },
  address: {
    street: "4400 W Royal Lane",
    locality: "Irving",
    region: "TX",
    postalCode: "75063",
    country: "US",
    facilityLabel: "Facility · Irving TX",
  },
  certifications: {
    iicrc: "#214418",
    texasDps: "#B19234",
  },
  serviceArea: [
    "Tarrant",
    "Dallas",
    "Collin",
    "Denton",
    "Rockwall",
    "Johnson",
  ],
  citiesServed: [
    "Dallas",
    "Fort Worth",
    "Plano",
    "Frisco",
    "McKinney",
    "Denton",
    "Richardson",
    "Irving",
    "Arlington",
  ],
  hours: {
    business: "Mon–Fri 8:00–17:00 CT",
    dispatch: "24-hour dispatch · 365 days",
  },
  stats: {
    mobilizationHours: "24",
    facilitySqft: "412k",
    activeCarriers: "40+",
    surgeCapacity: "5k",
  },
  activeCat: {
    code: "CAT-2026-04",
    name: "North Texas Hailstorm Event",
    counties: "Tarrant / Denton / Collin",
    mobilizedAgo: "04:12:36",
    properties: 41,
    lots: 1847,
    lastUpdate: "14:36 CST",
  },
} as const;

export type Site = typeof site;
