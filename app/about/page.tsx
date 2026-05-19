import { ArrowRight, Building2, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About — Insurance-Focused Textile Restoration",
  description:
    "Pure Soft Restoration is a North Texas textile restoration company built specifically for insurance claims. Real laundry and dry-cleaning infrastructure, claim-file-grade documentation, and a focus on adjusters and contents companies.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section tone="ink">
        <Eyebrow className="text-accent">About</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          A laundry operation built for the claim file.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
          Pure Soft Restoration sits at the intersection of real dry-cleaning
          and laundry infrastructure and the documentation discipline insurance
          claims require. We do not chase consumer business — we work the soft
          contents portion of property losses with adjusters and contents
          companies across North Texas.
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>What we do</Eyebrow>
            <SectionHeading>
              Soft contents restoration for fire, smoke, water, and mold losses.
            </SectionHeading>
            <SectionLead>
              Garments, linens, bedding, rugs, drapes, upholstered items, and
              luxury textiles — restored, documented, and returned through a
              workflow built for an adjuster, not a retail customer.
            </SectionLead>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/insurance-professionals" variant="primary" size="lg">
                How we work with adjusters <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Submit a claim
              </Button>
            </div>
          </div>
          <div className="md:col-span-5 grid gap-4">
            <Card>
              <CardBody>
                <Building2 className="text-navy" aria-hidden />
                <CardTitle className="mt-4">Real operating infrastructure</CardTitle>
                <CardDescription>
                  Dry-cleaning and laundry capacity already in place — not a
                  third-party hand-off.
                </CardDescription>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <ShieldCheck className="text-navy" aria-hidden />
                <CardTitle className="mt-4">Documentation-first</CardTitle>
                <CardDescription>
                  Chain of custody, salvage reporting, and treatment logs are
                  the deliverable — not an afterthought.
                </CardDescription>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <MapPin className="text-navy" aria-hidden />
                <CardTitle className="mt-4">North Texas focus</CardTitle>
                <CardDescription>
                  Same-day pickup across the DFW metroplex and surrounding
                  service area.
                </CardDescription>
              </CardBody>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <Eyebrow>Positioning</Eyebrow>
        <SectionHeading>Not a dry cleaner. A textile restoration partner.</SectionHeading>
        <SectionLead>
          The buyer is an adjuster, a carrier, a contents company, or a
          restoration GC. The output is a claim file. The standard is
          defensibility under desk review.
        </SectionLead>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-sm border border-slate-200 bg-paper p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">We are</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Operational and documentation-heavy</li>
              <li>Insurance-industry oriented</li>
              <li>CAT-ready and surge-capable</li>
              <li>Focused on textile salvage as severity reduction</li>
            </ul>
          </div>
          <div className="rounded-sm border border-slate-200 bg-paper p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">We are not</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>A consumer dry cleaner with a website</li>
              <li>A marketing-led restoration franchise</li>
              <li>A general contents pack-out company</li>
              <li>A retail bridal or luxury-care storefront</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Service area</Eyebrow>
        <SectionHeading>{site.address.locality} and surrounding North Texas markets.</SectionHeading>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 text-sm">
          {site.serviceArea.map((city) => (
            <li key={city} className="rounded-sm border border-slate-200 bg-paper-muted px-4 py-3">
              {city}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
