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
                  │                       ├── 127.0.0.1:5432 ───── │ Postgres (Docker)
                  │                       │                        │
                  └───────────────────────┼────────────────────────┘
                                          │
                                          ▼
                                  AWS managed services
                                  ├─ S3 (claim photos & documents)
                                  └─ SES (transactional email)
```

## Components

### Next.js application
- **Runtime:** Node.js 22.x, Next.js 16 (App Router), TypeScript.
- **Build:** standalone output (`next.config.ts` → `output: "standalone"`). Produces a self-contained `.next/standalone/server.js` and a `.next/static` directory.
- **Process model:** single Node process, bound to `127.0.0.1:3000` (not exposed publicly).
- **Bundle size:** standalone build keeps node_modules to only what's needed at runtime (~80 MB).
- **Styling:** Tailwind v4 via `@tailwindcss/postcss`. Brand tokens declared in CSS using the `@theme` directive — no `tailwind.config.{ts,js}` file.
- **UI primitives:** shadcn/ui style (cva + clsx + tailwind-merge + lucide-react), hand-crafted rather than scaffolded from the shadcn CLI.
- **AI agent docs:** `node_modules/next/dist/docs/` is the source of truth for Next.js APIs in this project (Next.js 16 feature). `AGENTS.md` at the repo root points coding agents at it; `CLAUDE.md` imports it via `@AGENTS.md`.

### Caddy reverse proxy
- **Role:** terminates TLS, handles HTTP/2, redirects HTTP → HTTPS, applies security headers, gzips responses.
- **Certificates:** automatic Let's Encrypt issuance and renewal.
- **Config:** `/etc/caddy/Caddyfile`, version-controlled via a symlink from this repo's `deploy/Caddyfile`.

### systemd unit
- **Unit file:** `/etc/systemd/system/puresoft.service` (sourced from `deploy/systemd/puresoft.service`).
- **User:** dedicated `puresoft` system user (no shell, owns the deploy directory).
- **Working dir:** `/var/www/puresoft/current` (symlink to a release directory).
- **Environment:** loaded from `/etc/puresoft.env` (chmod 600, owned by `puresoft` user).
- **Restart policy:** `Restart=on-failure`, `RestartSec=2`.
- **Logging:** stdout/stderr → journald → `journalctl -u puresoft`.

### PostgreSQL
- **Deployment:** Docker Compose at `deploy/docker-compose.yml`.
- **Image:** official `postgres:16`.
- **Storage:** named volume `puresoft_pgdata`, backed up via EBS snapshots.
- **Exposure:** bound to `127.0.0.1:5432` only — never public.
- **Credentials:** sourced from `.env` (not committed).

### AWS S3
- **Bucket:** `puresoft-claim-uploads-prod` (private, server-side-encrypted with SSE-S3 or KMS).
- **Access pattern:** Next.js server actions generate pre-signed PUT URLs; the browser uploads directly to S3 (server never proxies bytes).
- **Object key pattern:** `claims/<claim_reference>/<uuid>-<filename>`.
- **Lifecycle:** transition to S3 Standard-IA after 90 days; retain indefinitely (until a documented retention policy is set).

### AWS SES
- **Sending identity:** `noreply@puresoftrestoration.com` (DKIM-signed).
- **Inbound:** `admin@puresoftrestoration.com` (provider TBD — Google Workspace recommended).
- **Bounce/complaint handling:** SNS topic → Lambda or webhook (Phase 4).

### Cloudflare Turnstile
- **Role:** invisible CAPTCHA on the claim form.
- **Verification:** server action verifies the Turnstile token with Cloudflare's siteverify endpoint before processing the submission.

## Data flow: claim submission

1. Adjuster visits `/contact` (or `/claim`).
2. Fills form fields (validated client-side by React Hook Form + Zod).
3. For each photo: browser requests a pre-signed S3 PUT URL from the server, uploads directly to S3.
4. On submit:
   a. Turnstile token sent to server action.
   b. Server verifies Turnstile, re-validates form data (Zod).
   c. Server writes a row to `claim_submissions` with the S3 object keys.
   d. Server calls SES `SendEmail` to notify `admin@puresoftrestoration.com` with a summary + signed S3 URLs for each photo.
   e. Server returns a claim reference.
5. Browser redirects to `/claim/submitted?ref=<claim_reference>`.

If SES fails: the row is still persisted; an admin retry job re-sends notifications. The user always gets their claim reference.

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
│   ├── header.tsx             # Sticky header + utility bar + mobile drawer
│   ├── footer.tsx             # NAP, services, service-area, legal
│   ├── section.tsx            # <Section>, <Eyebrow>, <SectionHeading>, <SectionLead>
│   ├── json-ld.tsx            # JSON-LD <script> emitter
│   └── ui/
│       ├── button.tsx         # cva-based Button (variant + size)
│       └── card.tsx           # Card, CardBody, CardTitle, CardDescription
├── lib/
│   ├── site.ts                # Single source of truth: name, contact, NAP, service area
│   ├── seo.ts                 # buildMetadata() helper for per-page Metadata
│   ├── schema.ts              # LocalBusiness + Service JSON-LD builders
│   └── utils.ts               # cn() class-name composer
├── deploy/
│   ├── Caddyfile              # Caddy 2 reverse-proxy config
│   ├── systemd/puresoft.service
│   └── README.md              # First-time setup + deploy recipe
├── public/                    # Static assets (favicon, etc.)
├── docs/                      # DECISIONS, ROADMAP, ARCHITECTURE, PROJECT_CONTEXT
├── handoff/                   # NEXT_STEPS
├── AGENTS.md                  # Next.js 16 AI-agent docs hint
├── CLAUDE.md                  # Project memory (imports AGENTS.md)
├── .env.example               # All required runtime env vars
├── next.config.ts             # output: "standalone"
└── ...
```

Reserved for Phase 2: `app/api/`, `app/claim/`, `content/` (MDX), `db/` (schema + migrations), `lib/db.ts`, `lib/ses.ts`, `lib/s3.ts`, `lib/turnstile.ts`.

## Environments

- **Production:** this EC2 instance, `puresoftrestoration.com`.
- **Local dev:** developer machine; SES sends to verified addresses only; uploads go to a dev S3 bucket.
- **Preview/staging:** none planned for v1 — adopted later if PR-based previews become valuable.

## Security posture

- TLS 1.2+ only (Caddy default).
- HSTS enabled.
- No public DB exposure.
- Secrets in `/etc/puresoft.env`, mode 600, owned by `puresoft` user.
- IAM role attached to the EC2 instance grants only the SES and S3 permissions actually used — no long-lived AWS keys on the server.
- UFW firewall + fail2ban on SSH.
- Daily EBS snapshots via AWS Backup.

## What is intentionally *not* in v1

- Authenticated portal (Phase 6+)
- Multi-region failover
- Read replicas
- A separate staging environment
- CI/CD beyond manual `git pull && build && restart` (Phase 4)

These are deferred until the load or risk profile justifies the complexity.
