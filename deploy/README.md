# Deployment

These files configure how the Pure Soft Restoration site runs on the AWS EC2 host. The full architecture is in `../docs/ARCHITECTURE.md`.

## Files

- **`Caddyfile`** — Caddy 2 reverse-proxy config. Provisions Let's Encrypt TLS for the apex and www, redirects www → apex, applies security headers, caches static assets, and reverse-proxies `:443` → `127.0.0.1:3000`.
- **`systemd/puresoft.service`** — systemd unit that runs the Next.js standalone build as the `puresoft` system user.

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
sudo cp /path/to/repo/deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy

# 5. systemd unit (after first release is in place)
sudo cp /path/to/repo/deploy/systemd/puresoft.service /etc/systemd/system/puresoft.service
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
