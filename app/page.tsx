import Link from "next/link";
import { IntakeForm } from "@/components/intake-form";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Textile & Soft-Contents Restoration",
  description: site.description,
  path: "/",
});

const serveCards = [
  {
    idx: "A/01",
    name: "Independent Adjusters",
    body: "Defensible, item-level documentation built for claim review: per-item photography, salvage scoring, and a clean chain-of-custody log that holds up under scrutiny.",
    cta: "How we support your file",
  },
  {
    idx: "A/02",
    name: "Public Adjusters",
    body: "We help you maximize recoverable value for the policyholder — preserving heirloom and high-value textiles that a replacement schedule would simply write off.",
    cta: "Valuation methodology",
  },
  {
    idx: "A/03",
    name: "Restoration Contractors",
    body: "A reliable soft-goods sub-vendor on whole-house and commercial projects — coordinated scheduling with your structural and contents crews, manifest hand-off ready.",
    cta: "Vendor onboarding",
  },
  {
    idx: "A/04",
    name: "Contents Companies",
    body: "When a contents project includes textiles beyond your wash floor, we take the soft goods off your hands and return them audit-ready, on schedule.",
    cta: "Partner with us",
  },
  {
    idx: "A/05",
    name: "Commercial Property Teams",
    body: "Multi-unit residential, hospitality and commercial portfolios. Standing agreements, post-event throughput, and tenant-facing reporting that reads cleanly.",
    cta: "Standing agreements",
  },
];

const restoreCards = [
  { tag: "01 · Couture & designer", name: "Luxury garments", desc: "Designer, couture and structured pieces handled to conservation standard.", label: "Luxury garments" },
  { tag: "02 · Wardrobe", name: "Everyday clothing", desc: "Full-wardrobe recovery, sorted, restored and returned ready to wear.", label: "Everyday clothing" },
  { tag: "03 · Household", name: "Linens", desc: "Table, bath and bed linens — smoke, soot and water-impacted.", label: "Linens" },
  { tag: "04 · Fill & structured", name: "Bedding", desc: "Down, fill and structured bedding deodorized and sanitized through.", label: "Bedding" },
  { tag: "05 · Window treatments", name: "Drapery", desc: "Custom drapery and panels cleaned without losing line or finish.", label: "Drapery" },
  { tag: "06 · Commercial wear", name: "Uniforms", desc: "Workwear and uniform programs turned around against tight SLAs.", label: "Uniforms" },
  { tag: "07 · Sentimental", name: "Stuffed animals", desc: "The pieces a family asks about first — restored, not replaced.", label: "Stuffed animals & plush" },
  { tag: "08 · Archival", name: "Heirloom textiles", desc: "Quilts, lace and generational pieces handled by conservation method.", label: "Heirloom textiles" },
  { tag: "09 · At scale", name: "Commercial textiles", desc: "Hospitality, healthcare and institutional soft goods, in volume.", label: "Commercial textiles" },
];

const processSteps = [
  { n: "01", name: "Intake", desc: "Photographic inventory at the loss address. Each textile group tagged and logged on-site." },
  { n: "02", name: "Documentation", desc: "Condition graded, fiber identified, salvage probability scored — captured per item." },
  { n: "03", name: "Cleaning", desc: "Loss-matched protocol: smoke, soot, water or biohazard, handled by certified technicians." },
  { n: "04", name: "Restoration", desc: "Finishing, deodorization and repair to return each piece to pre-loss condition." },
  { n: "05", name: "Quality Review", desc: "Independent inspection against the manifest before anything leaves the facility." },
  { n: "06", name: "Return", desc: "Climate-bagged, signature-released, with a single audit-grade report to the carrier." },
];

const catLossTypes = [
  { n: "i.", h: "House & structure fires", p: "Smoke and soot recovery for whole-home soft-contents losses." },
  { n: "ii.", h: "Smoke & odor losses", p: "Particulate and odor removal verified before release." },
  { n: "iii.", h: "Water & flood events", p: "Rapid intake to prevent secondary mold in fibers and fill." },
  { n: "iv.", h: "Large contents projects", p: "Commercial and multi-unit volume on a coordinated schedule." },
];

const trustCols = [
  {
    h: "Partner Categories",
    items: [
      "National & regional carriers",
      "Independent & public adjusters",
      "Large-loss general contractors",
      "Contents & restoration firms",
      "Commercial property managers",
    ],
  },
  {
    h: "Process Standards",
    items: [
      "IICRC textile protocols",
      "OSHA-compliant handling",
      "Sealed, tracked transit",
      "Segregated biohazard workflow",
      "Independent quality review",
    ],
  },
  {
    h: "Reporting Standards",
    items: [
      "Per-item photographic record",
      "Salvage score, 0–100",
      "Chain-of-custody log",
      "Single audit-grade report",
      "Carrier-ready formatting",
    ],
  },
  {
    h: "Credentials",
    items: [
      "IICRC-certified firm",
      "Licensed & insured",
      "Approved vendor, 40+ carriers",
      `North Texas, since ${site.estYear}`,
      "Mutual-aid network",
    ],
  },
];

export default function HomePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? "";

  return (
    <>
      {/* ===== SECTION 1 · HERO ===== */}
      <section className="hero shell">
        <div className="hero__grid">
          <div>
            <p className="eyebrow">
              Textile &amp; Soft-Contents Restoration · North Texas
            </p>
            <h1 className="display hero__display" style={{ marginTop: "22px" }}>
              When a loss touches textiles, the claim comes to <em>us.</em>
            </h1>
            <p className="body-copy" style={{ marginTop: "30px", fontSize: "18px" }}>
              {site.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "34px" }}>
              <Link href="/contact" className="btn btn--primary">
                Contact Our Response Team <span className="arr">→</span>
              </Link>
              <Link href="/insurance-professionals" className="btn btn--ghost">
                For Adjusters &amp; Contractors <span className="arr">→</span>
              </Link>
            </div>
            <div className="hero__cred">
              <span><b>IICRC-certified</b> textile technicians</span>
              <span>Serving the DFW metroplex since <b>{site.estYear}</b></span>
              <span>Approved vendor for <b>40+ carriers</b></span>
            </div>
          </div>
          <div className="hero__media">
            <div className="ph" data-label="Documentary — lot-tagged textile racks, conservation floor" />
          </div>
        </div>
      </section>

      <div className="shell"><hr className="rule" /></div>

      {/* ===== SECTION 2 · WHO WE SERVE ===== */}
      <section className="section shell reveal" id="serve">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">01</span>
              <span className="kicker">Who We Serve</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              Built for the operators<br />behind the claim.
            </h2>
          </div>
          <p className="lede">
            Pure Soft is a business-to-business operation. We work shoulder-to-shoulder
            with the professionals who manage a loss — not direct-to-homeowner — and we
            are listed as an approved soft-goods vendor across every major North Texas
            carrier.
          </p>
        </div>

        <div className="serve">
          {serveCards.map((c) => (
            <article key={c.idx} className="serve__card">
              <span className="idx">{c.idx}</span>
              <h3>{c.name}</h3>
              <p>{c.body}</p>
              <Link className="tlink" href="/insurance-professionals">
                {c.cta} <span className="arr">→</span>
              </Link>
            </article>
          ))}
          <article className="serve__card" style={{ background: "var(--color-bone-deep)" }}>
            <span className="idx" style={{ color: "var(--color-ink-3)" }}>—</span>
            <h3 style={{ color: "var(--color-ink)" }}>Homeowners</h3>
            <p>
              Most of our work reaches you through your adjuster or contractor. If your
              loss involves textiles you can&apos;t bear to lose, ask them to call Pure
              Soft.
            </p>
            <Link className="tlink" href="/contact">
              Talk to us <span className="arr">→</span>
            </Link>
          </article>
        </div>
      </section>

      {/* ===== SECTION 3 · RESTORE VS REPLACE ===== */}
      <section className="section--tight section band-dark reveal" style={{ paddingBlock: "110px" }}>
        <div className="shell">
          <div className="shead" style={{ marginBottom: "48px" }}>
            <div>
              <div className="shead__num">
                <span className="idx">02</span>
                <span className="kicker">The Economics</span>
              </div>
              <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)", color: "var(--color-bone-bright)" }}>
                Restoration beats<br />replacement. <em>Every&nbsp;time.</em>
              </h2>
            </div>
            <p className="lede" style={{ color: "var(--color-ink-4)" }}>
              On a textile-heavy loss, replacement is the most expensive line on the
              claim. Professional restoration recovers the value already on the policy —
              and preserves the items no settlement check can replace.
            </p>
          </div>

          <div className="rvr">
            <div className="rvr__col rvr__col--restore">
              <span className="rvr__tag">Restore — with Pure Soft</span>
              <p className="rvr__big" style={{ color: "var(--color-bone-bright)" }}>Recover</p>
              <ul className="rvr__list">
                <li><span className="mk">→</span> Lower indemnity cost — restoration typically runs a fraction of replacement value.</li>
                <li><span className="mk">→</span> Salvage opportunities surfaced item by item, with a documented score.</li>
                <li><span className="mk">→</span> Irreplaceable pieces preserved — heirlooms, custom garments, archival linens.</li>
                <li><span className="mk">→</span> A defensible, auditable record attached to the claim.</li>
              </ul>
            </div>
            <div className="rvr__col rvr__col--replace">
              <span className="rvr__tag">Replace — the default</span>
              <p className="rvr__big" style={{ color: "var(--color-ink-3)" }}>Write&nbsp;off</p>
              <ul className="rvr__list">
                <li><span className="mk" style={{ color: "var(--color-ink-4)" }}>×</span> Full replacement cost on every flagged item, at today&apos;s prices.</li>
                <li><span className="mk" style={{ color: "var(--color-ink-4)" }}>×</span> Recoverable goods discarded for lack of a salvage pathway.</li>
                <li><span className="mk" style={{ color: "var(--color-ink-4)" }}>×</span> Sentimental and one-of-a-kind items lost permanently.</li>
                <li><span className="mk" style={{ color: "var(--color-ink-4)" }}>×</span> Disputes over valuation, condition and scope.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4 · WHAT WE RESTORE ===== */}
      <section className="section shell reveal" id="restore">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">03</span>
              <span className="kicker">What We Restore</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              From everyday wardrobes<br />to the irreplaceable.
            </h2>
          </div>
          <p className="lede">
            If it&apos;s woven, stuffed, stitched or upholstered, it runs through our
            floor. Each category has its own protocol — fiber-matched, condition-coded
            and documented.
          </p>
        </div>

        <div className="restore-grid">
          {restoreCards.map((r) => (
            <article key={r.name} className="rcard">
              <div className="ph" data-label={r.label} />
              <div>
                <p className="rcard__tag">{r.tag}</p>
                <p className="rcard__name">{r.name}</p>
                <p className="rcard__desc">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="shell"><hr className="rule" /></div>

      {/* ===== SECTION 5 · PROCESS & CHAIN OF CUSTODY ===== */}
      <section className="section shell reveal" id="process">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">04</span>
              <span className="kicker">Process &amp; Chain of Custody</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              Six stages.<br />Nothing untracked.
            </h2>
          </div>
          <p className="lede">
            Every lot moves through the same accountable workflow — from the moment we
            tag it at the loss address to the signed, sealed return. Each transition is
            photographed, timestamped and recorded.
          </p>
        </div>

        <div className="proc">
          {processSteps.map((s) => (
            <div key={s.n} className="proc__step">
              <span className="proc__num">{s.n}</span>
              <h3 className="proc__name">{s.name}</h3>
              <p className="proc__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            marginTop: "48px",
            border: "1px solid var(--color-bone-rule)",
          }}
        >
          <div style={{ padding: "44px 40px", background: "var(--color-bone-bright)" }}>
            <p className="eyebrow">A record, not a receipt</p>
            <h3 className="display" style={{ fontSize: "34px", margin: "14px 0 16px" }}>
              Documentation, not paperwork.
            </h3>
            <p className="body-copy" style={{ fontSize: "15.5px" }}>
              Every lot closes with a single report — per-item photographs, cleaning
              protocol, salvage scores and signatures bound together. Carriers and
              adjusters receive an auditable record that stands up to litigation review,
              not a stack of loose tickets.
            </p>
            <Link className="tlink" href="/insurance-professionals" style={{ marginTop: "22px" }}>
              See the reporting standard <span className="arr">→</span>
            </Link>
          </div>
          <div
            className="ph"
            data-label="Manifest exhibit — signed lot report, before / after plates"
            style={{ minHeight: "320px" }}
          />
        </div>
      </section>

      {/* ===== SECTION 6 · LARGE LOSS & CAT ===== */}
      <section className="section band-dark reveal" style={{ paddingBlock: "120px" }}>
        <div className="shell">
          <div className="cat__grid">
            <div>
              <p className="eyebrow">Large Loss &amp; Catastrophe Response</p>
              <h2 className="cat__display" style={{ margin: "18px 0 24px" }}>
                When the region<br />goes <em>CAT,</em> we&apos;re<br />already moving.
              </h2>
              <p className="body-copy" style={{ color: "var(--color-ink-4)", fontSize: "16.5px" }}>
                House fires, severe smoke, large water events and multi-property
                commercial losses are where soft-contents recovery is won or lost. Pure
                Soft is built to absorb scale without breaking custody on a single lot.
              </p>
              <div className="cat__counties">
                {site.serviceArea.map((c) => (
                  <span key={c} className="cat__county">{c}</span>
                ))}
              </div>
              <Link href="/cat-emergency-response" className="btn btn--ox" style={{ marginTop: "32px" }}>
                Read the CAT response brief <span className="arr">→</span>
              </Link>
            </div>
            <div>
              <ul className="cat__list">
                {catLossTypes.map((t) => (
                  <li key={t.h}>
                    <span className="n">{t.n}</span>
                    <div>
                      <h4>{t.h}</h4>
                      <p>{t.p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7 · INDUSTRY TRUST ===== */}
      <section className="section shell reveal">
        <div className="shead">
          <div>
            <div className="shead__num">
              <span className="idx">05</span>
              <span className="kicker">Industry Trust</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(34px,4vw,54px)" }}>
              The standards behind<br />the signature.
            </h2>
          </div>
          <p className="lede">
            Insurance professionals don&apos;t need testimonials — they need to know the
            work will hold up. Here&apos;s what we operate to, and who we operate
            alongside.
          </p>
        </div>

        <div className="trust">
          {trustCols.map((c) => (
            <div key={c.h} className="trust__col">
              <h4>{c.h}</h4>
              <ul>
                {c.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="seal-row">
          <div className="seal"><span className="seal__mark">✓</span><span className="seal__txt"><b>IICRC Certified</b><span>Textile &amp; odor control</span></span></div>
          <div className="seal"><span className="seal__mark">✓</span><span className="seal__txt"><b>OSHA Compliant</b><span>Biohazard handling</span></span></div>
          <div className="seal"><span className="seal__mark">✓</span><span className="seal__txt"><b>Licensed &amp; Insured</b><span>State of Texas</span></span></div>
          <div className="seal"><span className="seal__mark">40+</span><span className="seal__txt"><b>Approved Carriers</b><span>Direct vendor status</span></span></div>
        </div>
      </section>

      {/* ===== SECTION 8 · CONTACT ===== */}
      <section className="section band-dark reveal" style={{ paddingBlock: "110px" }} id="contact">
        <div className="shell">
          <div className="contact__grid">
            <div>
              <div className="shead__num">
                <span className="idx" style={{ color: "var(--color-ox-hi)" }}>06</span>
                <span className="kicker">Contact</span>
              </div>
              <h2 className="contact__big" style={{ color: "var(--color-bone-bright)", marginTop: "14px" }}>
                A direct line.<br />No portal required.
              </h2>
              <p className="body-copy" style={{ color: "var(--color-ink-4)", marginTop: "24px", fontSize: "16.5px" }}>
                A loss doesn&apos;t wait, and neither do we. Reach the response team
                directly — by phone for active losses, or send the details and
                we&apos;ll mobilize.
              </p>
              <div className="contact__methods">
                <div className="contact__method" style={{ borderColor: "rgba(246,242,233,0.14)" }}>
                  <span className="lbl" style={{ color: "var(--color-ink-4)" }}>Response line</span>
                  <a className="val" href={`tel:${site.contact.responseLineTel}`} style={{ color: "var(--color-bone-bright)" }}>
                    {site.contact.responseLineLabel}
                    <small style={{ color: "var(--color-ink-4)" }}>24/7 for active losses</small>
                  </a>
                </div>
                <div className="contact__method" style={{ borderColor: "rgba(246,242,233,0.14)" }}>
                  <span className="lbl" style={{ color: "var(--color-ink-4)" }}>Email</span>
                  <a className="val" href={`mailto:${site.contact.responseEmail}`} style={{ color: "var(--color-bone-bright)" }}>
                    Email us
                    <small style={{ color: "var(--color-ink-4)" }}>{site.contact.responseEmail}</small>
                  </a>
                </div>
                <div className="contact__method" style={{ borderColor: "rgba(246,242,233,0.14)" }}>
                  <span className="lbl" style={{ color: "var(--color-ink-4)" }}>Facility</span>
                  <span className="val" style={{ color: "var(--color-bone-bright)" }}>
                    {site.address.locality}, {site.address.region}
                    <small style={{ color: "var(--color-ink-4)" }}>Serving the DFW metroplex</small>
                  </span>
                </div>
              </div>
            </div>

            <IntakeForm tone="ink" siteKey={turnstileSiteKey} compact />
          </div>
        </div>
      </section>
    </>
  );
}
