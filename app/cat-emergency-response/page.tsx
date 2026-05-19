import { AlertTriangle, Clock, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { Eyebrow, Section, SectionHeading, SectionLead } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const PATH = "/cat-emergency-response";
const NAME = "CAT / Emergency Response";
const DESC =
  "24/7 catastrophe and emergency textile response for North Texas — storm events, large losses, multi-property incidents. On-scene intake, manifest-grade documentation, surge throughput.";

export const metadata = buildMetadata({
  title: NAME,
  description: DESC,
  path: PATH,
});

export default function CatResponsePage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: NAME, description: DESC, slug: PATH })} />

      <section className="bg-emergency text-paper">
        <div className="container-prose py-16 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-sm bg-paper/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <AlertTriangle size={12} aria-hidden /> 24/7 CAT response line
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
            When the event is bigger than the plan.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-100 md:text-lg">
            Storm, fire, flood, and multi-property events all share a problem:
            soft contents stack up faster than a normal pipeline can handle.
            Pure Soft Restoration runs in event mode — on-scene intake,
            manifest-grade documentation, and the surge capacity to keep
            claims moving.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${site.contact.catLineTel}`}
              className="inline-flex h-14 items-center gap-2 rounded-sm bg-paper px-7 text-base font-semibold text-emergency-deep hover:bg-paper-muted"
            >
              <Phone size={16} aria-hidden /> Call CAT line: {site.contact.catLine}
            </a>
            <Button href="/contact" variant="outline" size="xl" className="border-paper text-paper hover:bg-paper hover:text-emergency-deep">
              Submit a claim
            </Button>
          </div>
        </div>
      </section>

      <Section tone="paper">
        <Eyebrow>What event mode looks like</Eyebrow>
        <SectionHeading>Different scale. Same documentation discipline.</SectionHeading>
        <SectionLead>
          CAT loads do not get a discount on documentation. The intake form
          works the same, the chain of custody works the same, and the
          reporting works the same — at higher volume.
        </SectionLead>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Card>
            <CardBody>
              <Truck className="text-navy" aria-hidden />
              <CardTitle className="mt-4">On-scene intake</CardTitle>
              <CardDescription>
                Mobile crews log, photograph, and bag textiles directly at the
                loss or contents staging area with manifest tracking.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Clock className="text-navy" aria-hidden />
              <CardTitle className="mt-4">Surge throughput</CardTitle>
              <CardDescription>
                Capacity scales with the event. We sequence loads to keep the
                most time-sensitive items moving without losing tracking.
              </CardDescription>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <AlertTriangle className="text-navy" aria-hidden />
              <CardTitle className="mt-4">Risk-prioritized</CardTitle>
              <CardDescription>
                Smoke, sewage, and mold-risk loads are isolated and
                prioritized to prevent secondary damage and protect unaffected
                contents.
              </CardDescription>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section tone="navy">
        <Eyebrow className="text-accent">Engagement</Eyebrow>
        <SectionHeading className="text-paper">
          Who calls the CAT line.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-200">
          {[
            "Carrier CAT desks coordinating large-scale response",
            "Independent adjuster firms standing up event-mode teams",
            "Contents companies needing textile surge partners",
            "Restoration GCs with soft contents in scope on large losses",
            "Public adjusters managing complex multi-property claims",
            "Property managers and risk teams with commercial textile losses",
          ].map((line) => (
            <li
              key={line}
              className="rounded-sm border border-slate-700/60 bg-ink/60 px-4 py-3"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-slate-300">
          Direct line for active events:{" "}
          <a
            href={`tel:${site.contact.catLineTel}`}
            className="font-semibold text-accent hover:text-paper"
          >
            {site.contact.catLine}
          </a>
        </p>
      </Section>
    </>
  );
}
