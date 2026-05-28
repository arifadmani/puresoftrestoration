import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Pure Soft Restoration is a North Texas textile and soft-contents restoration practice serving insurance adjusters, carriers, contractors, and contents companies. The team brings 20+ years of textile and soft-contents expertise to insurance recovery work.",
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
              Pure Soft Restoration is a North Texas textile and soft-contents
              restoration practice. The team behind the brand brings 20+ years
              of textile and soft-contents expertise — a deep history in
              operations and dry-cleaning / textile work, including programs
              for high-end retail and commercial clients.
            </p>
            <p className="body-copy" style={{ marginTop: "16px" }}>
              We work with insurance adjusters, contents companies, restoration
              contractors and carriers, with specialty machines tuned for
              garment and textile care across the board, and vendor
              relationships that let us see any textile work through.
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
              <h4 style={{ color: "var(--color-ox-hi)" }}>Background</h4>
              {/*
                "Certifications" column previously asserted "IICRC-certified
                firm", "OSHA-compliant biohazard handling", "Licensed & insured
                in Texas", "Approved vendor — 40+ carriers" — all unconfirmed
                and on the forbidden-claim list in CANONICAL_FACTS Round 1.
                Replaced with confirmed background facts.
              */}
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.experienceYears} years textile expertise</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Insurance-focused practice</li>
                <li style={{ color: "var(--color-bone-deep)" }}>High-end retail experience</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Commercial-job experience</li>
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
              <h4 style={{ color: "var(--color-ox-hi)" }}>Practice</h4>
              <ul>
                {/*
                  Round-1 facts only. "Facility" framing scrubbed — no public
                  street address per CANONICAL_FACTS Round 1 #4. Specific
                  "biohazard wing" / "sealed transit network" claims pending
                  Round 2 / 3 confirmation.
                */}
                <li style={{ color: "var(--color-bone-deep)" }}>Service-area business</li>
                <li style={{ color: "var(--color-bone-deep)" }}>North Texas, two-hour radius</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Specialty textile machines</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Vendor relationships across textiles</li>
              </ul>
            </div>
            <div className="trust__col">
              <h4 style={{ color: "var(--color-ox-hi)" }}>Availability</h4>
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.availability.intakeWindow}</li>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.availability.rushTurnaround}</li>
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
