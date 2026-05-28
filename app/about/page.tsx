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
              <h4 style={{ color: "var(--color-ox-hi)" }}>Credentials</h4>
              {/*
                CANONICAL_FACTS Round 2 — IICRC-certified (specifics pending)
                and fully insured for soft-contents restoration work. OSHA-
                related claims are permanently scrubbed (no specific OSHA
                training credentials held). 40+ carriers replaced with the
                eight confirmed carriers in the Background column.
              */}
              <ul>
                <li style={{ color: "var(--color-bone-deep)" }}>IICRC-certified</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Fully insured for restoration work</li>
                <li style={{ color: "var(--color-bone-deep)" }}>{site.experienceYears} years textile expertise</li>
                <li style={{ color: "var(--color-bone-deep)" }}>Insurance-focused practice</li>
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
              <h4 style={{ color: "var(--color-ox-hi)" }}>Carrier Programs</h4>
              {/*
                CANONICAL_FACTS Round 2 — the eight carriers Pure Soft has
                completed work on, directly and in partnership with contents
                companies.
              */}
              <ul>
                {site.carriersWorked.map((c) => (
                  <li key={c} style={{ color: "var(--color-bone-deep)" }}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK — two service modes ===== */}
      <section className="section shell reveal" style={{ paddingBlock: "104px" }}>
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">03</span>
              <span className="kicker">How We Work</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(30px,3.6vw,46px)" }}>
              Two engagement modes.<br />Same standard.
            </h2>
          </div>
          <p className="lede">
            Soft-contents recovery routes to Pure Soft two ways. The work is the
            same; the lead origin and on-site posture differ.
          </p>
        </div>

        <div className="proc" style={{ gridTemplateColumns: "1fr 1fr", borderTopColor: "var(--color-ink)" }}>
          <div className="proc__step">
            <span className="proc__num">{site.serviceModes.directAdjuster.label.slice(0, 1)}/01</span>
            <h3 className="proc__name">{site.serviceModes.directAdjuster.label}</h3>
            <p className="proc__desc">{site.serviceModes.directAdjuster.summary}</p>
          </div>
          <div className="proc__step">
            <span className="proc__num">{site.serviceModes.throughContentsCompany.label.slice(0, 1)}/02</span>
            <h3 className="proc__name">{site.serviceModes.throughContentsCompany.label}</h3>
            <p className="proc__desc">{site.serviceModes.throughContentsCompany.summary}</p>
          </div>
        </div>

        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            border: "1px solid var(--color-bone-rule)",
          }}
        >
          <div style={{ padding: "36px 32px", background: "var(--color-bone-bright)" }}>
            <p className="eyebrow">The Differentiator</p>
            <h3 className="display" style={{ fontSize: "28px", margin: "10px 0 14px" }}>
              Insurance-approved invoicing<br />the moment we receive the lot.
            </h3>
            <p className="body-copy" style={{ fontSize: "15.5px" }}>
              Most contents companies absorb the administrative load of
              carrier-formatted intake paperwork themselves. We take it off
              their plate: per-garment inventory at intake, an
              insurance-approved invoice issued immediately, and a partner who
              already speaks the carrier&apos;s file format.
            </p>
          </div>
          <div style={{ padding: "36px 32px" }}>
            <p className="eyebrow">The Return</p>
            <h3 className="display" style={{ fontSize: "28px", margin: "10px 0 14px" }}>
              Hand-delivered, dry-cleaner clean,<br />to the policyholder.
            </h3>
            <p className="body-copy" style={{ fontSize: "15.5px" }}>
              Items are cleaned only after the invoice is paid, poly-bagged,
              stored until the home is ready, then hand-delivered to the
              policyholder&apos;s home — presented like fresh dry cleaning. No
              warehouse stop, no third hand-off.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell reveal" style={{ textAlign: "center", paddingBlock: "100px" }}>
        <h2 className="display" style={{ fontSize: "clamp(34px,5vw,64px)", maxWidth: "20ch", marginInline: "auto" }}>
          Working a claim<br />with textiles in scope?
        </h2>
        <p className="body-copy" style={{ marginTop: "20px", marginInline: "auto" }}>
          Adjusters and carriers: come direct and we mobilize on-site. Contents
          companies: send us the soft contents and we take the administrative
          burden off your file.
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
