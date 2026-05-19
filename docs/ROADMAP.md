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

- Next.js 15 + TS + Tailwind + shadcn/ui at repo root
- Brand tokens (navy / slate / white / muted accent) wired into Tailwind config
- Layout shell: header with prominent **Submit a Claim** CTA, footer with NAP (name/address/phone) for local SEO
- Eight pages stubbed with real H1s and metadata (copy filled in iteratively):
  - Home, Insurance Professionals, Soft Contents Restoration, Fire & Smoke Odor Restoration, Water & Mold Textile Recovery, CAT / Emergency Response, About, Contact / Submit a Claim
- JSON-LD `LocalBusiness` + `Service` schema on relevant pages
- `robots.txt`, `sitemap.xml`, favicons, OG images
- Caddy reverse proxy + systemd service deployed on this EC2 box
- HTTPS live on `puresoftrestoration.com` and `www`

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
