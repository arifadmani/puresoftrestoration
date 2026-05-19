import { AlertTriangle, ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Submit a Claim",
  description:
    "Submit a soft contents textile restoration claim to Pure Soft Restoration. Insurance-focused intake for adjusters, carriers, contents companies, and property managers across North Texas.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section tone="ink">
        <Eyebrow className="text-signal">Submit a claim</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Route a soft contents loss to our intake team.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-ink-300 md:text-lg">
          The full intake form — claim and carrier fields, loss type, property
          details, contents description, and photo upload — goes live with
          Phase 2 of the build. While that is in flight, route active claims
          to the channels below and we will respond inside one business hour
          during business hours.
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow>How to reach intake right now</Eyebrow>
            <SectionHeading className="text-2xl md:text-3xl">
              Two channels until the full form is live.
            </SectionHeading>

            <div className="mt-8 grid gap-4">
              <Card>
                <CardBody className="flex items-start gap-4">
                  <Phone className="mt-1 text-ink-900" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      24/7 CAT response
                    </p>
                    <a
                      href={`tel:${site.contact.catLineTel}`}
                      className="mt-2 inline-block text-2xl font-semibold text-ink hover:text-ink-900"
                    >
                      {site.contact.catLineLabel}
                    </a>
                    <p className="mt-1 text-sm text-ink-600">
                      For active losses, large-loss events, and after-hours
                      intake.
                    </p>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="flex items-start gap-4">
                  <Mail className="mt-1 text-ink-900" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      Claim email
                    </p>
                    <a
                      href={`mailto:${site.contact.intakeEmail}?subject=New%20soft%20contents%20claim`}
                      className="mt-2 inline-block text-lg font-medium text-ink hover:text-ink-900"
                    >
                      {site.contact.intakeEmail}
                    </a>
                    <p className="mt-1 text-sm text-ink-600">
                      Send claim number, carrier, loss type, property address,
                      contact details, and any photos. We confirm receipt and a
                      claim reference inside one business hour.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="mt-8 rounded-sm border border-signal/30 bg-signal-soft/40 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 text-signal" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-signal">
                    Active loss in progress?
                  </p>
                  <p className="mt-1 text-sm text-ink-700">
                    Call the CAT response line directly. Email is for
                    non-emergency intake.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-sm border border-ink-900/10 bg-paper-shadow p-6">
              <Eyebrow>Coming with Phase 2</Eyebrow>
              <SectionHeading className="mt-3 text-xl md:text-2xl">
                Structured intake with photo upload.
              </SectionHeading>
              <ul className="mt-5 space-y-3 text-sm text-ink-700">
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Adjuster, carrier, and claim-number fields
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Loss type, date of loss, peril classification
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Property address, site contact, access notes
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Contents description and urgency
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Photo upload to a secured intake bucket
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-ink-900" />
                  Claim reference + chain-of-custody seed
                </li>
              </ul>
              <p className="mt-5 text-xs text-ink-500">
                Structured fields are chain-of-custody-ready from the first
                submission — the schema does not change when the portal ships.
              </p>
              <div className="mt-6">
                <Button href="/insurance-professionals" variant="ghost" size="md">
                  How we work with adjusters <ArrowRight size={14} aria-hidden />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
