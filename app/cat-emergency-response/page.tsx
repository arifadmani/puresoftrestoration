import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Large Loss & CAT Response",
  description:
    "Catastrophe-scale soft-contents restoration in North Texas. Surge capacity, mutual-aid agreements, unbroken chain of custody at event scale.",
  path: "/cat-emergency-response",
});

const capabilities = [
  { n: "01", h: "Rapid mobilization", p: "Crew and sealed transit dispatched within hours of carrier instruction." },
  { n: "02", h: "Climate-controlled facility", p: "Segregated by loss class, with a separate biohazard wing." },
  { n: "03", h: "Surge capacity", p: "Throughput to absorb large multi-property events without delay." },
  { n: "04", h: "Mutual-aid network", p: "Agreements with adjacent vendors extend reach beyond the metroplex." },
  { n: "05", h: "Unbroken custody", p: "Every item tracked individually, even at event scale." },
  { n: "06", h: "Carrier coordination", p: "One point of contact and one reporting standard across the event." },
];

export default function CatResponsePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Catastrophe (CAT) Soft-Contents Response",
          description:
            "Catastrophe-scale soft-contents restoration response in North Texas — surge capacity, mutual-aid agreements, chain of custody at event scale.",
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
          <div className="ph" data-label="Coverage schematic — DFW metroplex, 60-min response radius from Irving" style={{ minHeight: "440px" }} />
          <div>
            <p className="eyebrow">North Texas Coverage</p>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)", margin: "14px 0 18px" }}>
              Pre-positioned across<br />the metroplex.
            </h2>
            <p className="body-copy" style={{ fontSize: "16px" }}>
              {/*
                The current sentence frames Pure Soft as operating from a
                facility with crews staged for on-site dispatch — the
                opposite of the actual service model (CANONICAL_FACTS
                Round 1 #6). This entire CAT page is flagged for a copy
                rewrite. For now the address reference is stripped so the
                page compiles; the broader rewrite is Round 2 / 3.
              */}
              We accept rush textile work from partner contents companies
              across North Texas, with a 24-hour turnaround on rush orders
              from receipt.
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
              Surge capacity, mutual-aid agreements and a single chain of accountability
              — the operational backbone behind a calm response.
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
