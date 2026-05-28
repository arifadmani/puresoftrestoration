# Architecture

This document describes the technical architecture of the Pure Soft Restoration platform. For *why* each choice was made, see `docs/DECISIONS.md`.

## High-level topology

```
                  ┌──────────────────────────────────────────────┐
                  │              AWS EC2 (Ubuntu 24.04)           │
   Internet       │                                                │
   ───────► :443 ─┼─► Caddy 2 ──► 127.0.0.1:3000 Next.js (systemd) │
   ───────► :80 ──┼─► Caddy 2 (auto-redirect to :443)              │
                  │                       │                        │
                  └───────────────────────┼────────────────────────┘
                                          │
                                          ▼
                                  AWS managed services
                                  └─ SES (transactional email — admin@ notifications only)
```

Inbound claim intake routes to phone (CAT line) and email (`admin@puresoftrestoration.com`) directly — the site does not run a structured intake form, photo upload, claim-submissions database, or any S3 bucket. See `docs/DECISIONS.md` § "Phase 2 rescope (2026-05-28)" for the reasoning.

## Components

### Next.js application
- **Runtime:** Node.js 22.x, Next.js 16 (App Router), TypeScript.
- **Build:** standalone output (`next.config.ts` → `output: "standalone"`). Produces a self-contained `.next/standalone/server.js`. A `postbuild` npm script (`scripts/copy-standalone-assets.mjs`) copies `.next/static/` and `public/` into the standalone tree, since Next.js does not do this automatically and the standalone server otherwise 404s every CSS, JS chunk, and font.
- **Process model:** single Node process, bound to `127.0.0.1:3000` (not exposed publicly).
- **Bundle size:** standalone build keeps node_modules to only what's needed at runtime (~80 MB).
- **Styling:** Tailwind v4 via `@tailwindcss/postcss`. Brand tokens declared in CSS using the `@theme` directive — no `tailwind.config.{ts,js}` file. The palette is the Operating Theatre system: paper / ink / signal / verified / data / caution (see `docs/DECISIONS.md`).
- **Typography:** Geist (sans), Geist Mono (mono — IDs, timestamps, labels), Instrument Serif (display — hero, section opens, declarative moments). All three via `next/font/google` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`, `--font-instrument-serif`).
- **UI primitives:** shadcn/ui style (cva + clsx + tailwind-merge + lucide-react), hand-crafted rather than scaffolded from the shadcn CLI.
- **Domain components:** `CatStrip`, `LotTile`, `Metric`, `ProcessStep`, `BrandMark` — the atomic vocabulary of the design system, shared between the homepage, the future operations dashboard, and the future carrier portal.
- **AI agent docs:** `node_modules/next/dist/docs/` is the source of truth for Next.js APIs in this project (Next.js 16 feature). `AGENTS.md` at the repo root points coding agents at it; `CLAUDE.md` imports it via `@AGENTS.md`.

### Caddy reverse proxy
- **Role:** terminates TLS, handles HTTP/2, redirects HTTP → HTTPS, applies security headers, gzips responses.
- **Certificates:** automatic Let's Encrypt issuance and renewal.
- **Config:** `/etc/caddy/Caddyfile`, version-controlled via a symlink from this repo's `deployment/Caddyfile.example`.

### systemd unit
- **Unit file:** `/etc/systemd/system/puresoft.service` (sourced from `deployment/puresoft.service.example`).
- **User:** dedicated `puresoft` system user (no shell, owns the deploy directory).
- **Working dir:** `/var/www/puresoft/current` (symlink to a release directory).
- **Environment:** loaded from `/etc/puresoft.env` (chmod 600, owned by `puresoft` user).
- **Restart policy:** `Restart=on-failure`, `RestartSec=2`.
- **Logging:** stdout/stderr → journald → `journalctl -u puresoft`.
- **Sandbox notable exclusion:** `MemoryDenyWriteExecute` is intentionally **not** set. V8's JIT needs to allocate W+X pages, and enabling that flag crashes Node at startup with `Check failed: 12 == errno` (ENOMEM on `mprotect`). All other systemd hardening flags (`NoNewPrivileges`, `PrivateTmp`, `ProtectSystem=strict`, `ProtectHome`, `ProtectKernel*`, `ProtectControlGroups`, `RestrictAddressFamilies`, `RestrictNamespaces`, `LockPersonality`) remain on. See `docs/DECISIONS.md`.

### AWS SES
- **Sending identity:** `noreply@puresoftrestoration.com` (DKIM-signed, verified via the `puresoftrestoration.com` domain identity in `us-east-2`).
- **Receiving:** `admin@puresoftrestoration.com` via Google Workspace MX records.
- **DNS:** SPF (`v=spf1 include:_spf.google.com include:amazonses.com ~all`), DKIM (three `<token>._domainkey` CNAMEs published 2026-05-28), DMARC (`p=none` for now).
- **Auth:** EC2 instance role `ec2-puresoft-app-role` carries an inline policy `puresoft-app-runtime` granting `ses:SendEmail` / `ses:SendRawEmail` scoped to the verified domain identity, with a `ses:FromAddress` condition pinning the sender to `noreply@puresoftrestoration.com`. No long-lived AWS keys on the server.
- **Sandbox status:** production-access request submitted 2026-05-28 (case open at AWS). Until granted, sends are limited to verified recipient identities (`admin@`).
- **Bounce/complaint handling:** deferred to Phase 4 — SNS topic → Lambda or webhook.

### Cloudflare Turnstile (provisioned, not yet wired)
- **Site + secret keys:** stored in `/etc/puresoft.env` (`TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).
- **Role:** reserved for any future lightweight contact form. Not in active use today — the `/contact` page only renders `tel:` and `mailto:` channels.

## Data flow: claim intake

1. Adjuster visits `/contact` (or any service page with a "Submit a claim" CTA, which links to `/contact`).
2. The page renders two intake channels: `tel:<cat-line>` and `mailto:admin@puresoftrestoration.com?subject=…`.
3. Adjuster clicks one — phone or email — and the conversation happens outside the website.
4. Our intake desk replies inside one business hour, opens a claim reference, and seeds chain-of-custody documentation in our internal systems (Google Workspace + the parent business's existing operational stack).

There is no form submission, no database row, no server-side SES send triggered by the visitor. The only SES sends from this codebase today are operator-initiated (e.g., the smoke test on 2026-05-28 used to prove the IAM → SES pipeline works).

If we later choose to add a lightweight contact form: Turnstile is already provisioned, SES is already wired, and the env file is ready. The addition would be one server action plus form UI — no S3, no DB. See `docs/DECISIONS.md` § "Phase 2 rescope (2026-05-28)".

## Repository layout (as built in Phase 1)

```
puresoft-restoration/
├── app/                       # Next.js App Router routes
│   ├── layout.tsx             # Root layout + LocalBusiness JSON-LD
│   ├── page.tsx               # Homepage
│   ├── about/
│   ├── insurance-professionals/
│   ├── soft-contents-restoration/
│   ├── fire-smoke-odor-restoration/
│   ├── water-mold-textile-recovery/
│   ├── cat-emergency-response/
│   ├── contact/               # Submit a Claim (form arrives in Phase 2)
│   ├── globals.css            # Tailwind v4 + brand tokens via @theme
│   ├── sitemap.ts             # sitemap.xml generator
│   ├── robots.ts              # robots.txt generator
│   └── opengraph-image.tsx    # Site-wide OG image (1200x630)
├── components/
│   ├── header.tsx             # Sticky header — persistent CatStrip + site nav + mobile drawer
│   ├── footer.tsx             # 5-col dark footer + IICRC + Texas DPS legal strip
│   ├── brand-mark.tsx         # Circular PS glyph + wordmark
│   ├── section.tsx            # <Section>, <SectionTag>, <Eyebrow>, <Display>, <Lede>
│   ├── json-ld.tsx            # JSON-LD <script> emitter
│   ├── ops/
│   │   ├── cat-strip.tsx      # State-driven persistent operational band
│   │   ├── lot-tile.tsx       # Mono ID + body + status Badge — used everywhere lots appear
│   │   ├── metric.tsx         # Serif numeral + mono unit + mono label
│   │   └── process-step.tsx   # data-state done|active|pending node + serif name + dashed meta
│   └── ui/
│       ├── button.tsx         # cva Button: primary | ghost | signal | link | ghostInk
│       ├── badge.tsx          # Pill: active | audit | sealed | pending | caution | intake
│       ├── input.tsx          # Field, Input, FramedInput
│       └── card.tsx           # Card, CardBody, CardTitle, CardDescription
├── lib/
│   ├── site.ts                # Single source of truth: name, contact, NAP, service area
│   ├── seo.ts                 # buildMetadata() helper for per-page Metadata
│   ├── schema.ts              # LocalBusiness + Service JSON-LD builders
│   └── utils.ts               # cn() class-name composer
├── deployment/
│   ├── Caddyfile.example          # Caddy 2 reverse-proxy template
│   ├── puresoft.service.example   # systemd unit template
│   └── README.md                  # First-time setup + deploy recipe
├── scripts/
│   └── copy-standalone-assets.mjs # postbuild — stages .next/static + public
├── public/                    # Static assets (favicon, etc.)
├── docs/                      # DECISIONS, ROADMAP, ARCHITECTURE, PROJECT_CONTEXT
├── handoff/                   # NEXT_STEPS
├── AGENTS.md                  # Next.js 16 AI-agent docs hint
├── CLAUDE.md                  # Project memory (imports AGENTS.md)
├── .env.example               # All required runtime env vars
├── next.config.ts             # output: "standalone"
└── ...
```

Reserved (if a future lightweight contact form lands): `lib/ses.ts`, `lib/turnstile.ts`, a single server-action route. Not reserved any longer: `app/claim/`, `db/`, `lib/db.ts`, `lib/s3.ts` — these were planned for the structured intake + photo upload model that has been dropped.

## Environments

- **Production:** this EC2 instance, `puresoftrestoration.com`.
- **Local dev:** developer machine; SES sends only to verified addresses while the AWS account is still in sandbox.
- **Preview/staging:** none planned for v1 — adopted later if PR-based previews become valuable.

## Security posture

- TLS 1.2+ only (Caddy default).
- HSTS enabled.
- No public DB exposure.
- Secrets in `/etc/puresoft.env`, mode 600, owned by `puresoft` user.
- IAM role attached to the EC2 instance grants only the SES permissions actually used (`ses:SendEmail` / `ses:SendRawEmail` on the verified domain identity, conditioned on `ses:FromAddress = noreply@puresoftrestoration.com`) — no long-lived AWS keys on the server.
- UFW firewall + fail2ban on SSH.
- Daily EBS snapshots via AWS Backup.

## What is intentionally *not* in v1

- Authenticated portal (Phase 6+)
- Multi-region failover
- Read replicas
- A separate staging environment
- CI/CD beyond manual `git pull && build && restart` (Phase 4)

These are deferred until the load or risk profile justifies the complexity.
