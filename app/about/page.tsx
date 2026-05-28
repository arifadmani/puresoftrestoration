import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Pure Soft Restoration is a North Texas textile and soft-contents restoration authority. Insurance-focused since 2009. IICRC-certified, OSHA-compliant.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              A textile floor<br />for <em>insurance work.</em>
            </h1>
          </div>
          <p className="lede">
            Pure Soft Restoration is a North Texas soft-contents restoration operation
            built around the way adjusters and carriers actually run a claim — designed,
            staffed, and certified for insurance work first.
          </p>
        </div>
      </section>

      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">01</span>
              <span className="kicker">Who We Are</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>
              Operational maturity,<br />not marketing copy.
            </h2>
          </div>
          <div>
            <p className="body-copy">
              We operate a dedicated soft-contents restoration facility in {site.address.locality}, Texas — built on top of {site.estYear}-vintage textile-processing infrastructure inherited from a parent dry-cleaning operation. The infrastructure is mature; the company is purpose-built for insurance claim work.
            </p>
            <p className="body-copy" style={{ marginTop: "16px" }}>
              Every workflow is designed around the file an adjuster or carrier will eventually read: defensible documentation, signed chain of custody, and salvage scores that hold up under scrutiny.
            </p>
          </div>
        </div>
      </section>

      <section className="section band-dark reveal" style={{ paddingBlock: "104px" }}>
        <div className="shell">
          <div className="shead" style={{ marginBottom: "44px" }}>
            <div>
              <div className="shead__num">
                <span className="idx" style={{ color: "var(--color-ox-hi)" }}>02</span>
                <span className="kicker">What We Operate To</span>
              </div>
              <h2 className="cat__display">Standards.<br />Stacked.</h2>
            </div>
            <p className="lede" style={{ color: "var(--color-ink-4)" }}>
              Insurance work is documentation work. Every standard we operate to compounds the credibility of the file we deliver.
            </p>
          </div>
          <div className="trust" style={{ borderColor: "rgba(246,242,233,0.14)" }}>
            <div className="trust__col" style={{ borderRightColor: "rgba(246,242,233,0.14)" }}>
              <h4 style={{ color: "var(--color-ox-hi)" }}>Certifications</h4>
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>IICRC-certified firm</li>
                <li style={{ color: "var(--color-bone-deep)" }}>OSHA-compliant biohazard handling</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Licensed &amp; insured in Texas</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Approved vendor — 40+ carriers</li>
              </ul>
            </div>
            <div className="trust__col" style={{ borderRightColor: "rgba(246,242,233,0.14)" }}>
              <h4 style={{ color: "var(--color-ox-hi)" }}>Service area</h4>
              <ul>
                {site.serviceArea.map((c) => (
                  <li key={c} style={{ color: "var(--color-bone-deep)" }}>{c} County</li>
                ))}
              </ul>
            </div>
            <div className="trust__col" style={{ borderRightColor: "rgba(246,242,233,0.14)" }}>
              <h4 style={{ color: "var(--color-ox-hi)" }}>Facility</h4>
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.address.locality}, {site.address.region}</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Climate-controlled intake</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Segregated biohazard wing</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Sealed transit network</li>
              </ul>
            </div>
            <div className="trust__col">
              <h4 style={{ color: "var(--color-ox-hi)" }}>Hours</h4>
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.hours.business}</li>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.hours.dispatch}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center", paddingBlock: "100px" }}>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", maxWidth: "20ch", marginInline: "auto" }}>
          Working a claim<br />with textiles in scope?
        </h2>
        <p className="body-copy" style={{ marginTop: "20px", marginInline: "auto" }}>
          We work with adjusters, carriers, contractors and contents companies across
          North Texas. Reach out to set up a referral or standing agreement.
        </p>
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
          <Link href="/contact" className="btn btn--primary">
            Contact us <span className="arr">→</span>
          </Link>
          <Link href="/insurance-professionals" className="btn btn--ghost">
            For insurance professionals <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
