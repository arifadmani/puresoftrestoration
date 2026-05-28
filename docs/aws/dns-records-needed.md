# DNS records to add at GoDaddy

**Domain:** `puresoftrestoration.com`
**Current registrar / DNS:** GoDaddy (`ns01.domaincontrol.com`, `ns02.domaincontrol.com`)
**Last DNS audit:** 2026-05-28
**Elastic IP (allocated 2026-05-28):** `18.225.78.200` — associated with `i-02f5706e777ef2130`

GoDaddy DNS console: https://dcc.godaddy.com/manage/puresoftrestoration.com/dns

> Add these in two passes. Pass 1 (Elastic IP A record + www CNAME) lets Caddy provision Let's Encrypt and brings HTTPS up. Pass 2 (SES DKIM CNAMEs) takes SES out of "Pending verification" so the claim-intake email path works.

---

## Current state (as of 2026-05-28, after user's first DNS change)

```
A      @     3.33.130.190 / 15.197.148.33 / 18.225.78.200   ← parking IPs still present — MUST DELETE
CNAME  www  → puresoftrestoration.com.                       ← added ✓
NS     @     ns01/02.domaincontrol.com                        ← GoDaddy, keep
MX     @     ASPMX.L.GOOGLE.COM + Google alts                 ← Google Workspace, keep
TXT    @     google-site-verification=...                     ← keep
```

The new A record for the Elastic IP `18.225.78.200` was added, but the two old GoDaddy parking A records (`3.33.130.190`, `15.197.148.33`) were not deleted. Until they are removed, ~2/3 of DNS responses land on parking pages and Let's Encrypt's HTTP-01 challenge will fail intermittently. The next user action is to delete those two records in the GoDaddy DNS console.

---

## Pass 1 — Point the apex + www at the server

Required before Caddy can issue a Let's Encrypt cert.

| Type  | Name | Value                          | TTL  | Notes |
| ----- | ---- | ------------------------------ | ---- | ----- |
| A     | `@`  | `18.225.78.200`                | 600  | Replace BOTH existing parking A records with this single record. |
| CNAME | `www`| `puresoftrestoration.com.`     | 600  | Caddy is configured to 308-redirect www → apex. |

**Elastic IP `18.225.78.200`** was allocated and associated with instance `i-02f5706e777ef2130` on 2026-05-28.

### Verifying pass 1

After GoDaddy says the records are saved (and ~5–60 minutes of propagation):

```bash
dig +short A   puresoftrestoration.com   @1.1.1.1   # expect: 18.225.78.200 (and ONLY that)
dig +short     www.puresoftrestoration.com @1.1.1.1  # expect: puresoftrestoration.com. then 18.225.78.200
```

Then on the server:

```bash
sudo journalctl -u caddy -f
curl -I https://puresoftrestoration.com/
```

Caddy will request a cert from Let's Encrypt on the first HTTPS hit. Success looks like a `certificate obtained successfully` log line followed by `HTTP/2 200`.

---

## Pass 2 — SES DKIM + supporting records

Required for `noreply@puresoftrestoration.com` to send email (the claim form notifies `admin@puresoftrestoration.com` via SES).

Get the actual values from the AWS Console:

> SES → Verified identities → Create identity → Domain `puresoftrestoration.com` → Easy DKIM → RSA 2048.

SES emits **three** CNAMEs of the form below. Names and targets are unique to your account; paste them in literally.

| Type  | Name (GoDaddy form — strip `.puresoftrestoration.com`)         | Value                                       | TTL  |
| ----- | -------------------------------------------------------------- | ------------------------------------------- | ---- |
| CNAME | `<dkim-token-1>._domainkey`                                    | `<dkim-token-1>.dkim.amazonses.com`         | 600  |
| CNAME | `<dkim-token-2>._domainkey`                                    | `<dkim-token-2>.dkim.amazonses.com`         | 600  |
| CNAME | `<dkim-token-3>._domainkey`                                    | `<dkim-token-3>.dkim.amazonses.com`         | 600  |

> GoDaddy's UI strips the apex automatically when you enter `<token>._domainkey` in the *Name* field — confirm the preview shows `<token>._domainkey.puresoftrestoration.com` before saving.

### Recommended additional records (highly encouraged, not strictly SES-required)

**SPF.** You already have a Google Workspace SPF need (because of Gmail MX). The single `TXT @` record should include both Google and SES senders — never create two `v=spf1` records on the same name, you must merge them:

| Type | Name | Value                                                                 | TTL |
| ---- | ---- | --------------------------------------------------------------------- | --- |
| TXT  | `@`  | `v=spf1 include:_spf.google.com include:amazonses.com ~all`           | 600 |

If a SPF record already exists, edit it to add `include:amazonses.com` before the `~all` — don't add a second.

**DMARC.** Start in monitor-only mode so you see reports without bouncing legitimate mail:

| Type | Name      | Value                                                                                                  | TTL |
| ---- | --------- | ------------------------------------------------------------------------------------------------------ | --- |
| TXT  | `_dmarc`  | `v=DMARC1; p=none; rua=mailto:admin@puresoftrestoration.com; ruf=mailto:admin@puresoftrestoration.com; fo=1` | 600 |

Tighten to `p=quarantine` and eventually `p=reject` after a couple of weeks of clean DKIM + SPF passes.

### Verifying pass 2

```bash
# Each of the three should resolve to <token>.dkim.amazonses.com
dig +short CNAME <dkim-token-1>._domainkey.puresoftrestoration.com @1.1.1.1

# SES console will flip the identity from "Pending verification" → "Verified".
aws sesv2 get-email-identity --email-identity puresoftrestoration.com --region us-east-2
# (requires SES read perms on the IAM identity you're using — the instance role does NOT have them)
```

---

## Do NOT change

| Record | Reason |
| ------ | ------ |
| `NS @ ns01.domaincontrol.com`, `ns02.domaincontrol.com` | Authoritative nameservers. Changing these breaks DNS until propagation. |
| `MX @ ASPMX.L.GOOGLE.COM` (and the four `aspmx*` / `alt*` Google MX records) | Google Workspace inbound mail. `admin@puresoftrestoration.com` is the claim-notification destination. |
| `TXT @ google-site-verification=PM40uLCyUOeYTPgxuSYYv584mJKiBmyMkPH9XUXZKFI` | Google ownership proof for Workspace. |

---

## Quick reference — what we're aiming for after both passes

```
A      @                              18.225.78.200
CNAME  www                            puresoftrestoration.com.
CNAME  <dkim-token-1>._domainkey      <dkim-token-1>.dkim.amazonses.com
CNAME  <dkim-token-2>._domainkey      <dkim-token-2>.dkim.amazonses.com
CNAME  <dkim-token-3>._domainkey      <dkim-token-3>.dkim.amazonses.com
TXT    @                              v=spf1 include:_spf.google.com include:amazonses.com ~all
TXT    _dmarc                         v=DMARC1; p=none; rua=mailto:admin@puresoftrestoration.com; ...
MX     @                              (Google Workspace — unchanged)
NS     @                              (GoDaddy — unchanged)
```
