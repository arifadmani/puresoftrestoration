import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Large Loss & CAT Response",
  description:
    "Soft-contents catastrophe response in North Texas. Pure Soft mobilizes for on-site packout on direct-adjuster engagements and partners with contents companies on routed work — per-garment inventory at intake, insurance-approved invoicing, hand-delivered home return.",
  path: "/cat-emergency-response",
});

// Round 2 — capabilities rewritten to match the canonical service model.
// Scrubbed claims (kept here in commentary so the change is auditable):
//   "Rapid mobilization" / "Crew dispatched within hours" — no pre-positioned
//     dispatch crews exist; replaced with the actual on-site capability tied
//     to direct-adjuster mode.
//   "Climate-controlled facility ... segregated biohazard wing" — Round-3
//     question; specifics unconfirmed.
//   "Surge capacity to absorb large multi-property events" — capacity claim
//     unconfirmed; replaced with the actual operating model.
//   "Mutual-aid network / vendor agreements" — not part of the service model.
//   "Unbroken custody / every item tracked individually" — the actual model
//     is per-garment inventory at intake; reframed accordingly.
//   "Carrier coordination ... one reporting standard" — replaced with the
//     real differentiator (insurance-approved invoicing at intake).
const capabilities = [
  { n: "01", h: "On-site packout", p: "When adjusters or carriers engage us directly, we mobilize for on-site soft-contents packout — no contents-company middleman required." },
  { n: "02", h: "Receive-and-process", p: "When a contents company runs the packout, we receive the soft contents from them and take it from there." },
  { n: "03", h: "Per-garment inventory", p: "Every garment is logged line-by-line at intake — the inventory backs the carrier-formatted invoice." },
  { n: "04", h: "Insurance-approved invoicing", p: "An insurance-approved invoice goes back to the contents company or adjuster immediately at intake. The administrative load comes off your file." },
  { n: "05", h: "Cleaned and stored", p: "We clean only after the invoice is paid, then poly-bag and store items until the policyholder's home is ready for return." },
  { n: "06", h: "Home delivery", p: "Cleaned items are hand-delivered to the policyholder's home in poly bags — presented like fresh dry cleaning. No warehouse stop." },
];

export default function CatResponsePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Catastrophe (CAT) Soft-Contents Response",
          description:
            "Soft-contents catastrophe response in North Texas. Pure Soft Restoration mobilizes on-site for direct-adjuster engagements and partners with contents companies on routed work — per-garment inventory at intake, insurance-approved invoicing, hand-delivered return.",
          slug: "/cat-emergency-response",
        })}
      />

      <section
        className="band-dark"
        style={{
          paddingBlock: "84px 96px",
          borderBottom: "1px solid rgba(246,242,233,0.12)",
        }}
      >
        <div className="shell">
          <div className="phero__grid">
            <div>
              <p className="eyebrow">Large Loss &amp; Catastrophe Response</p>
              <h1 className="display phero__display" style={{ color: "var(--color-bone-bright)", marginTop: "20px" }}>
                Built to absorb<br />the <em>worst&nbsp;week</em><br />of the year.
              </h1>
            </div>
            <p className="lede" style={{ color: "var(--color-ink-4)" }}>
              Hail, severe water and multi-property fire don&apos;t arrive politely.
              When North Texas takes a catastrophe-scale hit, Pure Soft scales
              soft-contents recovery without breaking custody on a single lot.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="cat__grid" style={{ alignItems: "stretch" }}>
          <div style={{ position: "relative", minHeight: "440px" }}>
            <PlaceholderImage
              kind="coverage-map"
              caption="DFW metroplex · two-hour radius"
              sizes="(max-width: 1080px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">North Texas Coverage</p>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)", margin: "14px 0 18px" }}>
              Two ways soft contents<br />reach our floor.
            </h2>
            <p className="body-copy" style={{ fontSize: "16px" }}>
              When adjusters or carriers engage us directly, we mobilize for
              on-site soft-contents packout. When the loss routes through a
              contents company, they handle the packout and deliver the soft
              contents to us — and we take it from there with per-garment
              inventory, insurance-approved invoicing, cleaning, storage, and
              home-delivery back to the policyholder.
            </p>
            <div className="cat__counties" style={{ marginTop: "24px" }}>
              {site.serviceArea.map((c) => (
                <span key={c} className="cat__county" style={{ borderColor: "var(--color-bone-rule)", color: "var(--color-ink-2)" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section band-dark reveal" style={{ paddingBlock: "104px" }}>
        <div className="shell">
          <div className="shead" style={{ marginBottom: "44px" }}>
            <div>
              <div className="shead__num">
                <span className="idx" style={{ color: "var(--color-ox-hi)" }}>—</span>
                <span className="kicker">CAT Capability</span>
              </div>
              <h2 className="cat__display">Scale, on the<br />worst day.</h2>
            </div>
            <p className="lede" style={{ color: "var(--color-ink-4)" }}>
              The soft-contents half of a catastrophe loss is the easiest to
              mishandle and the costliest to write off. We focus the textile
              specialty so the rest of the loss can move.
            </p>
          </div>
          <ul className="cat__list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "48px" }}>
            {capabilities.map((c) => (
              <li key={c.n}>
                <span className="n">{c.n}</span>
                <div>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center", paddingBlock: "110px" }}>
        <p className="eyebrow">When it happens</p>
        <h2 className="display" style={{ fontSize: "clamp(38px,5.4vw,76px)", margin: "16px auto 0", maxWidth: "18ch" }}>
          Have us on the call<br />before the event.
        </h2>
        <p className="body-copy" style={{ margin: "24px auto 32px", textAlign: "center" }}>
          Standing CAT agreements mean priority mobilization when the region needs it
          most. Set one up now.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn btn--primary">
            Set up a CAT agreement <span className="arr">→</span>
          </Link>
          <Link href="/insurance-professionals" className="btn btn--ghost">
            For adjusters &amp; contractors <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
