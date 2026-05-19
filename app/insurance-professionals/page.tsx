import { ArrowRight, ClipboardCheck, FileSearch, ListChecks, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Insurance Professionals — Textile Restoration Partner",
  description:
    "Pure Soft Restoration partners with adjusters, carriers, public adjusters, contents companies, and restoration GCs on the textile portion of fire, smoke, water, and mold losses across North Texas.",
  path: "/insurance-professionals",
});

const audience = [
  "Independent adjusters",
  "Staff adjusters",
  "Public adjusters",
  "Carriers and TPAs",
  "Contents companies",
  "Restoration GCs",
  "Property managers and risk teams",
];

const workflow = [
  {
    n: "01",
    title: "Intake",
    body: "Loss type, claim number, carrier, peril, property address, contents categories, and photos captured in a structured intake.",
  },
  {
    n: "02",
    title: "Pickup & inventory",
    body: "On-site or at a staging location. Items are logged, tagged, photographed, and condition-coded before transport.",
  },
  {
    n: "03",
    title: "Restoration",
    body: "Workflow calibrated to peril — soot extraction, odor neutralization, Cat-1/2/3 water protocols, controlled antimicrobial.",
  },
  {
    n: "04",
    title: "Reporting & return",
    body: "Per-item disposition (restored / non-restorable), salvage-vs-replacement reporting, signed return delivery.",
  },
];

export default function InsuranceProfessionalsPage() {
  return (
    <>
      <Section tone="ink">
        <Eyebrow className="text-signal">For insurance professionals</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          A textile restoration partner that works inside your claim file.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-300 md:text-lg">
          Pure Soft Restoration handles the soft contents portion of fire,
          smoke, water, and mold losses across North Texas. We integrate into
          the existing scope of work and produce documentation that holds up
          under desk review.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary" size="lg">
            Submit a claim <ArrowRight size={16} aria-hidden />
          </Button>
          <Button href="#workflow" variant="ghost" size="lg" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
            See the workflow
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Who we work with</Eyebrow>
            <SectionHeading>Built for the people on the claim.</SectionHeading>
            <SectionLead>
              Our intake, documentation, and reporting are calibrated for the
              roles that touch a loss — not for a retail customer.
            </SectionLead>
          </div>
          <ul className="md:col-span-7 grid gap-3 sm:grid-cols-2 text-sm">
            {audience.map((role) => (
              <li
                key={role}
                className="rounded-sm border border-ink-900/10 bg-paper-shadow px-4 py-3 text-ink"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper-shadow" innerClassName="" >
        <span id="workflow" className="sr-only">Workflow</span>
        <Eyebrow>Workflow</Eyebrow>
        <SectionHeading>Documented from intake to return.</SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {workflow.map((step) => (
            <Card key={step.n}>
              <CardBody>
                <span className="text-xs font-semibold tracking-[0.22em] text-ink-500">
                  {step.n}
                </span>
                <CardTitle className="mt-3">{step.title}</CardTitle>
                <CardDescription>{step.body}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>What you get</Eyebrow>
        <SectionHeading>A claim file your reviewer will recognize.</SectionHeading>
        <SectionLead>
          Every loss produces the same set of deliverables, calibrated to the
          peril and the scope.
        </SectionLead>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <FileSearch className="text-ink-900" aria-hidden />,
              title: "Item-level inventory",
              body: "Per-piece intake with photos, category, condition code, and disposition routing.",
            },
            {
              icon: <ShieldCheck className="text-ink-900" aria-hidden />,
              title: "Chain of custody",
              body: "Signed transfers at pickup, facility intake, transfer-between-areas, and return delivery.",
            },
            {
              icon: <ClipboardCheck className="text-ink-900" aria-hidden />,
              title: "Salvage report",
              body: "Restored vs. non-restorable counts and dollarized salvage impact for the claim file.",
            },
            {
              icon: <ListChecks className="text-ink-900" aria-hidden />,
              title: "Treatment log",
              body: "Per-load treatment notes — soot extraction, odor neutralization, water category, antimicrobial.",
            },
            {
              icon: <Workflow className="text-ink-900" aria-hidden />,
              title: "Return manifest",
              body: "Signed return delivery with item count reconciliation and any deviations flagged.",
            },
            {
              icon: <ShieldCheck className="text-ink-900" aria-hidden />,
              title: "Reinspection-ready",
              body: "All documentation retained and retrievable for desk reviews, reinspections, or examinations under oath.",
            },
          ].map((b) => (
            <Card key={b.title}>
              <CardBody>
                {b.icon}
                <CardTitle className="mt-4">{b.title}</CardTitle>
                <CardDescription>{b.body}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Active claim with soft contents?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-300">
              Submit it now and we will respond within one business hour
              during business hours; CAT-line claims are answered 24/7.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button href="/contact" variant="primary" size="xl">
              Submit a claim
            </Button>
            <p className="mt-3 text-xs text-ink-400">
              {site.contact.intakeEmail} · {site.contact.catLineLabel}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
