export const site = {
  name: "Pure Soft Restoration",
  shortName: "Pure Soft",
  legalName: "Pure Soft Restoration",
  tagline:
    "North Texas soft contents and textile restoration specialists for insurance claims.",
  description:
    "Pure Soft Restoration is the North Texas authority for soft contents and textile restoration on insurance claims. Documentation, chain of custody, and severity reduction for adjusters, carriers, and contents companies.",
  url: "https://puresoftrestoration.com",
  // Placeholders — replace with real values when finalized.
  contact: {
    email: "admin@puresoftrestoration.com",
    phone: "(XXX) XXX-XXXX",
    phoneTel: "+1XXXXXXXXXX",
    catLine: "(XXX) XXX-XXXX",
    catLineTel: "+1XXXXXXXXXX",
  },
  address: {
    street: "Address pending",
    locality: "Dallas–Fort Worth",
    region: "TX",
    postalCode: "",
    country: "US",
  },
  serviceArea: [
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
    emergency: "24/7 CAT response",
  },
} as const;

export type Site = typeof site;
