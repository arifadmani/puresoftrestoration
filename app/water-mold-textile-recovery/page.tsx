import { ArrowRight, Droplets, Microscope, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const PATH = "/water-mold-textile-recovery";
const NAME = "Water & Mold Textile Recovery";
const DESC =
  "Cat-1, Cat-2, and Cat-3 water damage textile workflows plus controlled antimicrobial treatment for mold-affected soft contents. Insurance-claim documentation built in.";

export const metadata = buildMetadata({
  title: NAME,
  description: DESC,
  path: PATH,
});

export default function WaterMoldPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: NAME, description: DESC, slug: PATH })} />

      <Section tone="ink">
        <Eyebrow className="text-signal">Service</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Water and mold textile recovery.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-300 md:text-lg">
          Category-driven water recovery and controlled antimicrobial treatment
          for mold-affected soft contents. Every load is contained, processed,
          and reported in line with the loss classification.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" variant="primary" size="lg">
            Submit a claim <ArrowRight size={16} aria-hidden />
          </Button>
          <Button href="/insurance-professionals" variant="ghost" size="lg" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
            For adjusters
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Water categories</Eyebrow>
        <SectionHeading>Workflow calibrated to contamination class.</SectionHeading>
        <SectionLead>
          The category drives the workflow. Cat-3 is not Cat-1 — and the
          documentation we produce reflects which one was on the loss.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              tag: "Category 1",
              title: "Clean water",
              body: "Standard textile recovery workflow with priority drying to prevent secondary damage and microbial growth.",
            },
            {
              tag: "Category 2",
              title: "Grey water",
              body: "Containment-first intake, enhanced cleaning chemistry, antimicrobial as appropriate to substrate.",
            },
            {
              tag: "Category 3",
              title: "Black water",
              body: "Strict containment, controlled antimicrobial, and a higher non-restorable threshold based on contamination contact.",
            },
          ].map((c) => (
            <Card key={c.tag}>
              <CardBody>
                <p className="text-xs font-semibold tracking-[0.22em] text-ink-500">{c.tag}</p>
                <CardTitle className="mt-2">{c.title}</CardTitle>
                <CardDescription>{c.body}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="paper-shadow">
        <Eyebrow>Mold-affected textiles</Eyebrow>
        <SectionHeading>Controlled treatment, defensible call.</SectionHeading>
        <SectionLead>
          For mold-impacted soft contents we work with the structural
          remediator&apos;s scope and produce textile-specific documentation that
          aligns with the broader remediation plan.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <CardBody>
              <Droplets className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Containment</CardTitle>
              <CardDescription>
                HEPA-filtered handling and isolated processing to prevent
                cross-contamination of unaffected contents.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Microscope className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Assessment</CardTitle>
              <CardDescription>
                Per-item evaluation against substrate, growth extent, and
                hygroscopic exposure to call restorable vs. non-restorable.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ShieldCheck className="text-ink-900" aria-hidden />
              <CardTitle className="mt-4">Treatment & verification</CardTitle>
              <CardDescription>
                Approved antimicrobial chemistry, full drying cycle, and
                post-treatment sensory and visual verification before release.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Water or mold loss with soft contents?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-300">
              Same-day intake reduces secondary damage and microbial growth on
              affected textiles. Submit the claim now.
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
