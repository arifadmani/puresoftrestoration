# Deployment

These files configure how the Pure Soft Restoration site runs on the AWS EC2 host. The full architecture is in `../docs/ARCHITECTURE.md`.

> **First bootstrap completed 2026-05-28.** The recipe below has been executed on this EC2 instance once; the live audit trail (what ran, what was already true, what needs the AWS Console) is in `../docs/aws/SETUP_RESULTS.md`. The AWS-Console-side DNS records (apex + www + SES DKIM + SPF + DMARC) are catalogued exactly in `../docs/aws/dns-records-needed.md`.

## Files

- **`Caddyfile.example`** — Caddy 2 reverse-proxy config. Provisions Let's Encrypt TLS for the apex and www, redirects www → apex, applies security headers, caches static assets, and reverse-proxies `:443` → `127.0.0.1:3000`. Install to `/etc/caddy/Caddyfile`.
- **`puresoft.service.example`** — systemd unit that runs the Next.js standalone build as the `puresoft` system user. Install to `/etc/systemd/system/puresoft.service`. **Do not re-add `MemoryDenyWriteExecute=true`** — it crashes V8 (see `../docs/DECISIONS.md`).

## First-time host setup

```bash
# 1. Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy

# 2. System user
sudo useradd --system --no-create-home --shell /usr/sbin/nologin puresoft
sudo mkdir -p /var/www/puresoft/releases
sudo chown -R puresoft:puresoft /var/www/puresoft

# 3. Env file
sudo cp /path/to/repo/.env.example /etc/puresoft.env
sudo vim /etc/puresoft.env   # fill in real values
sudo chown puresoft:puresoft /etc/puresoft.env
sudo chmod 600 /etc/puresoft.env

# 4. Caddy config
sudo cp /path/to/repo/deployment/Caddyfile.example /etc/caddy/Caddyfile
sudo chown -R caddy:caddy /var/log/caddy   # required — Caddy's reload will reject the config otherwise
sudo systemctl restart caddy               # use restart, not reload, on the first config swap

# 5. systemd unit (after first release is in place)
sudo cp /path/to/repo/deployment/puresoft.service.example /etc/systemd/system/puresoft.service
sudo systemctl daemon-reload
sudo systemctl enable --now puresoft
```

## Deploy a new release

```bash
# On the build host (or this server):
npm ci
npm run build
# `npm run build` triggers the `postbuild` script which copies
# .next/static/ and public/ into .next/standalone/ so the standalone
# server can serve CSS, JS chunks, and fonts. The rsync flow below
# also covers those paths explicitly — the redundancy is intentional
# so that a forgotten step on either side still produces a working
# release.

# Copy the staged standalone bundle into a new release dir.
TS=$(date +%Y%m%d%H%M%S)
sudo install -d -o puresoft -g puresoft /var/www/puresoft/releases/$TS
sudo rsync -a --chown=puresoft:puresoft .next/standalone/ /var/www/puresoft/releases/$TS/
sudo rsync -a --chown=puresoft:puresoft .next/static/ /var/www/puresoft/releases/$TS/.next/static/
sudo rsync -a --chown=puresoft:puresoft public/ /var/www/puresoft/releases/$TS/public/

# Atomic swap.
sudo ln -sfn /var/www/puresoft/releases/$TS /var/www/puresoft/current
sudo systemctl restart puresoft
```

### Verifying a release renders styled

After restarting, fetch the page and then follow one of the CSS URLs
in its `<head>` — a working release should return ~45 KB of CSS, not a
404. (Previous smoke tests checked only the HTML body, which still
returns 200 even when CSS is missing.)

```bash
curl -s http://127.0.0.1:3000/ \
  | grep -oE '/_next/static/[^"]+\.css' | head -1 \
  | xargs -I{} curl -s -o /dev/null -w "HTTP %{http_code} · %{size_download}b\n" "http://127.0.0.1:3000{}"
```

## Logs

```bash
sudo journalctl -u puresoft -f       # app
sudo tail -F /var/log/caddy/puresoft.access.log
```
