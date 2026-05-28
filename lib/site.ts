export const site = {
  name: "Pure Soft Restoration",
  shortName: "Pure Soft",
  legalName: "Pure Soft Restoration LLC",
  tagline:
    "When a loss touches textiles, the claim comes to us.",
  description:
    "Pure Soft Restoration is North Texas's specialist in garment, linen, bedding and soft-contents recovery — the partner independent adjusters, carriers and restoration contractors trust to salvage what replacement would cost far more to lose.",
  positioningLine:
    "North Texas's textile and soft-contents restoration authority.",
  url: "https://puresoftrestoration.com",
  estYear: 2009,
  /*
   * Contact details carry placeholder values from the Conservation House
   * design direction. Replace before launch with real numbers.
   */
  contact: {
    responseLineLabel: "(214) 555-0142",
    responseLineTel: "+12145550142",
    responseEmail: "admin@puresoftrestoration.com",
    intakeEmail: "admin@puresoftrestoration.com",
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
    iicrc: "IICRC-certified",
    insurance: "Licensed & insured in Texas",
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
    dispatch: "24/7 response line for active losses",
  },
} as const;

export type Site = typeof site;
