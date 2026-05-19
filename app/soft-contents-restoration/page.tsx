import { ArrowRight, Package, Shirt, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

const PATH = "/soft-contents-restoration";
const NAME = "Soft Contents Restoration";
const DESC =
  "Insurance-grade restoration for garments, linens, bedding, rugs, drapes, upholstered items, and luxury textiles. Item-level intake, documented chain of custody, and salvage reporting for North Texas claims.";

export const metadata = buildMetadata({
  title: NAME,
  description: DESC,
  path: PATH,
});

export default function SoftContentsPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: NAME, description: DESC, slug: PATH })} />

      <Section tone="ink">
        <Eyebrow className="text-signal">Service</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Soft contents restoration, documented to the item.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-300 md:text-lg">
          Garments, linens, bedding, area rugs, drapes, window treatments,
          upholstered items, and luxury textiles. Every piece is intake-logged,
          photographed, condition-coded, and routed through a documented
          restoration workflow.
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
        <Eyebrow>Categories handled</Eyebrow>
        <SectionHeading>If it is a soft good, it is in our scope.</SectionHeading>
        <SectionLead>
          We restore the textile portion of a claim — including items most
          adjusters expect to write off when they review the loss.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Everyday garments and uniforms",
            "Designer and luxury apparel",
            "Linens, bedding, and pillows",
            "Drapes, curtains, and window treatments",
            "Area rugs (machine-cleanable)",
            "Upholstery cleaning of removable covers",
            "Plush toys and children's items",
            "Leather and suede (specialty referrals)",
            "Wedding gowns and heirloom textiles",
          ].map((line) => (
            <Card key={line}>
              <CardBody>
                <Shirt className="text-ink-900" aria-hidden />
                <CardTitle className="mt-4">{line}</CardTitle>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="paper-shadow">
        <Eyebrow>How it works</Eyebrow>
        <SectionHeading>One workflow. Documented at every step.</SectionHeading>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { icon: <Package />, title: "Pickup", body: "On-site or at a staging area, with intake logs and signed transfer." },
            { icon: <Tag />, title: "Tag & log", body: "Per-item barcode, photo, category, and condition code captured." },
            { icon: <Sparkles />, title: "Restore", body: "Cleaning, odor, and contamination protocols matched to the peril." },
            { icon: <ArrowRight />, title: "Return", body: "Inventory reconciliation and signed return delivery to the property." },
          ].map((s) => (
            <Card key={s.title}>
              <CardBody>
                <div className="text-ink-900">{s.icon}</div>
                <CardTitle className="mt-4">{s.title}</CardTitle>
                <CardDescription>{s.body}</CardDescription>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Have a claim with soft contents in scope?
            </h2>
            <p className="mt-3 max-w-2xl text-ink-300">
              Submit the claim and upload contents photos. Same-day pickup is
              standard across the DFW metroplex.
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
