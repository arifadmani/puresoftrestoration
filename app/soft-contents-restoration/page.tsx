import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Soft Contents Restoration",
  description:
    "Soft-contents textile restoration in North Texas — garments, linens, bedding, drapery, heirlooms. The team behind Pure Soft brings 20+ years of textile and soft-contents expertise to insurance recovery work.",
  path: "/soft-contents-restoration",
});

const categories = [
  { tag: "01 · Couture & designer", name: "Luxury garments", desc: "Designer, couture and structured pieces handled to conservation standard." },
  { tag: "02 · Wardrobe", name: "Everyday clothing", desc: "Full-wardrobe recovery, sorted, restored and returned ready to wear." },
  { tag: "03 · Household", name: "Linens", desc: "Table, bath and bed linens — smoke, soot and water-impacted." },
  { tag: "04 · Fill & structured", name: "Bedding", desc: "Down, fill and structured bedding deodorized and sanitized through." },
  { tag: "05 · Window treatments", name: "Drapery", desc: "Custom drapery and panels cleaned without losing line or finish." },
  { tag: "06 · Commercial wear", name: "Uniforms", desc: "Workwear and uniform programs turned around against tight SLAs." },
  { tag: "07 · Sentimental", name: "Stuffed animals", desc: "The pieces a family asks about first — restored, not replaced." },
  { tag: "08 · Archival", name: "Heirloom textiles", desc: "Quilts, lace and generational pieces handled by conservation method." },
  { tag: "09 · At scale", name: "Commercial textiles", desc: "Hospitality, healthcare and institutional soft goods, in volume." },
];

const protocols = [
  { idx: "01", name: "Fiber & condition triage", body: "Composition identified, contamination class determined, salvage probability scored per item." },
  { idx: "02", name: "Loss-matched cleaning", body: "Smoke, soot, water, or biohazard — each routed to its certified protocol, never blended." },
  { idx: "03", name: "Finish & restoration", body: "Pressing, deodorization, structural repair where required. Returned to pre-loss condition." },
  { idx: "04", name: "Carrier-grade documentation", body: "Per-item photographs, salvage scores, and chain-of-custody log bound into a single report." },
];

export default function SoftContentsPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Soft Contents Textile Restoration",
          description:
            "Garment, linen, bedding, drapery and heirloom textile restoration for North Texas insurance claims.",
          slug: "/soft-contents-restoration",
        })}
      />

      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">Soft Contents Restoration</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              Every textile<br />on the schedule, <em>accounted for.</em>
            </h1>
          </div>
          <p className="lede">
            From a single garment to a whole-house wardrobe, every soft-contents item
            moves through the same documented, fiber-matched protocol — and returns to
            the policyholder in pre-loss condition.
          </p>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">01</span>
              <span className="kicker">Categories</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              What runs through<br />our floor.
            </h2>
          </div>
          <p className="lede">
            If it&apos;s woven, stuffed, stitched or upholstered, we have a protocol for
            it. Each category is handled by certified technicians.
          </p>
        </div>

        <div className="restore-grid">
          {categories.map((c) => (
            <article key={c.name} className="rcard">
              <div className="ph" data-label={c.name} />
              <div>
                <p className="rcard__tag">{c.tag}</p>
                <p className="rcard__name">{c.name}</p>
                <p className="rcard__desc">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section band-dark reveal" style={{ paddingBlock: "110px" }}>
        <div className="shell">
          <div className="shead" style={{ marginBottom: "44px" }}>
            <div>
              <div className="shead__num">
                <span className="idx" style={{ color: "var(--color-ox-hi)" }}>02</span>
                <span className="kicker">The Protocol</span>
              </div>
              <h2 className="cat__display">Four stages.<br />One standard.</h2>
            </div>
            <p className="lede" style={{ color: "var(--color-ink-4)" }}>
              The same workflow applies whether we receive ten items or ten thousand.
              Each item gets the same attention; the carrier gets the same report.
            </p>
          </div>
          <div className="proc" style={{ gridTemplateColumns: "repeat(4,1fr)", borderTopColor: "var(--color-ox-hi)" }}>
            {protocols.map((p) => (
              <div key={p.idx} className="proc__step" style={{ borderRightColor: "rgba(246,242,233,0.14)" }}>
                <span className="proc__num">{p.idx}</span>
                <h3 className="proc__name" style={{ color: "var(--color-bone-bright)" }}>{p.name}</h3>
                <p className="proc__desc" style={{ color: "var(--color-ink-4)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", maxWidth: "20ch", marginInline: "auto" }}>
          Have a claim with<br />soft contents in scope?
        </h2>
        <p className="body-copy" style={{ marginTop: "20px", marginInline: "auto" }}>
          Reach our intake team by email. We are available 24 hours for rush
          textile intake from contents companies, adjusters and contractors
          across North Texas.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
          <Link href="/contact" className="btn btn--primary">
            Submit a loss <span className="arr">→</span>
          </Link>
          <Link href="/insurance-professionals" className="btn btn--ghost">
            For adjusters &amp; contractors <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
