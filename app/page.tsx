import { Button, BtnArrow } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { Display, Eyebrow, Lede, Section, SectionTag } from "@/components/section";
import { LotTile } from "@/components/ops/lot-tile";
import { Metric } from "@/components/ops/metric";
import { ProcessStep } from "@/components/ops/process-step";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Soft-Goods Recovery for Insurance Carriers",
  description: site.description,
  path: "/",
});

const carrierPlaceholders = [
  "Carrier · A",
  "Carrier · B",
  "Carrier · C",
  "Carrier · D",
  "Carrier · E",
  "Carrier · F",
  "Carrier · G",
];

const capabilities = [
  {
    nu: "CAP / 01",
    ico: "[ smoke · soot · char ]",
    name: "Smoke & soot recovery.",
    desc: "Ozone, hydroxyl and ESPORTA wet-wash workflows for fire-impacted soft goods. pH-balanced rinse cycles, fiber-safe deodorization, particulate verification before release.",
    list: [
      "Ozone chamber",
      "Hydroxyl",
      "ESPORTA wash",
      "pH verification",
      "Particulate test",
      "Odor seal",
    ],
    tint: "bg-[linear-gradient(180deg,var(--color-paper-bright),#F0EBE0)]",
  },
  {
    nu: "CAP / 02",
    ico: "[ water · cat-3 · flood ]",
    name: "Water & flood remediation.",
    desc: "CAT-3 contaminated water protocols, antimicrobial treatment, and controlled-environment drying to prevent secondary mold formation in fibers, fill, and structured upholstery.",
    list: [
      "CAT-3 protocol",
      "Antimicrobial",
      "Climate dry",
      "Mold pre-empt",
      "Sub-fabric scan",
      "Recoat & finish",
    ],
    tint: "bg-[linear-gradient(180deg,var(--color-paper-bright),#E7ECEC)]",
  },
  {
    nu: "CAP / 03",
    ico: "[ mold · bio · trauma ]",
    name: "Mold & biohazard.",
    desc: "Certified biohazard protocols for trauma, sewage and mold-contaminated textiles. Chain-of-custody from sealed transport to verified release. OSHA / IICRC compliant.",
    list: [
      "IICRC certified",
      "OSHA chain",
      "Sealed transit",
      "Lab verify",
      "Trauma-rated",
      "Compliance pack",
    ],
    tint: "bg-[linear-gradient(180deg,var(--color-paper-bright),#ECE6E0)]",
  },
];

const processSteps = [
  {
    state: "done" as const,
    label: "Stage 01",
    index: "01",
    name: "On-site intake",
    description:
      "Photographic inventory at loss address. RFID lot tag assigned per textile group.",
    meta: (
      <>
        Lot · <b className="text-ink-900 font-medium">LOT-2604-189</b>
        <br />
        Tagged · <b className="text-ink-900 font-medium">00:14:22</b>
        <br />
        Adj. signature ✓
      </>
    ),
  },
  {
    state: "done" as const,
    label: "Stage 02",
    index: "02",
    name: "Sealed transit",
    description:
      "Tamper-evident containers, GPS-tracked transit to Pure Soft facility.",
    meta: (
      <>
        Veh · <b className="text-ink-900 font-medium">PS-T-04</b>
        <br />
        Seal · <b className="text-ink-900 font-medium">SEAL-A19</b>
        <br />
        Arrival ✓
      </>
    ),
  },
  {
    state: "done" as const,
    label: "Stage 03",
    index: "03",
    name: "Pre-process scan",
    description:
      "Fiber composition, damage class, and salvage probability scored per item.",
    meta: (
      <>
        Items · <b className="text-ink-900 font-medium">312</b>
        <br />
        Salvage · <b className="text-ink-900 font-medium">94%</b>
        <br />
        Classified ✓
      </>
    ),
  },
  {
    state: "active" as const,
    label: "Stage 04 · NOW",
    index: "04",
    name: "Decontamination",
    description:
      "Loss-type-matched workflow: ozone, ESPORTA wash, antimicrobial, hydroxyl.",
    meta: (
      <>
        Cycle · <b className="text-ink-900 font-medium">3 of 4</b>
        <br />
        pH · <b className="text-ink-900 font-medium">7.1</b>
        <br />
        ETA · <b className="text-ink-900 font-medium">02:14</b>
      </>
    ),
  },
  {
    state: "pending" as const,
    label: "Stage 05",
    index: "05",
    name: "Carrier audit",
    description:
      "Adjuster-accessible review portal: photo before/after, restoration grade per item.",
    meta: (
      <>
        Portal ready
        <br />
        Audit · <b className="text-ink-900 font-medium">queued</b>
      </>
    ),
  },
  {
    state: "pending" as const,
    label: "Stage 06",
    index: "06",
    name: "Sealed return",
    description:
      "Climate-bagged, signature-released. Final PDF manifest delivered to carrier.",
    meta: (
      <>
        Manifest · <b className="text-ink-900 font-medium">pending</b>
        <br />
        Return · <b className="text-ink-900 font-medium">scheduled</b>
      </>
    ),
  },
];

const audiences = [
  {
    ix: "A/01",
    h: "Insurance carriers.",
    d: "Approved vendor across 40+ carriers nationally. Direct billing, deductible-aware reporting, carrier-portal audit access on every lot.",
    lk: "Carrier intake",
    href: "/insurance-professionals",
  },
  {
    ix: "A/02",
    h: "Public adjusters.",
    d: "Adjuster-grade documentation built for claim disputes: photographs, salvage scoring, certified pre-loss valuation methodology.",
    lk: "Adjuster portal",
    href: "/insurance-professionals",
  },
  {
    ix: "A/03",
    h: "Large-loss GCs.",
    d: "Sub-vendor on whole-house and commercial restoration projects. Coordinated scheduling with structural and contents teams.",
    lk: "GC partnership",
    href: "/insurance-professionals",
  },
  {
    ix: "A/04",
    h: "Property managers.",
    d: "Multi-unit residential and commercial property teams. Standing agreements, post-event throughput SLA, tenant-facing reporting.",
    lk: "PM agreement",
    href: "/insurance-professionals",
  },
];

const mapRegions: { name: string; jobs: number; pos: string; tone: "warm" | "cool" }[] = [
  { name: "Tarrant", jobs: 12, pos: "top-[58%] left-[6%]", tone: "warm" },
  { name: "Dallas", jobs: 14, pos: "top-[66%] left-[74%]", tone: "warm" },
  { name: "Collin", jobs: 9, pos: "top-[14%] left-[62%]", tone: "warm" },
  { name: "Denton", jobs: 4, pos: "top-[10%] left-[12%]", tone: "cool" },
  { name: "Rockwall", jobs: 1, pos: "top-[34%] left-[80%]", tone: "cool" },
  { name: "Johnson", jobs: 1, pos: "top-[82%] left-[8%]", tone: "cool" },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-paper">
        <div className="doc-shell gutter pt-12 lg:pt-14">
          <div className="grid lg:grid-cols-[1.45fr_1fr] border border-ink-900/20 rounded-lg overflow-hidden bg-paper-bright shadow-[var(--shadow-op)]">
            {/* Hero left */}
            <div className="relative p-10 lg:p-14 lg:border-r border-b lg:border-b-0 border-ink-900/10">
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-signal-soft mono text-[11px] tracking-[0.14em] uppercase text-[#7A3A0F]">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
                  Carrier-grade textile recovery
                </span>
                <span className="mono text-[11px] tracking-[0.14em] uppercase text-ink-500">
                  Operating across DFW since {site.estYear}
                </span>
              </div>

              <Display level={1} size="d1" className="text-ink-900">
                The textile<br />
                recovery <span className="italic text-ink-700">operation</span><br />
                insurance carriers<br />
                call{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">first.</span>
                  <span
                    aria-hidden
                    className="absolute left-[-2px] right-[-2px] bottom-[6px] h-3.5 bg-signal-soft rounded-[2px] -z-0"
                  />
                </span>
              </Display>

              <p className="mt-9 max-w-[54ch] text-[16px] leading-[1.6] text-ink-600">
                <b className="text-ink-900 font-medium">Pure Soft Restoration</b> is North Texas&apos;s specialized soft-goods recovery operation — engineered for the scale, speed and documentation rigor that insurance carriers require on smoke, water, fire and biohazard losses. <b className="text-ink-900 font-medium">24-hour CAT mobilization. Chain-of-custody on every item. Carrier-audited reporting.</b>
              </p>

              <div className="mt-9 flex flex-wrap gap-2.5">
                <Button href="/contact" variant="primary" size="lg">
                  Initiate a recovery <BtnArrow />
                </Button>
                <Button href="/insurance-professionals" variant="ghost" size="lg">
                  Read the operations manual <BtnArrow glyph="↗" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-16 pt-6 border-t border-ink-900/10">
                <Metric value={site.stats.mobilizationHours} unit="HR" label="CAT Mobilization Window" />
                <Metric value={site.stats.facilitySqft} unit="SQFT" label="Climate-controlled facility" />
                <Metric value={site.stats.activeCarriers} unit="CARRIERS" label="Active vendor relationships" />
              </div>
            </div>

            {/* Hero right — live ops panel */}
            <aside className="p-7 bg-[linear-gradient(180deg,var(--color-paper-bright),var(--color-paper))]">
              <div className="flex items-center justify-between mb-4">
                <div className="mono text-[11px] tracking-[0.16em] uppercase text-ink-500">
                  Live operations · <span className="text-ink-900 font-semibold">Floor 2 · Restoration</span>
                </div>
                <div className="mono text-[11px] tracking-[0.1em] text-ink-500">
                  14:36 CST
                </div>
              </div>

              <div className="space-y-2.5">
                <LotTile
                  id="LOT-2604-189"
                  title="Residential · Frisco, TX"
                  meta="Carrier · State Farm · Adj. M. Reyes · 312 items"
                  stage="active"
                />
                <LotTile
                  id="LOT-2604-187"
                  title="Commercial · Plano, TX"
                  meta="Carrier · Travelers · Adj. K. Patel · 1,024 items"
                  stage="audit"
                />
                <LotTile
                  id="LOT-2604-182"
                  title="Residential · McKinney, TX"
                  meta="Carrier · Allstate · Adj. R. Nguyen · 96 items"
                  stage="sealed"
                />
                <LotTile
                  id="LOT-2604-191"
                  title="Commercial · Dallas, TX"
                  meta="Carrier · USAA · Adj. T. Holcomb · 488 items"
                  stage="intake"
                />
              </div>

              <div className="mt-4 p-3.5 rounded-sm border border-ink-900/10 bg-[#FBF8F0]">
                <div className="flex justify-between mono text-[11px] tracking-[0.1em] text-ink-500 mb-2">
                  <span>Active throughput · today</span>
                  <span className="text-ink-900">68%</span>
                </div>
                <div className="h-1.5 rounded-full bg-paper-shadow overflow-hidden relative">
                  <span
                    className="absolute left-0 top-0 bottom-0 rounded-full bg-[linear-gradient(90deg,var(--color-signal),var(--color-signal-hi))]"
                    style={{ width: "68%" }}
                  />
                </div>
                <div className="flex justify-between mono text-[11px] tracking-[0.1em] text-ink-500 mt-2.5">
                  <span>Audit queue</span>
                  <span className="text-ink-900">12 lots</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Carrier strip */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 border-y border-ink-900/10">
            <span className="mono text-[11px] tracking-[0.16em] uppercase text-ink-500">
              Trusted vendor — 40+ carriers
            </span>
            <div className="flex flex-1 items-center justify-around min-w-0 overflow-x-auto">
              {carrierPlaceholders.map((c, i) => (
                <span
                  key={c}
                  className={`mono text-[11px] tracking-[0.14em] uppercase text-ink-400 px-5 ${i > 0 ? "border-l border-ink-900/10" : ""}`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionTag label="§ 04 — Capabilities · Three loss types" right="One operational standard" pulse />

      {/* ===== CAPABILITIES ===== */}
      <Section tone="paper" innerClassName="">
        <div id="capabilities" className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-end mb-16">
          <Display size="d2">
            Three loss types.<br />
            One operational standard.
          </Display>
          <Lede>
            Every recovery — regardless of cause — runs through the same carrier-audited workflow: photographic intake, RFID lot tagging, climate-controlled processing, and sealed-return manifest. The cause changes. The rigor does not.
          </Lede>
        </div>

        <div className="grid md:grid-cols-3 border border-paper-rule rounded-lg overflow-hidden bg-paper-bright">
          {capabilities.map((c, i) => (
            <div
              key={c.nu}
              className={`relative flex flex-col p-9 md:p-10 min-h-[400px] ${c.tint} ${i < capabilities.length - 1 ? "md:border-r border-paper-rule" : ""} ${i < capabilities.length - 1 ? "border-b md:border-b-0" : ""} border-paper-rule`}
            >
              <div className="mono text-[11px] tracking-[0.18em] text-ink-500">{c.nu}</div>
              <div className="absolute top-8 right-8 mono text-[10px] tracking-[0.14em] text-ink-400">{c.ico}</div>
              <div className="serif-display text-[32px] leading-[1.2] tracking-[-0.015em] mt-16 mb-5 min-h-[80px]">
                {c.name}
              </div>
              <p className="text-[14px] leading-[1.6] text-ink-600 max-w-[34ch]">{c.desc}</p>
              <div className="mt-auto pt-6 border-t border-dashed border-paper-rule grid grid-cols-2 gap-x-5 gap-y-1.5 mono text-[11px] tracking-[0.06em] text-ink-600">
                {c.list.map((item) => (
                  <span key={item}>
                    <span className="text-ink-300">·&nbsp;&nbsp;</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SectionTag label="§ 05 — Process · Chain of custody" right="The six-stage operational rail" pulse />

      {/* ===== PROCESS ===== */}
      <Section
        tone="paper"
        className="bg-[linear-gradient(180deg,var(--color-paper)_0%,var(--color-paper-shadow)_100%)]"
      >
        <div id="process" className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-end mb-12">
          <Display size="d2">
            Every fiber<br />
            accounted for.
          </Display>
          <Lede>
            The Pure Soft rail tracks each lot through six stages from on-site intake to carrier-sealed return. Every transition is timestamped, photographed and signed — exportable to the carrier as a single audit-grade PDF.
          </Lede>
        </div>

        {/* Six-stage rail */}
        <div className="relative mt-12 rounded-lg border border-ink-900/10 bg-paper-bright">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 py-9 relative">
            {/* track + progress (desktop only) */}
            <div
              aria-hidden
              className="hidden lg:block absolute left-[5%] right-[5%] top-[96px] h-px bg-ink-100"
            />
            <div
              aria-hidden
              className="hidden lg:block absolute left-[5%] top-[96px] h-px bg-[linear-gradient(90deg,var(--color-signal),var(--color-signal-hi))]"
              style={{ width: "55%" }}
            />
            {processSteps.map((s) => (
              <ProcessStep
                key={s.index}
                state={s.state}
                stageLabel={s.label}
                index={s.index}
                name={s.name}
                description={s.description}
                meta={s.meta}
              />
            ))}
          </div>
        </div>

        {/* Manifest exhibit */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] mt-12 rounded-lg border border-ink-900/10 overflow-hidden bg-paper-bright">
          <div className="p-8 lg:p-9 border-b lg:border-b-0 lg:border-r border-ink-900/10">
            <Eyebrow>A sample carrier manifest</Eyebrow>
            <Display level={3} size="h1" className="mt-3 mb-3">
              Documentation, not paperwork.
            </Display>
            <p className="text-[14px] leading-[1.6] text-ink-600 max-w-[42ch]">
              Every lot closes with a single PDF — photographs, decontamination cycles, pH logs, item-level salvage scores, and adjuster signatures bound together. Carriers receive an auditable record that stands up to litigation review.
            </p>
            <div className="grid grid-cols-2 gap-3.5 mt-6">
              {[
                { k: "Photo set", v: "Per-item, before / after" },
                { k: "Chain log", v: "Stage timestamps + sigs" },
                { k: "Salvage score", v: "0–100 per item" },
                { k: "Compliance", v: "IICRC · OSHA cited" },
              ].map((f) => (
                <div key={f.k} className="p-3.5 rounded-sm border border-ink-900/10 bg-paper">
                  <div className="mono text-[10px] tracking-[0.14em] uppercase text-ink-500 mb-1">{f.k}</div>
                  <div className="text-[13px] text-ink-900 font-medium">{f.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Manifest doc */}
          <div className="relative bg-[#FBF8F0] mono text-[11px] leading-[1.7] text-ink-700">
            <div className="p-6 relative">
              <span
                aria-hidden
                className="absolute right-4 top-4 rotate-[-8deg] mono text-[10px] tracking-[0.18em] text-verified border-[1.5px] border-verified rounded px-2 py-1 opacity-90 bg-paper/90 z-10"
              >
                VERIFIED · SEALED
              </span>
              <div className="flex justify-between pb-2.5 mb-3.5 border-b border-ink-100 text-ink-900 font-semibold">
                <span>LOT MANIFEST · LOT-2604-189</span>
                <span>p. 01 / 14</span>
              </div>
              {[
                { l: "Loss type", v: "Fire / Smoke (Class B)" },
                { l: "Carrier", v: "State Farm Insurance Co." },
                { l: "Claim №", v: "2026-04-NTX-118-7723" },
                { l: "Adjuster", v: "M. Reyes (License TX-4419)" },
                { l: "Loss address", v: "Frisco, TX 75034" },
                { l: "Intake", v: "2026-04-12 14:22 CST" },
                { l: "Items tagged", v: "312 · 94% salvage rate" },
              ].map((r) => (
                <div key={r.l} className="grid grid-cols-[120px_1fr] gap-3.5 py-0.5">
                  <span className="text-ink-500">{r.l}</span>
                  <span className="text-ink-900">{r.v}</span>
                </div>
              ))}

              <div className="mt-4 pt-2.5 border-t border-dashed border-ink-200">
                <div className="grid grid-cols-[48px_1fr_56px_56px] gap-2.5 py-0.5 text-ink-900 font-semibold border-b border-ink-200 text-[10.5px]">
                  <span>ID</span><span>Item</span><span>Score</span><span>Status</span>
                </div>
                {[
                  ["A-001", "Wool area rug · 9×12", "92", "RESTOR"],
                  ["A-002", "Down comforter · K", "88", "RESTOR"],
                  ["A-003", "Leather chesterfield", "71", "RESTOR"],
                  ["A-004", "Silk drapery · panel ×4", "96", "RESTOR"],
                  ["A-005", "Linen runner", "—", "T-LOSS"],
                  ["A-006", "Cotton bedding · set", "89", "RESTOR"],
                  ["…", "306 additional items", "—", "—"],
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[48px_1fr_56px_56px] gap-2.5 py-0.5 border-b border-dotted border-ink-100 text-[10.5px]"
                  >
                    {row.map((cell, j) => (
                      <span key={j}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <SectionTag label="§ 06 — CAT Response · Region authority" right="Dark operational frame" pulse />

      {/* ===== CAT RESPONSE (dark) ===== */}
      <section
        className="relative bg-ink-900 text-paper border-y border-[rgb(255_251_242/0.10)] overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(900px 600px at 20% 0%, rgba(217,105,31,0.12), transparent 60%), radial-gradient(900px 600px at 90% 100%, rgba(38,73,96,0.20), transparent 55%)",
          backgroundColor: "#0B0D0C",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative doc-shell gutter py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-14">
            <Display size="d2" className="text-paper-bright">
              When the region<br />
              goes <em className="not-italic">
                <span className="italic text-signal-hi">CAT</span>
              </em>, we&apos;re<br />
              already moving.
            </Display>
            <Lede className="text-ink-200">
              Pure Soft is engineered for catastrophe-scale events: large hail, severe water, multi-property fire. Pre-positioned crews across the DFW metroplex, mutual-aid agreements with adjacent vendors, and surge capacity sufficient to absorb a 5,000-property event without breaking the chain of custody on a single lot.
            </Lede>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] rounded-lg border border-[rgb(255_251_242/0.10)] overflow-hidden bg-[rgba(20,24,22,0.6)] supports-[backdrop-filter]:backdrop-blur-sm">
            {/* Map */}
            <div className="relative p-9 lg:border-r border-b lg:border-b-0 border-[rgb(255_251_242/0.10)] min-h-[420px] lg:min-h-[520px]">
              {/* Frame */}
              <div
                className="absolute inset-9 border border-dashed border-paper/15"
                style={{
                  backgroundImage:
                    "radial-gradient(600px 360px at 40% 50%, rgba(217,105,31,0.22), transparent 65%), radial-gradient(300px 200px at 65% 45%, rgba(217,105,31,0.10), transparent 60%)",
                }}
              />
              {/* Grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Response radius */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] rounded-full border border-dashed border-signal-hi/55"
                style={{
                  boxShadow: "inset 0 0 80px rgba(217,105,31,0.08)",
                }}
              />
              {/* HQ pin */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-signal-hi"
                style={{
                  boxShadow:
                    "0 0 0 6px rgba(232,132,47,0.25), 0 0 0 14px rgba(232,132,47,0.10)",
                }}
              />
              <div className="absolute left-1/2 top-[calc(50%+22px)] -translate-x-1/2 mono text-[10px] tracking-[0.18em] text-paper whitespace-nowrap">
                {site.address.facilityLabel.toUpperCase()}
              </div>
              <div className="absolute left-1/2 top-[calc(50%+165px)] -translate-x-1/2 mono text-[10px] tracking-[0.18em] text-signal-hi whitespace-nowrap">
                60 MIN RESPONSE RADIUS
              </div>

              {/* County labels */}
              {mapRegions.map((r) => (
                <div
                  key={r.name}
                  aria-label={`${r.name} county · ${r.jobs} jobs`}
                  className={`absolute ${r.pos} flex items-center gap-2 px-2.5 py-1.5 border border-paper/20 bg-[rgba(20,24,22,0.7)] rounded-sm mono text-[10px] tracking-[0.14em] uppercase text-paper`}
                >
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 rounded-full ${r.tone === "warm" ? "bg-signal-hi" : "bg-data"}`}
                  />
                  {r.name} · {r.jobs} jobs
                </div>
              ))}

              {/* Map foot */}
              <div className="absolute left-9 right-9 bottom-6 flex justify-between mono text-[10px] tracking-[0.16em] uppercase text-ink-300">
                <span>North Texas Service Region · v.04.2026</span>
                <span className="text-signal-hi">● Active · ○ Standby</span>
              </div>
            </div>

            {/* Stats */}
            <div className="p-9 bg-[rgba(11,13,12,0.5)] flex flex-col gap-1">
              {[
                {
                  k: "Mobilization Window",
                  v: site.stats.mobilizationHours,
                  unit: "HR",
                  d: "Crew + transit on-site within 24 hours of carrier dispatch, anywhere in the DFW metroplex.",
                  tone: "paper" as const,
                },
                {
                  k: "Facility Footprint",
                  v: site.stats.facilitySqft,
                  unit: "SQFT",
                  d: "Climate-controlled, segregated by loss class. Separate biohazard wing under negative pressure.",
                  tone: "paper" as const,
                },
                {
                  k: "Surge Capacity",
                  v: site.stats.surgeCapacity,
                  unit: "PROPS / EVENT",
                  d: "CAT-scale event absorption without exceeding chain-of-custody throughput thresholds.",
                  tone: "paper" as const,
                },
                {
                  k: "Active CAT",
                  v: "04-2026",
                  unit: undefined,
                  d: `${site.activeCat.name} · ${site.activeCat.properties} properties · ${site.activeCat.lots.toLocaleString()} lots · Last update ${site.activeCat.lastUpdate}.`,
                  tone: "signal" as const,
                },
              ].map((s, i) => (
                <div
                  key={s.k}
                  className={`py-4 ${i < 3 ? "border-b border-[rgb(255_251_242/0.10)]" : ""}`}
                >
                  <div className="mono text-[10px] tracking-[0.18em] uppercase text-ink-300 mb-2">
                    {s.k}
                  </div>
                  <div className="serif-display text-[40px] lg:text-[48px] leading-none tracking-[-0.02em]">
                    <span className={s.tone === "signal" ? "text-signal-hi" : "text-paper-bright"}>{s.v}</span>
                    {s.unit && (
                      <span className="mono ml-2 text-[11px] tracking-[0.14em] text-ink-300 align-baseline">
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.55] text-ink-300">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-9 flex flex-wrap justify-between gap-3 mono text-[11px] tracking-[0.14em] uppercase text-ink-300">
            <span>Mutual-aid · 6 vendor agreements · 4-state range</span>
            <a className="text-signal-hi hover:text-paper transition-colors" href="/cat-emergency-response">
              Read the CAT response operations manual ↗
            </a>
          </div>
        </div>
      </section>

      <SectionTag label="§ 07 — Who We Work With · Four tracks" right="Carrier · adjuster · GC · PM" pulse />

      {/* ===== WHO WE WORK WITH ===== */}
      <Section tone="paper">
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-2 items-end mb-14">
          <Display size="d2">
            Built for the<br />
            operators behind<br />
            the claim.
          </Display>
          <Lede>
            Pure Soft is a B2B operation. We are listed as an approved soft-goods vendor across every major North Texas carrier, and we work shoulder-to-shoulder with adjusters, large-loss general contractors and property managers — not direct-to-homeowner.
          </Lede>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-paper-rule rounded-lg overflow-hidden">
          {audiences.map((a, i) => (
            <a
              key={a.ix}
              href={a.href}
              className={`group flex flex-col p-8 bg-paper-bright min-h-[300px] transition-colors hover:bg-paper ${i < audiences.length - 1 ? "lg:border-r" : ""} ${i < audiences.length - 1 ? "border-b lg:border-b-0" : ""} border-paper-rule`}
            >
              <span
                aria-hidden
                className="inline-grid h-9 w-9 place-items-center rounded-md border border-ink-200 bg-paper mono text-[11px] tracking-[0.14em] text-ink-500 mb-6"
              >
                {a.ix}
              </span>
              <h3 className="serif-display text-[28px] leading-[1.1] tracking-[-0.015em] mb-2.5">
                {a.h}
              </h3>
              <p className="text-[13.5px] leading-[1.6] text-ink-600 max-w-[30ch]">{a.d}</p>
              <span className="mt-auto pt-5 mono text-[11px] tracking-[0.14em] uppercase text-ink-900">
                {a.lk} <span className="text-signal group-hover:translate-x-[2px] inline-block transition-transform">→</span>
              </span>
            </a>
          ))}
        </div>
      </Section>

      <SectionTag label="§ 08 — Intake · Editorial close" right="Operational footer follows" pulse />

      {/* ===== CTA ===== */}
      <section className="relative bg-paper overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(800px 400px at 80% 100%, rgba(217,105,31,0.10), transparent 60%)",
          }}
        />
        <div className="relative doc-shell gutter py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-20 items-end">
            <Display size="d1" className="text-ink-900">
              Initiate a<br />
              recovery. We&apos;ll<br />
              be moving in{" "}
              <em className="italic text-signal">under<br />an hour.</em>
            </Display>

            <form
              action="/contact"
              className="bg-paper-bright border border-ink-900/20 rounded-lg p-7 shadow-[var(--shadow-op)]"
            >
              <Eyebrow className="mb-3">Carrier · Adjuster · GC intake</Eyebrow>
              <Field label="Loss type">
                <Input name="lossType" placeholder="Fire / Smoke · select" />
              </Field>
              <Field label="Carrier & claim №">
                <Input
                  name="carrierClaim"
                  placeholder="e.g. State Farm · 2026-04-NTX-…"
                />
              </Field>
              <Field label="Loss address">
                <Input name="address" placeholder="Street, City, TX, ZIP" />
              </Field>
              <Field label="Adjuster contact">
                <Input
                  name="adjusterContact"
                  placeholder="Name · phone · email"
                />
              </Field>
              <div className="flex items-center justify-between mt-5">
                <span className="mono text-[10px] tracking-[0.14em] uppercase text-ink-500">
                  PGP-signed intake · response within 30 min
                </span>
                <Button href="/contact" variant="primary" size="md">
                  Initiate <BtnArrow />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

