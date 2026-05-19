# Next Steps

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

### Status checklist
- [ ] Elastic IP allocated & associated
- [ ] DNS `A` + `CNAME` records added
- [ ] SES domain verified (DKIM CNAMEs added)
- [ ] SES production access requested
- [ ] SES production access granted
- [ ] Interim email identities verified
- [ ] Security group rules confirmed
- [ ] S3 bucket created with CORS + encryption
- [ ] IAM role created and attached to EC2
- [ ] Turnstile keys obtained
- [ ] `admin@puresoftrestoration.com` mailbox live and monitored

---

## Part 2 — Strategic build phases

(Full detail in `docs/ROADMAP.md`. This is the short version.)

### Infrastructure
- [x] Install Claude Code on Ubuntu AWS server
- [x] Configure GitHub repo connection locally
- [x] Configure Node.js runtime (v22.22.3)
- [x] Author Caddy reverse-proxy config (`deploy/Caddyfile`)
- [x] Author systemd unit (`deploy/systemd/puresoft.service`)
- [x] Author env template (`.env.example`) with SES, S3, Turnstile, DB keys
- [ ] Install Caddy on the server and copy `deploy/Caddyfile` to `/etc/caddy/Caddyfile`
- [ ] Create `puresoft` system user, `/var/www/puresoft/`, `/etc/puresoft.env`
- [ ] Install systemd unit and enable the service (after first release deploy)
- [ ] Wire AWS SES integration (Phase 2)
- [ ] Wire AWS S3 integration (Phase 2)
- [ ] CI/CD deployment workflow (Phase 4)

### Website build phase
- [x] Homepage
- [x] Insurance Professionals page
- [x] CAT / Emergency Response page
- [x] Service pages (Soft Contents, Fire & Smoke, Water & Mold)
- [x] About page
- [x] Contact / Submit a Claim page (intake placeholder — full form with photo upload arrives in Phase 2)
- [x] SEO foundation (per-page metadata, LocalBusiness + Service JSON-LD, sitemap, robots, OG image)
- [x] Responsive layout (mobile drawer nav)
- [x] Shared design system (ink/navy/paper/slate/brass accent, Inter typeface, restrained CAT oxblood)

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
