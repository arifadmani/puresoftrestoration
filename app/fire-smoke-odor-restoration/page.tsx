import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Fire & Smoke Odor Restoration",
  description:
    "Fire, smoke and soot textile restoration in North Texas. Ozone, hydroxyl, and ESPORTA wet-wash workflows. Particulate verification before release. IICRC-certified.",
  path: "/fire-smoke-odor-restoration",
});

const protocols = [
  { n: "i.", h: "On-site triage", p: "Soot class, smoke residue and substrate identified before items leave the loss." },
  { n: "ii.", h: "Pre-treatment", p: "Surface particulate removed in a controlled environment before wet protocols begin." },
  { n: "iii.", h: "Ozone & hydroxyl", p: "Deep odor neutralization on items where wet cleaning isn't viable." },
  { n: "iv.", h: "ESPORTA wet-wash", p: "Fiber-safe wash cycles for textile loads — particulate and odor verified at exit." },
  { n: "v.", h: "Finishing", p: "Pressing, structural repair, and re-deodorization where required." },
  { n: "vi.", h: "Release inspection", p: "Independent particulate and odor check before any item is returned." },
];

export default function FireSmokePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Fire & Smoke Odor Restoration",
          description:
            "Smoke and soot textile restoration for fire losses in North Texas — ozone, hydroxyl, ESPORTA wet-wash protocols.",
          slug: "/fire-smoke-odor-restoration",
        })}
      />

      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">Fire &amp; Smoke Odor Restoration</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              When the loss is<br /><em>smoke</em>, we have a<br />protocol for it.
            </h1>
          </div>
          <p className="lede">
            Fire and smoke don&apos;t just damage textiles — they re-emit odor weeks
            after the event if recovery isn&apos;t done right. Our protocols are built
            around verified outcomes, not best effort.
          </p>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">01</span>
              <span className="kicker">Smoke &amp; Soot Workflow</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>
              Six checkpoints.<br />Each one a release gate.
            </h2>
          </div>
          <p className="lede">
            Nothing leaves the floor without passing every stage. Particulate counts and
            odor verification at the end — not after the policyholder complains.
          </p>
        </div>

        <ul className="cat__list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "48px", marginTop: "16px", borderTop: "1px solid var(--color-bone-rule)" }}>
          {protocols.map((p) => (
            <li key={p.n} style={{ borderColor: "var(--color-bone-rule)" }}>
              <span className="n">{p.n}</span>
              <div>
                <h4 style={{ color: "var(--color-ink)" }}>{p.h}</h4>
                <p style={{ color: "var(--color-ink-3)" }}>{p.p}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section band-dark reveal" style={{ paddingBlock: "104px" }}>
        <div className="shell">
          <div className="cat__grid" style={{ alignItems: "center" }}>
            <div className="ph" data-label="ESPORTA wash floor — fiber-safe wash cycles for smoke-impacted textiles" style={{ minHeight: "380px" }} />
            <div>
              <p className="eyebrow">Equipment &amp; Verification</p>
              <h2 className="cat__display" style={{ margin: "18px 0 24px" }}>
                Not just clean.<br /><em>Verified</em> clean.
              </h2>
              <p className="body-copy" style={{ color: "var(--color-ink-4)", fontSize: "16.5px" }}>
                Ozone chamber, hydroxyl generators, ESPORTA washes, and an independent
                particulate / odor verification station. Each unit logged against the
                lot ID — the proof the carrier needs, attached to the file.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center", paddingBlock: "100px" }}>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", maxWidth: "20ch", marginInline: "auto" }}>
          Smoke-impacted lot<br />ready for pickup?
        </h2>
        <p className="body-copy" style={{ marginTop: "20px", marginInline: "auto" }}>
          Call the response line for active losses, or send the details and we&apos;ll
          dispatch.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
          <Link href="/contact" className="btn btn--primary">
            Submit a loss <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
