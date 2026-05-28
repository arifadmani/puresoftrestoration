# Pure Soft Restoration — Canonical Facts

This is the single source of truth for every public-facing factual claim on `https://puresoftrestoration.com`. **Any claim on the site must trace back to a confirmed entry in this file.** If a claim isn't here, it doesn't belong on the site.

## How this file works

- **Rounds** — the canonical-facts audit happens in numbered rounds. Each round covers one topic (Core Business Facts, Certifications & Vendor Relationships, Service Capabilities, Reporting Standards, etc.). Each round produces a numbered list of confirmed truths; those facts then drive corresponding edits to `lib/site.ts`, `lib/schema.ts`, layout components, and per-page copy.
- **Confirmed** — explicitly approved by the business owner. Safe to publish.
- **Flagged** — a claim that currently appears (or appeared) on the site but has not yet been confirmed by the owner. Either scrubbed from canonical sources until confirmed, or left in editorial copy with a note awaiting Round X.
- **Scrubbed** — explicitly false or unsupported; removed.
- **Forbidden claims** — language the owner has flagged not to use without explicit confirmation: *certified, approved, verified, audit-grade, carrier-approved, standard, same-day, 24/7.*

---

## Round 1 — Core Business Facts (confirmed 2026-05-28)

### Identity

- **Public name:** Pure Soft Restoration
- **Form:** DBA (assumed name). No separate LLC or registered entity name is to be surfaced publicly anywhere on the site, in JSON-LD, in metadata, or in the footer legal line.
- **Footer legal line:** `© <current year> Pure Soft Restoration` — no `LLC` suffix, no entity tag, no parent reference.
- **Parent / operating entity:** **Undisclosed.** Never named, hinted at, or implied. The DBA stands alone for all public communication.
- **Wordmark rendering:** Renders as one continuous string `Pure Soft Restoration`. No "Pure Soft" short form. No "Restoration" sub-tag below or beside the brand name.

### Founded / experience

- **Year Pure Soft Restoration (the DBA) began operating:** **2025.**
- **Experience claim allowed:** "20+ years of textile and soft-contents expertise" — attributable to the team behind the brand without naming the parent.
- **Scrubbed:** "Since 2009." This claim appears on the current site in the homepage hero credentials, footer brand block, About page, Industry Trust column, and JSON-LD `foundingDate`. All instances removed in this round.

### Address

- **Street address:** None to be published anywhere on the site (no office; service-area-only model).
- **Anchor city for SEO / "Based in …" framing:** None. Site does not anchor to any single city.
- **JSON-LD `PostalAddress`:** Use `addressRegion: TX`, `addressCountry: US` only. No `streetAddress`, no `addressLocality`, no `postalCode`. The business is `LocalBusiness` with the service-area pattern (`areaServed` carries the real footprint).

### Phone

- **Public phone number:** **None.** A Twilio line is being provisioned; until it lands, no phone number is shown anywhere — no header link, no footer link, no contact page row, no JSON-LD `telephone`, no `tel:` anchors.
- **Placeholder scrubbed:** `(214) 555-0142` was a design-direction placeholder. Every instance removed in this round.

### Email

- **Single public email:** `admin@puresoftrestoration.com`
- **Use:** intake form notifications, contact page direct-link, footer Contact column, JSON-LD `email`.
- **Technical-only (not surfaced publicly):** `noreply@puresoftrestoration.com` — SES sender identity, used by server actions only.

### Availability

- **Confirmed publishable:** "Available 24 hours for rush textile intake" and "24-hour turnaround on rush orders." The owner explicitly confirmed responding to inquiries at any hour and 24-hour turnaround as a real service commitment.
- **Scrubbed framing:** any language implying *on-site* response. Pure Soft does **not** dispatch crews to loss properties. Contents companies do the on-site packout and bring soft contents to Pure Soft for processing. The following must not appear:
  - "60-minute response radius"
  - "Crews dispatched"
  - "Pre-positioned across the metroplex"
  - "Mobilization within hours"
  - "Rapid mobilization"
  - "Climate-controlled facility ... segregated by loss class" (implies on-site response model)
- These currently appear on `app/cat-emergency-response/page.tsx`, `app/water-mold-textile-recovery/page.tsx`, `app/fire-smoke-odor-restoration/page.tsx`, and the homepage's "Large Loss / CAT" section. They are **NOT** rewritten in this round — only flagged. A dedicated copy-rewrite round will address them.

### Service area

- **Headline phrasing (confirmed):** *"Serving North Texas — DFW metroplex and the broader region, typically within a two-hour radius. Recent work spans Dallas, Fort Worth, Plano, Frisco, McKinney, Denton, Arlington, Tyler, Waco, Sherman, Wichita Falls, and beyond."*
- **Counties with completed work (confirmed, 16):** Collin · Cooke · Dallas · Denton · Fannin · Grayson · Hopkins · Hunt · Johnson · Kaufman · Palo Pinto · Parker · Rockwall · Tarrant · Van Zandt · Wise.
- **JSON-LD `areaServed`:** these 16 county names, each as `{ "@type": "AdministrativeArea", name: "X County" }`.
- **No claim of statewide or national service.**

### About-page blurb (confirmed content for owner-anonymous narrative)

- 20+ years in textiles and content work
- Deep history in operations and dry-cleaning / textile expertise
- Experience servicing high-end retail and commercial jobs
- Relationships with insurance adjusters
- Program work for soft contents and textiles
- Specialty machines for top-tier garment and textile care
- Vendor relationships to support any textile work needed

The About page **does not name** any principals, founders, or operators. No personal names appear.

---

## Round 2 — Certifications, Vendor Relationships, Insurance Status (pending)

The following claims currently exist on the site but were never explicitly confirmed by the owner. They are **scrubbed from canonical sources** (header, footer, hero credential strip, seal row, JSON-LD `hasCredential`, OG image footer) in Round 1's edit pass, and **left in place inside body copy** of various pages (homepage Industry Trust section, About page, service pages) pending Round 2.

| Claim currently on the site | Source location(s) | Round 2 disposition |
| --- | --- | --- |
| "IICRC-certified" / "IICRC-certified firm" | header credential, hero strip, seal row, footer, About, homepage Trust column, JSON-LD `hasCredential` | Pending owner confirmation in Round 2 |
| "OSHA-compliant" / "OSHA-rated workflow" | hero strip, About, water-mold page, homepage Trust column | Pending Round 2 |
| "Licensed & insured in Texas" | seal row, OG image, footer | Pending Round 2 |
| "Approved vendor for 40+ carriers" | hero strip, seal row, About, homepage Trust column | Pending Round 2 — likely false for a one-year-old brand |
| "Audit-grade reporting" / "Carrier-audited reporting" | homepage Process narrative, insurance-pros page | Pending Round 2 |
| "Per-item photographic record" / "Salvage score, 0–100" | homepage Process narrative, Reporting Standards column, insurance-pros page | Pending Round 2 |
| "Chain of custody" framing throughout | homepage Process rail, insurance-pros, soft-contents pages | Pending Round 2 |
| "Mutual-aid network" / "6 vendor agreements" / "4-state range" | CAT page, homepage CAT section | Pending Round 2 |
| "Same-day pickup standard across the DFW metroplex" | soft-contents-restoration page | Pending Round 2 |

---

## Round 3+ — Service capabilities, equipment, reporting standards (not started)

Pending. Will dig into:
- Specific equipment / "specialty machines" mentioned in the About blurb — what they are, what they're certified for
- Cleaning protocols (smoke, water, mold) — what's actually verifiable
- Reporting deliverables to carriers — what the actual end-of-job report looks like
- SLA commitments beyond the confirmed 24-hour rush turnaround
- Capacity claims (lot volume, surge capacity)

---

## Source-of-truth wiring

| Canonical fact | Lives in |
| --- | --- |
| Name, brand, contact, address, year, service area, hours | `lib/site.ts` |
| LocalBusiness / Service JSON-LD | `lib/schema.ts` |
| Per-page metadata helper | `lib/seo.ts` |
| Header wordmark + nav + (eventual) phone | `components/header.tsx` |
| Footer brand block, columns, legal line | `components/footer.tsx` |
| Contact page direct lines, intake form | `app/contact/page.tsx` |
| Homepage hero credentials + Section 8 (Contact) | `app/page.tsx` |
| OG image text | `app/opengraph-image.tsx` |

Edits in this round touch only the files above. Page-body copy on service pages and the About page is **not rewritten** in this round; their fabricated claims are flagged in the table above and left for Round 2 / 3.

---

## Audit-log addendum

- **2026-05-28** — Round 1 completed. Canonical edit pass applied to the eight source-of-truth files above. Commit: `Start canonical content truth audit`.
- Incorrect memory linking the parent business to "Medinah Dry Cleaners" deleted; replaced with a `do-not-speculate` note. The parent / operating entity remains undisclosed by user choice.
