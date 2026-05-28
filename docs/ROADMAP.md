# Roadmap

## Phase 0 — AWS prerequisites (user-side, has real lead time)

These run in parallel with Phase 1, but **must complete before launch**. Detail: `handoff/NEXT_STEPS.md` and `docs/aws/SETUP_RESULTS.md`.

1. Allocate Elastic IP and associate with this EC2 instance *(done 2026-05-28 — `18.225.78.200`)*
2. Add DNS `A` (apex) and `CNAME` (`www`) records at the registrar *(done 2026-05-28 — GoDaddy)*
3. Verify `puresoftrestoration.com` domain in AWS SES (three DKIM CNAMEs published, SPF, DMARC) *(done 2026-05-28)*
4. Submit AWS SES production-access request (sandbox by default) *(submitted 2026-05-28 — awaiting AWS review)*
5. Confirm Security Group: inbound 22 (your IP), 80, 443 only *(done)*
6. Provision Cloudflare Turnstile site keys *(done 2026-05-28)*
7. Verify `admin@puresoftrestoration.com` as a SES email identity *(done; interim while sandbox is in effect)*
8. ~~Create S3 bucket `puresoft-claim-uploads-prod`~~ — **canceled.** No photo upload in scope (see DECISIONS § "Phase 2 rescope").
9. Replace the policies on `ec2-puresoft-app-role` with the SES-only least-privilege inline policy *(done 2026-05-28; S3 statements were dropped along with bucket creation)*

## Phase 1 — Site scaffold & deploy

**Status:** ✅ **COMPLETE 2026-05-28** — `https://puresoftrestoration.com` returns HTTP/2 200 with a valid Let's Encrypt certificate. See `handoff/NEXT_STEPS.md` § "At-a-glance status".

- [x] Next.js 16 + TS + Tailwind v4 at repo root (16, not 15 — see DECISIONS amendments)
- [x] shadcn/ui-style primitives (hand-crafted Button + Card with `cva`, `clsx + tailwind-merge`, `lucide-react`)
- [x] Brand tokens (ink / navy / paper / slate / muted brass accent / restrained emergency oxblood) wired into `app/globals.css` via `@theme`
- [x] Layout shell: top utility bar with CAT line, sticky header with primary nav and **Submit a Claim** CTA, mobile drawer nav, footer with NAP and service-area list
- [x] Eight pages built with real H1s, copy stubs, metadata, and per-page `Service` JSON-LD where applicable:
  - Home, Insurance Professionals, Soft Contents Restoration, Fire & Smoke Odor Restoration, Water & Mold Textile Recovery, CAT / Emergency Response, About, Contact / Submit a Claim
- [x] Root layout emits a site-wide `LocalBusiness` JSON-LD blob
- [x] `app/sitemap.ts`, `app/robots.ts`, dynamic OG image at `app/opengraph-image.tsx`
- [x] `next.config.ts` set to `output: "standalone"` for systemd deployment
- [x] `deployment/Caddyfile.example`, `deployment/puresoft.service.example`, `deployment/README.md` (first-time setup + deploy recipe), `.env.example`
- [x] `npm run build` passes; smoke-tested the standalone server locally (all 14 routes return 200)
- [x] Caddy reverse proxy + systemd service deployed on this EC2 box *(2026-05-28 — see `docs/aws/SETUP_RESULTS.md`)*
- [x] **HTTPS live on `puresoftrestoration.com` and `www`** *(2026-05-28 — Let's Encrypt cert via tls-alpn-01, both apex and www; www 308-redirects to apex)*

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

### Phase 1.6 — Review, polish, deployment prep (2026-05-19)

**Status:** complete; site is ready for deploy as soon as Phase 0 AWS prereqs land.

- [x] Verified all 8 routes return HTTP 200, anchor IDs (`#capabilities`, `#process`) exist, footer hrefs resolve, every page has a unique meta description, no `.env` files tracked (only `.env.example`)
- [x] Tightened hero deck: dense single paragraph swapped for a short lead + 4-item bullet list (24-hour CAT · chain of custody · item-level salvage · carrier-audited reporting)
- [x] Added a six-item "Operational Posture" strip between the hero and § 04 covering: same-day response, NTX coverage, item-level intake, chain of custody, salvage-focused, CAT capacity. Marked `Indicative · pending vendor configuration` so the values are clearly stated as placeholders
- [x] Expanded the four Who-We-Work-With cards to cover all six requested audiences — card A/02 now reads "Adjusters · independent & public", card A/03 now reads "Contents companies & restoration GCs". Added a mono `Operators we work alongside` line below the cards listing all six
- [x] Renamed `deploy/` → `deployment/`, suffixed templates with `.example` (`Caddyfile.example`, `puresoft.service.example`), updated every reference in docs and scripts
- [x] Validation: `npm install` clean, `npm run lint` 0 errors / 0 warnings, `npm run build` 14 routes prerender as static, postbuild stages assets
- [x] Smoke test: all routes HTTP 200; CSS bundle (47 KB), woff2 fonts, and JS chunks all reach the wire

## Phase 2 — Intake assist (optional, rescoped 2026-05-28)

The structured online intake form, claim-submissions database, S3 photo upload, and Postgres-backed chain-of-custody seed have all been dropped — adjusters and claimants contact us directly by phone or email. See DECISIONS § "Phase 2 rescope (2026-05-28)" for the reasoning.

What remains optional in Phase 2:

- A lightweight contact form on `/contact` (5–6 fields: name, email, phone, claim number, brief description) that triggers a single SES email to `admin@puresoftrestoration.com`. Cloudflare Turnstile protects it. No DB. No file uploads. Plain server action.
- Adjuster-facing confirmation page after submission ("Got it. We'll be in touch within one business hour.").

Not building unless and until the intake model changes:

- PostgreSQL / `claim_submissions` table
- S3 bucket + presigned URLs + photo upload UI
- Zod-validated structured intake with chain-of-custody seed

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
