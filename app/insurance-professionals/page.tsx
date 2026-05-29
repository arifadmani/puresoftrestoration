import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "For Insurance Professionals",
  description:
    "Pure Soft Restoration partners with adjusters and carriers on soft-contents claims — per-garment inventory at intake, insurance-approved invoicing immediately, and the textile specialty handled end-to-end through home delivery.",
  path: "/insurance-professionals",
});

const pillars = [
  { idx: "01", name: "Chain of custody", body: "Signed transfers from on-site pickup through sealed return. Every hand-off logged, timestamped and attributable." },
  { idx: "02", name: "Claim expertise", body: "We speak the language of the file — deductibles, scope, ACV vs RCV — and format our output to drop straight into your claim." },
  { idx: "03", name: "Salvage before replacement", body: "Every item scored for salvageability, so the replacement schedule only carries what genuinely can't be saved." },
  { idx: "04", name: "Cost reduction", body: "Restoration typically runs a fraction of replacement value — a measurable reduction on textile-heavy losses." },
  { idx: "05", name: "Professional reporting", body: "One report per lot covering photographs, protocols, and signatures — formatted for the carrier file." },
  { idx: "06", name: "Large-loss capability", body: "Surge capacity to absorb catastrophe-scale events without breaking custody on a single item." },
];

const reportingItems = [
  // Round 2 — replaces previously-claimed reporting standards. The actual
  // deliverable model is per-garment inventory + insurance-approved invoice
  // at intake; the items below describe what that invoice carries.
  { n: "i.", h: "Per-garment inventory", p: "Each item logged line-by-line at intake: garment, condition, loss class." },
  { n: "ii.", h: "Insurance-approved invoice", p: "Sent to the contents company or adjuster immediately at intake — carrier-formatted, ready to drop into the file." },
  { n: "iii.", h: "Cleaning protocol noted", p: "Each cleaning method recorded per garment so the path through restoration is traceable." },
  { n: "iv.", h: "Release document on request", p: "A work-completed / release document is available at return, formatted to your admin process." },
];

const engageWays = [
  { n: "01", name: "Direct adjuster engagement", desc: "Adjusters or carriers engage us directly. We mobilize for on-site soft-contents packout and carry the file from packout through home-delivery." },
  { n: "02", name: "Through your contents-company partner", desc: "When you already have a contents company on the loss, they route the soft contents to us. We absorb the textile specialty and the carrier-formatted intake invoicing." },
  { n: "03", name: "Standing agreement", desc: "Portfolio or program coverage with pre-negotiated terms — useful for carriers writing significant North Texas business." },
];

export default function InsuranceProfessionalsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Soft-Contents Restoration for Insurance Carriers",
          description:
            "Soft-contents textile restoration for insurance adjusters, carriers, and contractors. Per-garment inventory at intake, insurance-approved invoicing, on-site packout on direct-adjuster engagements.",
          slug: "/insurance-professionals",
        })}
      />

      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">For Insurance Professionals</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              Documentation your<br />claim file can <em>stand on.</em>
            </h1>
          </div>
          <p className="lede">
            We built Pure Soft around the way adjusters, carriers and contractors
            actually work a loss — defensible records, predictable scheduling, and a
            salvage-first posture that reduces indemnity without cutting corners.
          </p>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="serve" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {pillars.map((p) => (
            <article key={p.idx} className="serve__card">
              <span className="idx">{p.idx}</span>
              <h3>{p.name}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section band-dark reveal" style={{ paddingBlock: "110px" }}>
        <div className="shell">
          <div className="cat__grid">
            <div>
              <p className="eyebrow">The Reporting Standard</p>
              <h2 className="cat__display" style={{ margin: "18px 0 24px" }}>
                One report.<br />Everything <em>in&nbsp;it.</em>
              </h2>
              <p className="body-copy" style={{ color: "var(--color-ink-4)", fontSize: "16.5px" }}>
                Each closed lot delivers a single, structured document — the record an
                adjuster needs to justify scope and a carrier needs to settle with
                confidence.
              </p>
              <ul className="cat__list">
                {reportingItems.map((r) => (
                  <li key={r.h}>
                    <span className="n">{r.n}</span>
                    <div>
                      <h4>{r.h}</h4>
                      <p>{r.p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cat__media">
              <PlaceholderImage
                kind="sample-report"
                sizes="(max-width: 1080px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">A</span>
              <span className="kicker">Working Together</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              Three ways adjusters<br />and contractors engage.
            </h2>
          </div>
          <p className="lede">
            No portal to learn, no onboarding gauntlet. Pick up the phone, or set up a
            standing agreement.
          </p>
        </div>

        <div className="proc" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {engageWays.map((w) => (
            <div key={w.n} className="proc__step">
              <span className="proc__num">{w.n}</span>
              <h3 className="proc__name">{w.name}</h3>
              <p className="proc__desc">{w.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "48px", display: "flex", flexWrap: "wrap", gap: "14px" }}>
          <Link href="/contact" className="btn btn--primary">
            Set up vendor status <span className="arr">→</span>
          </Link>
          <Link href="/cat-emergency-response" className="btn btn--ghost">
            See CAT capability <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
