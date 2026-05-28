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

## Round 2 — Certifications, Vendor Relationships, Service Model (confirmed 2026-05-28)

### Credentials

- **IICRC certification:** ✅ Confirmed in principle. "IICRC-certified" can be used as a general credential claim. **Specific cert numbers / cert types still pending** — when the owner provides them they enter JSON-LD `hasCredential` as `EducationalOccupationalCredential` items with the credential `name`.
- **OSHA:** ❌ No specific OSHA training credentials. Drop every OSHA claim from the site (homepage, About, water-mold page, OG image, JSON-LD).
- **Insurance:** ✅ Fully insured for soft-contents restoration work — standard restoration-vendor coverage (general liability, workers' comp, auto liability). The site can carry a tight `"Fully insured for soft-contents restoration work"` line; no enumeration of policy types or amounts.
- **Texas business filings:** No additional verifiable licenses beyond the DBA registration. Don't claim "Licensed in Texas" unless the IICRC general claim is paired with the fully-insured claim — both together are the right trust-strip line.

### Carriers — completed work touched

Eight national / regional carriers whose claim work Pure Soft has processed (directly or in partnership with contents companies):

1. State Farm
2. Allstate
3. USAA
4. Farmers Insurance
5. Liberty Mutual
6. Travelers
7. Texas Farm Bureau
8. AAA Texas

Public surface choice: **show all eight names** in the trust section. Canonical copy line:

> *We've completed soft-contents work on claims from State Farm, Allstate, USAA, Farmers, Liberty Mutual, Travelers, Texas Farm Bureau, and AAA Texas — directly and in partnership with contents companies on those programs.*

(No carrier logos — text-only, since we don't have licensing rights to the marks.)

### Service model — two operating modes (both real, both publishable)

| Mode | Routing | On-site packout? | Pure Soft's role |
| --- | --- | --- | --- |
| **Direct adjuster** (growth target) | Public or carrier adjuster engages Pure Soft directly | **Yes — Pure Soft mobilizes for on-site packout.** | Full lifecycle: on-site packout → per-garment inventory → insurance-approved invoice → clean → store → home-delivery |
| **Through contents company** (current dominant channel) | Adjuster routes to a generic contents company; the contents company farms soft contents out to Pure Soft | No — the contents company handles on-site packout. | Receive items from contents-company packout → per-garment inventory → insurance-approved invoice → clean → store → home-delivery |

The site must surface both modes. Adjuster-direct is the marketing emphasis; the contents-company path remains a real partner channel and stays on the site.

### Inventory + invoicing + payment + return

- **Inventory granularity:** Per-garment, line-by-line. Each item gets its own entry at intake (e.g., `1× men's wool overcoat, charcoal, condition: heavy soot`).
- **Invoicing format:** Insurance-approved invoice sent to the partner (contents company or adjuster) **immediately at intake**. This relieves the contents company of the administrative burden of preparing carrier-formatted intake paperwork themselves — and is Pure Soft's primary differentiator versus generic soft-contents processing.
- **Payment model:** Payment-first. Cleaning begins *after* the invoice is paid.
- **Storage:** Cleaned items poly-bagged and stored until the policyholder's home is ready for contents to return.
- **Return / delivery:** Pure Soft hand-delivers items in the poly bags directly to the policyholder's home, presented like fresh dry-cleaning.
- **End-of-job document:** Flexible. The intake inventory + insurance-approved invoice is the baseline formal paperwork. A separate work-completed / release document can be added on request — Pure Soft adapts to the contents company / adjuster's admin process.

### Strategic positioning (canonical fact)

- **Primary marketing audience:** insurance adjusters (public + carrier).
- **Historical / current dominant channel:** contents companies.
- **Goal:** shift the lead mix toward direct-adjuster engagement — better margin per claim, larger overall work volume available there.
- **Site implication:** adjuster-first language in the hero, header CTA priority, and primary nav. Contents companies stay on the site as a real partner channel but stop being the centered audience.

### Scrubbed permanently (forbidden — no Round 3 revisit)

| Claim | Why scrubbed |
| --- | --- |
| "Approved vendor for 40+ carriers" | False; the real number is 8 and that's already publicly listed by name above |
| "Audit-grade reporting" / "Carrier-audited reporting" | Not the real deliverable — the canonical deliverable is the insurance-approved invoice + per-garment inventory |
| "Per-item photographic record" / "Salvage score, 0–100" | Not part of the actual process |
| "Chain-of-custody log" | Not part of the actual process — replaced canonically by the inventory + invoicing model |
| "Mutual-aid network" / "6 vendor agreements" / "4-state range" | Not part of the actual service model |
| "Same-day pickup standard across DFW" | Not a real SLA |
| "60-minute response radius from Irving" | False — no pre-positioned crews exist |
| "Crews pre-positioned across the metroplex" | False — same |
| "Mobilization within hours" / "rapid mobilization" | False as a specific operational SLA. (The general capability "Pure Soft can mobilize for on-site packout on direct-adjuster engagements" stays.) |
| Any "Insurance-focused since 2009" framing | False — DBA began 2025 |
| OSHA framing of any kind | No specific OSHA credentials held |

### Still pending (light follow-ups, not blocking Round 2 edit)

- **Specific IICRC cert numbers / types.** Owner will send when available; entering them in `lib/schema.ts` `hasCredential` is a one-line update.
- **Twilio phone number.** Pending provisioning; when it lands, populate `site.contact.responseLineLabel/Tel` and the header phone block.

---

---

## Round 3+ — Equipment specifics + facility claims + capacity (not started)

Pending. Will dig into:
- Specific equipment / "specialty machines" mentioned in the About blurb — what they are, what they can do
- Cleaning protocols (smoke, water, mold) — what's actually verifiable per loss type
- "Climate-controlled facility" claims (currently scrubbed; need real specifics)
- Capacity claims (lot volume, throughput)
- Storage duration limits / pricing (if any)

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
- **2026-05-28** — Round 2 completed. Confirmed: IICRC certification (specifics pending), fully insured, eight named carriers, two-mode service flow (direct-adjuster + through-contents-company), per-garment inventory + insurance-approved invoicing at intake as the canonical deliverable model, payment-first processing, home-delivery return, adjuster-first marketing posture. Commit: `Canonical content truth audit — Round 2`.
