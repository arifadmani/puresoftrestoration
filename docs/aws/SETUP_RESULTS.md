# AWS Bootstrap & Live-Deploy Results

**Run date:** 2026-05-28
**Operator:** Claude Code (on the production EC2 instance)
**Region:** `us-east-2`
**Account:** `638515252835`
**Instance:** `i-02f5706e777ef2130` (`us-east-2c`, VPC `vpc-08c2937559c5bcf6e`)
**Public IPv4 at run time:** `18.225.211.99` (ephemeral — no Elastic IP yet)
**Public hostname:** `ec2-18-225-211-99.us-east-2.compute.amazonaws.com`

**Update (2026-05-28, later same day):** Elastic IP `18.225.78.200` allocated and associated with `i-02f5706e777ef2130` by the user via the AWS Console. The instance's public IPv4 is now `18.225.78.200` (verified via IMDSv2). GoDaddy DNS has the new A record but still has the two old parking A records present — see `docs/aws/dns-records-needed.md`.

This file is the durable record of what the bootstrap run actually did vs. what it documented as outstanding user-side work. Anything that *requires* the AWS Console because the EC2 instance role does not have the permission is listed under "Outstanding (user action required)".

---

## What is now running on the server

| Component | State | Notes |
| --- | --- | --- |
| AWS CLI v2 | Installed (`2.34.55`) | `/usr/local/bin/aws` — first install of this run |
| IAM instance profile | Attached | Role `ec2-puresoft-app-role` confirmed via `aws sts get-caller-identity` |
| Node.js | `v22.22.2` system-wide at `/usr/bin/node` (NodeSource apt) | Also `v22.22.3` under `~ubuntu/.nvm/` for the human operator |
| Next.js build | Clean | 14 routes prerender static; standalone bundle staged |
| Caddy 2 | `v2.11.3`, `active` | Cloudsmith stable repo; `/etc/caddy/Caddyfile` from `deployment/Caddyfile.example`; redirects `:80 → :443`; logs at `/var/log/caddy/puresoft.access.log` |
| `puresoft` system user | Created | uid 997, no shell, no home |
| `/var/www/puresoft/{releases,current}` | Created | `current` → `releases/20260528162123` |
| `/etc/puresoft.env` | Created | Copied verbatim from `.env.example` — **placeholders only**, mode `0600`, owned by `puresoft:puresoft`. **All real values still need to be filled in.** |
| `puresoft.service` (systemd) | `active` | `next-server (v16.2.6)` listening on `127.0.0.1:3000`, ~56 MB RSS |

### Smoke-test results (local)

```
HTML on 127.0.0.1:3000                                HTTP 200 · 150 KB · ttfb 72ms
CSS asset /_next/static/chunks/0_*.css                HTTP 200 · 47 KB
/                                                     HTTP 200
/about                                                HTTP 200
/contact                                              HTTP 200
/insurance-professionals                              HTTP 200
/soft-contents-restoration                            HTTP 200
/fire-smoke-odor-restoration                          HTTP 200
/water-mold-textile-recovery                          HTTP 200
/cat-emergency-response                               HTTP 200
/sitemap.xml                                          HTTP 200
/robots.txt                                           HTTP 200
HTTP :80 with Host: puresoftrestoration.com           HTTP 308 → https://...  (correct)
HTTPS :443 with --resolve to our IP                   HTTP 000 (no cert yet — expected; ACME blocked on DNS)
```

### Things that did *not* go on the first attempt (recorded for future me)

1. **Caddy access-log permissions.** The `/var/log/caddy/puresoft.access.log` file ended up `root:root 0600` after the initial `validate` run. Caddy reload then failed with `permission denied`. Fixed with `sudo chown -R caddy:caddy /var/log/caddy` and a full `systemctl restart caddy`. Note: a `systemctl reload` cannot recover from this — Caddy's admin API rejects the new config and keeps the old one running, so the running process is still on whatever Caddyfile was loaded at boot. Use `restart`, not `reload`, when changing log paths.
2. **systemd unit's `MemoryDenyWriteExecute=true` crashed Node.** First start of `puresoft.service` core-dumped immediately with V8 stack `Check failed: 12 == errno` inside `MemoryAllocator::SetPermissionsOnExecutableMemoryChunk`. errno 12 is `ENOMEM` returned by `mprotect` when the sandbox forbids W+X pages. V8's baseline JIT requires W+X, so `MemoryDenyWriteExecute` is incompatible with Node.js. Removed from `deployment/puresoft.service.example` in this commit; explanatory comment left in place so the line is not re-added.

---

## What was *not* done (and why)

The EC2 instance role `ec2-puresoft-app-role` currently grants only `s3:ListAllMyBuckets` and the EC2-metadata implicit identity. Every other AWS mutation tried returns `AccessDenied`. The following must be completed from the AWS Console (or via an admin profile on another machine) before launch:

| Item | Tried via CLI | Result |
| --- | --- | --- |
| `aws ec2 describe-addresses` | yes | `UnauthorizedOperation: ec2:DescribeAddresses` |
| `aws iam {get-role,list-role-policies,list-attached-role-policies}` | yes | `AccessDenied: iam:*` |
| `aws sesv2 list-email-identities` / `ses:GetAccount` / `ses:GetIdentityVerificationAttributes` | yes | `AccessDenied: ses:*` |
| `aws s3api create-bucket puresoft-claim-uploads-prod` | yes | `AccessDenied: s3:CreateBucket` |
| `aws s3api list-buckets` | yes | works — confirmed **0 buckets in the account** |

So as of this run:

- **No Elastic IP** is allocated/attached. The instance is on the ephemeral `18.225.211.99`. Going through a stop/start would change the public IP and break DNS once it's pointed.
- **No SES identity** exists for `puresoftrestoration.com`. SES is still in sandbox mode by default.
- **No S3 bucket** `puresoft-claim-uploads-prod` exists.
- The **IAM role attached to the instance** has nowhere near the permission set documented in `handoff/NEXT_STEPS.md`. It needs `ses:SendEmail`, `ses:SendRawEmail`, `s3:PutObject`, `s3:GetObject` on the right resources (see "Least-privilege IAM" below). It should *not* be granted broad admin.

These items are reflected in `handoff/NEXT_STEPS.md`. None of them block the local stack — they block public HTTPS, claim-form email, and claim-photo uploads.

---

## Outstanding (user action required, in the AWS Console)

The console is the right place for the rest of this — the changes are one-time, account-wide, and don't benefit from being scripted. The order below is the **shortest path to live HTTPS**.

### 1. Elastic IP (≈ 1 minute, free while attached)

EC2 → Elastic IPs → **Allocate** (region `us-east-2`) → **Associate** with instance `i-02f5706e777ef2130`.

**Why now:** stop/start of the instance otherwise loses the IP and forces a DNS re-update.

### 2. DNS at GoDaddy (≈ 5 minutes; propagation up to a few hours)

The registrar is GoDaddy (`ns01/02.domaincontrol.com`). Current `A` records point at GoDaddy parking (`3.33.130.190`, `15.197.148.33`) — needs to change. See `docs/aws/dns-records-needed.md` for the exact records.

### 3. SES — domain + DKIM (≈ 5 minutes + verification wait)

SES Console → Verified identities → Create identity → Domain `puresoftrestoration.com` → enable Easy DKIM (RSA 2048). SES will print 3 CNAME records. Add them at GoDaddy. Verification flips to "Verified" once DNS propagates. Also catalogued in `docs/aws/dns-records-needed.md` placeholder (replace `<token>` with the real value once SES emits them).

### 4. SES — production access (≈ 24h AWS turnaround)

SES Console → Account dashboard → "Request production access". Use case: transactional email for an insurance-claim intake form (notifications to internal staff, confirmations to adjusters). Until this is granted, SES will only send to verified email identities.

### 5. SES — interim verified identities (while still sandboxed)

Verify `admin@puresoftrestoration.com` and `arifadmani@gmail.com` as email identities. Lets the claim form be tested end-to-end before production access is granted.

### 6. S3 bucket `puresoft-claim-uploads-prod`

S3 Console → Create bucket → region `us-east-2` → name `puresoft-claim-uploads-prod`.

- Block all public access: **ON** (default).
- Default encryption: **SSE-S3** (or KMS with a CMK if preferred).
- CORS: allow `PUT`, `GET` only from `https://puresoftrestoration.com` (and `http://localhost:3000` for dev if you want):

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "GET"],
    "AllowedOrigins": ["https://puresoftrestoration.com"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

- Lifecycle: transition to S3 Standard-IA after 90 days (matches `docs/ARCHITECTURE.md` decision).

### 7. IAM — replace the role's policies with least-privilege

The role `ec2-puresoft-app-role` is already attached to the instance — good. Replace whatever policy it currently has with the inline policy below. **Do not** grant `AdministratorAccess` or `SES Full Access` or `S3 Full Access` — those would all be over-broad.

Policy `puresoft-app-runtime` (inline on the role):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SesSendOnVerifiedDomain",
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": [
        "arn:aws:ses:us-east-2:638515252835:identity/puresoftrestoration.com",
        "arn:aws:ses:us-east-2:638515252835:identity/noreply@puresoftrestoration.com",
        "arn:aws:ses:us-east-2:638515252835:identity/admin@puresoftrestoration.com"
      ],
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": "noreply@puresoftrestoration.com"
        }
      }
    },
    {
      "Sid": "S3UploadsBucket",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:AbortMultipartUpload"],
      "Resource": "arn:aws:s3:::puresoft-claim-uploads-prod/claims/*"
    },
    {
      "Sid": "S3UploadsBucketList",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::puresoft-claim-uploads-prod",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["claims/*"]
        }
      }
    }
  ]
}
```

Notes:
- `ses:FromAddress` condition pins the From address — even a future compromise can't spam from arbitrary @puresoftrestoration.com mailboxes.
- S3 is scoped to the `claims/` prefix the app actually writes to (`docs/ARCHITECTURE.md`'s key pattern `claims/<ref>/<uuid>-<file>`).
- No `kms:*` action because we're starting with SSE-S3. If the bucket is later switched to SSE-KMS with a customer-managed key, add `kms:GenerateDataKey` and `kms:Decrypt` on that specific key ARN.
- No `iam:*`, no `ec2:*` — the app runtime never needs to mutate AWS.

### 8. Security Group (verify, don't rebuild)

The instance is in SG `launch-wizard-1`. Confirm inbound rules:

- `22 / tcp` from your office/home IP only (not `0.0.0.0/0`)
- `80 / tcp` from `0.0.0.0/0`
- `443 / tcp` from `0.0.0.0/0`
- Everything else denied

### 9. `admin@puresoftrestoration.com` mailbox

DNS already shows Google Workspace MX records — the mailbox is provisioned. **No action.**

---

## Once the user-side items are done

From this server, after DNS resolves to the (Elastic) IP:

```bash
# Caddy will auto-provision Let's Encrypt on the next request to the domain.
# Force it explicitly with a quick request to surface any ACME errors:
curl -I https://puresoftrestoration.com/
sudo journalctl -u caddy -n 50 --no-pager
```

If ACME succeeds, `https://puresoftrestoration.com/` should return `HTTP 200`. If it fails, the log will show the ACME error (most common cause: DNS hasn't propagated yet — wait and retry).

After SES is verified (and ideally out of sandbox), fill in the real values in `/etc/puresoft.env` (still placeholders right now) and `sudo systemctl restart puresoft`.

---

## File-level audit trail for this run

- **Created**: `/etc/caddy/Caddyfile` (from `deployment/Caddyfile.example`), `/etc/puresoft.env` (from `.env.example`), `/etc/systemd/system/puresoft.service`, `/var/www/puresoft/{releases,current,releases/20260528162123}`, system user `puresoft`.
- **Installed**: `awscli` (v2.34.55, via official bundled installer), `caddy` (v2.11.3, Cloudsmith apt repo).
- **Modified in the repo**: `deployment/puresoft.service.example` (removed `MemoryDenyWriteExecute=true`). Reasoning recorded above and in `docs/DECISIONS.md`.
- **Untouched in the repo**: every other file. No secrets created. No AWS resources deleted. No Elastic IPs released. No broad-permission policies issued.
