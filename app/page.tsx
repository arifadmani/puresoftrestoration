import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  Droplets,
  FileSearch,
  Flame,
  ListChecks,
  Phone,
  ShieldCheck,
  Shirt,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Soft Contents & Textile Restoration for Insurance Claims",
  description:
    "North Texas soft contents and textile restoration specialists for insurance claims. Documentation, chain of custody, smoke odor and water/mold textile recovery for adjusters, carriers, and contents companies.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-paper">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_50%),radial-gradient(circle_at_80%_60%,white_0,transparent_45%)]" />
        <div className="container-prose relative grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              North Texas · Insurance-grade textile restoration
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Soft contents and textile restoration{" "}
              <span className="text-accent">for insurance claims.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
              Pure Soft Restoration is the dedicated textile authority adjusters
              call when a loss includes garments, linens, bedding, rugs, drapes,
              luxury textiles, smoke odor contamination, water damage, or
              mold-affected soft contents. Documentation, chain of custody, and
              severity reduction — built into the workflow.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" variant="accent" size="xl">
                Submit a Claim <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href="/insurance-professionals" variant="outline" size="xl" className="border-slate-300 text-paper hover:bg-paper hover:text-navy">
                Adjuster Resources
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" aria-hidden />
                Chain of custody documented
              </span>
              <span className="inline-flex items-center gap-2">
                <ClipboardCheck size={16} className="text-accent" aria-hidden />
                Salvage vs. replacement reporting
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck size={16} className="text-accent" aria-hidden />
                CAT-ready response
              </span>
            </div>
          </div>

          <aside className="md:col-span-4">
            <div className="rounded-sm border border-slate-700/40 bg-ink/80 p-6 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-sm bg-emergency/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emergency-soft">
                <AlertTriangle size={12} aria-hidden /> Active loss
              </div>
              <h2 className="mt-4 text-xl font-semibold leading-snug">
                CAT response line, 24/7
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                For active fires, water losses, mold remediation, or large
                contents jobs — call the response line for same-day pickup and
                on-scene documentation.
              </p>
              <a
                href={`tel:${site.contact.catLineTel}`}
                className="mt-5 inline-flex items-center gap-2 text-lg font-semibold text-accent hover:text-paper"
              >
                <Phone size={18} aria-hidden /> {site.contact.catLine}
              </a>
              <p className="mt-3 text-xs text-slate-400">
                Adjusters, carriers, and contents companies — direct line.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Section tone="muted">
        <Eyebrow>Built for the claim file</Eyebrow>
        <SectionHeading>
          The textile specialist your adjusters can defend in a desk review.
        </SectionHeading>
        <SectionLead>
          Every garment, linen, and soft good is logged, photographed,
          categorized, and reported. The output is a claim file that supports a
          clean salvage-versus-replacement decision and an audit-ready chain of
          custody.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <CardBody>
              <FileSearch className="text-navy" aria-hidden />
              <CardTitle className="mt-4">Documented inventory</CardTitle>
              <CardDescription>
                Item-level intake with photos, condition codes, and category
                tagging — delivered as a structured report adjusters can attach
                to the claim file.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ShieldCheck className="text-navy" aria-hidden />
              <CardTitle className="mt-4">Chain of custody</CardTitle>
              <CardDescription>
                Pickup-to-return tracking on every piece. Signed transfers,
                facility logs, and disposition decisions captured at each
                step.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ListChecks className="text-navy" aria-hidden />
              <CardTitle className="mt-4">Severity reduction</CardTitle>
              <CardDescription>
                Textile salvage routinely reduces claim severity versus full
                replacement. We report what was restored, what was
                non-restorable, and why.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Capabilities</Eyebrow>
            <SectionHeading>
              Three loss types. One textile workflow.
            </SectionHeading>
            <SectionLead>
              Whether the peril is fire, water, or mold — the soft contents
              follow the same documented restoration workflow, calibrated to
              the contamination type.
            </SectionLead>
            <div className="mt-7">
              <Button href="/insurance-professionals" variant="primary" size="lg">
                See how we work with adjusters <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
          <div className="md:col-span-7 grid gap-5 sm:grid-cols-2">
            <ServiceTile
              href="/soft-contents-restoration"
              icon={<Shirt className="text-navy" aria-hidden />}
              title="Soft Contents Restoration"
              body="Garments, linens, bedding, rugs, drapes, luxury textiles, upholstered items — restored, returned, and documented."
            />
            <ServiceTile
              href="/fire-smoke-odor-restoration"
              icon={<Flame className="text-navy" aria-hidden />}
              title="Fire & Smoke Odor"
              body="Soot extraction, smoke odor neutralization, ozone / hydroxyl protocols, and post-treatment air-quality checks on textile loads."
            />
            <ServiceTile
              href="/water-mold-textile-recovery"
              icon={<Droplets className="text-navy" aria-hidden />}
              title="Water & Mold Recovery"
              body="Cat-1, Cat-2, and Cat-3 water damage workflows for textiles, plus controlled antimicrobial treatment for mold-affected soft contents."
            />
            <ServiceTile
              href="/cat-emergency-response"
              icon={<Truck className="text-navy" aria-hidden />}
              title="CAT / Emergency Response"
              body="Event-mode capacity for storm, multi-property, and large-loss situations. On-scene intake, documented manifests, surge throughput."
            />
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              For insurance professionals
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              We work the way an adjuster works a claim.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Independent adjusters, public adjusters, carriers, contents
              companies, and restoration GCs use Pure Soft Restoration when
              soft contents are part of the loss. We integrate into the
              existing claim workflow rather than competing with it.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 text-sm text-slate-200">
              {[
                "Adjuster-facing intake form with claim, carrier, and loss fields",
                "Pickup and inventory at the loss site or contents staging area",
                "Per-item photos, condition codes, and salvage decisions",
                "Restoration logs and post-treatment documentation",
                "Return delivery with signed receipt and chain-of-custody log",
                "Defensible reports for desk reviews and reinspections",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/insurance-professionals" variant="accent" size="lg">
                Adjuster resources
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="border-slate-300 text-paper hover:bg-paper hover:text-navy">
                Submit a claim
              </Button>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-sm border border-slate-700/60 bg-ink p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Service area
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Dedicated North Texas coverage with same-day pickup across the
                DFW metroplex.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
                {site.serviceArea.map((city) => (
                  <li key={city} className="text-slate-200">
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <div className="rounded-sm border border-slate-200 bg-paper-muted p-8 md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emergency-deep">
                Active loss in progress?
              </p>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                Submit a claim or call the CAT response line.
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Upload photos, list contents categories, and route the claim
                directly to our intake team. For active events, the CAT line is
                staffed 24/7.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
              <Button href="/contact" variant="primary" size="xl" className="w-full md:w-auto">
                Submit a Claim
              </Button>
              <a
                href={`tel:${site.contact.catLineTel}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-emergency-deep hover:text-emergency"
              >
                <Phone size={14} aria-hidden /> CAT line: {site.contact.catLine}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ServiceTile({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="group block rounded-sm border border-slate-200 bg-paper p-6 transition-colors hover:border-navy hover:bg-paper-muted"
    >
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-base font-semibold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-navy group-hover:gap-2 transition-all">
        Learn more <ArrowRight size={12} aria-hidden />
      </span>
    </a>
  );
}
