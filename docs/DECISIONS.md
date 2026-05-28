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

---

## Phase 1 execution amendments (2026-05-19)

These supersede or refine prior decisions where noted. All other decisions above stand.

### Next.js version: 16, not 15

`create-next-app@latest` installed Next.js **16.2.6** (latest stable as of 2026-05-19). We accepted the upgrade rather than pinning to 15 — the migration cost is zero on a greenfield app, and 16 ships:

- Bundled version-matched documentation at `node_modules/next/dist/docs/` (Next.js 16's AI-agent docs feature)
- Turbopack production build by default
- Tailwind v4 integration as the scaffold default

Supersedes the "Next.js 15" line in the Website Stack section.

### Tailwind v4

The scaffold ships **Tailwind v4** with the `@tailwindcss/postcss` plugin. v4 does not use a `tailwind.config.{js,ts}` file by default — brand tokens are declared in CSS via the `@theme` directive (see `app/globals.css`). No JS config file exists.

### shadcn/ui: hand-crafted, not CLI-initialized

We honored the shadcn/ui convention (copy-paste primitives, `cva` for variants, `clsx + tailwind-merge`, `lucide-react`) but **did not run the shadcn CLI**. Reasons:

- The CLI's `init` flow is interactive and bakes in brand-token assumptions that conflict with ours.
- Phase 1 only needs Button and Card. Hand-writing them keeps the dependency surface minimal and the styling fully under our control.
- All conventions remain compatible with `npx shadcn add <component>` later for more complex primitives (Dialog, Sheet, Command palette, etc.).

### AGENTS.md alongside CLAUDE.md

Next.js 16 generates an `AGENTS.md` at the project root pointing AI agents to the bundled docs. We retained it and prepended `@AGENTS.md` (Claude Code's import syntax) to the top of `CLAUDE.md` so the project memory and the Next.js agent rules compose cleanly.

### Repository layout

Adopted the flat layout described in `docs/ARCHITECTURE.md`:

- `app/` for App Router routes (each of the eight pages has its own folder + `page.tsx`)
- `components/` for shared components; `components/ui/` for shadcn-style primitives
- `lib/` for `site.ts`, `seo.ts`, `schema.ts`, `utils.ts`
- `deployment/` for `Caddyfile`, `systemd/puresoft.service`, deployment README
- `docs/`, `handoff/` retained at root

### Visual identity locked

Placeholder palette committed in `app/globals.css`:

- **Ink:** `#08182E` — near-black navy
- **Navy (primary):** `#0F2545`
- **Navy deep (hover):** `#0A1A38`
- **Paper:** `#FCFCFC` / `--color-paper-muted: #F6F7F9`
- **Accent (muted brass):** `#B68A4E`, deep `#8F6B36`
- **Emergency (restrained oxblood, used only on CAT panels):** `#9F3B2E`

**Typography:** Inter (variable, via `next/font/google`) for body and display. No second face. Weight variation for hierarchy.

### CAT response treatment

The CAT / Emergency Response page uses the `--color-emergency` palette in a single restrained way: a dark-oxblood hero banner with a paper-white CTA. No bright reds; no consumer "emergency" aesthetic. The CAT line phone number is the only element repeated across the header strip, footer, and dedicated page — all sourced from `lib/site.ts`.

### Placeholders awaiting real values

The following values in `lib/site.ts` are placeholders and must be replaced before launch:

- `contact.phone` and `contact.catLine` (currently `(XXX) XXX-XXXX`)
- `address.street` and `address.postalCode`

Single edit in `lib/site.ts` propagates everywhere the values appear.

---

## Operating Theatre design execution (2026-05-19, later)

This block supersedes the visual identity choices made earlier today. **Design source:** the Pure Soft — Design Direction handoff bundle (`pure-soft/project/design_handoff_homepage/`) generated from claude.ai/design. See the bundle's README for the canonical specification.

### Aesthetic codename: "Operating Theatre"

Warm paper canvas, near-black ink, one signal-amber accent reserved for live state, editorial Instrument Serif used sparingly. Target reads as enterprise SaaS / logistics ops / catastrophe-response infrastructure — explicitly *not* dry-cleaner / franchise / coupon-local restoration.

### Five design principles (govern every decision)

1. **Documented, not decorated.** Every metric, ID and timestamp earns its place.
2. **Operational, not promotional.** The page reads like a live ops console.
3. **Calm under pressure.** One signal accent, reserved exclusively for active CAT response.
4. **Editorial gravity.** A single serif voice for declarative moments.
5. **Regional, not retail.** North Texas authority shown through maps, response radii, fleet counts — never through coupons or specials.

### Palette (replaces prior navy/slate/brass tokens entirely)

- **Paper:** `#F4F1EA` · bright `#FAF8F2` · shadow `#EAE6DC` · rule `#D8D3C5` — the default surface
- **Ink (9-step scale):** `#0B0D0C` (900) → `#E3E2DA` (100) — warmer-than-neutral text & dark surfaces
- **Signal:** `#D9691F` · hi `#E8842F` · soft `#F7E2CB` — **restricted** to live CAT state, in-motion ops, pulse animations only
- **Verified:** `#2E5C44` · soft `#DEE9DF` — only on items that have *passed* a stage (sealed, audited)
- **Data:** `#264960` · soft `#D8E3EC` — neutral operational metadata accent
- **Caution soft:** `#F4EAD7` — intake / pending review, inside badges only

Token usage rules (non-negotiable):
- **One signal per page.** Amber appears only where state is genuinely live.
- **Paper above ink.** Dark sections (CAT block, footer) are deliberate "moments of gravity," not the default skin.
- **Verified green is a verb.** Only appears on items that have passed a stage.

### Typography (replaces Inter)

- **Sans (body, UI):** Geist (via `next/font/google`, exposed as `--font-geist-sans`)
- **Mono (IDs, timestamps, labels, badges):** Geist Mono (`--font-geist-mono`)
- **Serif (display, hero, declarative moments):** Instrument Serif, normal + italic (`--font-instrument-serif`)

**Voice rule:** Instrument Serif italic appears at most once per scroll-screen — the brand's exhale. Geist Mono is the voice of every ID, timestamp, label, badge, address, claim number.

### Type scale

| Role | Family | Size / line-height | Notes |
| --- | --- | --- | --- |
| Display D1 | Serif | 96 / 96 | Hero only. One italic allowed. |
| Display D2 | Serif | 64 / 64 | Section opens. |
| Headline H1 | Serif | 40 / 44 | Card / exhibit titles. |
| Sub S1 | Sans 500 | 20 / 28 | Lede paragraphs. |
| Body B1 | Sans 400 | 15 / 24 | Body copy, max 60ch. |
| Mono M1 | Mono 500 | 11 / 16, +14%, UC | Section labels, badges. |
| Mono M2 | Mono 400 | 12 / 20, +6% | IDs, timestamps. |

### Component primitives built

- **`Button`** — primary (ink-900), ghost (hairlined), signal (amber, reserved for CAT hotline only), link, ghostInk. 4px radius, no shadow.
- **`Badge`** — pill, mono text + 6px colored dot. Variants: active (signal-soft, pulses), audit (data-soft), sealed (verified-soft), pending (paper-shadow), caution, intake.
- **`Field` / `Input` / `FramedInput`** — mono label prefix + value. Focus: signal border + 3px signal-15% ring. No floating labels.
- **`Card` / `CardBody` / `CardTitle` / `CardDescription`** — hairlined (ink-900/10), never shadowed.
- **`CatStrip`** — state-driven persistent operational band (active = signal pulse, standby = ink-700, no pulse). Six segments: live dot · CAT code · event · region · mobilization elapsed · property/lot counts · carrier hotline.
- **`LotTile`** — atom underpinning the hero ops panel, dashboard, and carrier portal. Mono ID + sentence-case title + mono metadata + status `Badge`.
- **`Metric`** — serif numeral + mono unit superscript + mono label below. The brand's primary regional-authority device.
- **`ProcessStep`** — `data-state="done|active|pending"`; node states branch via Tailwind variants. Pure CSS — no JS animation.
- **`BrandMark`** — circular PS glyph + Geist wordmark; tone="ink" on paper, tone="paper" on ink.
- **`Section` / `SectionTag` / `Eyebrow` / `Display` / `Lede`** — section scaffolding helpers.

`SectionHeading` and `SectionLead` remain exported as thin back-compat aliases for the seven service pages.

### Motion primitives (three, no more)

| Name | Use | Animation |
| --- | --- | --- |
| Pulse | Live status dots | 1.8s box-shadow expansion |
| Tick | Auto-refreshing counters | 3s subtle vertical flip |
| Sweep | Throughput shimmer on progress bars | 2.4s single light pass |

Plus quiet utilities: scroll reveal (fade-in 16px up, 240ms ease-out), hover (120ms, 2px max travel). All respect `prefers-reduced-motion`. **Forbidden:** background video, soft-glow on text, neon traces, particles, gradient buttons, scaling on hover.

### Homepage composition (built section-by-section to spec)

§ Hero (elevated panel, `shadow-op`) — eyebrow pill · serif headline with single signal-amber highlight on "first." · deck · primary + ghost CTAs · three-metric strip · right-rail Live Operations panel with 4 LotTiles + throughput bar · carrier strip below the panel.

§ 04 — Capabilities triptych — Smoke & soot (warm tint) / Water & flood (cool) / Mold & biohazard (earth).

§ 05 — Process / chain-of-custody — six-stage horizontal rail with signal-amber progress line + Manifest exhibit with rotated `VERIFIED · SEALED` stamp.

§ 06 — CAT response (dark, with warm/cool radial gradients) — stylized North Texas coverage map (HQ pin, dashed 60-min radius, county pills with job counts) + four operational stat blocks.

§ 07 — Who we work with — four-card row: Insurance carriers / Public adjusters / Large-loss GCs / Property managers.

§ 08 — Intake CTA — editorial 88px serif headline with italic emphasis + elevated form card.

### Repository copy (placeholders introduced by the design)

Design copy is treated as approved per the handoff README. Mocked operational details in `lib/site.ts` that need verification before launch:

- Address: `4400 W Royal Lane, Irving, TX 75063`
- Carrier line: `(817) 555-PURE`
- Intake email: `intake@puresoftrestoration.com`
- Certifications: `IICRC #214418`, `Texas DPS #B19234`
- Active CAT mock: `CAT-2026-04 · North Texas Hailstorm Event · 41 properties · 1,847 lots`

The CAT operational data should be wired to a real source (`/api/ops/current`) in a future phase.

### Carrier strip + map: known placeholder content

- The carrier strip uses `Carrier · A` through `Carrier · G` mono wordmark placeholders per spec — full-color carrier logos are **forbidden**.
- The CAT map is a CSS-only stylized region map — not a real GeoJSON. Suitable for v1; replace with a per-county SVG if/when documentary photography lands per § 14.

### Imagery direction (deferred — § 14)

Documentary, not stock. Cool, slightly desaturated palette — never warming filters. Subjects: crews in PPE, lot-tagged textile racks, RFID readers, manifest tablets on-site, branded transit vans, before/after pairs in identical lighting/crop. Captions are mono and **always** include a lot ID or timestamp.

Photography pipeline: `next/image` with `quality=85`, `placeholder="blur"`. Color-grade server-side via a Sharp pipeline before upload; never rely on CSS filters.

### Forbidden checklist (in addition to prior items)

- ❌ Default shadcn `rounded-2xl`
- ❌ Glassmorphism / backdrop-blur as decoration (allowed only on the live ops legend, where it has functional grounding)
- ❌ Gradient buttons
- ❌ Emoji
- ❌ Full-color carrier logos — directory wordmarks only
- ❌ "Trusted by" stars / rating widgets
- ❌ Hero background video loops
- ❌ Marketing-style spacing (< 48px between sections)
- ❌ Multiple signal-amber elements on the same screen

---

## Standalone build asset copy (2026-05-19, later)

**Decision:** wire a `postbuild` npm script that copies `.next/static/` → `.next/standalone/.next/static/` and `public/` → `.next/standalone/public/` after every `next build`. Script lives at `scripts/copy-standalone-assets.mjs`.

**Why:** Next.js standalone mode produces a self-contained `server.js` at `.next/standalone/server.js` but does not copy the static assets or `public/` directory into the standalone tree. Without the copy, the locally-run standalone server returns HTML correctly but 404s every CSS, JS chunk, and woff2 — the page renders as unstyled markup, looking like a Notepad document.

The omission cost us a misread of the Phase 1 smoke test, where "all routes return 200" was technically true but referred only to the HTML body. The reason it took a user-visible regression to surface: the smoke test never followed CSS or font URLs. Future smoke tests should `curl` at least one CSS asset.

The production deploy recipe in `deployment/README.md` already used `rsync` to populate both directories on the server — that path is unaffected. This change is for the local-preview / CI workflow.

**`npm start`** also retargeted from `next start` (which expects the full `.next/` build) to `node .next/standalone/server.js` so it matches what runs in production.

---

## AWS bootstrap + first live deploy (2026-05-28)

**Decision:** the AWS-side bootstrap and the first systemd-managed deploy of the standalone build were executed on the EC2 instance. The full audit trail is in `docs/aws/SETUP_RESULTS.md`. Two decisions in this run are durable enough to belong here:

### `MemoryDenyWriteExecute` removed from the systemd unit

`deployment/puresoft.service.example` previously set `MemoryDenyWriteExecute=true`. On first start, this crashed Node immediately with a V8 fatal:

```
# Fatal error in , line 0
# Check failed: 12 == (*__errno_location ()).
```

errno 12 is `ENOMEM`, returned by `mprotect()` when a sandbox forbids `PROT_EXEC | PROT_WRITE` pages — exactly what V8's baseline JIT must allocate to compile bytecode. This is not specific to our build; it's a structural incompatibility between systemd's `MemoryDenyWriteExecute` and any V8-based runtime (Node, Deno, Bun, Chromium). The flag was removed and replaced with a comment in the unit explaining why it must stay removed.

All other systemd hardening flags on the unit are retained: `NoNewPrivileges`, `PrivateTmp`, `ProtectSystem=strict`, `ProtectHome`, `ProtectKernel{Tunables,Modules}`, `ProtectControlGroups`, `RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6`, `RestrictNamespaces`, `LockPersonality`.

### Least-privilege IAM, not blanket "FullAccess"

The runtime IAM policy for `ec2-puresoft-app-role` is scoped to:

- `ses:SendEmail` / `ses:SendRawEmail` on three specific identity ARNs, conditioned on `ses:FromAddress = noreply@puresoftrestoration.com`
- `s3:PutObject` / `s3:GetObject` / `s3:AbortMultipartUpload` on `arn:aws:s3:::puresoft-claim-uploads-prod/claims/*`
- `s3:ListBucket` on the bucket itself, conditioned to the `claims/*` prefix
- Nothing else — explicitly **no** `*FullAccess` AWS-managed policies, no `iam:*`, no `ec2:*`

Reasoning: the app runtime never has a legitimate need to mutate AWS account state, change IAM, or read other buckets. The `ses:FromAddress` condition pins the sender so even a compromised process can't impersonate other mailboxes on the verified domain. The S3 prefix condition pins the app to its own upload area inside the bucket.

The exact policy JSON lives in `docs/aws/SETUP_RESULTS.md` § 7 so it can be copy-pasted into the AWS Console.

---

## Phase 1.6 polish + deployment-prep amendments (2026-05-19)

**No reversals of prior decisions.** Two structural notes:

### Deployment directory: `deployment/` (renamed from `deploy/`)

Phase 1.6 renamed `deploy/` → `deployment/` and added the `.example` suffix to the Caddy and systemd templates (`Caddyfile.example`, `puresoft.service.example`). The intent is to match the convention used elsewhere in the project's instruction prompts and to make it visually obvious which files are templates copied to system paths versus files used in-place. All internal references in docs and `scripts/copy-standalone-assets.mjs` were updated.

### Operational-posture strip

A new six-item mono strip sits between the hero panel and § 04 on the homepage. It covers same-day response, North Texas coverage, item-level intake, chain of custody, salvage focus, and CAT/event capacity. The strip is labeled `Indicative · pending vendor configuration` so the placeholder nature of the values is explicit until real metrics replace them. This is the documented landing pad for the proof claims that adjusters scan for; placing it above the design's existing capabilities triptych is intentional — it answers the "what is this place" question before the page presents the loss-type pillars.

---

## Live-deployment day amendments (2026-05-28)

**No reversals of prior decisions.** Three operational notes from the final cutover that should not have to be rediscovered.

### Ubuntu AMI ships with UFW active and SSH-only

The stock Ubuntu 24.04 LTS AMI on AWS comes with UFW enabled and only an `OpenSSH ALLOW` rule. After the AWS Security Group was correctly opened for 80/443, Caddy's ACME challenges still failed with TCP connection timeouts because UFW's INPUT chain (policy DROP) was discarding the inbound packets before they reached Caddy. Symptom from outside is indistinguishable from a missing SG rule, so it's easy to misdiagnose. Cure on 2026-05-28: `sudo ufw allow 80/tcp && sudo ufw allow 443/tcp`.

Standing rule going forward: when public services don't respond and the AWS SG is verified open, **always check `sudo ufw status` next** before chasing routing, DNS, or app-level explanations.

### Caddy needs `restart`, not `reload`, after upstream changes flip an ACME failure into success

When Caddy has cached an ACME failure (rate-limit backoff after multiple failed challenges), `systemctl reload` does not clear it — Caddy's admin API tries to apply the new config without dropping the in-flight backoff state, and the cert never issues. A full `systemctl restart caddy` is required to start a clean ACME pipeline. Same advice applies after log-permission fixes (see § "Things that did not go on the first attempt" #1 in `docs/aws/SETUP_RESULTS.md`).

### GoDaddy "Parked" / forwarding shows as one DNS record but resolves to multiple parking IPs

The GoDaddy DNS console rolls up its domain-forwarding/parking feature into a single visual record labeled "Parked" in the *Data* column. Behind the scenes that single entry expands to *two* A records on GoDaddy's parking IPs (`3.33.130.190`, `15.197.148.33`). Deleting the one "Parked" UI entry removes both. We initially documented this as "delete the two parking A records" because authoritative `dig` showed both — but in the GoDaddy UI there is only one row. Updated `docs/aws/dns-records-needed.md` to match.

Going forward: when reconciling our DNS instructions against what the user sees in the GoDaddy console, expect a single "Parked" entry to be the source of any pair of parking IPs in `dig` output.


---

## Phase 2 rescope — drop structured intake, photos, S3, Postgres (2026-05-28)

**Reverses** the day-one decisions to build a structured claim-intake form (`Phase 2` in `docs/ROADMAP.md`), to keep claim-photo uploads in scope, to provision `puresoft-claim-uploads-prod`, and to run PostgreSQL from day one (§ "Database" above).

The actual business workflow is: adjusters and property owners find Pure Soft Restoration via the website, then communicate **directly via phone or email**. They do not submit photos to us through a web form, they do not fill structured intake fields online, and the intake desk handles claim-reference creation and chain-of-custody seeding inside the parent business's existing operational stack (Medinah Dry Cleaners — see memory note).

Consequence of building what the website doesn't need:

- An S3 bucket holding zero claim photos (because no one uploads them online).
- A Postgres `claim_submissions` table holding zero rows (because no one submits a form).
- Pre-signed PUT URLs, Zod schemas, chain-of-custody seed logic, claim-reference generators, confirmation pages, a Phase 2 IAM policy with `s3:PutObject` permissions — all maintained, all touching nothing.
- An IAM blast radius that includes S3 write access for no real reason.

Decision:

- **Cancel S3.** No bucket, no S3 SDK dependency, no `lib/s3.ts`. IAM policy on `ec2-puresoft-app-role` carries only the SES statement.
- **Cancel structured online intake.** `/contact` renders `tel:` + `mailto:` channels. No `<form>`, no server action, no DB write.
- **Defer PostgreSQL** until something actually needs it (analytics, CRM, customer list). Removed from `.env.example` and `docs/ARCHITECTURE.md`.
- **Keep Cloudflare Turnstile keys provisioned** — cheap insurance if a lightweight contact form is added later; doesn't break anything by sitting unused.
- **Keep SES + DKIM + SPF + DMARC + production-access request** — `admin@puresoftrestoration.com` notifications still flow through SES; the smoke test from the EC2 role on 2026-05-28 confirmed end-to-end delivery.

If the intake model ever changes — e.g., we want a claims portal for repeat carrier customers, or a CAT-event self-service channel — the decisions reversed here can be revisited. They are not architecturally cheap to add back (Postgres bring-up + bucket + IAM widening + schema design + form code), but none of them is blocked by anything we're shipping today.

Files updated in the same commit to match: `app/contact/page.tsx` (drop "Phase 2" aside), `app/soft-contents-restoration/page.tsx` (drop "upload contents photos"), `.env.example` (drop S3 + DATABASE_URL), `README.md`, `CLAUDE.md` (stack), `docs/ROADMAP.md` (Phase 0 #8, Phase 2 rewrite), `docs/ARCHITECTURE.md` (topology, components, data flow, reserved layout, security).

