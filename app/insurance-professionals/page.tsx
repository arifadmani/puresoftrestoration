import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "For Insurance Professionals",
  description:
    "Pure Soft Restoration partners with adjusters, carriers and contractors on soft-contents claims — defensible documentation, chain of custody, salvage-first reporting.",
  path: "/insurance-professionals",
});

const pillars = [
  { idx: "01", name: "Chain of custody", body: "Signed transfers from on-site pickup through sealed return. Every hand-off logged, timestamped and attributable." },
  { idx: "02", name: "Claim expertise", body: "We speak the language of the file — deductibles, scope, ACV vs RCV — and format our output to drop straight into your claim." },
  { idx: "03", name: "Salvage before replacement", body: "Every item scored for salvageability, so the replacement schedule only carries what genuinely can't be saved." },
  { idx: "04", name: "Cost reduction", body: "Restoration typically runs a fraction of replacement value — a measurable reduction on textile-heavy losses." },
  { idx: "05", name: "Professional reporting", body: "One audit-grade report per lot: photographs, protocols, scores and signatures, carrier-ready." },
  { idx: "06", name: "Large-loss capability", body: "Surge capacity to absorb catastrophe-scale events without breaking custody on a single item." },
];

const reportingItems = [
  { n: "i.", h: "Per-item photographic record", p: "Before and after, in consistent lighting and crop." },
  { n: "ii.", h: "Salvage score, 0–100", p: "A defensible salvageability rating for every flagged item." },
  { n: "iii.", h: "Chain-of-custody log", p: "Stage timestamps and signatures, intake to return." },
  { n: "iv.", h: "Compliance citations", p: "IICRC and OSHA protocols referenced per workflow." },
];

const engageWays = [
  { n: "01", name: "Per-claim referral", desc: "Send us a single loss. We handle intake, restoration and reporting, then hand the file back." },
  { n: "02", name: "Approved vendor", desc: "List Pure Soft as your soft-goods vendor for direct dispatch on every qualifying loss." },
  { n: "03", name: "Standing agreement", desc: "Portfolio and CAT coverage with pre-negotiated terms and priority mobilization." },
];

export default function InsuranceProfessionalsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Soft-Contents Restoration for Insurance Carriers",
          description:
            "Soft-contents textile restoration for insurance adjusters, carriers, and contractors. Defensible documentation, chain of custody, salvage-first reporting.",
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
              <div className="ph" data-label="Sample lot report — cover sheet, item schedule, before/after plates" />
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
