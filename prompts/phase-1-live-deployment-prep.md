# Claude Code Prompt — Phase 1 Live Deployment Prep

## Instruction

Read the repo context and prepare the current Pure Soft Restoration site for first live deployment on the AWS Ubuntu server.

Required context files:

- `CLAUDE.md`
- `AGENTS.md` if present
- `README.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md`
- `handoff/NEXT_STEPS.md`

Do not redesign the site in this task. The Operating Theatre design implementation is already complete. This task is deployment readiness and first-release execution prep.

## Objective

Get the current Next.js site ready to run reliably on the AWS Ubuntu 24.04 server behind Caddy + systemd.

If all prerequisites are available, perform the deployment steps. If user-side prerequisites are missing, prepare everything possible and clearly list what the user must finish.

## Scope

### 1. Pull and inspect current repo state

Run:

```bash
git status
git pull origin main
```

Verify the working tree is clean before starting. If it is not clean, inspect and explain before changing anything.

### 2. Validate app build and standalone serving

Run:

```bash
npm install
npm run lint
npm run build
npm start
```

Then smoke test the local server on `127.0.0.1:3000`.

Check:

- homepage returns HTTP 200
- all expected routes return HTTP 200
- CSS file referenced in `<head>` returns HTTP 200 and non-trivial size
- JS chunks return HTTP 200
- fonts return HTTP 200

Expected routes:

- `/`
- `/insurance-professionals`
- `/soft-contents-restoration`
- `/fire-smoke-odor-restoration`
- `/water-mold-textile-recovery`
- `/cat-emergency-response`
- `/about`
- `/contact`

Do not leave a foreground `npm start` process running. Stop it after testing.

### 3. Server prerequisites check

Check whether the server has:

- Caddy installed
- systemd available
- `/var/www/puresoft` exists
- `/etc/puresoft.env` exists
- `puresoft` system user exists
- ports 80 and 443 allowed at OS level if UFW is enabled
- repo can push to GitHub

Do not put secrets in git.

### 4. Prepare deployment directory

If safe to do so, prepare:

```bash
sudo useradd --system --home /var/www/puresoft --shell /usr/sbin/nologin puresoft || true
sudo mkdir -p /var/www/puresoft/releases /var/www/puresoft/shared
sudo chown -R puresoft:puresoft /var/www/puresoft
```

If permissions prevent this, document exact commands for the user.

### 5. Environment file

Create `/etc/puresoft.env` only if it does not exist.

Use safe placeholder values only. Do not commit this file.

It should include placeholders for:

- `NODE_ENV=production`
- `PORT=3000`
- `HOSTNAME=127.0.0.1`
- `NEXT_PUBLIC_SITE_URL=https://puresoftrestoration.com`
- AWS SES placeholders
- AWS S3 placeholders
- Postgres placeholders
- Turnstile placeholders

Set permissions:

```bash
sudo chown puresoft:puresoft /etc/puresoft.env
sudo chmod 600 /etc/puresoft.env
```

### 6. Install/configure Caddy if appropriate

If Caddy is not installed, install it using official Ubuntu/Debian instructions.

Then compare repo `deploy/Caddyfile` with desired `/etc/caddy/Caddyfile`.

Only install/copy the production Caddyfile if DNS is already pointed to this server or if the config is safe to stage.

If DNS is not pointed yet, prepare the file and document the cutover steps rather than forcing a failing certificate issuance.

### 7. Install/configure systemd service

Compare repo `deploy/systemd/puresoft.service` with desired `/etc/systemd/system/puresoft.service`.

If safe, install it:

```bash
sudo cp deploy/systemd/puresoft.service /etc/systemd/system/puresoft.service
sudo systemctl daemon-reload
```

Do not start the service until a release has been copied to `/var/www/puresoft/current` and `.next/standalone/server.js` exists there.

### 8. Create a simple deploy script if missing

If not already present, create:

- `scripts/deploy-local-release.sh`

The script should:

- build the app
- create a timestamped release directory under `/var/www/puresoft/releases/`
- copy `.next/standalone/`, `.next/standalone/.next/static/`, and `.next/standalone/public/`
- update `/var/www/puresoft/current` symlink
- restart `puresoft.service`
- run smoke tests

Make the script safe and idempotent. It should fail loudly on errors.

### 9. Placeholder data audit before launch

Audit `lib/site.ts` and related files for launch-blocking placeholders.

Document whether these are still placeholders:

- address
- phone number
- CAT line
- intake email
- IICRC number
- Texas DPS/security number if shown
- active CAT mock data
- carrier wordmarks / partner references

Do not invent replacements. List what the user must provide.

### 10. Documentation updates

Update:

- `handoff/NEXT_STEPS.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `deploy/README.md` if deployment findings changed
- `docs/DECISIONS.md` only if a new decision was made

### 11. Validation

Run final validation:

```bash
npm run lint
npm run build
```

If a deploy script was created, dry-run or run it only if safe.

Document exact results.

## Required GitHub persistence

At the end, commit and push:

```bash
git status
git add .
git commit -m "Prepare Phase 1 live deployment"
git push origin main
```

If there are no file changes, do not create an empty commit. Instead, state that no commit was needed.

## Final response required from Claude Code

Provide a concise summary with:

- what was verified
- what was changed
- files changed
- commands run
- build/lint status
- whether Caddy is installed/configured
- whether systemd service is installed/configured
- whether a release was deployed
- whether HTTPS is live
- remaining user-side blockers
- exact next action for the user
