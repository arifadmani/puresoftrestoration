import { ArrowRight, FlameKindling, Sparkles, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const PATH = "/fire-smoke-odor-restoration";
const NAME = "Fire & Smoke Odor Textile Restoration";
const DESC =
  "Soot extraction, smoke odor neutralization, and post-treatment air-quality verification on textiles affected by fire losses. Built for the claim file across North Texas.";

export const metadata = buildMetadata({
  title: NAME,
  description: DESC,
  path: PATH,
});

export default function FireSmokePage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: NAME, description: DESC, slug: PATH })} />

      <Section tone="ink">
        <Eyebrow className="text-signal">Service</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Fire and smoke odor textile restoration.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-300 md:text-lg">
          Smoke contamination, soot, and odor are textile problems before they
          are anything else. We isolate, treat, and verify — and report exactly
          what was restored, what was not, and why.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary" size="lg">
            Submit a claim <ArrowRight size={16} aria-hidden />
          </Button>
          <Button href="/cat-emergency-response" variant="ghost" size="lg" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
            CAT response
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Treatment scope</Eyebrow>
        <SectionHeading>From soot to verified-clean.</SectionHeading>
        <SectionLead>
          Smoke odor is a function of particulate, vapor, and substrate. Our
          treatment chain addresses each, and we verify outcomes rather than
          asserting them.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <CardBody>
              <FlameKindling className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Soot extraction</CardTitle>
              <CardDescription>
                Pre-cleaning, dry-soot removal, and isolation before any wet
                process to prevent setting smoke residue into fibers.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Sparkles className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Odor neutralization</CardTitle>
              <CardDescription>
                Process selection — ozone, hydroxyl, thermal fog, or
                specialty-chemistry — matched to substrate and contamination
                category.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Wind className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Post-treatment verification</CardTitle>
              <CardDescription>
                Sensory verification and where appropriate air-quality checks
                before items are released for return to the property.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section tone="paper-shadow">
        <Eyebrow>For the claim file</Eyebrow>
        <SectionHeading>Documentation that defends the salvage decision.</SectionHeading>
        <ul className="mt-8 grid gap-3 md:grid-cols-2 text-sm text-ink-700">
          {[
            "Per-item intake with photos and damage notes at the loss site",
            "Treatment log with process, dwell time, and operator",
            "Non-restorable list with reasoning (substrate, contamination class, structural damage)",
            "Salvage report dollarized for the claim adjustment",
            "Chain of custody from pickup through return",
            "Reinspection-ready record retention",
          ].map((line) => (
            <li key={line} className="rounded-sm border border-ink-900/10 bg-paper px-4 py-3">
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Active fire loss?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-300">
              The CAT line is staffed 24/7 for active losses. Submit the claim
              online for non-emergency intake.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button href="/contact" variant="primary" size="xl">
              Submit a claim
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
