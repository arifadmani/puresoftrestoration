# Next Steps

## At-a-glance status (last updated 2026-05-28 18:1x UTC)

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
| Host firewall (UFW) | ✅ SSH/80/443 open (3000/8000 still open to world — minor cleanup) |
| AWS Security Group | ✅ confirmed correct |
| SES domain identity `puresoftrestoration.com` | ✅ verified (DKIM Successful, 2026-05-28) |
| SES production access | ⏳ submitted 2026-05-28, awaiting AWS review (~24h) |
| `/etc/puresoft.env` | ⚠️ placeholders only — needs real SES + Turnstile + (later) DB values |
| Interim SES email identities | ❌ not verified (`admin@puresoftrestoration.com`, `arifadmani@gmail.com`) — needed for end-to-end claim-form testing while SES is still sandboxed |
| S3 `puresoft-claim-uploads-prod` | ❌ not created (needed for Phase 2 photo uploads) |
| IAM `ec2-puresoft-app-role` runtime policy | ❌ still only `s3:ListAllMyBuckets` (needs SES + S3 least-priv — recipe in `docs/aws/SETUP_RESULTS.md` § 7) |
| Cloudflare Turnstile keys | ❌ not obtained |

**Phase 1 (marketing site live) is complete. Phase 2 (claim intake → email + photo upload) is gated on the four ❌ rows above and the ⏳ SES production-access response.**

### Immediate next action (ordered by what unblocks the most parallel work)

1. **Verify the two interim SES email identities** — `admin@puresoftrestoration.com` (claim notifications destination) and `arifadmani@gmail.com` (test sender). Each is a single SES Console action plus clicking a verification link in the mailbox. Total ~5 min. Lets the claim form be exercised end-to-end *before* AWS approves production access.
2. **Create the S3 bucket** `puresoft-claim-uploads-prod` (us-east-2, all public access blocked, SSE-S3, CORS for `https://puresoftrestoration.com` only). Independent of SES — can do anytime.
3. **Attach the least-privilege runtime policy** from `docs/aws/SETUP_RESULTS.md` § 7 to `ec2-puresoft-app-role`. Depends on (2) — bucket has to exist first because the policy references its ARN.
4. **Provision Cloudflare Turnstile site + secret keys** at https://dash.cloudflare.com/?to=/:account/turnstile (free tier). Independent of all the above.
5. **Fill `/etc/puresoft.env` with real values and `sudo systemctl restart puresoft`** — does the actual wiring. Do this last, once SES/S3/Turnstile values exist.

### Parallel: AWS SES production-access response

When AWS responds (~24h), one of three things:
- **Approved** — sandbox is lifted, the claim form can email *any* address. No further DNS/console work; just plug `noreply@puresoftrestoration.com` into the env.
- **Approved with reduced quota** — same as above but at a lower daily quota than requested. Fine for launch; can request increases later as volume grows.
- **Follow-up questions** — paste their question and we'll draft the response. Common asks: confirm bounce/complaint handling, confirm no marketing use, confirm IP/domain match.

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

### 5. Interim SES email identities (while still sandboxed)
- Verify `admin@puresoftrestoration.com` and `arifadmani@gmail.com` as **email identities** in SES.
- Allows end-to-end claim-form testing before production access is granted.

### 6. AWS Security Group
- Inbound 22 (SSH) — restricted to your IP only.
- Inbound 80 (HTTP) — `0.0.0.0/0`.
- Inbound 443 (HTTPS) — `0.0.0.0/0`.
- All other inbound: denied.

### 7. AWS S3 bucket
- Create `puresoft-claim-uploads-prod` in the same region as this EC2.
- Block all public access.
- Default encryption: SSE-S3 (or KMS if preferred).
- CORS: PUT/GET from `https://puresoftrestoration.com` only.

### 8. AWS IAM role for EC2
- Create role `puresoft-ec2`.
- Attach inline policies granting only:
  - `ses:SendEmail` / `ses:SendRawEmail` on the verified domain
  - `s3:PutObject`, `s3:GetObject` on the claim-uploads bucket
- Attach to this EC2 instance — avoids long-lived AWS keys on the server.

### 9. Cloudflare Turnstile
- cloudflare.com (free) → Turnstile → add `puresoftrestoration.com`.
- Save the **site key** and **secret key** for the `.env`.

### 10. `admin@puresoftrestoration.com` mailbox
- Confirm a real mailbox exists for `admin@puresoftrestoration.com` (Google Workspace recommended).
- This is where all claim notifications will land.

### Status checklist (updated 2026-05-28 after server-side bootstrap run)

- [x] Elastic IP allocated & associated *(2026-05-28 — `18.225.78.200` associated with `i-02f5706e777ef2130`)*
- [x] DNS `A` + `CNAME` records added *(2026-05-28 — `A @ → 18.225.78.200` only; `CNAME www → puresoftrestoration.com.`; old GoDaddy parking record was a single "Parked"/forwarding entry that fanned out to `3.33.130.190` and `15.197.148.33` — deleting the one GoDaddy "Parked" record removed both)*
- [x] **HTTPS live with Let's Encrypt cert** *(2026-05-28 — `https://puresoftrestoration.com/` → `HTTP/2 200`; `https://www.puresoftrestoration.com/` → `308` to apex. Required opening UFW for 80/443 — host firewall was active and only allowed SSH; AWS SG was already correct. See `docs/aws/SETUP_RESULTS.md` § "Things that did not go on the first attempt" #3.)*
- [ ] SES domain verified (DKIM CNAMEs added) *(identity does not exist yet)*
- [ ] SES production access requested *(longest lead time — start this first)*
- [ ] SES production access granted
- [ ] Interim email identities verified
- [ ] Security group rules confirmed
- [ ] S3 bucket created with CORS + encryption *(bucket `puresoft-claim-uploads-prod` does not exist; account has 0 buckets)*
- [x] IAM role attached to EC2 *(role `ec2-puresoft-app-role` is attached)*
- [ ] IAM role granted the least-privilege runtime policy *(role currently only has `s3:ListAllMyBuckets`; recommended policy is in `docs/aws/SETUP_RESULTS.md` § 7)*
- [ ] Turnstile keys obtained
- [x] `admin@puresoftrestoration.com` mailbox live and monitored *(Google Workspace MX confirmed)*

---

## Part 2 — Strategic build phases

(Full detail in `docs/ROADMAP.md`. This is the short version.)

### Infrastructure
- [x] Install Claude Code on Ubuntu AWS server
- [x] Configure GitHub repo connection locally
- [x] Configure Node.js runtime (v22.22.3 in nvm + v22.22.2 system-wide at `/usr/bin/node` from NodeSource)
- [x] Author Caddy reverse-proxy config (`deployment/Caddyfile.example`)
- [x] Author systemd unit (`deployment/puresoft.service.example`)
- [x] Author env template (`.env.example`) with SES, S3, Turnstile, DB keys
- [x] Install AWS CLI v2 on the server (`/usr/local/bin/aws`)
- [x] **Install Caddy on the server and copy `deployment/Caddyfile.example` to `/etc/caddy/Caddyfile`** *(2026-05-28 — Caddy 2.11.3 active; redirects :80 → :443; ACME will provision certs the moment DNS resolves to this instance)*
- [x] **Create `puresoft` system user, `/var/www/puresoft/`, `/etc/puresoft.env`** *(2026-05-28 — env file is placeholders only, mode 0600, owned by puresoft:puresoft)*
- [x] **Install systemd unit and enable the service** *(2026-05-28 — `puresoft.service` active, `next-server (v16.2.6)` on 127.0.0.1:3000; required removing `MemoryDenyWriteExecute=true` from the unit because it crashes V8's JIT — see `docs/DECISIONS.md`)*
- [x] **Deploy first release bundle** *(2026-05-28 — `/var/www/puresoft/releases/20260528162123`, symlinked from `/var/www/puresoft/current`)*
- [ ] Fill `/etc/puresoft.env` with real values (still placeholders; do this after SES + Turnstile are configured, then `sudo systemctl restart puresoft`)
- [ ] Wire AWS SES integration (Phase 2)
- [ ] Wire AWS S3 integration (Phase 2)
- [ ] CI/CD deployment workflow (Phase 4)

### Website build phase
- [x] Homepage — full Operating Theatre design implementation (eight design sections, live ops panel, CAT map, manifest exhibit)
- [x] Insurance Professionals page (token migration; full design treatment Phase 3)
- [x] CAT / Emergency Response page (token migration; full design treatment Phase 3)
- [x] Service pages — Soft Contents, Fire & Smoke, Water & Mold (token migration; full design treatment Phase 3)
- [x] About page (token migration; full design treatment Phase 3)
- [x] Contact / Submit a Claim page (intake placeholder — full intake form with photo upload arrives in Phase 2)
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
