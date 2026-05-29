import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PlaceholderImage } from "@/components/placeholder-image";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Water & Mold Textile Recovery",
  description:
    "Water, flood and mold textile recovery in North Texas. CAT-3 protocols, antimicrobial treatment, controlled-environment drying. Mold preempted before it forms.",
  path: "/water-mold-textile-recovery",
});

const protocols = [
  { n: "i.", h: "Rapid intake", p: "Hours-not-days mobilization to prevent secondary mold formation in fibers and fill." },
  { n: "ii.", h: "CAT-3 protocol", p: "Contaminated-water workflow segregated from clean intake floors." },
  { n: "iii.", h: "Antimicrobial", p: "Targeted antimicrobial treatment matched to fiber composition." },
  { n: "iv.", h: "Climate-controlled dry", p: "Drying chambers managed to humidity and temperature ranges that don't shock fiber." },
  { n: "v.", h: "Mold pre-empt", p: "Sub-fabric inspection before items advance — spores caught before they bloom." },
  { n: "vi.", h: "Finish & recoat", p: "Restoration of finish where displaced; structural repair where required." },
];

export default function WaterMoldPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Water & Mold Textile Recovery",
          description:
            "Water, flood and mold textile recovery for North Texas insurance losses — CAT-3 contaminated-water protocols and antimicrobial treatment.",
          slug: "/water-mold-textile-recovery",
        })}
      />

      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">Water &amp; Mold Textile Recovery</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              Water doesn&apos;t wait.<br /><em>We don&apos;t&nbsp;either.</em>
            </h1>
          </div>
          <p className="lede">
            On water and mold losses, the gap between salvageable and total loss is
            measured in hours. Our intake is built for speed — and for the
            per-garment inventory and insurance-approved invoice the file will
            need later.
          </p>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">01</span>
              <span className="kicker">Water &amp; Mold Workflow</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>
              Six steps,<br />no secondary mold.
            </h2>
          </div>
          <p className="lede">
            The protocols below are the difference between a salvaged claim and a
            replaced one. Hours, not days.
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
            <div>
              <p className="eyebrow">Mold &amp; Biohazard</p>
              <h2 className="cat__display" style={{ margin: "18px 0 24px" }}>
                Segregated. <em>Always.</em>
              </h2>
              <p className="body-copy" style={{ color: "var(--color-ink-4)", fontSize: "16.5px" }}>
                Mold-impacted and biohazard textiles run through dedicated
                workflows separate from clean intake — IICRC-certified
                handling from pickup through return, with the same
                per-garment inventory and insurance-approved invoicing every
                lot receives.
              </p>
            </div>
            <div style={{ position: "relative", minHeight: "380px" }}>
              <PlaceholderImage
                kind="warehouse-storage"
                caption="Climate-managed processing space"
                sizes="(max-width: 1080px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center", paddingBlock: "100px" }}>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", maxWidth: "20ch", marginInline: "auto" }}>
          Water event in progress?<br />Call now.
        </h2>
        <p className="body-copy" style={{ marginTop: "20px", marginInline: "auto" }}>
          Every hour we save on intake is hours of mold prevention.
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
