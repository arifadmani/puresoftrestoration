# Next Steps

## At-a-glance status (last updated 2026-05-28 19:30 UTC)

| Layer | State |
| --- | --- |
| **Marketing site** | ✅ **LIVE** at https://puresoftrestoration.com (HTTP/2 200, HSTS, Let's Encrypt cert) |
| `www` → apex | ✅ 308 redirect |
| Elastic IP | ✅ `18.225.78.200` associated with `i-02f5706e777ef2130` (`us-east-2c`) |
| DNS apex + www | ✅ `A @ → 18.225.78.200`, `CNAME www → puresoftrestoration.com.` |
| DNS DKIM (3× CNAMEs) | ✅ `<token>._domainkey.puresoftrestoration.com → <token>.dkim.amazonses.com` × 3 |
| DNS SPF | ✅ `TXT @ "v=spf1 include:_spf.google.com include:amazonses.com ~all"` (single record, Google + SES) |
| DNS DMARC | ✅ `TXT _dmarc "v=DMARC1; p=none;"` (minimal — valid but no `rua`/`ruf` reporting; can tighten later) |
| TLS | ✅ Let's Encrypt via tls-alpn-01, auto-renew |
| Caddy 2.11.3 | ✅ active, redirects `:80 → :443`, proxies to `127.0.0.1:3000` |
| Next.js (systemd `puresoft.service`) | ✅ active, `next-server v16.2.6`, 14 routes prerendered |
| Host firewall (UFW) | ✅ SSH/80/443 open (3000/8000 still world-open — minor cleanup, app binds to 127.0.0.1 so non-exploitable) |
| AWS Security Group | ✅ confirmed correct |
| SES domain identity `puresoftrestoration.com` | ✅ verified (DKIM Successful, 2026-05-28) |
| SES email identity `admin@puresoftrestoration.com` | ✅ verified (interim, useful while sandbox is in effect) |
| SES production access | ⏳ submitted 2026-05-28, awaiting AWS review (~24h) |
| SES end-to-end smoke test | ✅ EC2 role → SES → `admin@` inbox confirmed delivered 2026-05-28 |
| IAM `ec2-puresoft-app-role` runtime policy | ✅ `puresoft-app-runtime` inline policy attached — `ses:SendEmail`/`SendRawEmail` on `identity/*` with `ses:FromAddress` pinned to `noreply@puresoftrestoration.com` |
| Cloudflare Turnstile keys | ✅ provisioned and stored in `/etc/puresoft.env` (currently unused — no active form) |
| `/etc/puresoft.env` | ✅ real SES + Turnstile values in; S3 section dropped; mode `0600`, owner `puresoft:puresoft` |
| `puresoft.service` last restart | ✅ 2026-05-28 — picked up new env successfully, healthy under load |
| S3 `puresoft-claim-uploads-prod` | 🚫 **canceled** — no photo upload in scope (see `docs/DECISIONS.md` § "Phase 2 rescope") |
| PostgreSQL | 🚫 **deferred** — no claim-submissions table needed without a structured online form |

**Phase 1 is complete. The only outstanding item is AWS's SES production-access response (which lifts the sandbox so the site can email any recipient, not just verified ones). Nothing on our side is blocked on it — `admin@` mail already flows; the production-access approval just widens the To: side.**

### What's next

1. **Wait on AWS SES production-access response** (~24h). When AWS replies:
   - **Approved** — sandbox is lifted, the site can email any recipient. No env or code change required.
   - **Approved with reduced quota** — fine for launch; can request increases later.
   - **Follow-up questions** — paste their question here and we'll draft the response. Common asks: confirm bounce/complaint handling, confirm no marketing use, confirm sender domain.
2. **Optional: tighten DMARC** to add `rua=mailto:admin@puresoftrestoration.com; ruf=mailto:admin@puresoftrestoration.com; fo=1` so we receive aggregate reports on outbound DKIM/SPF passes. Edit the existing `_dmarc` TXT record at GoDaddy. Not urgent.
3. **Optional: prune UFW** to drop the world-open `3000/tcp` and `8000/tcp` rules (left over from earlier debugging — app binds to `127.0.0.1` so they don't expose anything, but they're noise in the rule list).
4. **Homepage UI revamp** — queued as Task #10. The current "Operating Theatre" design reads as a SaaS dashboard (live ops panel with lot codes, throughput bars, mono fonts, geometric maps); we want it to read as a specialty textile-restoration services firm with insurance-pro positioning. Detailed proposal in chat history; user has not yet greenlit execution.

---

This file has two parts:

1. **User-side AWS prerequisites** — actions only the human can take (AWS console, registrar, Cloudflare). Start in parallel with the build; they have real lead time.
2. **Strategic build phases** — what comes after the prereqs are in motion.

---

## Part 1 — User-side prerequisites

### 1. Elastic IP
- EC2 → Elastic IPs → Allocate → associate with this instance.
- Record the IP — it goes into DNS below.

### 2. DNS at the registrar
Once the Elastic IP is assigned:
- `A` record: `@` → `<elastic-ip>`
- `CNAME` record: `www` → `puresoftrestoration.com`

### 3. AWS SES — domain verification
- SES → Verified identities → Create identity → Domain.
- Domain: `puresoftrestoration.com`.
- Enable Easy DKIM (RSA 2048).
- Add the three `CNAME` records SES gives you to the registrar.
- Verification completes once DNS propagates (minutes to hours).

### 4. AWS SES — production access request
- SES is sandboxed by default (outbound only to verified addresses).
- SES → Account dashboard → Request production access.
- Use case: transactional email for an insurance-claim intake form.
- AWS typically responds within 24h.

### 5. Interim SES email identity (while still sandboxed)
- Verify `admin@puresoftrestoration.com` as an **email identity** in SES.
- Allows end-to-end smoke-testing of the SES pipeline (and any future contact form) before production access is granted, since sandboxed SES can only send to verified addresses.

### 6. AWS Security Group
- Inbound 22 (SSH) — restricted to your IP only.
- Inbound 80 (HTTP) — `0.0.0.0/0`.
- Inbound 443 (HTTPS) — `0.0.0.0/0`.
- All other inbound: denied.

### 7. ~~AWS S3 bucket~~ — canceled 2026-05-28
- No photo upload in scope. See `docs/DECISIONS.md` § "Phase 2 rescope (2026-05-28)".

### 8. AWS IAM role for EC2
- Role `ec2-puresoft-app-role` (already attached to the instance).
- Inline policy `puresoft-app-runtime`:
  - `ses:SendEmail` / `ses:SendRawEmail` on `arn:aws:ses:us-east-2:638515252835:identity/*` with `ses:FromAddress` condition pinning the sender to `noreply@puresoftrestoration.com`.
- No S3 statements (S3 was canceled — see § 7). No long-lived AWS keys on the server.

### 9. Cloudflare Turnstile
- cloudflare.com (free) → Turnstile → add `puresoftrestoration.com`.
- Save the **site key** and **secret key** for the `.env`.

### 10. `admin@puresoftrestoration.com` mailbox
- Confirm a real mailbox exists for `admin@puresoftrestoration.com` (Google Workspace recommended).
- This is where all claim notifications will land.

### Status checklist (snapshot, see the at-a-glance table at the top for the current state)

- [x] Elastic IP `18.225.78.200` allocated and associated with `i-02f5706e777ef2130`
- [x] DNS `A @` + `CNAME www` published at GoDaddy
- [x] SES domain identity verified (three DKIM CNAMEs + SPF + DMARC published)
- [x] SES `admin@puresoftrestoration.com` email identity verified (interim, for sandbox-era testing)
- [x] SES production-access request submitted *(awaiting AWS — only outstanding item)*
- [x] Security group rules confirmed (22 / 80 / 443)
- [x] UFW host firewall opened for 80 / 443 (was active and SSH-only by default — see `docs/aws/SETUP_RESULTS.md`)
- [x] IAM role `ec2-puresoft-app-role` attached with `puresoft-app-runtime` inline policy (SES-only)
- [x] Cloudflare Turnstile keys provisioned and stored in `/etc/puresoft.env`
- [x] `admin@puresoftrestoration.com` mailbox live in Google Workspace
- [x] HTTPS live with Let's Encrypt cert; SES end-to-end smoke test from EC2 role delivered to `admin@`
- [🚫] S3 bucket — **canceled** (no photo upload in scope)
- [🚫] Postgres — **deferred** (no claim-submissions table needed)

---

## Part 2 — Strategic build phases

(Full detail in `docs/ROADMAP.md`. This is the short version.)

### Infrastructure
- [x] Install Claude Code on Ubuntu AWS server
- [x] Configure GitHub repo connection locally
- [x] Configure Node.js runtime (v22.22.3 in nvm + v22.22.2 system-wide at `/usr/bin/node` from NodeSource)
- [x] Author Caddy reverse-proxy config (`deployment/Caddyfile.example`)
- [x] Author systemd unit (`deployment/puresoft.service.example`)
- [x] Author env template (`.env.example`) with SES, Turnstile keys *(2026-05-28 — S3 and DATABASE_URL sections removed per Phase 2 rescope)*
- [x] Install AWS CLI v2 on the server (`/usr/local/bin/aws`)
- [x] **Install Caddy on the server and copy `deployment/Caddyfile.example` to `/etc/caddy/Caddyfile`** *(2026-05-28 — Caddy 2.11.3 active; redirects :80 → :443; cert obtained via tls-alpn-01)*
- [x] **Create `puresoft` system user, `/var/www/puresoft/`, `/etc/puresoft.env`** *(2026-05-28 — env mode 0600, owned by puresoft:puresoft, real SES + Turnstile values in place)*
- [x] **Install systemd unit and enable the service** *(2026-05-28 — `puresoft.service` active, `next-server (v16.2.6)` on 127.0.0.1:3000; required removing `MemoryDenyWriteExecute=true` from the unit because it crashes V8's JIT — see `docs/DECISIONS.md`)*
- [x] **Deploy first release bundle** *(2026-05-28 — `/var/www/puresoft/releases/20260528162123`, symlinked from `/var/www/puresoft/current`)*
- [x] **Fill `/etc/puresoft.env` with real values + restart** *(2026-05-28 — Turnstile keys in, S3 vars commented out, SES smoke test passed end-to-end)*
- [x] Wire AWS SES integration *(2026-05-28 — IAM policy attached, tested from EC2 role to admin@ inbox)*
- [🚫] ~~Wire AWS S3 integration~~ — canceled
- [ ] CI/CD deployment workflow (Phase 4)

### Website build phase
- [x] Homepage — full Operating Theatre design implementation (eight design sections, live ops panel, CAT map, manifest exhibit)
- [x] Insurance Professionals page (token migration; full design treatment Phase 3)
- [x] CAT / Emergency Response page (token migration; full design treatment Phase 3)
- [x] Service pages — Soft Contents, Fire & Smoke, Water & Mold (token migration; full design treatment Phase 3)
- [x] About page (token migration; full design treatment Phase 3)
- [x] Contact page — renders two intake channels (`tel:` CAT line + `mailto:admin@…`) plus a "what to send" aside. No structured online form; no photo upload. See `docs/DECISIONS.md` § "Phase 2 rescope (2026-05-28)" for the reasoning.
- [x] SEO foundation (per-page metadata, LocalBusiness + Service JSON-LD, sitemap, robots, OG image)
- [x] Responsive layout (mobile drawer nav)
- [x] Shared design system (Operating Theatre — paper / ink / signal / verified / data tokens, Geist + Geist Mono + Instrument Serif, three motion primitives)
- [x] Persistent CAT operational strip across every page
- [x] Domain component vocabulary built (CatStrip, LotTile, Metric, ProcessStep, BrandMark)

### Design polish (Phase 3 — after AWS prereqs)
- [ ] Section-by-section redesign of the seven non-home pages to match the homepage's Operating Theatre fidelity
- [ ] Documentary photography pipeline per § 14 of the design spec — replace mono placeholder wordmarks on the carrier strip with the agreed vendor directory
- [ ] Wire `/api/ops/current` to a real lot / CAT data source (the CAT strip, live ops panel, and stat blocks currently read from `lib/site.ts.activeCat`)
- [ ] Fill placeholder copy in `lib/site.ts`: real phone numbers, real address, real IICRC / Texas DPS numbers (currently design-spec placeholders)

### Build pipeline fix (resolved 2026-05-19)
- [x] `npm run build` now runs a `postbuild` step that copies `.next/static/` and `public/` into `.next/standalone/` so the standalone server can serve CSS, JS, and fonts (Next.js does not copy them automatically).
- [x] `npm start` retargeted from `next start` to `node .next/standalone/server.js` so local-preview matches production.
- [x] `deployment/README.md` documents a CSS-fetch sanity check so future smoke tests catch un-styled releases.

### Phase 1.6 polish complete (resolved 2026-05-19)
- [x] Hero deck tightened — short lead + 4 bullets, scannable for adjusters
- [x] Operational Posture six-item strip added between hero and § 04
- [x] Who-We-Work-With cards expanded to cover all six audiences (Independent adjusters · Public adjusters · Carriers · Contents companies · Restoration contractors · Property managers), with a mono "alongside" line beneath the cards
- [x] `deploy/` renamed to `deployment/` with `.example` suffixes on templates; all references updated

### Exact next action for the user (refreshed 2026-05-28)

Server-side bootstrap is **done** (see `docs/aws/SETUP_RESULTS.md`). The site is live on the EC2 box at `http://127.0.0.1:3000` and Caddy is wired and waiting for DNS. The remaining work is all in the AWS Console + GoDaddy. Three independent tracks, ordered by urgency:

1. **Start the SES production-access request** (#4 above). Longest lead time (~24h). Until granted, SES will only send to verified email identities, which blocks live claim notifications. Do this first.
2. **Add SES DKIM CNAMEs to GoDaddy** (pass 2 in `docs/aws/dns-records-needed.md`). Get the three CNAMEs from the SES → "Create identity → Domain" flow and paste them in. Also add the merged SPF TXT and DMARC TXT records.
3. **Verify interim SES email identities** for `admin@puresoftrestoration.com` and `arifadmani@gmail.com` so the claim intake form can be exercised end-to-end while SES is still in sandbox.
4. **Create the S3 bucket and update the IAM role with the least-privilege policy** (#6, #7 in `docs/aws/SETUP_RESULTS.md`). Not blocking the marketing site, but blocks Phase 2 (claim intake with photo uploads).
5. **Get Cloudflare Turnstile site + secret keys** and fill them into `/etc/puresoft.env`, then `sudo systemctl restart puresoft`. Required to enable the claim form's anti-bot challenge.

Sub-steps for the user that the bootstrap could *not* do from the instance role:

- Create SES identity `puresoftrestoration.com` and grab the three DKIM CNAMEs (paste them into GoDaddy per `docs/aws/dns-records-needed.md`).
- Verify `admin@puresoftrestoration.com` and `arifadmani@gmail.com` as interim SES email identities so the intake form can be tested before production access lands.
- Create the S3 bucket `puresoft-claim-uploads-prod` (region `us-east-2`, all public access blocked, SSE-S3, CORS for `https://puresoftrestoration.com`).
- Attach the inline policy from `docs/aws/SETUP_RESULTS.md` § 7 to `ec2-puresoft-app-role`.
- Confirm the Security Group on `i-02f5706e777ef2130` is 22 (your IP) / 80 / 443 only.
- Get Cloudflare Turnstile site + secret keys.
- Fill the real values into `/etc/puresoft.env` and `sudo systemctl restart puresoft`.

After DNS resolves and Caddy has a cert, verify with:

```bash
curl -I https://puresoftrestoration.com/
sudo journalctl -u caddy -n 50 --no-pager
```

### Intake architecture
- Photo uploads to S3
- Chain-of-custody-ready schema in Postgres
- Claim documentation fields
- Adjuster intake workflows
- Future CRM integration hooks

### Marketing and sales phase
- Adjuster capability statement (PDF)
- CAT response sheet
- Claim intake packet
- Restoration case studies
- Adjuster outreach strategy

### Long-term platform direction
- Adjuster portal
- Claim tracking
- Customer portal
- Reporting dashboard
- Barcode tracking
- Room-level inventory
- Salvage analytics
- CAT operations workflows
