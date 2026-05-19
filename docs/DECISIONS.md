# Architectural & Strategic Decisions

Decisions are append-only. If a decision is reversed, add a new entry referencing the prior one rather than editing history.

---

## Website stack

**Approved:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

**Reasoning:** The platform will evolve beyond a static website into claim intake, CRM, adjuster portal, chain-of-custody workflows, reporting, and CAT response operations. Next.js gives us SEO (critical — adjusters discover via search), server actions for form handling, and a clean upgrade path to authenticated `/portal/*` routes without rewriting.

## Content authoring

MDX in a `content/` directory for service pages so copy edits do not require touching React. Migration path to a headless CMS (Sanity / Payload) remains open but is not built day one.

## Hosting

AWS EC2, Ubuntu 24.04 LTS. Single-instance for the web app; managed services (S3, SES) for storage and email.

## Reverse proxy

**Caddy 2.**

**Reasoning:**
- Automatic Let's Encrypt TLS, HTTP/2
- Simple `Caddyfile`
- Lower operational overhead than nginx + certbot on a single-site server

## Deployment strategy

**systemd** for the Next.js application, running the standalone build (`node .next/standalone/server.js`) bound to `127.0.0.1:3000`. Caddy reverse-proxies `:443` → `127.0.0.1:3000`.

**Docker** is reserved for stateful infrastructure (PostgreSQL) — not for the web application.

## Database

**PostgreSQL from day one**, run via Docker Compose with a persisted named volume.

**Reasoning:** Avoid future migration complexity as claim workflows and CRM functionality expand. SQLite was considered but rejected — Postgres is the inevitable destination.

## Email delivery

**AWS SES** from day one.

**Reasoning:**
- Production-grade deliverability
- AWS-native integration (IAM roles, SNS bounce/complaint handling)
- Lower long-term cost than transactional-email SaaS
- Aligns with future automation (Lambda triggers for claim notifications, adjuster workflows)

## File uploads

**AWS S3** from day one.

**Reasoning:** Future workflows will include claim photos, inventories, PDFs, chain-of-custody documentation, and adjuster uploads. Storing these on the EC2 instance couples uploads to the instance lifecycle and EBS size. S3 gives durability, lifecycle policies for retention, and signed URLs for the future portal.

## Form abuse protection

**Cloudflare Turnstile** on the claim form. Privacy-friendly, free, low-friction for legitimate users.

## Branding direction

Professional insurance-industry identity.

**Avoid:** consumer dry-cleaner visuals, playful laundry branding, coupon aesthetics, bright/saturated colors, script fonts, "fresh & clean" imagery.

**Preferred palette:**
- Primary: deep navy
- Secondary: slate grays
- Surface: white / off-white
- Accent: single muted accent (muted gold or steel blue) used sparingly for CTAs

**Typography:** authoritative sans-serif (Inter or similar) for body; a slightly more weighted display face for headings. No script, no condensed display faces.

## SEO strategy

Strong local SEO foundation required.

**Priority geographies (North Texas):**
- Dallas
- Fort Worth
- Plano
- Frisco
- McKinney
- Denton
- Richardson
- Irving
- Arlington

Per-page `LocalBusiness` and `Service` JSON-LD schema. Distinct H1 and metadata per page. Sitemap and robots.txt generated at build.

## Analytics

**Plausible** (cloud or self-hosted) — privacy-friendly, no cookie banner needed in TX. PostHog is reserved for if/when session replay on the claim flow is justified.

## Deploys (interim, pre-CI)

`git pull && npm ci && npm run build && systemctl restart puresoft` from the server.

GitHub Actions CI/CD added later — not blocking v1.

## Server hardening baseline

- UFW: inbound 22 (your IP only) / 80 / 443; everything else closed
- `unattended-upgrades` enabled
- `fail2ban` on SSH
- Daily EBS snapshot via AWS Backup

## Operational philosophy

Pure Soft Restoration should become:

> the North Texas textile restoration authority for insurance claims.

Every architectural choice should be evaluated against whether it accelerates that positioning, or whether it would dilute it.
