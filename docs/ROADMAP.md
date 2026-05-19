# Roadmap

## Phase 0 — AWS prerequisites (user-side, has real lead time)

These run in parallel with Phase 1, but **must complete before launch**. Detail: `handoff/NEXT_STEPS.md`.

1. Allocate Elastic IP and associate with this EC2 instance
2. Add DNS `A` (apex) and `CNAME` (`www`) records at the registrar
3. Verify `puresoftrestoration.com` domain in AWS SES (DKIM CNAMEs)
4. Submit AWS SES production-access request (sandbox by default)
5. Confirm Security Group: inbound 22 (your IP), 80, 443 only
6. Provision Cloudflare Turnstile site keys
7. Verify `admin@puresoftrestoration.com` and `arifadmani@gmail.com` as SES email identities (interim, for testing while SES is still sandboxed)

## Phase 1 — Site scaffold & deploy

**Status:** code complete; deployment to live server pending AWS prerequisites.

- [x] Next.js 16 + TS + Tailwind v4 at repo root (16, not 15 — see DECISIONS amendments)
- [x] shadcn/ui-style primitives (hand-crafted Button + Card with `cva`, `clsx + tailwind-merge`, `lucide-react`)
- [x] Brand tokens (ink / navy / paper / slate / muted brass accent / restrained emergency oxblood) wired into `app/globals.css` via `@theme`
- [x] Layout shell: top utility bar with CAT line, sticky header with primary nav and **Submit a Claim** CTA, mobile drawer nav, footer with NAP and service-area list
- [x] Eight pages built with real H1s, copy stubs, metadata, and per-page `Service` JSON-LD where applicable:
  - Home, Insurance Professionals, Soft Contents Restoration, Fire & Smoke Odor Restoration, Water & Mold Textile Recovery, CAT / Emergency Response, About, Contact / Submit a Claim
- [x] Root layout emits a site-wide `LocalBusiness` JSON-LD blob
- [x] `app/sitemap.ts`, `app/robots.ts`, dynamic OG image at `app/opengraph-image.tsx`
- [x] `next.config.ts` set to `output: "standalone"` for systemd deployment
- [x] `deploy/Caddyfile`, `deploy/systemd/puresoft.service`, `deploy/README.md` (first-time setup + deploy recipe), `.env.example`
- [x] `npm run build` passes; smoke-tested the standalone server locally (all 14 routes return 200)
- [ ] Caddy reverse proxy + systemd service deployed on this EC2 box (blocked on Elastic IP + DNS)
- [ ] HTTPS live on `puresoftrestoration.com` and `www` (blocked on DNS)

Real phone numbers and street address still need to be plugged into `lib/site.ts` (currently placeholders).

### Phase 1.5 — Operating Theatre design execution (2026-05-19)

**Status:** complete; deployed to preview at `18.225.211.99:3000`.

- [x] Fonts: Geist + Geist Mono + Instrument Serif via `next/font/google`
- [x] Token palette replaced entirely (paper / ink / signal / verified / data / caution)
- [x] Homepage rebuilt section-by-section to the design HTML reference:
  - Elevated hero panel with three stacked bands (op bar — persistent in Header, site nav, hero body)
  - Live operations right rail (4 `LotTile`s + throughput bar)
  - Carrier strip placeholder row (wordmarks only, never full-color)
  - Capabilities triptych (smoke / water / mold tints)
  - Six-stage chain-of-custody rail + Manifest exhibit (with rotated `VERIFIED · SEALED` stamp)
  - Dark CAT response section with stylized NTX map (HQ pin, 60-min response radius, county labels with job counts) + four operational stat blocks
  - Who-we-work-with four-card row
  - Editorial intake CTA card
- [x] Persistent `CatStrip` at the top of every page
- [x] Five-column dark `Footer` with brand block + Capabilities + Operations + For partners + Company + mono legal strip with IICRC + Texas DPS numbers
- [x] Component primitives built: `Button` (primary/ghost/signal/link/ghostInk), `Badge`, `Field`/`Input`/`FramedInput`, `Card`, `BrandMark`, `CatStrip`, `LotTile`, `Metric`, `ProcessStep`, `SectionTag`, `Eyebrow`, `Display`, `Lede`
- [x] Motion primitives wired (pulse, tick, sweep) — respect `prefers-reduced-motion`
- [x] Seven non-home pages re-skinned to the new tokens (token swap only — full section-by-section redesigns are Phase 3 work)
- [x] OG image repainted with the new palette
- [x] `npm run build` passes (14 routes, all static-rendered)

Outstanding for Phase 3 polish (separately tracked):
- [ ] Section-by-section redesign of the seven non-home pages to match Operating Theatre fidelity
- [ ] Replace placeholder imagery with documentary photography per § 14
- [ ] Wire `/api/ops/current` to a real lot/CAT data source (currently mocked in `lib/site.ts`)
- [ ] Replace mono wordmark placeholders with real carrier directory once vendor list is finalized

## Phase 2 — Claim intake form

- PostgreSQL via Docker Compose, persisted volume, scheduled backups
- `claim_submissions` table with chain-of-custody-ready schema:
  - Claim reference (generated), submitted_at
  - Adjuster info: name, email, phone, firm, role (adjuster / IA / public adjuster / carrier / contents company / property manager / homeowner)
  - Claim info: claim number, carrier, date of loss, peril type (fire / smoke / water / mold / CAT / other)
  - Property info: address, contact on site, access notes
  - Contents description, urgency, additional notes
  - Uploaded photo references (S3 keys)
- Server action flow: validate (Zod) → write row → upload photos to S3 → SES notification to `admin@puresoftrestoration.com` → confirmation page with claim reference
- Cloudflare Turnstile on the form
- S3 bucket: private, server-side-encrypted, lifecycle rule for long-term retention
- Adjuster-facing confirmation page: claim reference + what happens next + 24h SLA expectation

## Phase 3 — Content polish & SEO

- Finalize copy for all eight pages with insurance-industry voice
- Service-specific FAQ blocks (schema-marked)
- Case-study / before-after section (placeholder if no assets yet)
- Google Business Profile alignment
- Per-city landing pages for priority geographies (Dallas / Fort Worth / Plano / Frisco / McKinney / Denton / Richardson / Irving / Arlington)

## Phase 4 — Operational

- GitHub Actions CI/CD: build → rsync standalone bundle → `systemctl restart puresoft`
- Plausible analytics
- SES bounce/complaint handling via SNS → Lambda or simple webhook
- EBS daily snapshots via AWS Backup
- Uptime monitoring (UptimeRobot or BetterStack)

## Phase 5 — Marketing & sales assets

- Adjuster capability statement (PDF)
- CAT response sheet
- Claim intake packet
- Restoration case studies (when material is available)
- Adjuster outreach strategy

## Phase 6+ — Portal & CRM

- `/portal/*` with adjuster authentication (passwordless email link via SES; SSO later)
- Claim status timeline, photo gallery per claim, chain-of-custody log, document downloads
- Internal staff views for processing claims
- API for batched intake from contents companies
- Barcode / room-level inventory tracking
- Salvage analytics, severity reduction reporting
- CAT operations workflows (event-mode dashboards)
